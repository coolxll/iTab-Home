import type { UserSettings } from '../types'

const STORAGE_KEY = 'itab_home_settings_v11'

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
