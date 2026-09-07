import React, { useState } from 'react'
import { HeaderClock } from './components/HeaderClock'
import { SearchBar } from './components/SearchBar'
import { CalendarCard } from './components/CalendarCard'
import { AnniversaryCard } from './components/AnniversaryCard'
import { IconItem } from './components/IconItem'
import { FooterMotto } from './components/FooterMotto'
import { SettingsModal } from './components/SettingsModal'
import { AddShortcutModal } from './components/AddShortcutModal'
import { EditShortcutModal } from './components/EditShortcutModal'
import { FolderModal } from './components/FolderModal'
import { ContextMenu } from './components/ContextMenu'
import { GuideModal } from './components/GuideModal'
import { loadSettings, saveSettings } from './utils/storage'
import { SlidersHorizontal, Check, Plus } from 'lucide-react'
import type { Shortcut, UserSettings } from './types'

export const App: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(loadSettings())
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addFolderTargetId, setAddFolderTargetId] = useState<string | null>(null)
  const [isGuideOpen, setIsGuideOpen] = useState(false)

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

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, shortcut: Shortcut) => {
    setDraggedItem(shortcut)
    e.dataTransfer.setData('text/plain', shortcut.id)
  }

  const handleDropOnShortcut = (e: React.DragEvent, targetShortcut: Shortcut) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.id === targetShortcut.id) return

    // Case 1: Drop onto a folder -> put inside that folder
    if (targetShortcut.isFolder) {
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
    if ((e.altKey || e.shiftKey) && !targetShortcut.isSpecial && !draggedItem.isSpecial) {
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

    // Case 3: Reorder positions (default when dragging icons to reorganize)
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

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-white font-sans selection:bg-sky-500 selection:text-white">
      {/* Background Wallpaper */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 transition-all duration-700 filter brightness-95"
        style={{
          backgroundImage: `url('${settings.wallpaper}')`,
          backgroundColor: '#1a1c23',
        }}
      />
      {/* Ambient background overlay */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-between px-4 py-6 w-full max-w-[1160px] mx-auto">
        {/* Top Header: Clock & Search */}
        <div className="w-full flex flex-col items-center pt-2 md:pt-4 space-y-4">
          <HeaderClock />
          <SearchBar
            currentEngineId={settings.searchEngineId}
            onSelectEngine={handleSelectEngine}
          />
        </div>

        {/* Real Dynamic Widgets Strip (Calendar & Anniversary only) */}
        {settings.showRealWidgets && (
          <div className="flex items-center justify-center gap-4 my-4 animate-in fade-in duration-300">
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

        {/* Desktop App Matrix (Shortcuts & Folders with Drag & Drop) */}
        <div className="w-full my-auto py-4 flex flex-col items-center">
          {/* Top Bar for Desk Management */}
          <div className="w-full max-w-[1060px] flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-semibold tracking-wider text-white/60 uppercase">
              应用快捷方式与文件夹 ({settings.shortcuts.length})
            </span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  setAddFolderTargetId(null)
                  setIsAddOpen(true)
                }}
                className="flex items-center space-x-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-xl text-xs text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>添加</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditMode(!isEditMode)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  isEditMode
                    ? 'bg-amber-500 text-white shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
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
          </div>

          {/* Icon Grid: Responsive 8-10 Columns */}
          <div className="w-full max-w-[1060px] grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-10 gap-x-2 gap-y-4 items-start justify-items-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
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
              }

              return (
                <div key={shortcut.id} className="w-full flex justify-center">
                  <IconItem
                    shortcut={shortcut}
                    size="large"
                    isEditMode={isEditMode}
                    onClick={handleSpecialClick}
                    onDelete={() => handleDeleteShortcut(shortcut.id)}
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

        {/* Bottom Motto */}
        <FooterMotto />
      </div>

      {/* Folder Popover Modal */}
      <FolderModal
        isOpen={!!activeFolder}
        folder={activeFolder}
        isEditMode={isEditMode}
        onClose={() => setActiveFolder(null)}
        onUpdateFolderTitle={handleUpdateFolderTitle}
        onDeleteInsideFolder={handleDeleteInsideFolder}
        onAddInsideFolder={(folderId) => {
          setAddFolderTargetId(folderId)
          setIsAddOpen(true)
        }}
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
          onMoveToFolder={(folderId) => {
            handleMoveToFolder(folderId, contextMenu.shortcut.id)
          }}
          onClose={() => setContextMenu(null)}
          onOpen={() => {
            if (contextMenu.shortcut.url) {
              window.open(contextMenu.shortcut.url, '_blank')
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
