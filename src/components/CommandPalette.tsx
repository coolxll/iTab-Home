import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  Search,
  CornerDownLeft,
  Globe,
  Folder,
  X,
  Settings,
  Lightbulb,
  Plus,
  Clock,
  ExternalLink,
} from 'lucide-react'
import type { Shortcut } from '../types'
import { SEARCH_ENGINES } from '../data/defaults'
import { VectorIcon } from './VectorIcon'
import { hasVectorIcon, inferVectorIcon } from '../utils/vectorIcons'
import { FaviconPreview } from './FaviconPreview'
import { isIconUrl } from '../utils/favicon'

interface PaletteItem {
  id: string
  title: string
  url?: string
  icon?: string
  bgColor?: string
  textColor?: string
  isSpecial?: boolean
  isFolder?: boolean
  folderTitle?: string
  iconStyle?: 'auto' | 'official' | 'optimized'
  shortcut: Shortcut
  type: 'recent' | 'shortcut' | 'folder' | 'action'
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  shortcuts: Shortcut[]
  recentShortcutIds: string[]
  globalIconStyle?: 'official' | 'optimized'
  currentEngineId: string
  onOpenShortcut: (shortcut: Shortcut) => void
  onOpenFolder: (folder: Shortcut) => void
  onOpenSpecial: (id: string) => void
}

/**
 * Compact Icon component for Raycast search rows.
 */
