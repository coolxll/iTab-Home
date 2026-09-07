import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  TINYAUTH_CLIENT_ID,
  TINYAUTH_ENDPOINTS,
  STATE_COOKIE_NAME,
  generateState,
  getStateCookieOptions,
} from '../../src/auth/config.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (!TINYAUTH_CLIENT_ID) {
    res.status(500).send('Authentication is not configured')
    return
  }

  // Build redirect URI from request
  const protocol = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const redirectUri = `${protocol}://${host}/api/auth/callback`

  // Generate state for CSRF protection
  const state = generateState()

  // Build TinyAuth authorize URL
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: TINYAUTH_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'openid profile email',
    state,
  })

  const authorizeUrl = `${TINYAUTH_ENDPOINTS.authorize}?${params.toString()}`

  // Set state cookie
  const isSecure = protocol === 'https'
  const stateCookie = `${STATE_COOKIE_NAME}=${state}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${getStateCookieOptions(isSecure).maxAge}${isSecure ? '; Secure' : ''}`
  res.setHeader('Set-Cookie', stateCookie)

  // Redirect to TinyAuth
  res.redirect(302, authorizeUrl)
}
