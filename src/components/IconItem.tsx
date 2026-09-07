import React, { useState, useRef } from 'react'
import { Settings, Lightbulb, Plus, Globe, X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Shortcut } from '../types'
import { getFaviconCandidates } from '../utils/favicon'
import { VectorIcon } from './VectorIcon'
import { hasVectorIcon } from '../utils/vectorIcons'

interface IconItemProps {
  shortcut: Shortcut
  size?: 'normal' | 'large'
  globalIconStyle?: 'official' | 'optimized'
  isEditMode?: boolean
  onClick?: () => void
  onDelete?: () => void
  onMoveLeft?: () => void
  onMoveRight?: () => void
  onContextMenu?: (e: React.MouseEvent, shortcut: Shortcut) => void
  onDragStart?: (e: React.DragEvent, shortcut: Shortcut) => void
  onDragOver?: (e: React.DragEvent, shortcut: Shortcut) => void
  onDrop?: (e: React.DragEvent, shortcut: Shortcut) => void
}

export const IconItem: React.FC<IconItemProps> = ({
  shortcut,
  size = 'normal',
  globalIconStyle = 'official',
  isEditMode = false,
  onClick,
  onDelete,
  onMoveLeft,
  onMoveRight,
  onContextMenu,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const effectiveVariant: 'official' | 'optimized' =
    shortcut.iconStyle && shortcut.iconStyle !== 'auto'
      ? shortcut.iconStyle
      : globalIconStyle

  const candidates = getFaviconCandidates(shortcut.url || '', shortcut.icon)
  const [candidateIndex, setCandidateIndex] = useState(0)
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isDragOverTarget, setIsDragOverTarget] = useState(false)
  const dragCounter = useRef(0)

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
    setImgLoaded(false)
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
        <div className="w-full h-full bg-white/25 hover:bg-white/35 backdrop-blur-md p-1.5 grid grid-cols-2 grid-rows-2 gap-1 transition-all rounded-[18px]">
          {previews.map((child, idx) => (
            <div
              key={idx}
              className="w-full h-full rounded-[6px] overflow-hidden flex items-center justify-center shadow-xs"
            >
              {child.icon ? (
                <div className="w-full h-full scale-90 origin-center flex items-center justify-center">
                  <VectorIcon
                    name={child.icon}
                    variant={child.iconStyle && child.iconStyle !== 'auto' ? child.iconStyle : effectiveVariant}
                  />
                </div>
              ) : (
                <div className={`w-full h-full ${child.bgColor || 'bg-blue-600'} flex items-center justify-center text-[9px] font-bold text-white`}>
                  {child.title.slice(0, 1)}
                </div>
              )}
            </div>
          ))}
          {/* Fill empty slots */}
          {Array.from({ length: Math.max(0, 4 - previews.length) }).map((_, idx) => (
            <div key={`empty-${idx}`} className="w-full h-full rounded-[6px] bg-white/10" />
          ))}
        </div>
      )
    }

    // 2. Built-in Special Tools (no external website)
    if (shortcut.isSpecial) {
      if (shortcut.id === 'settings') {
        return (
          <div className="w-full h-full bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 flex items-center justify-center text-white">
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
      if (shortcut.icon) {
        return <VectorIcon name={shortcut.icon} variant={effectiveVariant} />
      }
    }

    // 3. Known / Curated Vector Icons (Official brand vs Optimized seamless)
    if (shortcut.icon && hasVectorIcon(shortcut.icon)) {
      return <VectorIcon name={shortcut.icon} variant={effectiveVariant} />
    }

    // 4. Custom Website Favicon / Apple-Touch-Icon (for custom URLs added by user)
    const hasCandidate = Boolean(
      shortcut.url && !imgError && candidates.length > 0 && candidateIndex < candidates.length
    )
    const fallbackVector = shortcut.icon ? <VectorIcon name={shortcut.icon} variant={effectiveVariant} /> : null
    const currentCandidate = hasCandidate ? candidates[candidateIndex] : null
    const isAppleTouchIcon = currentCandidate?.includes('apple-touch-icon')

    if (hasCandidate && currentCandidate) {
      return (
        <div
          className={`w-full h-full ${
            shortcut.bgColor || 'bg-white'
          } flex items-center justify-center relative overflow-hidden`}
        >
          {/* Show vector icon underneath while official icon is loading or if failed */}
          {!imgLoaded && fallbackVector && (
            <div className="absolute inset-0 flex items-center justify-center">
              {fallbackVector}
            </div>
          )}

          {/* Official site icon */}
          <img
            src={currentCandidate}
            alt={shortcut.title}
            onLoad={(e) => {
              const img = e.currentTarget
              if (img.naturalWidth > 1 && img.naturalHeight > 1) {
                setImgLoaded(true)
              } else {
                handleImgError()
              }
            }}
            onError={handleImgError}
            className={`w-full h-full ${
              isAppleTouchIcon ? 'object-cover' : 'object-contain p-2'
            } transition-opacity duration-200 ${imgLoaded ? 'opacity-100 drop-shadow-xs' : 'opacity-0'}`}
            loading="lazy"
          />
        </div>
      )
    }

    // 4. Pixel-perfect Vector SVG Icon (100% Retina Sharp Fallback)
    if (fallbackVector) {
      return fallbackVector
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
      onDragEnter={(e) => {
        e.preventDefault()
        dragCounter.current += 1
        setIsDragOverTarget(true)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragOverTarget(true)
        onDragOver?.(e, shortcut)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        dragCounter.current -= 1
        if (dragCounter.current <= 0) {
          dragCounter.current = 0
          setIsDragOverTarget(false)
        }
      }}
      onDrop={(e) => {
        e.preventDefault()
        dragCounter.current = 0
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
      {/* Action badges in edit mode */}
      {isEditMode && !shortcut.isSpecial && (
        <>
          {/* Delete badge */}
          <button
            type="button"
            title="删除"
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.()
            }}
            className="absolute -top-1.5 -right-1 z-30 w-5 h-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-90"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>

          {/* Move left badge */}
          {onMoveLeft && (
            <button
              type="button"
              title="向前移动"
              onClick={(e) => {
                e.stopPropagation()
                onMoveLeft()
              }}
              className="absolute -top-1.5 -left-1 z-30 w-5 h-5 bg-sky-600 hover:bg-sky-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-90"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}

          {/* Move right badge */}
          {onMoveRight && (
            <button
              type="button"
              title="向后移动"
              onClick={(e) => {
                e.stopPropagation()
                onMoveRight()
              }}
              className="absolute -bottom-1 -right-1 z-30 w-5 h-5 bg-sky-600 hover:bg-sky-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-90"
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}
        </>
      )}

      {/* App Squircle - 100% 一体化无边框设计 */}
      <div
        className={`${squircleSize} rounded-[18px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.3)] group-hover/icon:shadow-[0_8px_25px_rgba(0,0,0,0.45)] group-hover/icon:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center relative flex-shrink-0 select-none ${
          isDragOverTarget ? 'ring-2 ring-sky-400 scale-110 shadow-sky-500/30' : ''
        }`}
      >
        {renderContent()}
      </div>

      {/* Label under icon */}
      <span className="mt-1.5 text-[11px] text-white/95 font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center w-full truncate px-0.5 leading-tight group-hover/icon:text-white transition-colors">
        {shortcut.title}
      </span>
    </div>
  )
}
