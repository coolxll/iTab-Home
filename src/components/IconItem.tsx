import React, { useState } from 'react'
import { Settings, Puzzle, Lightbulb, Plus, Globe } from 'lucide-react'
import type { Shortcut } from '../types'
import { getFaviconCandidates } from '../utils/favicon'
import { VectorIcon } from './VectorIcon'

interface IconItemProps {
  shortcut: Shortcut
  size?: 'normal' | 'large'
  onClick?: () => void
}

export const IconItem: React.FC<IconItemProps> = ({ shortcut, size = 'normal', onClick }) => {
  const candidates = getFaviconCandidates(shortcut.url, shortcut.icon)
  const [candidateIndex, setCandidateIndex] = useState(0)
  const [imgError, setImgError] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
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
    // 1. Built-in Special Tools
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

    // 2. Pixel-perfect Vector SVG Icon (100% Retina Sharp)
    if (shortcut.icon) {
      const vector = <VectorIcon name={shortcut.icon} />
      if (vector) return vector
    }

    // 3. Dynamic Favicon Fetching directly from target address
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

    // 4. Clean Fallback badge
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
      onClick={handleClick}
      className="flex flex-col items-center justify-start w-full group/icon cursor-pointer select-none transition-transform duration-200 hover:scale-105 active:scale-95"
      title={`${shortcut.title} (${shortcut.url})`}
    >
      {/* App Squircle */}
      <div
        className={`${squircleSize} rounded-2xl overflow-hidden shadow-md group-hover/icon:shadow-xl transition-all duration-300 ring-1 ring-white/10 group-hover/icon:ring-white/40 flex items-center justify-center relative bg-white/5 backdrop-blur-sm flex-shrink-0`}
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
