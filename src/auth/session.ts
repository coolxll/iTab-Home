import { SignJWT, jwtVerify } from 'jose'
import {
  SESSION_COOKIE_NAME,
  SESSION_SECRET,
  type SessionPayload,
} from './config.js'

// Derive a 32-byte signing key from the client secret via SHA-256
async function getSigningKey(): Promise<Uint8Array> {
  if (!SESSION_SECRET) {
    throw new Error('SESSION_SECRET is required')
  }
  const encoder = new TextEncoder()
  const data = encoder.encode(SESSION_SECRET)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return new Uint8Array(hash)
}

// Create a signed JWT session token
export async function createSessionToken(payload: SessionPayload): Promise<string> {
  const key = await getSigningKey()
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.exp)
    .sign(key)
}

// Verify and decode a session JWT
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const key = await getSigningKey()
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function getSessionFromCookieHeader(
  cookieHeader: string | null | undefined
): Promise<SessionPayload | null> {
  const cookies = parseCookies(cookieHeader || null)
  const token = cookies[SESSION_COOKIE_NAME]
  if (!token) return null
  return verifySessionToken(token)
}

// Parse cookies from request headers
export function parseCookies(cookieHeader: string | null): Record<string, string> {
  const cookies: Record<string, string> = {}
  if (!cookieHeader) return cookies

  for (const pair of cookieHeader.split(';')) {
    const [key, ...rest] = pair.trim().split('=')
    if (key) {
      cookies[key] = decodeURIComponent(rest.join('='))
    }
  }
  return cookies
}

// Build a Set-Cookie header string
export function buildSetCookie(
  name: string,
  value: string,
  options: {
    httpOnly?: boolean
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
    path?: string
    maxAge?: number
    domain?: string
  } = {}
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`]
  if (options.httpOnly) parts.push('HttpOnly')
  if (options.secure) parts.push('Secure')
  if (options.sameSite) parts.push(`SameSite=${options.sameSite.charAt(0).toUpperCase() + options.sameSite.slice(1)}`)
  if (options.path) parts.push(`Path=${options.path}`)
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`)
  if (options.domain) parts.push(`Domain=${options.domain}`)
  return parts.join('; ')
}
