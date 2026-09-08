/**
 * Utility to resolve favicons with intelligent routing:
 * - Public domains: client direct origin favicon -> Google 128px high-res favicon -> DuckDuckGo
 * - Private/Homelab domains: strictly client direct origin favicon -> local assets (never 3rd party servers that return dummy globes)
 */

function isPrivateOrHomelab(hostname: string): boolean {
  return (
    hostname.endsWith('229929605.xyz') ||
    hostname.endsWith('bytecloudapp.com') ||
    hostname.endsWith('.ts.net') ||
    hostname.endsWith('.local') ||
    hostname.includes('192.168.') ||
    hostname.includes('100.') ||
    hostname.includes('10.') ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1'
  )
}

/**
 * Sentinel value for Shortcut.icon meaning: "use the website's own favicon".
 * Lets users explicitly pin favicon mode instead of a built-in vector icon,
 * even when smart recognition would match a known vector icon.
 */
export const FAVICON_ICON = 'favicon'

export function getFaviconCandidates(url: string, localIcon?: string): string[] {
  // A pinned / inferred vector icon is NOT a favicon fallback candidate:
  // an <img> never fires onError for it, so it would masquerade as the site's
  // favicon and block the real favicon fallback chain.
  if (localIcon === FAVICON_ICON) {
    localIcon = undefined
  }
  if (!url || url.startsWith('#') || url.startsWith('chrome://')) {
    return localIcon ? [localIcon] : []
  }

  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`
    const parsed = new URL(fullUrl)
    const hostname = parsed.hostname
    const origin = parsed.origin

    const candidates: string[] = []

    // 1. High-resolution official web app icon
    candidates.push(`${origin}/apple-touch-icon.png`)

    // 2. Direct site favicon
    candidates.push(`${origin}/favicon.ico`)

    if (isPrivateOrHomelab(hostname)) {
      // For private / homelab domains, NEVER call Google or 3rd-party servers
      // because external crawlers cannot authenticate and will return a default globe icon.
      if (localIcon) {
        candidates.push(localIcon)
      }
    } else {
      // For public domains, Google high-res 128px favicon service is reliable
      candidates.push(`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(origin)}&size=128`)
      if (localIcon) {
        candidates.push(localIcon)
      }
    }

    return candidates
  } catch {
    return localIcon ? [localIcon] : []
  }
}
