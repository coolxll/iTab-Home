import React, { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { SEARCH_ENGINES } from '../data/defaults'
import type { SearchEngine } from '../types'

interface SearchBarProps {
  currentEngineId: string
  onSelectEngine: (id: string) => void
  onOpenCommandPalette?: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  currentEngineId,
  onSelectEngine,
  onOpenCommandPalette,
}) => {
  const [query, setQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isMac =
    typeof navigator !== 'undefined' &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

  const currentEngine = SEARCH_ENGINES.find((e) => e.id === currentEngineId) || SEARCH_ENGINES[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return
    const targetUrl = `${currentEngine.url}${encodeURIComponent(query.trim())}`
    window.open(targetUrl, '_blank')
  }

  const renderEngineIcon = (engine: SearchEngine) => {
    const iconClass = 'w-[18px] h-[18px]'
    switch (engine.id) {
      case 'bing':
        return (
          <svg className={iconClass} viewBox="0 0 234 343.41" aria-label="Bing">
            <defs>
              <linearGradient id="bing-a" x1="63.34" y1="51.02" x2="63.34" y2="330.78" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#37bdff" />
                <stop offset="1" stopColor="#2a7cef" />
              </linearGradient>
              <linearGradient id="bing-b" x1="170.47" y1="121.96" x2="170.47" y2="343.41" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#39d2ff" />
                <stop offset="1" stopColor="#2155ea" />
              </linearGradient>
            </defs>
            <path fill="url(#bing-a)" d="M0,51v230.06l89.09,49.72,37.58-16.58V82.43L89.09,51.02V0Z" />
            <path fill="url(#bing-b)" d="M126.67,121.96v115.76l-37.58,53.25L234,222.67l-60.42-35.24L126.67,164.2Z" opacity="0.85" />
          </svg>
        )
      case 'google':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" aria-label="Google">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        )
      case 'baidu':
        return (
          <svg className={iconClass} viewBox="0 0 1024 1024" aria-label="Baidu">
            <path fill="#2932E1" d="M352 549.8c-57.6 19.2-134.4 76.8-153.6 153.6-25.6 96 44.8 176 44.8 176s83.2 115.2 233.6 57.6c150.4-57.6 150.4-134.4 256-153.6 105.6-19.2 115.2-128 70.4-198.4-44.8-70.4-128-76.8-198.4-44.8-70.4 32-140.8 51.2-176 32-38.4-19.2-19.2-41.6-76.8-22.4z" />
            <path fill="#2932E1" d="M310.4 492.6c64-12.8 89.6-89.6 89.6-89.6s38.4-96-19.2-172.8c-57.6-83.2-147.2-57.6-147.2-57.6s-89.6 19.2-96 121.6c0 0-12.8 115.2 57.6 185.6 0 0 44.8 25.6 115.2 12.8z" />
            <path fill="#2932E1" d="M512 390.6c70.4 0 108.8-89.6 108.8-89.6s44.8-128-6.4-217.6c-44.8-83.2-121.6-83.2-121.6-83.2s-96 6.4-121.6 115.2c0 0-32 128 25.6 211.2 0 0 38.4 64 115.2 64z" />
            <path fill="#2932E1" d="M726.4 492.6c38.4 12.8 96 0 96 0s102.4-25.6 115.2-128c0 0 25.6-102.4-51.2-172.8-76.8-70.4-153.6-12.8-153.6-12.8s-83.2 44.8-76.8 147.2c0 0 0 128 70.4 166.4z" />
          </svg>
        )
      case 'bilibili':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" aria-label="Bilibili">
            <path
              fill="#FB7299"
              d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"
            />
          </svg>
        )
      case 'zhihu':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" aria-label="Zhihu">
            <path fill="#0066FF" d="M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078h5.36c.243 0 .462.137.569.355a.63.63 0 0 1-.04.66l-.762 1.137h2.29l.67-.927a.625.625 0 0 1 1.13.37v5.886a.625.625 0 0 1-.626.625h-2.12v1.078l1.963 1.402a.625.625 0 0 1-.363 1.133h-2.662a.625.625 0 0 1-.363-.117l-1.196-.854v3.29a.625.625 0 0 1-.625.626H9.004a.625.625 0 0 1-.613-.506l-.278-1.37H6.03a.625.625 0 0 1-.6-.447l-.358-1.204a.625.625 0 0 1 .6-.803h2.68l.142-.703H6.247a.625.625 0 0 1-.625-.625V7.98a.625.625 0 0 1 .625-.625h1.438z" />
          </svg>
        )
      case 'weibo':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" aria-label="Weibo">
            <path
              fill="#E6162D"
              d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.977.42-1.804 0-2.404-.781-1.112-2.915-1.053-5.364-.03 0 0-.766.331-.571-.271.376-1.217.315-2.224-.27-2.809-1.338-1.337-4.869.045-7.888 3.08C1.309 10.87 0 13.273 0 15.348c0 3.981 5.099 6.395 10.086 6.395 6.536 0 10.888-3.801 10.888-6.82 0-1.822-1.547-2.854-2.915-3.284v.01zm1.908-5.092c-.766-.856-1.908-1.187-2.96-.962-.436.09-.706.511-.616.932.09.42.511.691.932.602.511-.105 1.067.044 1.442.465.376.421.466.977.316 1.473-.136.406.089.856.51.992.405.119.857-.105.992-.512.33-1.021.12-2.178-.646-3.035l.03.045zm2.418-2.195c-1.576-1.757-3.905-2.419-6.054-1.968-.496.104-.812.587-.706 1.081.104.496.586.813 1.082.707 1.532-.331 3.185.15 4.296 1.383 1.112 1.246 1.429 2.943.947 4.416-.165.48.106 1.007.586 1.157.479.165.991-.104 1.157-.586.675-2.088.241-4.478-1.338-6.235l.03.045z"
            />
          </svg>
        )
      case 'github':
        return (
          <svg className={iconClass + ' fill-white'} viewBox="0 0 24 24" aria-label="GitHub">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        )
      default:
        return <Search className="w-4 h-4 text-white" />
    }
  }

  return (
    <div className="relative w-full max-w-xl mx-auto z-20">
      <form
        onSubmit={handleSearch}
        className="group relative flex items-center w-full h-11 px-3 bg-white/20 hover:bg-white/25 focus-within:bg-white/30 backdrop-blur-xl border border-white/30 hover:border-white/40 rounded-full shadow-lg transition-all duration-300"
      >
        {/* Engine selector button */}
        <div ref={dropdownRef} className="relative flex items-center">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 pl-1 pr-2 py-1 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
          >
            {renderEngineIcon(currentEngine)}
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Engine dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-12 left-0 w-36 bg-black/75 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl py-1 z-50 text-sm animate-in fade-in duration-200">
              {SEARCH_ENGINES.map((eng) => (
                <button
                  key={eng.id}
                  type="button"
                  onClick={() => {
                    onSelectEngine(eng.id)
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 text-left transition-colors ${
                    eng.id === currentEngine.id
                      ? 'bg-white/20 text-white font-medium'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="w-5 flex justify-center">{renderEngineIcon(eng)}</div>
                  <span>{eng.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={currentEngine.placeholder}
          className="flex-1 bg-transparent px-2.5 text-white placeholder-white/70 text-sm focus:outline-none"
        />

        {/* Raycast Quick Launch Hint / Button */}
        {onOpenCommandPalette && (
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 mr-1 text-[11px] font-mono text-white/50 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-md transition-all active:scale-95 cursor-pointer"
            title={`快捷启动图标 (${isMac ? '⌘J' : 'Ctrl+J'})`}
          >
            <span>{isMac ? '⌘J' : 'Ctrl J'}</span>
          </button>
        )}

        {/* Search icon button */}
        <button
          type="submit"
          className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all active:scale-95"
          title="搜索"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
