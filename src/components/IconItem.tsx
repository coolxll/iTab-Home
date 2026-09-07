import React, { useState } from 'react'
import { Settings, Puzzle, Lightbulb, Plus, Globe, X } from 'lucide-react'
import type { Shortcut } from '../types'
import { getFaviconCandidates } from '../utils/favicon'
import { VectorIcon } from './VectorIcon'

interface IconItemProps {
  shortcut: Shortcut
  size?: 'normal' | 'large'
  isEditMode?: boolean
  onClick?: () => void
  onDelete?: () => void
  onContextMenu?: (e: React.MouseEvent, shortcut: Shortcut) => void
  onDragStart?: (e: React.DragEvent, shortcut: Shortcut) => void
  onDragOver?: (e: React.DragEvent, shortcut: Shortcut) => void
  onDrop?: (e: React.DragEvent, shortcut: Shortcut) => void
}

export const IconItem: React.FC<IconItemProps> = ({
  shortcut,
  size = 'normal',
  isEditMode = false,
  onClick,
  onDelete,
  onContextMenu,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const candidates = getFaviconCandidates(shortcut.url || '', shortcut.icon)
  const [candidateIndex, setCandidateIndex] = useState(0)
  const [imgError, setImgError] = useState(false)
  const [isDragOverTarget, setIsDragOverTarget] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (isEditMode && onDelete && !shortcut.isSpecial) {
      e.stopPropagation()
      onDelete()
      return
    }

    if (shortcut.isSpecial || onClick) {
      e.preventDefault()
      onClick?.()
    } else if (shortcut.url) {
      window.open(shortcut.url, '_blank')
    }
  }

  const handleImgError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex(candidateIndex + 1)
    } else {
      setImgError(true)
    }
  }

  const renderContent = () => {
    // 1. Folder representation (2x2 mini grid preview of children icons)
    if (shortcut.isFolder) {
      const children = shortcut.children || []
      const previews = children.slice(0, 4)

      return (
        <div className="w-full h-full bg-white/20 hover:bg-white/25 backdrop-blur-xl border border-white/25 p-1.5 grid grid-cols-2 grid-rows-2 gap-1 transition-colors">
          {previews.map((child, idx) => (
            <div
              key={idx}
              className="w-full h-full rounded-md overflow-hidden bg-black/20 flex items-center justify-center p-0.5"
            >
              {child.icon ? (
                <div className="w-full h-full scale-75 origin-center">
                  <VectorIcon name={child.icon} />
                </div>
              ) : (
                <span className="text-[8px] font-bold text-white/90">
                  {child.title.slice(0, 1)}
                </span>
              )}
            </div>
          ))}
          {/* Fill empty slots */}
          {Array.from({ length: Math.max(0, 4 - previews.length) }).map((_, idx) => (
            <div key={`empty-${idx}`} className="w-full h-full rounded-md bg-white/5" />
          ))}
        </div>
      )
    }

    // 2. Built-in Special Tools
    if (shortcut.id === 'settings') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center text-white">
          <Settings className="w-6 h-6 animate-spin-slow" />
        </div>
      )
    }
    if (shortcut.id === 'guide') {
      return (
        <div className="w-full h-full bg-[#F59E0B] flex items-center justify-center text-white">
          <Lightbulb className="w-6 h-6" />
        </div>
      )
    }
    if (shortcut.id === 'add-shortcut') {
      return (
        <div className="w-full h-full bg-[#0091FF] flex items-center justify-center text-white">
          <Plus className="w-6 h-6" />
        </div>
      )
    }
    if (shortcut.id === 'chrome-apps') {
      return (
        <div className="w-full h-full bg-white flex items-center justify-center p-2.5">
          <div className="grid grid-cols-3 gap-1 w-full h-full">
            <span className="bg-[#EA4335] rounded-full" />
            <span className="bg-[#4285F4] rounded-full" />
            <span className="bg-[#FBBC05] rounded-full" />
            <span className="bg-[#34A853] rounded-full" />
            <span className="bg-[#EA4335] rounded-full" />
            <span className="bg-[#4285F4] rounded-full" />
            <span className="bg-[#FBBC05] rounded-full" />
            <span className="bg-[#34A853] rounded-full" />
            <span className="bg-[#4285F4] rounded-full" />
          </div>
        </div>
      )
    }
    if (shortcut.id === 'extensions') {
      return (
        <div className="w-full h-full bg-zinc-600 flex items-center justify-center text-white">
          <Puzzle className="w-6 h-6" />
        </div>
      )
    }

    // 3. Pixel-perfect Vector SVG Icon (100% Retina Sharp)
    if (shortcut.icon) {
      const vector = <VectorIcon name={shortcut.icon} />
      if (vector) return vector
    }

    // 4. Dynamic Favicon Fetching directly from target address
    if (!imgError && candidates.length > 0) {
      return (
        <div
          className={`w-full h-full ${
            shortcut.bgColor || 'bg-white'
          } flex items-center justify-center p-2.5`}
        >
          <img
            src={candidates[candidateIndex]}
            alt={shortcut.title}
            onError={handleImgError}
            className="w-full h-full object-contain drop-shadow-sm rounded"
            loading="lazy"
          />
        </div>
      )
    }

    // 5. Clean Fallback badge
    return (
      <div
        className={`w-full h-full ${
          shortcut.bgColor || 'bg-gradient-to-br from-blue-500 to-indigo-600'
        } flex items-center justify-center text-white font-bold text-sm select-none shadow-inner`}
      >
        {shortcut.title ? shortcut.title.slice(0, 2) : <Globe className="w-5 h-5 text-white/80" />}
      </div>
    )
  }

  const squircleSize = size === 'large' ? 'w-12 h-12' : 'w-11 h-11'

  return (
    <div
      draggable={!shortcut.isSpecial}
      onDragStart={(e) => onDragStart?.(e, shortcut)}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOverTarget(true)
        onDragOver?.(e, shortcut)
      }}
      onDragLeave={() => setIsDragOverTarget(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragOverTarget(false)
        onDrop?.(e, shortcut)
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        onContextMenu?.(e, shortcut)
      }}
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-start w-full group/icon cursor-pointer select-none transition-all duration-200 ${
        isEditMode && !shortcut.isSpecial ? 'animate-wiggle' : 'hover:scale-105 active:scale-95'
      }`}
      title={shortcut.isFolder ? `文件夹: ${shortcut.title}` : `${shortcut.title} (${shortcut.url})`}
    >
      {/* Delete badge in edit mode */}
      {isEditMode && !shortcut.isSpecial && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDelete?.()
          }}
          className="absolute -top-1.5 -right-1 z-30 w-5 h-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-90"
        >
          <X className="w-3 h-3 stroke-[3]" />
        </button>
      )}

      {/* App Squircle */}
      <div
        className={`${squircleSize} rounded-2xl overflow-hidden shadow-md group-hover/icon:shadow-xl transition-all duration-300 ring-1 ring-white/10 group-hover/icon:ring-white/40 flex items-center justify-center relative bg-white/5 backdrop-blur-sm flex-shrink-0 ${
          isDragOverTarget ? 'ring-4 ring-sky-400 scale-110' : ''
        }`}
      >
        {renderContent()}
      </div>

      {/* Label under icon */}
      <span className="mt-1 text-[11px] text-white/90 font-normal tracking-wide drop-shadow text-center w-full truncate px-0.5 leading-tight group-hover/icon:text-white transition-colors">
        {shortcut.title}
      </span>
    </div>
  )
}
