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

/** True when Shortcut.icon holds a pinned online icon URL instead of an icon name. */
export function isIconUrl(icon?: string): boolean {
  return Boolean(icon && (icon.startsWith('http://') || icon.startsWith('https://')))
}

export interface OnlineIconCandidate {
  url: string
  label: string
}

/**
 * High-resolution icon candidates from multiple third-party providers, used by
 * the icon picker in the Add/Edit modals. Each provider has different coverage
 * and quality per domain, so we surface them all and let the user pick the
 * sharpest one. Private/homelab domains only get direct-origin candidates
 * (external crawlers cannot reach them).
 */
export function getOnlineIconCandidates(pageUrl: string): OnlineIconCandidate[] {
  try {
    const fullUrl = pageUrl.startsWith('http') ? pageUrl : `https://${pageUrl}`
    const parsed = new URL(fullUrl)
    const host = parsed.hostname
    const origin = parsed.origin
    if (!host) return []

    const candidates: OnlineIconCandidate[] = [
      { url: `${origin}/apple-touch-icon.png`, label: 'Apple' },
    ]

    if (!isPrivateOrHomelab(host)) {
      candidates.push(
        // Clearbit Logo API: usually the highest-resolution brand logo available
        { url: `https://logo.clearbit.com/${host}`, label: 'Clearbit' },
        // Google favicon service at 128px
        { url: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(origin)}&size=128`, label: 'Google' },
        // Unavatar aggregates multiple sources; fallback=false so failures are detectable
        { url: `https://unavatar.io/${host}?fallback=false`, label: 'Unavatar' },
        // icon.horse: high-quality icon CDN
        { url: `https://icon.horse/icon/${host}`, label: 'Horse' },
        // DuckDuckGo icons
        { url: `https://icons.duckduckgo.com/ip3/${host}.ico`, label: 'DDG' },
      )
    }

    candidates.push({ url: `${origin}/favicon.ico`, label: 'ICO' })
    return candidates
  } catch {
    return []
  }
}

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
