/**
 * Utility to resolve high-fidelity favicons directly from destination URLs
 * with resilient multi-tier fallbacks.
 */

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

    // 1. Direct favicon from target address
    candidates.push(`${origin}/favicon.ico`)

    // 2. Google High-Resolution Favicon Service (128x128)
    candidates.push(`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`)

    // 3. DuckDuckGo Favicon Service
    candidates.push(`https://icons.duckduckgo.com/ip3/${hostname}.ico`)

    // 4. Local homelab icon if mapped
    if (localIcon) {
      candidates.push(localIcon)
    }

    return candidates
  } catch {
    return localIcon ? [localIcon] : []
  }
}
