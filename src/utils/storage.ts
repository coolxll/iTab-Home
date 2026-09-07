import type { UserSettings } from '../types'
import {
  DEFAULT_SHORTCUTS_TOP,
  DEFAULT_SHORTCUTS_DOCK1,
  DEFAULT_SHORTCUTS_DOCK2,
} from '../data/defaults'

const STORAGE_KEY = 'itab_home_settings_v2'

export const DEFAULT_SETTINGS: UserSettings = {
  birthDate: '1988-03-04',
  offWorkTime: '18:00',
  workStartTime: '09:00',
  monthlySalary: 20000,
  workDaysPerMonth: 21.75,
  city: '浦东新区',
  wallpaper: '/wallpapers/default.jpg',
  wallpaperType: 'default',
  searchEngineId: 'bing',
  shortcutsTop: DEFAULT_SHORTCUTS_TOP,
  shortcutsDock1: DEFAULT_SHORTCUTS_DOCK1,
  shortcutsDock2: DEFAULT_SHORTCUTS_DOCK2,
}

export function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw)
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
