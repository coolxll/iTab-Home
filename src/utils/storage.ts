import type { UserSettings, Shortcut } from '../types'

const STORAGE_KEY = 'itab_home_settings_v11'
const RECENT_SHORTCUTS_KEY = 'itab_home_recent_shortcuts_v1'
const RECENT_SHORTCUTS_HISTORY_LIMIT = 12
const DINGTALK_CHECKIN_MIGRATION_KEY = 'itab_home_migration_dingtalk_checkin_v1'

const DINGTALK_CHECKIN_SHORTCUT: Shortcut = {
  id: 'dingtalk-checkin',
  title: '我的打卡',
  url: 'dingtalk://dingtalkclient/page/link?url=http%3A%2F%2Fdffl-hr.dongfangfuli.com%2FKYDD%2FDingDing%2FOAuthCorp.ashx%3FAppKey%3D6%26ssoUrl%3DIndex.html%2523%252Fjump%253Fpath%253D1.6559.1392%2526sid%253D5A6E0A7E19FFE5C76C2DC0ECC490890F%2526title%253D%2525E6%252588%252591%2525E7%25259A%252584%2525E6%252589%252593%2525E5%25258D%2525A1&pc_slide=true',
  icon: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https%3A%2F%2Fwww.dingtalk.com&size=128',
  bgColor: 'bg-blue-500',
  iconStyle: 'auto',
}

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
    if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(clean)) {
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

    const settings = { ...DEFAULT_SETTINGS, ...parsed }

    if (!localStorage.getItem(DINGTALK_CHECKIN_MIGRATION_KEY)) {
      if (!Array.isArray(settings.shortcuts)) {
        settings.shortcuts = []
      }

      if (!settings.shortcuts.some((item: Shortcut) => item.id === DINGTALK_CHECKIN_SHORTCUT.id)) {
        const specialIndex = settings.shortcuts.findIndex((item: Shortcut) => item.isSpecial)
        if (specialIndex >= 0) {
          settings.shortcuts.splice(specialIndex, 0, DINGTALK_CHECKIN_SHORTCUT)
        } else {
          settings.shortcuts.push(DINGTALK_CHECKIN_SHORTCUT)
        }
      }

      settings.shortcuts = deduplicateShortcuts(settings.shortcuts)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
      localStorage.setItem(DINGTALK_CHECKIN_MIGRATION_KEY, '1')
    }

    return settings
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
