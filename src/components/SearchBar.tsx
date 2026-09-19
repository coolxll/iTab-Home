import React, { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, Sparkles } from 'lucide-react'
import { SEARCH_ENGINES } from '../data/defaults'
import { VectorIcon } from './VectorIcon'
import { hasVectorIcon } from '../utils/vectorIcons'
import { FaviconPreview } from './FaviconPreview'
import type { SearchEngine } from '../types'

interface SearchBarProps {
  currentEngineId: string
  onSelectEngine: (id: string) => void
  onOpenCommandPalette?: () => void
  globalIconStyle?: 'official' | 'optimized'
}

export const SearchBar: React.FC<SearchBarProps> = ({
  currentEngineId,
  onSelectEngine,
  onOpenCommandPalette,
  globalIconStyle = 'official',
}) => {
  const [query, setQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isMac =
    typeof navigator !== 'undefined' &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

  const currentEngine =
    SEARCH_ENGINES.find((e) => e.id === currentEngineId || (e.id === 'custom-search' && currentEngineId === 'gen-search')) ||
    SEARCH_ENGINES[0]

  const isCustomSearch = currentEngine.id === 'custom-search' || currentEngine.id === 'gen-search'

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
    if (isCustomSearch) {
      const trigger = document.getElementById('searchWidgetTrigger')
      if (trigger) {
        trigger.click()
      }
      return
    }
    if (!query.trim()) return
    const targetUrl = `${currentEngine.url}${encodeURIComponent(query.trim())}`
    window.open(targetUrl, '_blank')
  }

  const renderEngineIcon = (engine: SearchEngine) => {
    // 1. If the engine matches a known VectorIcon (Bing, Google, Baidu, Bilibili, GitHub, Zhihu, Weibo),
    // render with proportional 48px squircle downscaled to 20x20px with matching rounding,
    // identical to the desktop icons below.
    if (hasVectorIcon(engine.icon)) {
      return (
        <div className="w-5 h-5 rounded-[5px] overflow-hidden relative shrink-0 shadow-xs flex items-center justify-center">
          <div
            className="absolute top-0 left-0 w-12 h-12 pointer-events-none select-none"
            style={{
              transform: 'scale(0.4166667)', // 20 / 48
              transformOrigin: 'top left',
            }}
          >
            <VectorIcon name={engine.icon} variant={globalIconStyle} />
          </div>
        </div>
      )
    }

    // 2. Fallback to FaviconPreview if URL is available
    if (engine.url) {
      return (
        <div className="w-5 h-5 rounded-[5px] overflow-hidden relative shrink-0 shadow-xs">
          <FaviconPreview url={engine.url} title={engine.name} />
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
            className="flex items-center space-x-1 pl-1 pr-2 py-1 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {renderEngineIcon(currentEngine)}
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Engine dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-12 left-0 w-40 bg-black/75 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl py-1 z-50 text-sm animate-in fade-in duration-200">
              {SEARCH_ENGINES.map((eng) => {
                const isCustom = eng.id === 'custom-search' || eng.id === 'gen-search'
                const isSelected = eng.id === currentEngine.id || (isCustom && isCustomSearch)

                return (
                  <button
                    key={eng.id}
                    type="button"
                    onClick={() => {
                      onSelectEngine(eng.id)
                      setIsDropdownOpen(false)
                      if (isCustom) {
                        setTimeout(() => {
                          document.getElementById('searchWidgetTrigger')?.click()
                        }, 50)
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors ${
                      isSelected
                        ? 'bg-white/20 text-white font-medium'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-5 flex justify-center">{renderEngineIcon(eng)}</div>
                      <span>{eng.name}</span>
                    </div>
                    {isCustom && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/20 font-medium">
                        AI
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Search input field */}
        <input
          id={isCustomSearch ? 'searchWidgetTrigger' : undefined}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={() => {
            if (isCustomSearch) {
              document.getElementById('searchWidgetTrigger')?.click()
            }
          }}
          onFocus={() => {
            if (isCustomSearch) {
              document.getElementById('searchWidgetTrigger')?.click()
            }
          }}
          placeholder={currentEngine.placeholder}
          className="flex-1 bg-transparent px-2.5 text-white placeholder-white/70 text-sm focus:outline-none"
        />

        {/* Fallback persistent trigger element when custom search is not currently active */}
        {!isCustomSearch && (
          <button
            id="searchWidgetTrigger"
            type="button"
            className="sr-only pointer-events-none"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}

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
          className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer"
          title={isCustomSearch ? '启动自定义搜索' : '搜索'}
        >
          {isCustomSearch ? (
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  )
}
