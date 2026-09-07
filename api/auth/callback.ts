import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  TINYAUTH_CLIENT_ID,
  TINYAUTH_CLIENT_SECRET,
  TINYAUTH_ENDPOINTS,
  SESSION_SECRET,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
  STATE_COOKIE_NAME,
  type SessionPayload,
} from '../../src/auth/config.js'
import { createSessionToken, parseCookies, buildSetCookie } from '../../src/auth/session.js'

interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  id_token?: string
  refresh_token?: string
}

interface UserInfoResponse {
  sub: string
  name?: string
  preferred_username?: string
  email?: string
  email_verified?: boolean
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!TINYAUTH_CLIENT_ID || !TINYAUTH_CLIENT_SECRET || !SESSION_SECRET) {
    res.status(500).send('Authentication is not configured')
    return
  }

  const { code, state, error } = req.query

  // Handle OAuth error
  if (error) {
    res.status(400).send(`Authentication error: ${error}`)
    return
  }

  // Validate required params
  if (!code || !state || typeof code !== 'string' || typeof state !== 'string') {
    res.status(400).send('Missing code or state parameter')
    return
  }

  // Verify state matches cookie
  const cookies = parseCookies(req.headers.cookie || null)
  if (cookies[STATE_COOKIE_NAME] !== state) {
    res.status(400).send('Invalid state parameter (CSRF check failed)')
    return
  }

  // Build redirect URI
  const protocol = (req.headers['x-forwarded-proto'] as string) || 'https'
  const host = (req.headers['x-forwarded-host'] as string) || req.headers.host
  const redirectUri = `${protocol}://${host}/api/auth/callback`
  const isSecure = protocol === 'https'

  // Exchange code for token
  let tokenData: TokenResponse
  try {
    const tokenRes = await fetch(TINYAUTH_ENDPOINTS.token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: TINYAUTH_CLIENT_ID,
        client_secret: TINYAUTH_CLIENT_SECRET,
      }),
    })

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text()
      console.error('TinyAuth token exchange failed:', tokenRes.status, errorText)
      res.status(502).send('Token exchange failed')
      return
    }

    tokenData = await tokenRes.json() as TokenResponse
  } catch (err) {
    console.error('TinyAuth token exchange error:', err)
    res.status(502).send('Token exchange failed')
    return
  }

  // Fetch user info
  let userInfo: UserInfoResponse
  try {
    const userRes = await fetch(TINYAUTH_ENDPOINTS.userinfo, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userRes.ok) {
      res.status(500).send('Failed to fetch user info')
      return
    }

    userInfo = await userRes.json() as UserInfoResponse
  } catch (err) {
    console.error('TinyAuth user info error:', err)
    res.status(502).send('Failed to fetch user info')
    return
  }

  // Create session token
  const sessionPayload: SessionPayload = {
    sub: userInfo.sub,
    name: userInfo.name || userInfo.preferred_username,
    email: userInfo.email,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  }

  const sessionToken = await createSessionToken(sessionPayload)

  // Set session cookie
  const sessionCookie = buildSetCookie(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })

  // Clear state cookie
  const clearStateCookie = buildSetCookie(STATE_COOKIE_NAME, '', {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  res.setHeader('Set-Cookie', [sessionCookie, clearStateCookie])

  // Redirect to home
  res.redirect(302, '/')
}
