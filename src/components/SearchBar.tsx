import React, { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { SEARCH_ENGINES } from '../data/defaults'
import type { SearchEngine } from '../types'

interface SearchBarProps {
  currentEngineId: string
  onSelectEngine: (id: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ currentEngineId, onSelectEngine }) => {
  const [query, setQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
    switch (engine.id) {
      case 'bing':
        return (
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
            <path
              fill="#0078D4"
              d="M4.5 2C3.67 2 3 2.67 3 3.5v17c0 .83.67 1.5 1.5 1.5h1.2c.67 0 1.25-.44 1.44-1.08L14.2 5.68c.24-.54.04-1.18-.46-1.48L7.04 2.15C6.56 1.95 5.02 2 4.5 2z"
            />
            <path
              fill="#24D0F8"
              d="M13.67 9.87l-4.5 9.38c-.22.46-.07 1.01.35 1.29l5.08 3.39c.47.31 1.1.2 1.43-.25l4.63-6.27c.56-.76.02-1.85-.92-1.85h-6.07z"
            />
          </svg>
        )
      case 'google':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
        )
      case 'baidu':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <ellipse cx="6.5" cy="8" rx="2" ry="2.8" fill="#DE0F17" transform="rotate(-25 6.5 8)" />
            <ellipse cx="10.2" cy="4.5" rx="2.1" ry="3" fill="#DE0F17" transform="rotate(-8 10.2 4.5)" />
            <ellipse cx="14.8" cy="4.8" rx="2.1" ry="3" fill="#DE0F17" transform="rotate(10 14.8 4.8)" />
            <ellipse cx="18.5" cy="8.5" rx="2" ry="2.8" fill="#DE0F17" transform="rotate(28 18.5 8.5)" />
            <path
              fill="#2932E1"
              d="M12.5 8.8c-3.8 0-6.8 2.8-6.8 6.4 0 2.8 2 5.1 4.8 5.7.6.1 1.3.1 2 .1 2.8 0 5.4-1.5 6.4-3.8.4-.9.6-1.9.6-2.9 0-3.1-3.1-5.5-7-5.5zm-1.8 8.8c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm3.6 0c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4z"
            />
          </svg>
        )
      case 'bilibili':
        return (
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
            <path
              fill="#FB7299"
              d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"
            />
          </svg>
        )
      case 'zhihu':
        return (
          <div className="w-4 h-4 rounded-full bg-[#0066FF] flex items-center justify-center text-white font-serif font-black text-[10px] select-none leading-none">
            知
          </div>
        )
      case 'weibo':
        return (
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
            <path
              fill="#E6162D"
              d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.977.42-1.804 0-2.404-.781-1.112-2.915-1.053-5.364-.03 0 0-.766.331-.571-.271.376-1.217.315-2.224-.27-2.809-1.338-1.337-4.869.045-7.888 3.08C1.309 10.87 0 13.273 0 15.348c0 3.981 5.099 6.395 10.086 6.395 6.536 0 10.888-3.801 10.888-6.82 0-1.822-1.547-2.854-2.915-3.284v.01zm1.908-5.092c-.766-.856-1.908-1.187-2.96-.962-.436.09-.706.511-.616.932.09.42.511.691.932.602.511-.105 1.067.044 1.442.465.376.421.466.977.316 1.473-.136.406.089.856.51.992.405.119.857-.105.992-.512.33-1.021.12-2.178-.646-3.035l.03.045zm2.418-2.195c-1.576-1.757-3.905-2.419-6.054-1.968-.496.104-.812.587-.706 1.081.104.496.586.813 1.082.707 1.532-.331 3.185.15 4.296 1.383 1.112 1.246 1.429 2.943.947 4.416-.165.48.106 1.007.586 1.157.479.165.991-.104 1.157-.586.675-2.088.241-4.478-1.338-6.235l.03.045z"
            />
          </svg>
        )
      case 'github':
        return (
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
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
