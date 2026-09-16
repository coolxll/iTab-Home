import type { UserSettings } from '../types'

const STORAGE_KEY = 'itab_home_settings_v11'
const RECENT_SHORTCUTS_KEY = 'itab_home_recent_shortcuts_v1'
const RECENT_SHORTCUTS_HISTORY_LIMIT = 12

export const DEFAULT_SETTINGS: UserSettings = {
  birthDate: '',
  city: '',
  wallpaper: '/wallpapers/default.jpg',
  wallpaperType: 'default',
  searchEngineId: 'bing',
  showRealWidgets: false,
  shortcuts: [],
  iconStyle: 'official',
}

export function hasStoredSettings(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null
  } catch {
    return false
  }
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
    }
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch (e) {
    console.error('Failed to load settings from localStorage', e)
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
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
