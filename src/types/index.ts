export interface Shortcut {
  id: string
  title: string
  url?: string
  icon?: string
  bgColor?: string
  textColor?: string
  isSpecial?: boolean
  isFolder?: boolean
  children?: Shortcut[] // Shortcuts inside folder
}

export interface SearchEngine {
  id: string
  name: string
  icon: string
  url: string
  placeholder: string
}

export interface UserSettings {
  birthDate: string // YYYY-MM-DD
  city: string
  wallpaper: string
  wallpaperType: 'default' | 'nature' | 'space' | 'bing' | 'custom'
  searchEngineId: string
  showRealWidgets: boolean // Toggle Calendar & Anniversary widgets
  shortcuts: Shortcut[] // Unified desktop shortcuts & folders
}
