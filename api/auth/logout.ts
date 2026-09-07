import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SESSION_COOKIE_NAME } from '../../src/auth/config.js'
import { buildSetCookie } from '../../src/auth/session.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const protocol = (req.headers['x-forwarded-proto'] as string) || 'https'
  const isSecure = protocol === 'https'

  // Clear session cookie
  const clearCookie = buildSetCookie(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  res.setHeader('Set-Cookie', clearCookie)

  // Redirect to login
  res.redirect(302, '/api/auth/login')
}
