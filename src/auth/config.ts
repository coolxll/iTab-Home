// TinyAuth OIDC configuration
export const TINYAUTH_URL = process.env.TINYAUTH_URL || 'https://auth.229929605.xyz'
export const TINYAUTH_CLIENT_ID = process.env.TINYAUTH_CLIENT_ID || ''
export const TINYAUTH_CLIENT_SECRET = process.env.TINYAUTH_CLIENT_SECRET || ''
export const SESSION_SECRET = process.env.SESSION_SECRET || process.env.TINYAUTH_CLIENT_SECRET || ''

// TinyAuth OIDC endpoints
export const TINYAUTH_ENDPOINTS = {
  authorize: `${TINYAUTH_URL}/authorize`,
  token: `${TINYAUTH_URL}/api/oidc/token`,
  userinfo: `${TINYAUTH_URL}/api/oidc/userinfo`,
} as const

// Session configuration
export const SESSION_COOKIE_NAME = 'itab_session'
export const SESSION_MAX_AGE = 30 * 24 * 60 * 60 // 30 days in seconds

// State cookie for CSRF protection
export const STATE_COOKIE_NAME = 'itab_oauth_state'
export const STATE_MAX_AGE = 10 * 60 // 10 minutes

// Session payload type
export interface SessionPayload {
  sub: string
  name?: string
  email?: string
  exp: number
}

// Get app URL from request headers
export function getAppUrl(request: Request): string {
  const url = new URL(request.url)
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto')

  if (forwardedHost) {
    const protocol = forwardedProto || 'https'
    return `${protocol}://${forwardedHost}`
  }

  return url.origin
}

// Generate random state for CSRF protection
export function generateState(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

// Create session cookie options
export function getSessionCookieOptions(isSecure: boolean): {
  httpOnly: true
  secure: boolean
  sameSite: 'lax'
  path: '/'
  maxAge: number
} {
  return {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  }
}

// Create state cookie options
export function getStateCookieOptions(isSecure: boolean): {
  httpOnly: true
  secure: boolean
  sameSite: 'lax'
  path: '/'
  maxAge: number
} {
  return {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax',
    path: '/',
    maxAge: STATE_MAX_AGE,
  }
}
