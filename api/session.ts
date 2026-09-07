import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SESSION_SECRET } from '../src/auth/config.js'
import { getSessionFromCookieHeader } from '../src/auth/session.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'private, no-store')

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ authenticated: false })
    return
  }

  if (!SESSION_SECRET) {
    res.status(500).json({ authenticated: false, error: 'Session is not configured' })
    return
  }

  const session = await getSessionFromCookieHeader(req.headers.cookie)
  if (!session) {
    res.status(401).json({ authenticated: false })
    return
  }

  res.status(200).json({
    authenticated: true,
    user: {
      sub: session.sub,
      name: session.name,
      email: session.email,
    },
    expiresAt: session.exp,
  })
}
