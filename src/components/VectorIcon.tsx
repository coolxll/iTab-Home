import React from 'react'

interface VectorIconProps {
  name: string
  className?: string
}

export const VectorIcon: React.FC<VectorIconProps> = ({ name }) => {
  switch (name) {
    case 'v2ex':
      return (
        <div className="w-full h-full bg-[#1F1F1F] flex items-center justify-center text-white font-black text-2xl tracking-tighter select-none">
          V
        </div>
      )
    case 'feedly':
      return (
        <div className="w-full h-full bg-[#2BB24C] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 16.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5S7.88 19 6.5 19 4 17.88 4 16.5zm0-7c0-1.1.9-2 2-2 4.41 0 8 3.59 8 8 0 1.1-.9 2-2 2s-2-.9-2-2c0-2.21-1.79-4-4-4-1.1 0-2-.9-2-2zm0-7c0-1.1.9-2 2-2 8.28 0 15 6.72 15 15 0 1.1-.9 2-2 2s-2-.9-2-2C17 9.04 11.96 4 5.71 4 4.77 4 4 3.23 4 2.5z" />
          </svg>
        </div>
      )
    case 'twitter':
      return (
        <div className="w-full h-full bg-black flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      )
    case 'metaso':
      return (
        <div className="w-full h-full bg-[#2955FF] flex items-center justify-center text-white font-bold select-none">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.5 19.5 7 12 10.5zm-8 4.5l8 4 8-4v3l-8 4-8-4v-3z" />
          </svg>
        </div>
      )
    case 'zhihu':
      return (
        <div className="w-full h-full bg-[#0066FF] flex items-center justify-center text-white font-bold text-2xl select-none font-serif">
          知
        </div>
      )
    case 'bilibili':
      return (
        <div className="w-full h-full bg-[#FB7299] flex items-center justify-center text-white">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M17.813 4.653h.854c1.51 0 2.733 1.224 2.733 2.734v9.88c0 1.51-1.224 2.734-2.733 2.734H5.333c-1.51 0-2.733-1.224-2.733-2.734V7.387c0-1.51 1.223-2.734 2.733-2.734h.854l-1.84-1.84a.8.8 0 1 1 1.132-1.132L8.2 4.407h7.6l2.722-2.726a.8.8 0 1 1 1.132 1.132l-1.841 1.84zM7.6 9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm8.8 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
          </svg>
        </div>
      )
    case 'youtube':
      return (
        <div className="w-full h-full bg-[#FF0000] flex items-center justify-center text-white">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
      )
    case 'gemini':
      return (
        <div className="w-full h-full bg-gradient-to-tr from-[#1A73E8] via-[#8AB4F8] to-[#9333EA] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-white drop-shadow" viewBox="0 0 24 24">
            <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
          </svg>
        </div>
      )
    case 'aistudio':
      return (
        <div className="w-full h-full bg-black flex items-center justify-center text-white">
          <div className="w-6 h-6 border-2 border-white rounded flex items-center justify-center font-mono font-bold text-xs">
            S
          </div>
        </div>
      )
    case 'gmail':
      return (
        <div className="w-full h-full bg-white flex items-center justify-center p-2.5">
          <svg className="w-full h-full" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" opacity="0.1" />
            <path fill="#4285F4" d="M20 4H4C2.9 4 2 4.9 2 6v1l10 6.25L22 7V6c0-1.1-.9-2-2-2z" />
            <path fill="#34A853" d="M2 7v11c0 1.1.9 2 2 2h3V9.5L2 7z" />
            <path fill="#EA4335" d="M22 7v11c0 1.1-.9 2-2 2h-3V9.5L22 7z" />
            <path fill="#FBBC05" d="M7 20h10V13.5L12 10.5 7 13.5z" />
          </svg>
        </div>
      )
    case 'yuanbao':
      return (
        <div className="w-full h-full bg-[#00C853] flex items-center justify-center text-white">
          <div className="w-6 h-5 rounded-full bg-white flex items-center justify-center text-[#00C853] font-bold text-xs">
            元
          </div>
        </div>
      )
    case 'tongyi':
      return (
        <div className="w-full h-full bg-[#615CED] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12 2L3 9v6l9 7 9-7V9l-9-7zm0 3.8l6 4.7v3.9l-6 4.7-6-4.7v-3.9l6-4.7z" />
          </svg>
        </div>
      )
    case 'smzdm':
      return (
        <div className="w-full h-full bg-[#F04141] flex items-center justify-center text-white font-black text-2xl select-none">
          值
        </div>
      )
    case 'nga':
      return (
        <div className="w-full h-full bg-[#3A220F] flex flex-col items-center justify-center text-[#E5C28C] select-none">
          <span className="font-black text-sm leading-none tracking-tight">NGA</span>
          <span className="text-[8px] scale-90 text-[#E5C28C]/80 font-mono">.CN</span>
        </div>
      )
    case 'github':
      return (
        <div className="w-full h-full bg-black flex items-center justify-center text-white">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
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
        <div className="w-full h-full bg-white flex items-center justify-center p-2">
          <svg className="w-full h-full fill-[#F38020]" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
          </svg>
        </div>
      )
    case 'rn-proxy':
      return (
        <div className="w-full h-full bg-[#FF8800] flex items-center justify-center text-white">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="12" cy="18" r="3" />
            <path d="M7.8 7.8L10.2 16.2M16.2 7.8L13.8 16.2M8.8 6h6.4" stroke="white" strokeWidth="1.8" fill="none" />
          </svg>
        </div>
      )
    case 'cpa-keeper':
      return (
        <div className="w-full h-full bg-[#FF9900] flex items-center justify-center select-none">
          <span className="text-white font-black text-[11px] tracking-tight">Keeper</span>
        </div>
      )
    case 'cli-proxy':
      return (
        <div className="w-full h-full bg-[#E11D48] flex items-center justify-center select-none">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="text-[#E11D48] font-black text-[10px]">CPA</span>
          </div>
        </div>
      )
    case 'cpa-usage':
      return (
        <div className="w-full h-full bg-[#EF4444] flex items-center justify-center select-none">
          <span className="text-white font-black text-[10px] tracking-tight">USAGE</span>
        </div>
      )
    case 'codex-usage':
      return (
        <div className="w-full h-full bg-[#EA580C] flex items-center justify-center select-none">
          <span className="text-white font-black text-[10px] tracking-tight">Codex</span>
        </div>
      )
    case 'linuxdo':
      return (
        <div className="w-full h-full bg-black flex items-center justify-center text-white select-none">
          <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-black text-xs font-black">
            🐧
          </div>
        </div>
      )
    case 'taobao':
      return (
        <div className="w-full h-full bg-[#FF5000] flex items-center justify-center text-white font-bold text-2xl select-none">
          淘
        </div>
      )
    case 'jd':
      return (
        <div className="w-full h-full bg-[#E1251B] flex flex-col items-center justify-center text-white select-none">
          <div className="w-7 h-6 bg-white rounded-full flex items-center justify-center text-[#E1251B] text-xs font-black">
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
        <div className="w-full h-full bg-[#007722] flex items-center justify-center text-white font-bold text-2xl select-none">
          豆
        </div>
      )
    case '10jqka':
      return (
        <div className="w-full h-full bg-[#E60012] flex items-center justify-center text-white">
          <span className="text-2xl font-bold">♠️</span>
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
        <div className="w-full h-full bg-[#FF2442] flex items-center justify-center text-white select-none">
          <span className="font-sans font-black text-[13px] tracking-tight drop-shadow-sm">小红书</span>
        </div>
      )
    case 'settings':
      return (
        <div className="w-full h-full bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-none stroke-white stroke-2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
      )
    case 'plus':
      return (
        <div className="w-full h-full bg-[#0091FF] flex items-center justify-center text-white">
          <svg className="w-7 h-7 fill-none stroke-white stroke-[2.5]" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      )
    case 'tinyauth':
      return (
        <div className="w-full h-full bg-[#2563EB] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-white drop-shadow-sm" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3 0 1.12-.61 2.1-1.5 2.6V16h-3v-3.4c-.89-.5-1.5-1.48-1.5-2.6 0-1.66 1.34-3 3-3z" />
          </svg>
        </div>
      )
    case 'beszel':
      return (
        <div className="w-full h-full bg-[#0284C7] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-none stroke-white stroke-2" viewBox="0 0 24 24">
            <path d="M3 12h4l3 8 4-16 3 8h4" />
          </svg>
        </div>
      )
    case 'komodo':
      return (
        <div className="w-full h-full bg-[#059669] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M4 6h16v3H4zm0 5h16v3H4zm0 5h16v3H4z" />
          </svg>
        </div>
      )
    case 'sublinkpro':
      return (
        <div className="w-full h-full bg-[#4F46E5] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
          </svg>
        </div>
      )
    case '3x-ui':
      return (
        <div className="w-full h-full bg-[#0284C7] flex items-center justify-center text-white select-none">
          <span className="font-mono font-black text-sm tracking-tighter">3X</span>
        </div>
      )
    default:
      return null
  }
}
