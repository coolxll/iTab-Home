import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { importPKCS8, SignJWT } from 'jose'

let cachedToken: string | null = null
let tokenExpiresAt = 0

/**
 * Exchange Google Cloud Service Account credentials for an OAuth access token
 * with scope: https://www.googleapis.com/auth/cloud-platform
 */
async function getAccessTokenFromServiceAccount(credentialsJson: string): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000)

  // Use cached token if still valid for at least 5 minutes
  if (cachedToken && tokenExpiresAt > now + 300) {
    return cachedToken
  }

  try {
    const creds = JSON.parse(credentialsJson)
    const clientEmail = creds.client_email
    const privateKey = creds.private_key
    if (!clientEmail || !privateKey) return null

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
      console.error('Google OAuth token request failed:', await resp.text())
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
    console.error('Failed to parse service account or generate token:', err)
    return null
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'private, no-store')

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  // 1. Direct token configured in environment variables
  if (process.env.GEN_SEARCH_AUTH_TOKEN || process.env.VERTEX_AI_JWT) {
    res.status(200).json({ token: process.env.GEN_SEARCH_AUTH_TOKEN || process.env.VERTEX_AI_JWT })
    return
  }

  // 2. Automated Service Account JSON credentials (env var or local service-account.json)
  let saJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON

  if (!saJson) {
    try {
      const saFilePath = path.join(process.cwd(), 'service-account.json')
      saJson = await readFile(saFilePath, 'utf8')
    } catch {
      // Local service account file not present
    }
  }

  if (saJson) {
    const token = await getAccessTokenFromServiceAccount(saJson)
    if (token) {
      res.status(200).json({ token })
      return
    }
  }

  // Fallback: public access mode (no token needed)
  res.status(200).json({ token: '' })
}
