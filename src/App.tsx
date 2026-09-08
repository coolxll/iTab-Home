import React, { useEffect, useState } from 'react'
import { HeaderClock } from './components/HeaderClock'
import { SearchBar } from './components/SearchBar'
import { CalendarCard } from './components/CalendarCard'
import { AnniversaryCard } from './components/AnniversaryCard'
import { IconItem } from './components/IconItem'
import { IndicesCard } from './components/IndicesCard'
import { HotListsCard } from './components/HotListsCard'
import { FooterMotto } from './components/FooterMotto'
import { SettingsModal } from './components/SettingsModal'
import { AddShortcutModal } from './components/AddShortcutModal'
import { EditShortcutModal } from './components/EditShortcutModal'
import { FolderModal } from './components/FolderModal'
import { ContextMenu } from './components/ContextMenu'
import { GuideModal } from './components/GuideModal'
import {
  hasStoredSettings,
  loadRecentShortcutIds,
  loadSettings,
  saveRecentShortcutIds,
  saveSettings,
} from './utils/storage'
import { SlidersHorizontal, Check, Plus, History } from 'lucide-react'
import type { Shortcut, UserSettings } from './types'

export const App: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(loadSettings())
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [startupError, setStartupError] = useState<string | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addFolderTargetId, setAddFolderTargetId] = useState<string | null>(null)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [recentShortcutIds, setRecentShortcutIds] = useState<string[]>(loadRecentShortcutIds)

  // Edit / Management states
  const [isEditMode, setIsEditMode] = useState(false)
  const [activeFolder, setActiveFolder] = useState<Shortcut | null>(null)
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null)
  const [draggedItem, setDraggedItem] = useState<Shortcut | null>(null)
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    shortcut: Shortcut
    isInFolder?: boolean
    folderId?: string
  } | null>(null)

  useEffect(() => {
    let cancelled = false

    const initialize = async () => {
      const hasLocalSnapshot = hasStoredSettings()

      try {
        const sessionResponse = await fetch('/api/session', {
          credentials: 'same-origin',
          cache: 'no-store',
        })

        if (sessionResponse.status === 401) {
          window.location.replace('/api/auth/login')
          return
        }

        if (!sessionResponse.ok) {
          throw new Error(`Session check failed (${sessionResponse.status})`)
        }

        if (!hasLocalSnapshot) {
          const configResponse = await fetch('/api/config', {
            credentials: 'same-origin',
            cache: 'no-store',
          })

          if (configResponse.status === 401) {
            window.location.replace('/api/auth/login')
            return
          }

          if (!configResponse.ok) {
            throw new Error(`Configuration load failed (${configResponse.status})`)
          }

          const data = await configResponse.json() as { settings?: UserSettings }
          if (!data.settings) {
            throw new Error('Configuration response is missing settings')
          }

          if (!cancelled) {
            setSettings(data.settings)
            saveSettings(data.settings)
          }
        }

        if (!cancelled) setIsAuthReady(true)
      } catch (error) {
        if (cancelled) return

        if (hasLocalSnapshot) {
          // Trusted-device offline mode: use the last authenticated local snapshot.
          setIsAuthReady(true)
          return
        }

        console.error('Failed to initialize authenticated iTab session:', error)
        setStartupError('无法验证登录状态，请检查网络后重试。')
        setIsAuthReady(true)
      }
    }

    void initialize()
    return () => {
      cancelled = true
    }
  }, [])

  const updateAndSaveShortcuts = (newShortcuts: Shortcut[]) => {
    const updated = { ...settings, shortcuts: newShortcuts }
    setSettings(updated)
    saveSettings(updated)
  }

  const handleUpdateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  const handleSelectEngine = (engineId: string) => {
    handleUpdateSettings({ ...settings, searchEngineId: engineId })
  }

  const handleOpenShortcut = (shortcut: Shortcut) => {
    if (!shortcut.url) return

    setRecentShortcutIds((current) => {
      const next = [shortcut.id, ...current.filter((id) => id !== shortcut.id)].slice(0, 12)
      saveRecentShortcutIds(next)
      return next
    })

    window.open(shortcut.url, '_blank', 'noopener,noreferrer')
  }

  const availableApps = settings.shortcuts.flatMap((shortcut) =>
    shortcut.isFolder ? (shortcut.children || []) : [shortcut]
  )
  const appsById = new Map(
    availableApps
      .filter((shortcut) => !shortcut.isFolder && !shortcut.isSpecial && shortcut.url)
      .map((shortcut) => [shortcut.id, shortcut])
  )
  const recentShortcuts = recentShortcutIds
    .map((id) => appsById.get(id))
    .filter((shortcut): shortcut is Shortcut => Boolean(shortcut))
    .slice(0, 6)

  // Delete a shortcut or folder on root
  const handleDeleteShortcut = (id: string) => {
    const next = settings.shortcuts.filter((s) => s.id !== id)
    updateAndSaveShortcuts(next)
  }

  // Delete an item inside a folder
  const handleDeleteInsideFolder = (folderId: string, childId: string) => {
    const next = settings.shortcuts.map((item) => {
      if (item.id === folderId && item.isFolder) {
        const updatedChildren = (item.children || []).filter((c) => c.id !== childId)
        return { ...item, children: updatedChildren }
      }
      return item
    })
    updateAndSaveShortcuts(next)

    // Update active folder state if currently open
    if (activeFolder && activeFolder.id === folderId) {
      setActiveFolder({
        ...activeFolder,
        children: (activeFolder.children || []).filter((c) => c.id !== childId),
      })
    }
  }

  // Move an item out of a folder back to root
  const handleMoveOutOfFolder = (folderId: string, childId: string) => {
    let extracted: Shortcut | undefined
    const next = settings.shortcuts.map((item) => {
      if (item.id === folderId && item.isFolder) {
        extracted = item.children?.find((c) => c.id === childId)
        return {
          ...item,
          children: (item.children || []).filter((c) => c.id !== childId),
        }
      }
      return item
    })

    if (extracted) {
      // Add right after the folder
      const folderIdx = next.findIndex((s) => s.id === folderId)
      next.splice(folderIdx + 1, 0, extracted)
      updateAndSaveShortcuts(next)

      if (activeFolder && activeFolder.id === folderId) {
        setActiveFolder({
          ...activeFolder,
          children: (activeFolder.children || []).filter((c) => c.id !== childId),
        })
      }
    }
  }

  // Ungroup an entire folder into individual desktop icons
  const handleUngroupFolder = (folderId: string) => {
    const folder = settings.shortcuts.find((s) => s.id === folderId)
    if (!folder || !folder.children) return

    const folderIdx = settings.shortcuts.findIndex((s) => s.id === folderId)
    const next = [...settings.shortcuts]
    next.splice(folderIdx, 1, ...folder.children)
    updateAndSaveShortcuts(next)
    setActiveFolder(null)
  }

  // Update folder title
  const handleUpdateFolderTitle = (folderId: string, newTitle: string) => {
    const next = settings.shortcuts.map((s) => (s.id === folderId ? { ...s, title: newTitle } : s))
    updateAndSaveShortcuts(next)
    if (activeFolder && activeFolder.id === folderId) {
      setActiveFolder({ ...activeFolder, title: newTitle })
    }
  }

  // Save edits on a shortcut or folder
  const handleSaveEdit = (updated: Shortcut) => {
    // Check if it's on root
    const existsOnRoot = settings.shortcuts.some((s) => s.id === updated.id)
    if (existsOnRoot) {
      const next = settings.shortcuts.map((s) => (s.id === updated.id ? updated : s))
      updateAndSaveShortcuts(next)
      return
    }

    // Otherwise it's inside a folder
    const next = settings.shortcuts.map((folder) => {
      if (folder.isFolder && folder.children) {
        const hasChild = folder.children.some((c) => c.id === updated.id)
        if (hasChild) {
          const nextChildren = folder.children.map((c) => (c.id === updated.id ? updated : c))
          return { ...folder, children: nextChildren }
        }
      }
      return folder
    })
    updateAndSaveShortcuts(next)

    if (activeFolder) {
      setActiveFolder({
        ...activeFolder,
        children: activeFolder.children?.map((c) => (c.id === updated.id ? updated : c)),
      })
    }
  }

  // Add new shortcut or folder
  const handleAdd = (newShortcut: Shortcut) => {
    if (addFolderTargetId) {
      // Add inside the specific folder
      const next = settings.shortcuts.map((folder) => {
        if (folder.id === addFolderTargetId && folder.isFolder) {
          return {
            ...folder,
            children: [...(folder.children || []), newShortcut],
          }
        }
        return folder
      })
      updateAndSaveShortcuts(next)

      if (activeFolder && activeFolder.id === addFolderTargetId) {
        setActiveFolder({
          ...activeFolder,
          children: [...(activeFolder.children || []), newShortcut],
        })
      }
      setAddFolderTargetId(null)
    } else {
      // Add to root before the special action buttons
      const next = [...settings.shortcuts]
      const lastActionIdx = next.findIndex((s) => s.isSpecial)
      if (lastActionIdx !== -1) {
        next.splice(lastActionIdx, 0, newShortcut)
      } else {
        next.push(newShortcut)
      }
      updateAndSaveShortcuts(next)
    }
  }

  // Move an item from root into a specific folder
  const handleMoveToFolder = (folderId: string, shortcutId: string) => {
    const item = settings.shortcuts.find((s) => s.id === shortcutId)
    if (!item) return

    const next = settings.shortcuts
      .filter((s) => s.id !== shortcutId)
      .map((folder) => {
        if (folder.id === folderId && folder.isFolder) {
          return {
            ...folder,
            children: [...(folder.children || []), item],
          }
        }
        return folder
      })
    updateAndSaveShortcuts(next)
  }

  // Reorder / move shortcut on desktop
  const handleMoveShortcut = (id: string, direction: 'left' | 'right') => {
    const idx = settings.shortcuts.findIndex((s) => s.id === id)
    if (idx === -1) return
    const targetIdx = direction === 'left' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= settings.shortcuts.length) return
    // Do not reorder past special action buttons (settings / add)
    if (settings.shortcuts[targetIdx].isSpecial) return

    const next = [...settings.shortcuts]
    const [moved] = next.splice(idx, 1)
    next.splice(targetIdx, 0, moved)
    updateAndSaveShortcuts(next)
  }

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, shortcut: Shortcut) => {
    setDraggedItem(shortcut)
    e.dataTransfer.setData('text/plain', shortcut.id)
  }

  const handleDropOnShortcut = (e: React.DragEvent, targetShortcut: Shortcut) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.id === targetShortcut.id) return

    // Case 1: Drop a standard item onto a folder -> put inside that folder
    if (targetShortcut.isFolder && !draggedItem.isFolder) {
      const next = settings.shortcuts
        .filter((s) => s.id !== draggedItem.id) // Remove dragged from root
        .map((folder) => {
          if (folder.id === targetShortcut.id) {
            return {
              ...folder,
              children: [...(folder.children || []), draggedItem],
            }
          }
          return folder
        })
      updateAndSaveShortcuts(next)
      setDraggedItem(null)
      return
    }

    // Case 2: Drop onto another standard item while holding Alt/Option or Shift -> Merge into a new folder!
    if (
      (e.altKey || e.shiftKey) &&
      !targetShortcut.isSpecial &&
      !draggedItem.isSpecial &&
      !targetShortcut.isFolder &&
      !draggedItem.isFolder
    ) {
      const newFolder: Shortcut = {
        id: `folder-${Date.now()}`,
        title: `${targetShortcut.title} 等`,
        isFolder: true,
        bgColor: 'bg-white/20',
        children: [targetShortcut, draggedItem],
      }

      const targetIdx = settings.shortcuts.findIndex((s) => s.id === targetShortcut.id)
      const next = settings.shortcuts.filter(
        (s) => s.id !== draggedItem.id && s.id !== targetShortcut.id
      )
      next.splice(targetIdx, 0, newFolder)
      updateAndSaveShortcuts(next)
      setDraggedItem(null)
      return
    }

    // Case 3: Reorder positions (default when dragging icons or folders to reorganize)
    const fromIdx = settings.shortcuts.findIndex((s) => s.id === draggedItem.id)
    const toIdx = settings.shortcuts.findIndex((s) => s.id === targetShortcut.id)
    if (fromIdx !== -1 && toIdx !== -1) {
      const next = [...settings.shortcuts]
      const [moved] = next.splice(fromIdx, 1)
      next.splice(toIdx, 0, moved)
      updateAndSaveShortcuts(next)
    }
    setDraggedItem(null)
  }

  const handleToggleGlobalIconStyle = () => {
    const nextStyle = settings.iconStyle === 'optimized' ? 'official' : 'optimized'
    handleUpdateSettings({ ...settings, iconStyle: nextStyle })
  }

  const handleToggleShortcutIconStyle = (target: Shortcut, isInFolder?: boolean, folderId?: string) => {
    const currentStyle = target.iconStyle && target.iconStyle !== 'auto'
      ? target.iconStyle
      : (settings.iconStyle || 'official')
    const nextStyle: 'official' | 'optimized' = currentStyle === 'official' ? 'optimized' : 'official'

    if (isInFolder && folderId) {
      const nextShortcuts = settings.shortcuts.map((item) => {
        if (item.id === folderId && item.isFolder) {
          const nextChildren = (item.children || []).map((c) =>
            c.id === target.id ? { ...c, iconStyle: nextStyle } : c
          )
          return { ...item, children: nextChildren }
        }
        return item
      })
      updateAndSaveShortcuts(nextShortcuts)
      if (activeFolder && activeFolder.id === folderId) {
        setActiveFolder({
          ...activeFolder,
          children: (activeFolder.children || []).map((c) =>
            c.id === target.id ? { ...c, iconStyle: nextStyle } : c
          ),
        })
      }
    } else {
      const nextShortcuts = settings.shortcuts.map((s) =>
        s.id === target.id ? { ...s, iconStyle: nextStyle } : s
      )
      updateAndSaveShortcuts(nextShortcuts)
    }
  }

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-sm text-white/60">正在验证登录状态…</div>
      </div>
    )
  }

  if (startupError) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <p className="text-sm text-white/70">{startupError}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-sm transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-white font-sans selection:bg-sky-500 selection:text-white">
      {/* Background Wallpaper - Crystal Sharp 4K */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url('${settings.wallpaper}')`,
          backgroundColor: '#0f172a',
          transform: 'translateZ(0)',
        }}
      />
      {/* Ambient background overlay (strictly no blur so 4K wallpapers remain razor sharp) */}
      <div className="fixed inset-0 bg-black/15 pointer-events-none z-0" />

      {/* Main Content Area: wide screens get a two-column layout — primary
          column (clock / search / icon matrix) plus a 300px info sidebar on
          the right; narrower screens fall back to the classic stacked column. */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row lg:items-stretch gap-6 px-4 lg:px-8 py-4 lg:py-6 w-full max-w-[1440px] mx-auto">
        {/* Primary column */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-start lg:justify-center order-2 lg:order-1">
          {/* Compact clock */}
          <div className="w-full flex flex-col items-center pt-1 lg:pt-0">
            <HeaderClock />
          </div>

          {/* Search bar (desktop: right under the clock; mobile: stays with the stacked flow) */}
          <div className="w-full flex flex-col items-center mt-3 lg:mt-5">
            <SearchBar
              currentEngineId={settings.searchEngineId}
              onSelectEngine={handleSelectEngine}
            />
          </div>

          {/* Mobile-only widgets strip: keeps the classic stacked layout on small screens */}
          {settings.showRealWidgets && (
            <div className="flex lg:hidden items-center justify-center gap-4 my-4 animate-in fade-in duration-300">
              <div className="w-40">
                <CalendarCard />
              </div>
              <div className="w-40">
                <AnniversaryCard
                  birthDate={settings.birthDate}
                  onClick={() => setIsSettingsOpen(true)}
                />
              </div>
            </div>
          )}

          {/* Mobile-only info widgets (sidebar takes over on lg+) */}
          <div className="lg:hidden w-full flex flex-col items-center">
            {recentShortcuts.length > 0 && (
              <section className="w-full max-w-[720px] mt-4" aria-label="最近打开">
                <div className="mx-2 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.16)] px-4 pt-3 pb-3">
                  <div className="flex items-center gap-1.5 mb-2 px-1 text-[11px] font-medium tracking-wide text-white/65">
                    <History className="w-3.5 h-3.5" />
                    <span>最近打开</span>
                  </div>
                  <div className="flex items-start justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto pb-1">
                    {recentShortcuts.map((shortcut) => (
                      <div key={shortcut.id} className="w-[72px] shrink-0 flex justify-center">
                        <IconItem
                          shortcut={shortcut}
                          globalIconStyle={settings.iconStyle}
                          onClick={() => handleOpenShortcut(shortcut)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
            <IndicesCard />
            <HotListsCard />
          </div>

          {/* Desktop App Matrix (Shortcuts & Folders with Drag & Drop) */}
          <div className="w-full mt-4 lg:mt-8 py-2 flex flex-col items-center">
          {/* Subtle management controls */}
          <div className="w-full max-w-[1060px] flex items-center justify-end mb-2 px-4 space-x-2">
            <button
              type="button"
              onClick={handleToggleGlobalIconStyle}
              className="flex items-center space-x-1 px-3 py-1 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full text-xs text-white/80 hover:text-white transition-all border border-white/10 hover:border-white/20 shadow-xs cursor-pointer"
              title="点击快速切换桌面图标风格（官方品牌版 / 精修优化版）"
            >
              <span>{settings.iconStyle === 'optimized' ? '🎨 优化版' : '🏛️ 官方版'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAddFolderTargetId(null)
                setIsAddOpen(true)
              }}
              className="flex items-center space-x-1 px-3 py-1 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full text-xs text-white/80 hover:text-white transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>添加</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md transition-all ${
                isEditMode
                  ? 'bg-amber-500 text-white shadow-lg scale-105'
                  : 'bg-black/30 hover:bg-black/50 text-white/80 hover:text-white'
              }`}
            >
              {isEditMode ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>完成</span>
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>整理/编辑</span>
                </>
              )}
            </button>
          </div>

          {/* Icon Grid: Responsive 8-column layout (perfect 1 row on desktop, 2 rows of 4 on mobile) */}
          <div className="w-full max-w-[920px] grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-8 gap-x-3 sm:gap-x-4 gap-y-6 items-start justify-items-center px-2 py-4">
            {settings.shortcuts.map((shortcut) => {
              let handleSpecialClick: (() => void) | undefined
              if (shortcut.id === 'settings') {
                handleSpecialClick = () => setIsSettingsOpen(true)
              } else if (shortcut.id === 'guide') {
                handleSpecialClick = () => setIsGuideOpen(true)
              } else if (shortcut.id === 'add-shortcut') {
                handleSpecialClick = () => {
                  setAddFolderTargetId(null)
                  setIsAddOpen(true)
                }
              } else if (shortcut.isFolder) {
                handleSpecialClick = () => setActiveFolder(shortcut)
              } else if (shortcut.url) {
                handleSpecialClick = () => handleOpenShortcut(shortcut)
              }

              return (
                <div key={shortcut.id} className="w-full flex justify-center">
                  <IconItem
                    shortcut={shortcut}
                    size="large"
                    globalIconStyle={settings.iconStyle}
                    isEditMode={isEditMode}
                    onClick={handleSpecialClick}
                    onDelete={() => handleDeleteShortcut(shortcut.id)}
                    onMoveLeft={() => handleMoveShortcut(shortcut.id, 'left')}
                    onMoveRight={() => handleMoveShortcut(shortcut.id, 'right')}
                    onDragStart={handleDragStart}
                    onDrop={handleDropOnShortcut}
                    onContextMenu={(e, item) => {
                      setContextMenu({
                        x: e.clientX,
                        y: e.clientY,
                        shortcut: item,
                        isInFolder: false,
                      })
                    }}
                  />
                </div>
              )
            })}
          </div>
          </div>

          {/* Bottom Motto (primary column) */}
          <FooterMotto />
        </div>

        {/* Info sidebar (lg+ only) */}
        <aside className="hidden lg:flex flex-col gap-4 w-[300px] shrink-0 order-1 lg:order-2 lg:sticky lg:top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto pr-1 [scrollbar-width:thin]">
          {settings.showRealWidgets && (
            <div className="grid grid-cols-2 gap-3">
              <CalendarCard compact />
              <AnniversaryCard
                birthDate={settings.birthDate}
                onClick={() => setIsSettingsOpen(true)}
                compact
              />
            </div>
          )}

          <IndicesCard variant="sidebar" />

          <HotListsCard variant="sidebar" />

          {recentShortcuts.length > 0 && (
            <section className="w-full" aria-label="最近打开">
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.14)] px-3 pt-2.5 pb-2.5">
                <div className="flex items-center gap-1.5 mb-2 px-1 text-[11px] font-medium tracking-wide text-white/65">
                  <History className="w-3.5 h-3.5" />
                  <span>最近打开</span>
                </div>
                <div className="grid grid-cols-4 gap-y-3 justify-items-center">
                  {recentShortcuts.map((shortcut) => (
                    <div key={shortcut.id} className="w-[64px] flex justify-center">
                      <IconItem
                        shortcut={shortcut}
                        globalIconStyle={settings.iconStyle}
                        onClick={() => handleOpenShortcut(shortcut)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </aside>
      </div>

      {/* Folder Popover Modal */}
      <FolderModal
        isOpen={!!activeFolder}
        folder={activeFolder}
        isEditMode={isEditMode}
        globalIconStyle={settings.iconStyle}
        onClose={() => setActiveFolder(null)}
        onUpdateFolderTitle={handleUpdateFolderTitle}
        onDeleteInsideFolder={handleDeleteInsideFolder}
        onAddInsideFolder={(folderId) => {
          setAddFolderTargetId(folderId)
          setIsAddOpen(true)
        }}
        onOpenShortcut={handleOpenShortcut}
        onContextMenuInsideFolder={(e, item) => {
          if (activeFolder) {
            setContextMenu({
              x: e.clientX,
              y: e.clientY,
              shortcut: item,
              isInFolder: true,
              folderId: activeFolder.id,
            })
          }
        }}
      />

      {/* Edit Shortcut Modal */}
      <EditShortcutModal
        key={editingShortcut?.id || 'closed'}
        isOpen={!!editingShortcut}
        shortcut={editingShortcut}
        onClose={() => setEditingShortcut(null)}
        onSave={handleSaveEdit}
      />

      {/* Add Shortcut / Folder Modal */}
      <AddShortcutModal
        isOpen={isAddOpen}
        targetFolderId={addFolderTargetId}
        onClose={() => {
          setIsAddOpen(false)
          setAddFolderTargetId(null)
        }}
        onAdd={handleAdd}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleUpdateSettings}
      />

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Right Click Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          shortcut={contextMenu.shortcut}
          isInFolder={contextMenu.isInFolder}
          availableFolders={settings.shortcuts.filter((s) => s.isFolder)}
          currentIconStyle={
            contextMenu.shortcut.iconStyle && contextMenu.shortcut.iconStyle !== 'auto'
              ? contextMenu.shortcut.iconStyle
              : settings.iconStyle
          }
          onToggleIconStyle={() => {
            handleToggleShortcutIconStyle(contextMenu.shortcut, contextMenu.isInFolder, contextMenu.folderId)
          }}
          onMove={(direction) => {
            handleMoveShortcut(contextMenu.shortcut.id, direction)
          }}
          onMoveToFolder={(folderId) => {
            handleMoveToFolder(folderId, contextMenu.shortcut.id)
          }}
          onClose={() => setContextMenu(null)}
          onOpen={() => {
            if (contextMenu.shortcut.url) {
              handleOpenShortcut(contextMenu.shortcut)
            }
          }}
          onEdit={() => setEditingShortcut(contextMenu.shortcut)}
          onDelete={() => {
            if (contextMenu.isInFolder && contextMenu.folderId) {
              handleDeleteInsideFolder(contextMenu.folderId, contextMenu.shortcut.id)
            } else {
              handleDeleteShortcut(contextMenu.shortcut.id)
            }
          }}
          onMoveOutOfFolder={() => {
            if (contextMenu.folderId) {
              handleMoveOutOfFolder(contextMenu.folderId, contextMenu.shortcut.id)
            }
          }}
          onUngroupFolder={() => {
            handleUngroupFolder(contextMenu.shortcut.id)
          }}
        />
      )}
    </div>
  )
}

export default App
