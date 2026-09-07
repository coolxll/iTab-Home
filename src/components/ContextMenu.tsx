import React, { useEffect, useRef } from 'react'
import { ExternalLink, Edit3, Trash2, FolderMinus, FolderPlus, ArrowLeft, ArrowRight } from 'lucide-react'
import type { Shortcut } from '../types'

interface ContextMenuProps {
  x: number
  y: number
  shortcut: Shortcut
  isInFolder?: boolean
  availableFolders?: Shortcut[]
  onClose: () => void
  onOpen: () => void
  onEdit: () => void
  onDelete: () => void
  onMove?: (direction: 'left' | 'right') => void
  onMoveToFolder?: (folderId: string) => void
  onMoveOutOfFolder?: () => void
  onUngroupFolder?: () => void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  shortcut,
  isInFolder,
  availableFolders,
  onClose,
  onOpen,
  onEdit,
  onDelete,
  onMove,
  onMoveToFolder,
  onMoveOutOfFolder,
  onUngroupFolder,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  // Prevent context menu from going off-screen
  const adjustedX = Math.min(x, window.innerWidth - 180)
  const adjustedY = Math.min(y, window.innerHeight - 200)

  return (
    <div
      ref={menuRef}
      style={{ left: `${adjustedX}px`, top: `${adjustedY}px` }}
      className="fixed z-50 w-44 bg-zinc-900/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl py-1.5 text-white text-xs select-none animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="px-3 py-1 font-semibold text-white/50 border-b border-white/10 truncate mb-1">
        {shortcut.title}
      </div>

      {!shortcut.isFolder && shortcut.url && (
        <button
          type="button"
          onClick={() => {
            onOpen()
            onClose()
          }}
          className="w-full flex items-center space-x-2.5 px-3 py-2 text-left hover:bg-white/10 text-white/90 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-sky-400" />
          <span>打开网页</span>
        </button>
      )}

      {!shortcut.isSpecial && (
        <button
          type="button"
          onClick={() => {
            onEdit()
            onClose()
          }}
          className="w-full flex items-center space-x-2.5 px-3 py-2 text-left hover:bg-white/10 text-white/90 hover:text-white transition-colors"
        >
          <Edit3 className="w-4 h-4 text-amber-400" />
          <span>{shortcut.isFolder ? '重命名文件夹' : '编辑图标'}</span>
        </button>
      )}

      {!shortcut.isSpecial && onMove && !isInFolder && (
        <div className="flex border-y border-white/10 my-0.5">
          <button
            type="button"
            onClick={() => {
              onMove('left')
              onClose()
            }}
            className="flex-1 flex items-center justify-center space-x-1.5 py-1.5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border-r border-white/10"
            title="向前移动一位"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px]">前移</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onMove('right')
              onClose()
            }}
            className="flex-1 flex items-center justify-center space-x-1.5 py-1.5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            title="向后移动一位"
          >
            <span className="text-[11px]">后移</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>
      )}

      {isInFolder && onMoveOutOfFolder && (
        <button
          type="button"
          onClick={() => {
            onMoveOutOfFolder()
            onClose()
          }}
          className="w-full flex items-center space-x-2.5 px-3 py-2 text-left hover:bg-white/10 text-white/90 hover:text-white transition-colors"
        >
          <FolderMinus className="w-4 h-4 text-indigo-400" />
          <span>移出文件夹</span>
        </button>
      )}

      {shortcut.isFolder && onUngroupFolder && (
        <button
          type="button"
          onClick={() => {
            onUngroupFolder()
            onClose()
          }}
          className="w-full flex items-center space-x-2.5 px-3 py-2 text-left hover:bg-white/10 text-white/90 hover:text-white transition-colors"
        >
          <FolderPlus className="w-4 h-4 text-indigo-400" />
          <span>解散文件夹</span>
        </button>
      )}

      {availableFolders && availableFolders.length > 0 && !isInFolder && !shortcut.isFolder && !shortcut.isSpecial && (
        <div className="border-t border-white/10 pt-1 mt-1">
          <div className="px-3 py-1 text-[10px] text-white/40 uppercase font-semibold">移入文件夹</div>
          {availableFolders.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                onMoveToFolder?.(f.id)
                onClose()
              }}
              className="w-full flex items-center space-x-2 px-3 py-1.5 text-left hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <FolderPlus className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              <span className="truncate">{f.title}</span>
            </button>
          ))}
        </div>
      )}

      {!shortcut.isSpecial && (
        <button
          type="button"
          onClick={() => {
            onDelete()
            onClose()
          }}
          className="w-full flex items-center space-x-2.5 px-3 py-2 text-left hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 transition-colors border-t border-white/10 mt-1"
        >
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span>删除</span>
        </button>
      )}
    </div>
  )
}
