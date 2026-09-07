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

export function getFaviconCandidates(url: string, localIcon?: string): string[] {
  if (!url || url.startsWith('#') || url.startsWith('chrome://')) {
    return localIcon ? [localIcon] : []
  }

  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`
    const parsed = new URL(fullUrl)
    const hostname = parsed.hostname
    const origin = parsed.origin

    const candidates: string[] = []

    // 1. Direct favicon request by the client browser (with user's cookies & auth)
    candidates.push(`${origin}/favicon.ico`)

    if (isPrivateOrHomelab(hostname)) {
      // For private / homelab domains, NEVER call Google or 3rd-party servers
      // because external crawlers cannot authenticate and will return a default globe icon.
      if (localIcon) {
        candidates.push(localIcon)
      }
    } else {
      // For public domains, Google high-res 128px favicon is fast and crisp
      candidates.push(`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`)
      candidates.push(`https://icons.duckduckgo.com/ip3/${hostname}.ico`)
      if (localIcon) {
        candidates.push(localIcon)
      }
    }

    return candidates
  } catch {
    return localIcon ? [localIcon] : []
  }
}
