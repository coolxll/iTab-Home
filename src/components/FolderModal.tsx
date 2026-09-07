import React, { useState } from 'react'
import { X, Plus, Edit2, Check } from 'lucide-react'
import type { Shortcut } from '../types'
import { IconItem } from './IconItem'

interface FolderModalProps {
  isOpen: boolean
  folder: Shortcut | null
  isEditMode: boolean
  globalIconStyle?: 'official' | 'optimized'
  onClose: () => void
  onUpdateFolderTitle: (folderId: string, newTitle: string) => void
  onDeleteInsideFolder: (folderId: string, shortcutId: string) => void
  onAddInsideFolder: (folderId: string) => void
  onContextMenuInsideFolder: (e: React.MouseEvent, shortcut: Shortcut) => void
}

export const FolderModal: React.FC<FolderModalProps> = ({
  isOpen,
  folder,
  isEditMode,
  globalIconStyle = 'official',
  onClose,
  onUpdateFolderTitle,
  onDeleteInsideFolder,
  onAddInsideFolder,
  onContextMenuInsideFolder,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleInput, setTitleInput] = useState('')

  if (!isOpen || !folder || !folder.isFolder) return null

  const handleStartEditTitle = () => {
    setTitleInput(folder.title)
    setIsEditingTitle(true)
  }

  const handleSaveTitle = () => {
    if (titleInput.trim()) {
      onUpdateFolderTitle(folder.id, titleInput.trim())
    }
    setIsEditingTitle(false)
  }

  const children = folder.children || []

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-zinc-900/90 border border-white/20 rounded-3xl shadow-2xl p-6 text-white backdrop-blur-2xl max-h-[85vh] flex flex-col"
      >
        {/* Top bar with folder title */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            {isEditingTitle ? (
              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  autoFocus
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                  className="px-2 py-1 bg-white/10 border border-sky-400 rounded-lg text-lg font-semibold text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSaveTitle}
                  className="p-1 text-sky-400 hover:text-white"
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div
                onClick={handleStartEditTitle}
                className="flex items-center space-x-2 group cursor-pointer"
                title="点击重命名文件夹"
              >
                <h2 className="text-xl font-bold tracking-wide group-hover:text-sky-300 transition-colors">
                  {folder.title}
                </h2>
                <Edit2 className="w-4 h-4 opacity-0 group-hover:opacity-70 transition-opacity text-white/60" />
              </div>
            )}
            <span className="text-xs text-white/40 ml-2">({children.length} 个图标)</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcuts Grid inside Folder */}
        <div className="py-6 overflow-y-auto flex-1 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-x-3 gap-y-4 items-start justify-items-center">
          {children.map((item) => (
            <div
              key={item.id}
              className="w-full flex justify-center"
              onContextMenu={(e) => {
                e.preventDefault()
                onContextMenuInsideFolder(e, item)
              }}
            >
              <IconItem
                shortcut={item}
                size="large"
                globalIconStyle={globalIconStyle}
                isEditMode={isEditMode}
                onDelete={() => onDeleteInsideFolder(folder.id, item.id)}
              />
            </div>
          ))}

          {/* Add Shortcut Inside Folder */}
          <div className="w-full flex justify-center">
            <div
              onClick={() => onAddInsideFolder(folder.id)}
              className="flex flex-col items-center justify-start w-full group/add cursor-pointer select-none transition-transform hover:scale-105 active:scale-95"
            >
              <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-white/30 hover:border-white/60 flex items-center justify-center text-white/60 hover:text-white transition-all bg-white/5">
                <Plus className="w-6 h-6" />
              </div>
              <span className="mt-1 text-[11px] text-white/60 group-hover/add:text-white transition-colors">
                添加
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
