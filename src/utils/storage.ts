import type { UserSettings, Shortcut } from '../types'

const STORAGE_KEY = 'itab_home_settings_v11'
const RECENT_SHORTCUTS_KEY = 'itab_home_recent_shortcuts_v1'
const RECENT_SHORTCUTS_HISTORY_LIMIT = 12

export const DEFAULT_SETTINGS: UserSettings = {
  birthDate: '',
  city: '',
  wallpaper: '/wallpapers/default.jpg',
  wallpaperType: 'default',
  searchEngineId: 'custom-search',
  showRealWidgets: false,
  shortcuts: [],
  iconStyle: 'official',
  vertexAiDataStoreId: '',
}

export function hasStoredSettings(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null
  } catch {
    return false
  }
}

export function normalizeUrl(rawUrl?: string): string {
  if (!rawUrl) return ''
  try {
    let clean = rawUrl.trim()
    if (!/^https?:\/\//i.test(clean)) {
      clean = `https://${clean}`
    }
    const parsed = new URL(clean)
    const pathname = parsed.pathname.replace(/\/+$/, '')
    return `${parsed.protocol.toLowerCase()}//${parsed.host.toLowerCase()}${pathname}${parsed.search}`
  } catch {
    return rawUrl.trim().toLowerCase().replace(/\/+$/, '')
  }
}

export function deduplicateShortcuts(shortcuts: Shortcut[]): Shortcut[] {
  if (!Array.isArray(shortcuts)) return []

  const seenUrls = new Set<string>()
  const seenIds = new Set<string>()

  function processItem(item: Shortcut): Shortcut | null {
    if (!item || typeof item !== 'object') return null

    if (item.isFolder) {
      const processedChildren: Shortcut[] = []
      if (Array.isArray(item.children)) {
        for (const child of item.children) {
          const res = processItem(child)
          if (res) processedChildren.push(res)
        }
      }
      return { ...item, children: processedChildren }
    }

    if (item.isSpecial) {
      if (item.id && seenIds.has(item.id)) return null
      if (item.id) seenIds.add(item.id)
      return item
    }

    const normUrl = normalizeUrl(item.url)
    if (normUrl) {
      if (seenUrls.has(normUrl)) {
        return null
      }
      seenUrls.add(normUrl)
    }

    if (item.id) {
      if (seenIds.has(item.id)) {
        return null
      }
      seenIds.add(item.id)
    }

    return item
  }

  const result: Shortcut[] = []
  for (const s of shortcuts) {
    const processed = processItem(s)
    if (processed) {
      result.push(processed)
    }
  }

  return result
}

export function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw)
    // Sanitize any legacy reference to prototype screenshot
    if (parsed.wallpaper && parsed.wallpaper.includes('original_screenshot')) {
      parsed.wallpaper = '/wallpapers/default.jpg'
      parsed.wallpaperType = 'default'
    }

    // Migrate legacy identifier gen-search to custom-search
    if (parsed.searchEngineId === 'gen-search') {
      parsed.searchEngineId = 'custom-search'
    }

    // Migrate qwen URL if pointing to legacy tongyi.aliyun.com
    if (Array.isArray(parsed.shortcuts)) {
      parsed.shortcuts = parsed.shortcuts.map((item: any) => {
        if (item.id === 'qwen' && item.url?.includes('tongyi.aliyun.com')) {
          return { ...item, url: 'https://www.qianwen.com/' }
        }
        if (item.isFolder && Array.isArray(item.children)) {
          return {
            ...item,
            children: item.children.map((child: any) => {
              if (child.id === 'qwen' && child.url?.includes('tongyi.aliyun.com')) {
                return { ...child, url: 'https://www.qianwen.com/' }
              }
              return child
            }),
          }
        }
        return item
      })
      parsed.shortcuts = deduplicateShortcuts(parsed.shortcuts)
    }
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch (e) {
    console.error('Failed to load settings from localStorage', e)
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: UserSettings): void {
  try {
    const cleaned = {
      ...settings,
      shortcuts: deduplicateShortcuts(settings.shortcuts),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned))
  } catch (e) {
    console.error('Failed to save settings to localStorage', e)
  }
}

export function clearSettings(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.error('Failed to clear settings from localStorage', e)
  }
}

export function loadRecentShortcutIds(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_SHORTCUTS_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed
      .filter((id): id is string => typeof id === 'string' && id.length > 0)
      .slice(0, RECENT_SHORTCUTS_HISTORY_LIMIT)
  } catch (e) {
    console.error('Failed to load recent shortcuts from localStorage', e)
    return []
  }
}

export function saveRecentShortcutIds(ids: string[]): void {
  try {
    localStorage.setItem(
      RECENT_SHORTCUTS_KEY,
      JSON.stringify(ids.slice(0, RECENT_SHORTCUTS_HISTORY_LIMIT))
    )
  } catch (e) {
    console.error('Failed to save recent shortcuts to localStorage', e)
  }
}
