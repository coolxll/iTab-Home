import type { UserSettings } from '../types'
import { DEFAULT_DESKTOP_SHORTCUTS } from '../data/defaults'

const STORAGE_KEY = 'itab_home_settings_v5'

export const DEFAULT_SETTINGS: UserSettings = {
  birthDate: '1988-03-04',
  city: '浦东新区',
  wallpaper: '/wallpapers/default.jpg',
  wallpaperType: 'default',
  searchEngineId: 'bing',
  showRealWidgets: false,
  shortcuts: DEFAULT_DESKTOP_SHORTCUTS,
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
