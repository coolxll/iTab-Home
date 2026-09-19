import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { importPKCS8, SignJWT } from 'jose'
import { SESSION_SECRET } from '../../src/auth/config.js'
import { getSessionFromCookieHeader } from '../../src/auth/session.js'

let cachedToken: string | null = null
let tokenExpiresAt = 0

const DEFAULT_PROJECT_ID = '1060268022527'
const DEFAULT_ENGINE_ID = 'customize-search_1789195596935'
const DEFAULT_LOCATION = 'global'

interface ServiceAccountCredentials {
  project_id?: string
  client_email?: string
  private_key?: string
}

function getCredentialsJson(): Promise<string | null> {
  const envCreds =
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON

  if (envCreds) {
    return Promise.resolve(envCreds)
  }

  const localFile = path.join(process.cwd(), 'service-account.json')
  return readFile(localFile, 'utf8').catch(() => null)
}

/**
 * Exchange Service Account credentials for an access token scoped to Discovery Engine / Vertex AI Search
 */
async function getAccessToken(creds: ServiceAccountCredentials): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000)

  if (cachedToken && tokenExpiresAt > now + 300) {
    return cachedToken
  }

  const clientEmail = creds.client_email
  const privateKey = creds.private_key
  if (!clientEmail || !privateKey) return null

  try {
    const key = await importPKCS8(privateKey, 'RS256')

    const jwt = await new SignJWT({
      scope: 'https://www.googleapis.com/auth/cloud-platform',
    })
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuer(clientEmail)
      .setSubject(clientEmail)
      .setAudience('https://oauth2.googleapis.com/token')
      .setIssuedAt(now)
      .setExpirationTime(now + 3600)
      .sign(key)

    const resp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    })

    if (!resp.ok) {
      console.error('Google OAuth token exchange failed:', await resp.text())
      return null
    }

    const data = (await resp.json()) as { access_token?: string; expires_in?: number }
    if (data.access_token) {
      cachedToken = data.access_token
      tokenExpiresAt = now + (data.expires_in || 3600)
      return data.access_token
    }

    return null
  } catch (err) {
    console.error('Failed to sign JWT or get access token:', err)
    return null
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '').trim()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'private, no-store')

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  // Check session authorization if TinyAuth session secret is configured
  if (SESSION_SECRET) {
    const session = await getSessionFromCookieHeader(req.headers.cookie)
    if (!session) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
  }

  const query = (
    req.method === 'POST' ? req.body?.query || req.body?.q : req.query.q || req.query.query
  ) as string | undefined

  if (!query || !query.trim()) {
    res.status(400).json({ error: 'Query parameter "q" is required' })
    return
  }

  const trimmedQuery = query.trim()

  const credsJson = await getCredentialsJson()
  if (!credsJson) {
    res.status(503).json({
      error: 'Google Service Account credentials not configured (GOOGLE_SERVICE_ACCOUNT_KEY missing)',
      results: [],
    })
    return
  }

  let creds: ServiceAccountCredentials
  try {
    creds = JSON.parse(credsJson)
  } catch (err) {
    console.error('Invalid Service Account JSON:', err)
    res.status(500).json({ error: 'Invalid Google Service Account JSON' })
    return
  }

  const token = await getAccessToken(creds)
  if (!token) {
    res.status(500).json({ error: 'Failed to generate Google access token' })
    return
  }

  const projectId =
    (req.query.projectId as string) ||
    process.env.VERTEX_AI_PROJECT_ID ||
    creds.project_id ||
    DEFAULT_PROJECT_ID

  const location =
    (req.query.location as string) ||
    process.env.VERTEX_AI_LOCATION ||
    DEFAULT_LOCATION

  const engineId =
    (req.query.engineId as string) ||
    (req.query.dataStoreId as string) ||
    process.env.VERTEX_AI_ENGINE_ID ||
    process.env.VERTEX_AI_DATASTORE_ID ||
    DEFAULT_ENGINE_ID

  const searchUrl = `https://discoveryengine.googleapis.com/v1alpha/projects/${projectId}/locations/${location}/collections/default_collection/engines/${engineId}/servingConfigs/default_search:search`

  try {
    const basePayload = {
      query: trimmedQuery,
      pageSize: 10,
      queryExpansionSpec: { condition: 'AUTO' },
      spellCorrectionSpec: { mode: 'AUTO' },
      userInfo: { timeZone: 'Asia/Singapore' },
    }

    // Try request with AI summary generation
    let searchResp = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...basePayload,
        summarySpec: {
          summaryResultCount: 3,
          includeCitations: true,
        },
      }),
    })

    // If summarySpec is rejected by engine configuration, fallback to base query
    if (!searchResp.ok && searchResp.status === 400) {
      const errClone = await searchResp.clone().text()
      if (errClone.toLowerCase().includes('summary') || errClone.toLowerCase().includes('summarization')) {
        searchResp = await fetch(searchUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(basePayload),
        })
      }
    }

    if (!searchResp.ok) {
      const errorText = await searchResp.text()
      console.error('Vertex AI Search API returned error:', searchResp.status, errorText)
      res.status(searchResp.status).json({
        error: `Search error: ${searchResp.statusText}`,
        details: errorText,
        results: [],
      })
      return
    }

    const searchData = (await searchResp.json()) as any

    const summaryText = searchData.summary?.summaryText || ''

    const rawResults = Array.isArray(searchData.results) ? searchData.results : []

    const formattedResults = rawResults.map((item: any) => {
      const doc = item.document || {}
      const struct = doc.derivedStructData || doc.structData || {}

      const title = struct.title || struct.name || doc.name || '未命名文档'
      const url = struct.link || struct.uri || struct.url || ''

      let snippet = ''
      if (Array.isArray(struct.snippets) && struct.snippets.length > 0) {
        snippet = struct.snippets[0].htmlSnippet || struct.snippets[0].snippet || ''
      } else if (Array.isArray(struct.extractive_answers) && struct.extractive_answers.length > 0) {
        snippet = struct.extractive_answers[0].content || ''
      } else if (typeof struct.description === 'string') {
        snippet = struct.description
      }

      return {
        title: stripHtml(title),
        url,
        snippet: stripHtml(snippet),
      }
    })

    res.status(200).json({
      query: trimmedQuery,
      summary: summaryText,
      results: formattedResults,
      totalSize: searchData.totalSize || formattedResults.length,
    })
  } catch (err: any) {
    console.error('Failed to execute search:', err)
    res.status(500).json({
      error: 'Failed to contact Vertex AI Search service',
      details: err?.message || String(err),
      results: [],
    })
  }
}
