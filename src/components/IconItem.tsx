import React, { useState } from 'react'
import { Settings, Puzzle, Lightbulb, Plus, Globe } from 'lucide-react'
import type { Shortcut } from '../types'
import { getFaviconCandidates } from '../utils/favicon'

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

    // 2. High-fidelity Homelab & Specific Platform Brand Badges
    if (shortcut.icon === 'homepage') {
      return (
        <div className="w-full h-full bg-[#3B82F6] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </div>
      )
    }
    if (shortcut.icon === 'rn-proxy') {
      return (
        <div className="w-full h-full bg-[#FF8800] flex items-center justify-center p-2">
          <img
            src="/icons/cliproxyapi.png"
            alt="RN PROXY"
            className="w-full h-full object-contain"
            onError={() => {}}
          />
        </div>
      )
    }
    if (shortcut.icon === 'cpa-keeper') {
      return (
        <div className="w-full h-full bg-[#FF9900] flex items-center justify-center select-none">
          <span className="text-white font-black text-[12px] tracking-tight">Keeper</span>
        </div>
      )
    }
    if (shortcut.icon === 'cli-proxy') {
      return (
        <div className="w-full h-full bg-[#E11D48] flex items-center justify-center select-none">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="text-[#E11D48] font-black text-[11px]">CPA</span>
          </div>
        </div>
      )
    }
    if (shortcut.icon === 'cpa-usage') {
      return (
        <div className="w-full h-full bg-[#EF4444] flex items-center justify-center select-none">
          <span className="text-white font-black text-[11px] tracking-tight">USAGE</span>
        </div>
      )
    }
    if (shortcut.icon === 'codex-usage') {
      return (
        <div className="w-full h-full bg-[#EA580C] flex items-center justify-center select-none">
          <span className="text-white font-black text-[11px] tracking-tight">Codex</span>
        </div>
      )
    }
    if (shortcut.icon === 'cloudflare') {
      return (
        <div className="w-full h-full bg-[#F38020] flex items-center justify-center text-white">
          <span className="text-xl">☁️</span>
        </div>
      )
    }
    if (shortcut.icon === 'linuxdo') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center text-white select-none">
          <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-black text-xs font-black">
            🐧
          </div>
        </div>
      )
    }

    // 3. Dynamic Favicon Fetching directly from target address
    if (!imgError && candidates.length > 0) {
      return (
        <div
          className={`w-full h-full ${
            shortcut.bgColor || 'bg-white'
          } flex items-center justify-center p-2`}
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
      className="flex flex-col items-center group/icon cursor-pointer select-none transition-transform duration-200 hover:scale-110 active:scale-95"
      title={`${shortcut.title} (${shortcut.url})`}
    >
      {/* App Squircle */}
      <div
        className={`${squircleSize} rounded-2xl overflow-hidden shadow-md group-hover/icon:shadow-xl transition-all duration-300 ring-1 ring-white/10 group-hover/icon:ring-white/40 flex items-center justify-center relative bg-white/5 backdrop-blur-sm`}
      >
        {renderContent()}
      </div>

      {/* Label under icon */}
      <span className="mt-1 text-[11px] text-white/90 font-normal tracking-wide drop-shadow text-center max-w-[68px] truncate group-hover/icon:text-white transition-colors">
        {shortcut.title}
      </span>
    </div>
  )
}
