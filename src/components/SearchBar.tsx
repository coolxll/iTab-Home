import React, { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { SEARCH_ENGINES } from '../data/defaults'
import { VectorIcon } from './VectorIcon'
import { hasVectorIcon } from '../utils/vectorIcons'
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
    if (hasVectorIcon(engine.icon)) {
      return (
        <div className="w-[18px] h-[18px] rounded-[4px] overflow-hidden shrink-0">
          <VectorIcon name={engine.icon} variant="official" />
        </div>
      )
    }
    return <Search className="w-4 h-4 text-white" />
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
