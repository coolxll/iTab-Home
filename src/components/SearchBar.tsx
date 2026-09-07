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
              d="M17.813 4.653h.854c1.51 0 2.733 1.224 2.733 2.734v9.88c0 1.51-1.224 2.734-2.733 2.734H5.333c-1.51 0-2.733-1.224-2.733-2.734V7.387c0-1.51 1.223-2.734 2.733-2.734h.854l-1.84-1.84a.8.8 0 1 1 1.132-1.132L8.2 4.407h7.6l2.722-2.726a.8.8 0 1 1 1.132 1.132l-1.841 1.84zM7.6 9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm8.8 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"
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
              d="M10.07 20.93c-4.49.52-8.41-1.63-8.77-4.8-.36-3.17 3.02-6.17 7.51-6.69 4.49-.52 8.41 1.63 8.77 4.8.36 3.17-3.02 6.17-7.51 6.69zm-1.07-2.31c.36.08.76-.08.89-.37.13-.29-.03-.6-.39-.68-.36-.08-.75.08-.88.37-.13.3.02.6.38.68zm1.96-1.39c-.14.03-.28.12-.34.25-.13.3.02.6.38.68.36.08.76-.08.89-.37.13-.3-.02-.6-.38-.68-.18-.04-.37-.01-.55.12zm1.8-4.22c-1.87-.22-3.8.44-4.83 1.76-1.06 1.36-.88 3.13.43 4.23 1.48 1.25 3.73 1.15 5.38.07 1.83-1.2 2.37-3.23 1.48-4.71-.62-1.04-1.84-1.65-3.08-1.79l.62.44zm8.6-4.63c-.88-.47-1.94-.3-2.58.37-.41.43-.49 1.05-.23 1.57.51 1.03.35 2.27-.41 3.12-.76.85-1.96 1.08-3.01.58-.52-.25-1.14-.14-1.54.29-.4.43-.44 1.06-.11 1.54.99 1.45 2.8 2.05 4.54 1.49 1.74-.56 2.95-2.07 3.04-3.89.07-1.82-.93-3.51-2.5-4.27l-.2-.8z"
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