const PaletteIcon: React.FC<{
  shortcut: Shortcut
  globalIconStyle?: 'official' | 'optimized'
}> = ({ shortcut, globalIconStyle = 'official' }) => {
  const effectiveVariant =
    shortcut.iconStyle && shortcut.iconStyle !== 'auto' ? shortcut.iconStyle : globalIconStyle
  const effectiveIcon = shortcut.icon || inferVectorIcon(shortcut.title, shortcut.url)
  const pinnedIconUrl = isIconUrl(shortcut.icon) ? shortcut.icon : null
  const [pinnedFailed, setPinnedFailed] = useState(false)

  if (shortcut.isFolder) {
    return (
      <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
        <Folder className="w-4 h-4" />
      </div>
    )
  }

  if (shortcut.isSpecial) {
    if (shortcut.id === 'settings') {
      return (
        <div className="w-7 h-7 rounded-lg bg-zinc-700 flex items-center justify-center text-white shrink-0">
          <Settings className="w-4 h-4" />
        </div>
      )
    }
    if (shortcut.id === 'guide') {
      return (
        <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0">
          <Lightbulb className="w-4 h-4" />
        </div>
      )
    }
    if (shortcut.id === 'add-shortcut') {
      return (
        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white shrink-0">
          <Plus className="w-4 h-4" />
        </div>
      )
    }
    if (shortcut.icon) {
      return (
        <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
          <VectorIcon name={shortcut.icon} variant={effectiveVariant} />
        </div>
      )
    }
  }

  if (shortcut.icon && hasVectorIcon(shortcut.icon)) {
    return (
      <div className="w-7 h-7 rounded-lg overflow-hidden relative flex items-center justify-center shrink-0 shadow-sm">
        <div
          className="absolute top-0 left-0 w-12 h-12 pointer-events-none select-none"
          style={{
            transform: 'scale(0.5833333)', // 28 / 48
            transformOrigin: 'top left',
          }}
        >
          <VectorIcon name={shortcut.icon} variant={effectiveVariant} />
        </div>
      </div>
    )
  }

  if (pinnedIconUrl && !pinnedFailed) {
    return (
      <div className="w-7 h-7 rounded-lg overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-sm">
        <img
          src={pinnedIconUrl}
          alt={shortcut.title}
          onError={() => setPinnedFailed(true)}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  if (effectiveIcon && hasVectorIcon(effectiveIcon)) {
    return (
      <div className="w-7 h-7 rounded-lg overflow-hidden relative flex items-center justify-center shrink-0 shadow-sm">
        <div
          className="absolute top-0 left-0 w-12 h-12 pointer-events-none select-none"
          style={{
            transform: 'scale(0.5833333)', // 28 / 48
            transformOrigin: 'top left',
          }}
        >
          <VectorIcon name={effectiveIcon} variant={effectiveVariant} />
        </div>
      </div>
    )
  }

  return (
    <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 shadow-sm">
      <FaviconPreview url={shortcut.url} title={shortcut.title} bgColor={shortcut.bgColor} />
    </div>
  )
}

/** Pinyin / English aliases for high-frequency Chinese services */
const ALIAS_MAP: Record<string, string[]> = {
  哔哩哔哩: ['bilibili', 'bili', 'bzhan', 'b站', 'danmu'],
  知乎: ['zhihu', 'zh', 'wenda'],
  微博: ['weibo', 'wb', 'webo'],
  抖音: ['douyin', 'dy', 'tiktok'],
  小红书: ['xiaohongshu', 'xhs', 'red'],
  网易云音乐: ['netease', 'music', 'yinyue', '163'],
  微信读书: ['weread', 'wechat', 'wx', 'du'],
  腾讯元宝: ['yuanbao', 'tencent', 'yb'],
  通义千问: ['qwen', 'qianwen', 'tongyi', 'ali', 'aliyun'],
  百度: ['baidu', 'bd'],
  淘宝: ['taobao', 'tb'],
  京东: ['jd', 'jingdong'],
  设置: ['settings', 'config', 'shezhi'],
  使用指南: ['guide', 'help', 'bangzhu'],
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  shortcuts,
  recentShortcutIds,
  globalIconStyle = 'official',
  currentEngineId,
  onOpenShortcut,
  onOpenFolder,
  onOpenSpecial,
}) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const currentEngine =
    SEARCH_ENGINES.find((e) => e.id === currentEngineId) || SEARCH_ENGINES[0]

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  // Flatten all searchable shortcuts (root items + folder contents)
  const allFlattenedItems = useMemo<PaletteItem[]>(() => {
    const list: PaletteItem[] = []

    shortcuts.forEach((item) => {
      if (item.isFolder) {
        // Add folder itself as a searchable item
        list.push({
          id: item.id,
          title: item.title,
          isFolder: true,
          shortcut: item,
          type: 'folder',
        })

        // Add children inside the folder
        if (item.children) {
          item.children.forEach((child) => {
            list.push({
              id: child.id,
              title: child.title,
              url: child.url,
              icon: child.icon,
              bgColor: child.bgColor,
              textColor: child.textColor,
              isSpecial: child.isSpecial,
              folderTitle: item.title,
              iconStyle: child.iconStyle,
              shortcut: child,
              type: 'shortcut',
            })
          })
        }
      } else {
        list.push({
          id: item.id,
          title: item.title,
          url: item.url,
          icon: item.icon,
          bgColor: item.bgColor,
          textColor: item.textColor,
          isSpecial: item.isSpecial,
          iconStyle: item.iconStyle,
          shortcut: item,
          type: 'shortcut',
        })
      }
    })

    return list
  }, [shortcuts])

  // Map for fast lookup by ID
  const itemMap = useMemo(() => {
    const map = new Map<string, PaletteItem>()
    allFlattenedItems.forEach((item) => {
      map.set(item.id, item)
    })
    return map
  }, [allFlattenedItems])

  // Filter and rank items based on search query
  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase()

    if (!trimmed) {
      // 1. If empty, prioritize recent shortcuts, followed by all shortcuts
      const recents: PaletteItem[] = []
      const recentIdSet = new Set<string>()

      recentShortcutIds.forEach((id) => {
        const item = itemMap.get(id)
        if (item && !item.isFolder) {
          recents.push({ ...item, type: 'recent' })
          recentIdSet.add(id)
        }
      })

      // Other non-recent shortcuts (exclude recents to avoid duplicates)
      const others = allFlattenedItems.filter((it) => !recentIdSet.has(it.id))

      return {
        recents: recents.slice(0, 5),
        shortcuts: others,
        isSearching: false,
        total: recents.slice(0, 5).length + others.length,
      }
    }

    // 2. Score matches
    const matches: { item: PaletteItem; score: number }[] = []

    for (const item of allFlattenedItems) {
      const titleLower = item.title.toLowerCase()
      const idLower = item.id.toLowerCase()
      const urlLower = (item.url || '').toLowerCase()
      const folderLower = (item.folderTitle || '').toLowerCase()
      const aliases = ALIAS_MAP[item.title] || []

      let score = 0

      if (titleLower === trimmed) {
        score = 100
      } else if (titleLower.startsWith(trimmed)) {
        score = 80
      } else if (titleLower.includes(trimmed)) {
        score = 60
      } else if (idLower === trimmed || idLower.startsWith(trimmed)) {
        score = 50
      } else if (idLower.includes(trimmed)) {
        score = 40
      } else if (aliases.some((a) => a === trimmed || a.startsWith(trimmed))) {
        score = 55
      } else if (aliases.some((a) => a.includes(trimmed))) {
        score = 45
      } else if (urlLower.includes(trimmed)) {
        score = 35
      } else if (folderLower.includes(trimmed)) {
        score = 25
      }

      if (score > 0) {
        matches.push({ item, score })
      }
    }

    matches.sort((a, b) => b.score - a.score)

    return {
      recents: [],
      shortcuts: matches.map((m) => m.item),
      isSearching: true,
      total: matches.length,
    }
  }, [query, allFlattenedItems, recentShortcutIds, itemMap])

  // Flat list of all selectable items (including search engine action)
  const selectableItems = useMemo(() => {
    const list: (PaletteItem | { type: 'web-search'; query: string } | { type: 'direct-url'; url: string })[] = []

    if (searchResults.recents.length > 0) {
      list.push(...searchResults.recents)
    }

    list.push(...searchResults.shortcuts)

    const trimmed = query.trim()
    if (trimmed) {
      // Check if it looks like a direct URL
      const isUrl =
        /^https?:\/\//i.test(trimmed) ||
        (!trimmed.includes(' ') &&
          /\.(com|cn|net|org|io|me|dev|app|ai|cc|xyz|top|tv)(\/.*)?$/i.test(trimmed))

      if (isUrl) {
        const fullUrl = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
        list.push({ type: 'direct-url', url: fullUrl })
      }

      // Always offer web search fallback
      list.push({ type: 'web-search', query: trimmed })
    }

    return list
  }, [searchResults, query])

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return
    const activeEl = listRef.current.querySelector<HTMLElement>('[data-active="true"]')
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  // Action executor
  const executeItem = (item: (typeof selectableItems)[number]) => {
    if ('type' in item && item.type === 'web-search') {
      const searchUrl = `${currentEngine.url}${encodeURIComponent(item.query)}`
      window.open(searchUrl, '_blank', 'noopener,noreferrer')
      onClose()
      return
    }

    if ('type' in item && item.type === 'direct-url') {
      window.open(item.url, '_blank', 'noopener,noreferrer')
      onClose()
      return
    }

    const paletteItem = item as PaletteItem
    if (paletteItem.isFolder) {
      onOpenFolder(paletteItem.shortcut)
      onClose()
      return
    }

    if (paletteItem.isSpecial) {
      onOpenSpecial(paletteItem.id)
      onClose()
      return
    }

    if (paletteItem.shortcut.url) {
      onOpenShortcut(paletteItem.shortcut)
      onClose()
      return
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
      return
    }

    if (e.key === 'ArrowDown' || (e.ctrlKey && e.key === 'n')) {
      e.preventDefault()
      if (selectableItems.length === 0) return
      setSelectedIndex((prev) => (prev + 1) % selectableItems.length)
      return
    }

    if (e.key === 'ArrowUp' || (e.ctrlKey && e.key === 'p')) {
      e.preventDefault()
      if (selectableItems.length === 0) return
      setSelectedIndex((prev) => (prev - 1 + selectableItems.length) % selectableItems.length)
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      const current = selectableItems[selectedIndex]
      if (current) {
        executeItem(current)
      }
      return
    }
  }

  if (!isOpen) return null

  // Helpers to format URL hostnames
  const formatHostname = (url?: string) => {
    if (!url) return ''
    try {
      const u = new URL(url)
      return u.hostname.replace(/^www\./, '')
    } catch {
      return url
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#1e1e24]/90 border border-white/15 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] text-white backdrop-blur-3xl overflow-hidden flex flex-col transition-all duration-200"
      >
        {/* Top search input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-white/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="搜索应用、快捷方式、网址或按 Enter 搜索..."
            className="flex-1 bg-transparent text-base text-white placeholder-white/40 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery('')
                setSelectedIndex(0)
                inputRef.current?.focus()
              }}
              className="p-1 rounded-md text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-white/40 bg-white/5 border border-white/10 rounded">
              esc
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 space-y-0.5 select-none scrollbar-thin scrollbar-thumb-white/10"
        >
          {selectableItems.length === 0 ? (
            <div className="py-12 text-center text-white/40 text-sm">未找到相关图标或快捷方式</div>
          ) : (
            <>
              {/* If empty query: render Recent group first */}
              {!searchResults.isSearching && searchResults.recents.length > 0 && (
                <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>最近使用</span>
                </div>
              )}

              {selectableItems.map((item, index) => {
                const isSelected = index === selectedIndex

                // Web search action
                if ('type' in item && item.type === 'web-search') {
                  return (
                    <div
                      key="action-web-search"
                      data-active={isSelected}
                      onClick={() => executeItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-600/30 text-white shadow-sm ring-1 ring-blue-400/40'
                          : 'text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {hasVectorIcon(currentEngine.icon) ? (
                          <div className="w-7 h-7 rounded-lg overflow-hidden relative flex items-center justify-center shrink-0 shadow-sm">
                            <div
                              className="absolute top-0 left-0 w-12 h-12 pointer-events-none select-none"
                              style={{
                                transform: 'scale(0.5833333)',
                                transformOrigin: 'top left',
                              }}
                            >
                              <VectorIcon name={currentEngine.icon} variant={globalIconStyle} />
                            </div>
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                            <Globe className="w-4 h-4" />
                          </div>
                        )}
                        <div className="truncate">
                          <span className="text-sm font-medium">在 {currentEngine.name} 中搜索 </span>
                          <span className="text-sm text-blue-400 font-medium">“{item.query}”</span>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-white/20 text-white">
                          <span>搜索</span>
                          <CornerDownLeft className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  )
                }

                // Direct URL action
                if ('type' in item && item.type === 'direct-url') {
                  return (
                    <div
                      key="action-direct-url"
                      data-active={isSelected}
                      onClick={() => executeItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-600/30 text-white shadow-sm ring-1 ring-emerald-400/40'
                          : 'text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <span className="text-sm font-medium">直接访问网址 </span>
                          <span className="text-sm text-emerald-400 font-mono">{item.url}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-white/20 text-white">
                          <span>打开</span>
                          <CornerDownLeft className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  )
                }

                // Normal Palette item
                const paletteItem = item as PaletteItem
                const isFirstOfAllShortcuts =
                  !searchResults.isSearching &&
                  index === searchResults.recents.length &&
                  searchResults.shortcuts.length > 0

                return (
                  <React.Fragment key={paletteItem.id}>
                    {isFirstOfAllShortcuts && (
                      <div className="px-3 pt-3 pb-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                        所有应用与快捷方式
                      </div>
                    )}
                    <div
                      data-active={isSelected}
                      onClick={() => executeItem(paletteItem)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all duration-75 ${
                        isSelected
                          ? 'bg-white/15 text-white shadow-sm ring-1 ring-white/20'
                          : 'text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <PaletteIcon
                          shortcut={paletteItem.shortcut}
                          globalIconStyle={globalIconStyle}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium truncate text-white">
                              {paletteItem.title}
                            </span>
                            {paletteItem.folderTitle && (
                              <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/10 text-white/60 shrink-0">
                                {paletteItem.folderTitle}
                              </span>
                            )}
                            {paletteItem.isFolder && (
                              <span className="text-[11px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 shrink-0">
                                文件夹
                              </span>
                            )}
                          </div>
                          {paletteItem.url && (
                            <p className="text-xs text-white/40 truncate font-mono mt-0.5">
                              {formatHostname(paletteItem.url)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right action indicator */}
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        {isSelected ? (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-white/20 text-white shadow-sm">
                            <span>{paletteItem.isFolder ? '展开' : '打开'}</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </span>
                        ) : (
                          paletteItem.url && (
                            <span className="text-xs text-white/30 font-mono hidden sm:inline">
                              {formatHostname(paletteItem.url)}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
            </>
          )}
        </div>

        {/* Footer info & shortcut hints */}
        <div className="px-4 py-2 bg-white/[0.03] border-t border-white/10 flex items-center justify-between text-xs text-white/40 select-none">
          <div className="flex items-center gap-2">
            <span>找到 {searchResults.total} 个项目</span>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px]">
                ↑↓
              </kbd>
              <span>导航</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px]">
                ↵
              </kbd>
              <span>启动</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px]">
                esc
              </kbd>
              <span>关闭</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
