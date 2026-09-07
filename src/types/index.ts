export interface Shortcut {
  id: string
  title: string
  url: string
  icon?: string
  bgColor?: string
  textColor?: string
  isSpecial?: boolean // For settings, add button, etc.
}

export interface SearchEngine {
  id: string
  name: string
  icon: string
  url: string
  placeholder: string
}

export interface HotSearchItem {
  rank: number
  title: string
  heat: string
  url: string
  tag?: string
}

export interface WeatherForecast {
  day: string
  tempRange: string
  icon: string
  condition: string
}

export interface StockItem {
  name: string
  code: string
  price: string
  changePercent: string
  isUp: boolean
}

export interface HolidayItem {
  name: string
  dateRange: string
  daysRemaining: number
}

export interface UserSettings {
  birthDate: string // YYYY-MM-DD
  offWorkTime: string // HH:mm
  workStartTime: string // HH:mm
  monthlySalary: number
  workDaysPerMonth: number
  city: string
  wallpaper: string
  wallpaperType: 'default' | 'original' | 'bing' | 'custom'
  searchEngineId: string
  shortcutsTop: Shortcut[]
  shortcutsDock1: Shortcut[]
  shortcutsDock2: Shortcut[]
}
