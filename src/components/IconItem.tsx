import React from 'react'
import { Settings, Puzzle, Lightbulb, Plus } from 'lucide-react'
import type { Shortcut } from '../types'

interface IconItemProps {
  shortcut: Shortcut
  size?: 'normal' | 'large'
  onClick?: () => void
}

export const IconItem: React.FC<IconItemProps> = ({ shortcut, size = 'normal', onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (shortcut.isSpecial || onClick) {
      e.preventDefault()
      onClick?.()
    } else if (shortcut.url) {
      window.open(shortcut.url, '_blank')
    }
  }

  const renderIconGraphic = () => {
    switch (shortcut.icon) {
      case 'settings':
        return (
          <div className="w-full h-full bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center text-white">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </div>
        )
      case 'chrome-apps':
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
      case 'taobao':
        return (
          <div className="w-full h-full bg-[#FF5000] flex items-center justify-center text-white font-bold text-xl select-none">
            淘
          </div>
        )
      case 'jd':
        return (
          <div className="w-full h-full bg-[#E1251B] flex flex-col items-center justify-center text-white select-none">
            <div className="w-6 h-5 bg-white rounded-full flex items-center justify-center text-[#E1251B] text-[10px] font-black">
              🐶
            </div>
          </div>
        )
      case 'weibo':
        return (
          <div className="w-full h-full bg-gradient-to-tr from-[#E6162D] to-[#FAAC18] flex items-center justify-center text-white">
            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
              <path d="M10.07 20.93c-4.49.52-8.41-1.63-8.77-4.8-.36-3.17 3.02-6.17 7.51-6.69 4.49-.52 8.41 1.63 8.77 4.8.36 3.17-3.02 6.17-7.51 6.69zm-1.07-2.31c.36.08.76-.08.89-.37.13-.29-.03-.6-.39-.68-.36-.08-.75.08-.88.37-.13.3.02.6.38.68zm1.96-1.39c-.14.03-.28.12-.34.25-.13.3.02.6.38.68.36.08.76-.08.89-.37.13-.3-.02-.6-.38-.68-.18-.04-.37-.01-.55.12zm1.8-4.22c-1.87-.22-3.8.44-4.83 1.76-1.06 1.36-.88 3.13.43 4.23 1.48 1.25 3.73 1.15 5.38.07 1.83-1.2 2.37-3.23 1.48-4.71-.62-1.04-1.84-1.65-3.08-1.79l.62.44zm8.6-4.63c-.88-.47-1.94-.3-2.58.37-.41.43-.49 1.05-.23 1.57.51 1.03.35 2.27-.41 3.12-.76.85-1.96 1.08-3.01.58-.52-.25-1.14-.14-1.54.29-.4.43-.44 1.06-.11 1.54.99 1.45 2.8 2.05 4.54 1.49 1.74-.56 2.95-2.07 3.04-3.89.07-1.82-.93-3.51-2.5-4.27l-.2-.8z" />
            </svg>
          </div>
        )
      case 'coze':
        return (
          <div className="w-full h-full bg-[#6042EC] flex items-center justify-center text-white">
            <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>
          </div>
        )
      case 'douban':
        return (
          <div className="w-full h-full bg-[#007722] flex items-center justify-center text-white font-bold text-xl select-none">
            豆
          </div>
        )
      case '10jqka':
        return (
          <div className="w-full h-full bg-[#E60012] flex items-center justify-center text-white">
            <span className="text-xl font-bold">♠️</span>
          </div>
        )
      case 'doubao':
        return (
          <div className="w-full h-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white">
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm border border-white flex items-center justify-center text-xs font-bold">
              AI
            </div>
          </div>
        )
      case 'xiaohongshu':
        return (
          <div className="w-full h-full bg-[#FF2442] flex items-center justify-center text-white font-bold text-xs p-1 select-none">
            小红书
          </div>
        )
      case 'guide':
        return (
          <div className="w-full h-full bg-[#F59E0B] flex items-center justify-center text-white">
            <Lightbulb className="w-6 h-6" />
          </div>
        )
      case 'extensions':
        return (
          <div className="w-full h-full bg-zinc-600 flex items-center justify-center text-white">
            <Puzzle className="w-6 h-6" />
          </div>
        )
      case 'v2ex':
        return (
          <div className="w-full h-full bg-[#1F1F1F] flex items-center justify-center text-white font-black text-2xl select-none tracking-tighter">
            V
          </div>
        )
      case 'feedly':
        return (
          <div className="w-full h-full bg-[#2BB24C] flex items-center justify-center text-white font-bold text-lg select-none">
            ☵
          </div>
        )
      case 'twitter':
        return (
          <div className="w-full h-full bg-black flex items-center justify-center text-white">
            <span className="font-sans text-2xl font-bold">𝕏</span>
          </div>
        )
      case 'metaso':
        return (
          <div className="w-full h-full bg-[#2955FF] flex items-center justify-center text-white font-bold text-sm select-none">
            秘塔
          </div>
        )
      case 'zhihu':
        return (
          <div className="w-full h-full bg-[#0066FF] flex items-center justify-center text-white font-bold text-xl select-none">
            知
          </div>
        )
      case 'bilibili':
        return (
          <div className="w-full h-full bg-[#FB7299] flex items-center justify-center text-white font-bold text-sm select-none">
            bili
          </div>
        )
      case 'youtube':
        return (
          <div className="w-full h-full bg-[#FF0000] flex items-center justify-center text-white">
            <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[12px] border-l-white ml-0.5" />
          </div>
        )
      case 'gemini':
        return (
          <div className="w-full h-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white">
            <span className="text-xl">✦</span>
          </div>
        )
      case 'aistudio':
        return (
          <div className="w-full h-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white font-mono text-xs">
            &gt;_
          </div>
        )
      case 'gmail':
        return (
          <div className="w-full h-full bg-white flex items-center justify-center text-[#EA4335] font-black text-2xl">
            M
          </div>
        )
      case 'yuanbao':
        return (
          <div className="w-full h-full bg-[#00C853] flex items-center justify-center text-white font-bold text-sm">
            元宝
          </div>
        )
      case 'tongyi':
        return (
          <div className="w-full h-full bg-[#615CED] flex items-center justify-center text-white font-bold text-sm">
            千问
          </div>
        )
      case 'smzdm':
        return (
          <div className="w-full h-full bg-[#F04141] flex items-center justify-center text-white font-bold text-xl select-none">
            值
          </div>
        )
      case 'nga':
        return (
          <div className="w-full h-full bg-[#3A220F] flex items-center justify-center text-[#E5C28C] font-bold text-[10px] tracking-tighter select-none">
            NGA
          </div>
        )
      case 'github':
        return (
          <div className="w-full h-full bg-black flex items-center justify-center text-white">
            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </div>
        )
      case 'chatgpt':
        return (
          <div className="w-full h-full bg-[#10A37F] flex items-center justify-center text-white">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.02-1.1635a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.402-.6863zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.6608zm-12.641 4.1348l-2.02-1.1635a.0804.0804 0 0 1-.038-.052V6.067a4.4992 4.4992 0 0 1 7.3709-3.4537l-.142.0805-4.7736 2.7582a.7948.7948 0 0 0-.3973.6813zm1.1072-2.399l2.796-1.6136 2.796 1.6136v3.2273l-2.796 1.6136-2.796-1.6136z" />
            </svg>
          </div>
        )
      case 'homepage':
        return (
          <div className="w-full h-full bg-[#3B82F6] flex items-center justify-center text-white">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
        )
      case 'cloudflare':
        return (
          <div className="w-full h-full bg-[#F38020] flex items-center justify-center text-white">
            <span className="text-xl">☁️</span>
          </div>
        )
      case 'rn-proxy':
        return (
          <div className="w-full h-full bg-[#FF8800] flex items-center justify-center text-white font-mono font-bold text-xs">
            PROXY
          </div>
        )
      case 'cpa-keeper':
        return (
          <div className="w-full h-full bg-[#FF9900] flex items-center justify-center text-white font-bold text-[11px]">
            Keeper
          </div>
        )
      case 'cli-proxy':
        return (
          <div className="w-full h-full bg-[#E11D48] flex items-center justify-center text-white font-bold text-xs">
            CPA
          </div>
        )
      case 'cpa-usage':
        return (
          <div className="w-full h-full bg-[#EF4444] flex items-center justify-center text-white font-bold text-[10px]">
            USAGE
          </div>
        )
      case 'codex-usage':
        return (
          <div className="w-full h-full bg-[#EA580C] flex items-center justify-center text-white font-bold text-[10px]">
            Codex
          </div>
        )
      case 'linuxdo':
        return (
          <div className="w-full h-full bg-black flex items-center justify-center text-white">
            <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-black text-xs font-black">
              🐧
            </div>
          </div>
        )
      case 'plus':
        return (
          <div className="w-full h-full bg-[#0091FF] flex items-center justify-center text-white">
            <Plus className="w-6 h-6" />
          </div>
        )
      default:
        return (
          <div className={`w-full h-full ${shortcut.bgColor || 'bg-blue-500'} flex items-center justify-center text-white font-bold text-sm`}>
            {shortcut.title.slice(0, 2)}
          </div>
        )
    }
  }

  const squircleSize = size === 'large' ? 'w-12 h-12' : 'w-11 h-11'

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center group/icon cursor-pointer select-none transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      {/* App Squircle */}
      <div
        className={`${squircleSize} rounded-2xl overflow-hidden shadow-md group-hover/icon:shadow-xl transition-all duration-300 ring-1 ring-white/10 group-hover/icon:ring-white/40 flex items-center justify-center`}
      >
        {renderIconGraphic()}
      </div>

      {/* Label under icon */}
      <span className="mt-1 text-[11px] text-white/90 font-normal tracking-wide drop-shadow text-center max-w-[64px] truncate group-hover/icon:text-white transition-colors">
        {shortcut.title}
      </span>
    </div>
  )
}
