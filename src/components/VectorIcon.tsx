import React from 'react'

export interface VectorIconProps {
  name: string
  variant?: 'official' | 'optimized'
  className?: string
}

export const VectorIcon: React.FC<VectorIconProps> = ({ name, variant = 'official' }) => {
  switch (name) {
    case 'v2ex':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-[#333344] flex items-center justify-center select-none shadow-inner">
            <span className="font-mono font-black text-xs tracking-wider text-white">
              V<span className="text-[#FFCC00]">2</span>EX
            </span>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-white flex items-center justify-center text-[#18181B]">
          <svg className="w-6 h-6 fill-none stroke-current stroke-[3.5] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      )

    case 'feedly':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-2">
            <svg className="w-full h-full fill-[#2BB24C]" viewBox="0 0 24 24">
              <path d="M4 16.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5S7.88 19 6.5 19 4 17.88 4 16.5zm0-7c0-1.1.9-2 2-2 4.41 0 8 3.59 8 8 0 1.1-.9 2-2 2s-2-.9-2-2c0-2.21-1.79-4-4-4-1.1 0-2-.9-2-2zm0-7c0-1.1.9-2 2-2 8.28 0 15 6.72 15 15 0 1.1-.9 2-2 2s-2-.9-2-2C17 9.04 11.96 4 5.71 4 4.77 4 4 3.23 4 2.5z" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#2BB24C] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 16.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5S7.88 19 6.5 19 4 17.88 4 16.5zm0-7c0-1.1.9-2 2-2 4.41 0 8 3.59 8 8 0 1.1-.9 2-2 2s-2-.9-2-2c0-2.21-1.79-4-4-4-1.1 0-2-.9-2-2zm0-7c0-1.1.9-2 2-2 8.28 0 15 6.72 15 15 0 1.1-.9 2-2 2s-2-.9-2-2C17 9.04 11.96 4 5.71 4 4.77 4 4 3.23 4 2.5z" />
          </svg>
        </div>
      )

    case 'twitter':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-[#1DA1F2] flex items-center justify-center text-white">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-black flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      )

    case 'metaso':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-[#2055FF] flex items-center justify-center overflow-hidden">
            <img src="/icons/metaso.png" alt="秘塔AI" className="w-full h-full object-cover scale-[1.15]" />
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#2955FF] flex items-center justify-center p-1.5">
          <img src="/icons/metaso.png" alt="秘塔AI" className="w-full h-full object-contain scale-110" />
        </div>
      )

    case 'zhihu':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
            <div className="w-full h-full bg-[#0084FF] rounded-[14px] flex items-center justify-center text-white font-bold text-xl select-none font-serif shadow-xs">
              知
            </div>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#0066FF] flex items-center justify-center text-white font-bold text-2xl select-none font-serif">
          知
        </div>
      )

    case 'bilibili':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
            <svg className="w-8 h-8" viewBox="0 0 100 100">
              <path d="M35 24 L20 9 M65 24 L80 9" stroke="#00A1D6" strokeWidth="6.5" strokeLinecap="round" />
              <rect x="12" y="24" width="76" height="62" rx="16" fill="#FB7299" />
              <rect x="18" y="30" width="64" height="50" rx="10" fill="#FFFFFF" />
              <circle cx="36" cy="52" r="4.5" fill="#212121" />
              <circle cx="64" cy="52" r="4.5" fill="#212121" />
              <path d="M44 60 Q50 66 56 60" fill="none" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="28" cy="58" rx="4" ry="2" fill="#FFA5C0" />
              <ellipse cx="72" cy="58" rx="4" ry="2" fill="#FFA5C0" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#FB7299] flex items-center justify-center text-white">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z" />
          </svg>
        </div>
      )

    case 'youtube':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 24 24">
              <path
                fill="#FF0000"
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
              />
              <polygon fill="#FFFFFF" points="9.545,15.568 9.545,8.432 15.818,12" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#FF0000] flex items-center justify-center text-white">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <polygon points="9.5,7.5 16.5,12 9.5,16.5" />
          </svg>
        </div>
      )

    case 'gemini':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-2">
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="gemini-official-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A73E8" />
                  <stop offset="50%" stopColor="#8AB4F8" />
                  <stop offset="100%" stopColor="#C58AF9" />
                </linearGradient>
              </defs>
              <path fill="url(#gemini-official-grad)" d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-gradient-to-tr from-[#1A73E8] via-[#8AB4F8] to-[#9333EA] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-white drop-shadow" viewBox="0 0 24 24">
            <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
          </svg>
        </div>
      )

    case 'aistudio':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-2">
            <img src="/icons/aistudio.png" alt="Google AI Studio" className="w-full h-full object-contain" />
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#1F1F1F] flex items-center justify-center p-2">
          <img src="/icons/aistudio.png" alt="Google AI Studio" className="w-full h-full object-contain" />
        </div>
      )

    case 'gmail':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-2">
            <svg className="w-7 h-7" viewBox="52 42 88 66">
              <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
              <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
              <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
              <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
              <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#EA4335] flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-none stroke-white stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
      )

    case 'yuanbao':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
            <img src="/icons/yuanbao.png" alt="腾讯元宝" className="w-full h-full object-contain" />
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#00D06C] flex items-center justify-center p-1">
          <img src="/icons/yuanbao.png" alt="腾讯元宝" className="w-full h-full object-contain scale-110" />
        </div>
      )

    case 'smzdm':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
            <div className="w-full h-full bg-[#F04141] rounded-full flex items-center justify-center text-white font-black text-xl shadow-xs">
              值
            </div>
          </div>
        )
      }
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
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-2">
            <svg className="w-7 h-7 fill-black" viewBox="0 0 24 24">
              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.02-1.1635a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.402-.6863zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.6608zm-12.641 4.1348l-2.02-1.1635a.0804.0804 0 0 1-.038-.052V6.067a4.4992 4.4992 0 0 1 7.3709-3.4537l-.142.0805-4.7736 2.7582a.7948.7948 0 0 0-.3973.6813zm1.1072-2.399l2.796-1.6136 2.796 1.6136v3.2273l-2.796 1.6136-2.796-1.6136z" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#10A37F] flex items-center justify-center text-white p-2">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
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
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-2">
            <svg className="w-7 h-7 fill-[#F38020]" viewBox="0 0 24 24">
              <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#F38020] flex items-center justify-center p-2 text-white">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727" />
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
        <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
          <img src="/icons/cpa-usage-keeper.png" alt="CPA Keeper" className="w-full h-full object-contain" />
        </div>
      )

    case 'cli-proxy':
      return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img src="/icons/cliproxyapi.png" alt="CLI Proxy API" className="w-full h-full object-cover scale-[1.05]" />
        </div>
      )

    case 'cpa-usage':
      return (
        <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
          <img src="/icons/cpa-usage-keeper.png" alt="CPA Usage" className="w-full h-full object-contain" />
        </div>
      )

    case 'codex-usage':
      return (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center p-2">
          <img src="/icons/cpa-usage-keeper.png" alt="Codex Usage" className="w-full h-full object-contain" />
        </div>
      )

    case 'linuxdo':
      return (
        <div className="w-full h-full bg-black flex items-center justify-center select-none">
          <div className="w-7 h-7 rounded-full overflow-hidden flex flex-col border border-white/20 shadow-xs">
            <div className="h-[34%] bg-black w-full" />
            <div className="h-[33%] bg-[#F59E0B] w-full" />
            <div className="h-[33%] bg-white w-full" />
          </div>
        </div>
      )

    case 'taobao':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
            <div className="w-full h-full bg-[#FF5000] rounded-[14px] flex items-center justify-center text-white font-bold text-xl select-none shadow-xs">
              淘
            </div>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#FF5000] flex items-center justify-center text-white font-bold text-2xl select-none">
          淘
        </div>
      )

    case 'jd':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
            <div className="w-full h-full bg-[#E1251B] rounded-[14px] flex items-center justify-center text-white shadow-xs">
              <div className="w-6 h-5 bg-white rounded-full flex items-center justify-center text-[#E1251B] text-xs font-black">
                🐶
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#E1251B] flex flex-col items-center justify-center text-white select-none">
          <div className="w-7 h-6 bg-white rounded-full flex items-center justify-center text-[#E1251B] text-xs font-black">
            🐶
          </div>
        </div>
      )

    case 'weibo':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-2">
            <svg className="w-7 h-7" viewBox="0 0 100 100">
              <path d="M72 26 C82 36 82 50 74 60" fill="none" stroke="#FDBE02" strokeWidth="6" strokeLinecap="round" />
              <path d="M84 18 C98 32 98 56 86 70" fill="none" stroke="#FDBE02" strokeWidth="7" strokeLinecap="round" />
              <ellipse cx="44" cy="62" rx="34" ry="24" fill="#E6162D" transform="rotate(-15 44 62)" />
              <ellipse cx="40" cy="59" rx="26" ry="17" fill="#FFFFFF" transform="rotate(-15 40 59)" />
              <circle cx="42" cy="58" r="9" fill="#181818" />
              <circle cx="45" cy="55" r="3" fill="#FFFFFF" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-gradient-to-tr from-[#E6162D] via-[#FA2F3B] to-[#FF8200] flex items-center justify-center text-white">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.977.42-1.804 0-2.404-.781-1.112-2.915-1.053-5.364-.03 0 0-.766.331-.571-.271.376-1.217.315-2.224-.27-2.809-1.338-1.337-4.869.045-7.888 3.08C1.309 10.87 0 13.273 0 15.348c0 3.981 5.099 6.395 10.086 6.395 6.536 0 10.888-3.801 10.888-6.82 0-1.822-1.547-2.854-2.915-3.284v.01zm1.908-5.092c-.766-.856-1.908-1.187-2.96-.962-.436.09-.706.511-.616.932.09.42.511.691.932.602.511-.105 1.067.044 1.442.465.376.421.466.977.316 1.473-.136.406.089.856.51.992.405.119.857-.105.992-.512.33-1.021.12-2.178-.646-3.035l.03.045zm2.418-2.195c-1.576-1.757-3.905-2.419-6.054-1.968-.496.104-.812.587-.706 1.081.104.496.586.813 1.082.707 1.532-.331 3.185.15 4.296 1.383 1.112 1.246 1.429 2.943.947 4.416-.165.48.106 1.007.586 1.157.479.165.991-.104 1.157-.586.675-2.088.241-4.478-1.338-6.235l.03.045z" />
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
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
            <div className="w-full h-full bg-[#00B51D] rounded-[14px] flex items-center justify-center text-white font-bold text-xl select-none shadow-xs">
              豆
            </div>
          </div>
        )
      }
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
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
            <div className="w-full h-full bg-[#FF2442] rounded-[14px] flex items-center justify-center p-1 shadow-xs">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M22.405 9.879c.002.016.01.02.07.019h.725a.797.797 0 0 0 .78-.972.794.794 0 0 0-.884-.618.795.795 0 0 0-.692.794c0 .101-.002.666.001.777zm-11.509 4.808c-.203.001-1.353.004-1.685.003a2.528 2.528 0 0 1-.766-.126.025.025 0 0 0-.03.014L7.7 16.127a.025.025 0 0 0 .01.032c.111.06.336.124.495.124.66.01 1.32.002 1.981 0 .01 0 .02-.006.023-.015l.712-1.545a.025.025 0 0 0-.024-.036zM.477 9.91c-.071 0-.076.002-.076.01a.834.834 0 0 0-.01.08c-.027.397-.038.495-.234 3.06-.012.24-.034.389-.135.607-.026.057-.033.042.003.112.046.092.681 1.523.787 1.74.008.015.011.02.017.02.008 0 .033-.026.047-.044.147-.187.268-.391.371-.606.306-.635.44-1.325.486-1.706.014-.11.021-.22.03-.33l.204-2.616.022-.293c.003-.029 0-.033-.03-.034zm7.203 3.757a1.427 1.427 0 0 1-.135-.607c-.004-.084-.031-.39-.235-3.06a.443.443 0 0 0-.01-.082c-.004-.011-.052-.008-.076-.008h-1.48c-.03.001-.034.005-.03.034l.021.293c.076.982.153 1.964.233 2.946.05.4.186 1.085.487 1.706.103.215.223.419.37.606.015.018.037.051.048.049.02-.003.742-1.642.804-1.765.036-.07.03-.055.003-.112zm3.861-.913h-.872a.126.126 0 0 1-.116-.178l1.178-2.625a.025.025 0 0 0-.023-.035l-1.318-.003a.148.148 0 0 1-.135-.21l.876-1.954a.025.025 0 0 0-.023-.035h-1.56c-.01 0-.02.006-.024.015l-.926 2.068c-.085.169-.314.634-.399.938a.534.534 0 0 0-.02.191.46.46 0 0 0 .23.378.981.981 0 0 0 .46.119h.59c.041 0-.688 1.482-.834 1.972a.53.53 0 0 0-.023.172.465.465 0 0 0 .23.398c.15.092.342.12.475.12l1.66-.001c.01 0 .02-.006.023-.015l.575-1.28a.025.025 0 0 0-.024-.035zm-6.93-4.937H3.1a.032.032 0 0 0-.034.033c0 1.048-.01 2.795-.01 6.829 0 .288-.269.262-.28.262h-.74c-.04.001-.044.004-.04.047.001.037.465 1.064.555 1.263.01.02.03.033.051.033.157.003.767.009.938-.014.153-.02.3-.06.438-.132.3-.156.49-.419.595-.765.052-.172.075-.353.075-.533.002-2.33 0-4.66-.007-6.991a.032.032 0 0 0-.032-.032zm11.784 6.896c0-.014-.01-.021-.024-.022h-1.465c-.048-.001-.049-.002-.05-.049v-4.66c0-.072-.005-.07.07-.07h.863c.08 0 .075.004.075-.074V8.393c0-.082.006-.076-.08-.076h-3.5c-.064 0-.075-.006-.075.073v1.445c0 .083-.006.077.08.077h.854c.075 0 .07-.004.07.07v4.624c0 .095.008.084-.085.084-.37 0-1.11-.002-1.304 0-.048.001-.06.03-.06.03l-.697 1.519s-.014.025-.008.036c.006.01.013.008.058.008 1.748.003 3.495.002 5.243.002.03-.001.034-.006.035-.033v-1.539zm4.177-3.43c0 .013-.007.023-.02.024-.346.006-.692.004-1.037.004-.014-.002-.022-.01-.022-.024-.005-.434-.007-.869-.01-1.303 0-.072-.006-.071.07-.07l.733-.003c.041 0 .081.002.12.015.093.025.16.107.165.204.006.431.002 1.153.001 1.153zm2.67.244a1.953 1.953 0 0 0-.883-.222h-.18c-.04-.001-.04-.003-.042-.04V10.21c0-.132-.007-.263-.025-.394a1.823 1.823 0 0 0-.153-.53 1.533 1.533 0 0 0-.677-.71 2.167 2.167 0 0 0-1-.258c-.153-.003-.567 0-.72 0-.07 0-.068.004-.068-.065V7.76c0-.031-.01-.041-.046-.039H17.93s-.016 0-.023.007c-.006.006-.008.012-.008.023v.546c-.008.036-.057.015-.082.022h-.95c-.022.002-.028.008-.03.032v1.481c0 .09-.004.082.082.082h.913c.082 0 .072.128.072.128V11.19s.003.117-.06.117h-1.482c-.068 0-.06.082-.06.082v1.445s-.01.068.064.068h1.457c.082 0 .076-.006.076.079v3.225c0 .088-.007.081.082.081h1.43c.09 0 .082.007.082-.08v-3.27c0-.029.006-.035.033-.035l2.323-.003c.098 0 .191.02.28.061a.46.46 0 0 1 .274.407c.008.395.003.79.003 1.185 0 .259-.107.367-.33.367h-1.218c-.023.002-.029.008-.028.033.184.437.374.871.57 1.303a.045.045 0 0 0 .04.026c.17.005.34.002.51.003.15-.002.517.004.666-.01a2.03 2.03 0 0 0 .408-.075c.59-.18.975-.698.976-1.313v-1.981c0-.128-.01-.254-.034-.38 0 .078-.029-.641-.724-.998z" />
              </svg>
            </div>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#FF2442] flex items-center justify-center text-white">
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M22.405 9.879c.002.016.01.02.07.019h.725a.797.797 0 0 0 .78-.972.794.794 0 0 0-.884-.618.795.795 0 0 0-.692.794c0 .101-.002.666.001.777zm-11.509 4.808c-.203.001-1.353.004-1.685.003a2.528 2.528 0 0 1-.766-.126.025.025 0 0 0-.03.014L7.7 16.127a.025.025 0 0 0 .01.032c.111.06.336.124.495.124.66.01 1.32.002 1.981 0 .01 0 .02-.006.023-.015l.712-1.545a.025.025 0 0 0-.024-.036zM.477 9.91c-.071 0-.076.002-.076.01a.834.834 0 0 0-.01.08c-.027.397-.038.495-.234 3.06-.012.24-.034.389-.135.607-.026.057-.033.042.003.112.046.092.681 1.523.787 1.74.008.015.011.02.017.02.008 0 .033-.026.047-.044.147-.187.268-.391.371-.606.306-.635.44-1.325.486-1.706.014-.11.021-.22.03-.33l.204-2.616.022-.293c.003-.029 0-.033-.03-.034zm7.203 3.757a1.427 1.427 0 0 1-.135-.607c-.004-.084-.031-.39-.235-3.06a.443.443 0 0 0-.01-.082c-.004-.011-.052-.008-.076-.008h-1.48c-.03.001-.034.005-.03.034l.021.293c.076.982.153 1.964.233 2.946.05.4.186 1.085.487 1.706.103.215.223.419.37.606.015.018.037.051.048.049.02-.003.742-1.642.804-1.765.036-.07.03-.055.003-.112zm3.861-.913h-.872a.126.126 0 0 1-.116-.178l1.178-2.625a.025.025 0 0 0-.023-.035l-1.318-.003a.148.148 0 0 1-.135-.21l.876-1.954a.025.025 0 0 0-.023-.035h-1.56c-.01 0-.02.006-.024.015l-.926 2.068c-.085.169-.314.634-.399.938a.534.534 0 0 0-.02.191.46.46 0 0 0 .23.378.981.981 0 0 0 .46.119h.59c.041 0-.688 1.482-.834 1.972a.53.53 0 0 0-.023.172.465.465 0 0 0 .23.398c.15.092.342.12.475.12l1.66-.001c.01 0 .02-.006.023-.015l.575-1.28a.025.025 0 0 0-.024-.035zm-6.93-4.937H3.1a.032.032 0 0 0-.034.033c0 1.048-.01 2.795-.01 6.829 0 .288-.269.262-.28.262h-.74c-.04.001-.044.004-.04.047.001.037.465 1.064.555 1.263.01.02.03.033.051.033.157.003.767.009.938-.014.153-.02.3-.06.438-.132.3-.156.49-.419.595-.765.052-.172.075-.353.075-.533.002-2.33 0-4.66-.007-6.991a.032.032 0 0 0-.032-.032zm11.784 6.896c0-.014-.01-.021-.024-.022h-1.465c-.048-.001-.049-.002-.05-.049v-4.66c0-.072-.005-.07.07-.07h.863c.08 0 .075.004.075-.074V8.393c0-.082.006-.076-.08-.076h-3.5c-.064 0-.075-.006-.075.073v1.445c0 .083-.006.077.08.077h.854c.075 0 .07-.004.07.07v4.624c0 .095.008.084-.085.084-.37 0-1.11-.002-1.304 0-.048.001-.06.03-.06.03l-.697 1.519s-.014.025-.008.036c.006.01.013.008.058.008 1.748.003 3.495.002 5.243.002.03-.001.034-.006.035-.033v-1.539zm4.177-3.43c0 .013-.007.023-.02.024-.346.006-.692.004-1.037.004-.014-.002-.022-.01-.022-.024-.005-.434-.007-.869-.01-1.303 0-.072-.006-.071.07-.07l.733-.003c.041 0 .081.002.12.015.093.025.16.107.165.204.006.431.002 1.153.001 1.153zm2.67.244a1.953 1.953 0 0 0-.883-.222h-.18c-.04-.001-.04-.003-.042-.04V10.21c0-.132-.007-.263-.025-.394a1.823 1.823 0 0 0-.153-.53 1.533 1.533 0 0 0-.677-.71 2.167 2.167 0 0 0-1-.258c-.153-.003-.567 0-.72 0-.07 0-.068.004-.068-.065V7.76c0-.031-.01-.041-.046-.039H17.93s-.016 0-.023.007c-.006.006-.008.012-.008.023v.546c-.008.036-.057.015-.082.022h-.95c-.022.002-.028.008-.03.032v1.481c0 .09-.004.082.082.082h.913c.082 0 .072.128.072.128V11.19s.003.117-.06.117h-1.482c-.068 0-.06.082-.06.082v1.445s-.01.068.064.068h1.457c.082 0 .076-.006.076.079v3.225c0 .088-.007.081.082.081h1.43c.09 0 .082.007.082-.08v-3.27c0-.029.006-.035.033-.035l2.323-.003c.098 0 .191.02.28.061a.46.46 0 0 1 .274.407c.008.395.003.79.003 1.185 0 .259-.107.367-.33.367h-1.218c-.023.002-.029.008-.028.033.184.437.374.871.57 1.303a.045.045 0 0 0 .04.026c.17.005.34.002.51.003.15-.002.517.004.666-.01a2.03 2.03 0 0 0 .408-.075c.59-.18.975-.698.976-1.313v-1.981c0-.128-.01-.254-.034-.38 0 .078-.029-.641-.724-.998z" />
          </svg>
        </div>
      )

    case 'settings':
      return (
        <div className="w-full h-full bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-800 flex items-center justify-center text-white">
          <svg className="w-6 h-6 fill-none stroke-white stroke-2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
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
        <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
          <img src="/icons/sublinkpro.png" alt="SublinkPro" className="w-full h-full object-contain" />
        </div>
      )

    case '3x-ui':
      return (
        <div className="w-full h-full bg-[#0284C7] flex items-center justify-center text-white select-none">
          <span className="font-mono font-black text-sm tracking-tighter">3X</span>
        </div>
      )

    case 'claude':
      if (variant === 'official') {
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img src="/icons/claude.png" alt="Claude" className="w-full h-full object-cover" />
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#CC785C] flex items-center justify-center p-2 text-white">
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v3.1a1.5 1.5 0 0 1-3 0V3.5A1.5 1.5 0 0 1 12 2zm0 13.9a1.5 1.5 0 0 1 1.5 1.5v3.1a1.5 1.5 0 0 1-3 0v-3.1a1.5 1.5 0 0 1 1.5-1.5zm10-4.4a1.5 1.5 0 0 1-1.5 1.5h-3.1a1.5 1.5 0 0 1 0-3h3.1A1.5 1.5 0 0 1 22 11.5zm-13.9 0a1.5 1.5 0 0 1-1.5 1.5H3.5a1.5 1.5 0 0 1 0-3h3.1a1.5 1.5 0 0 1 1.5 1.5zm10.97-6.97a1.5 1.5 0 0 1 0 2.12l-2.19 2.19a1.5 1.5 0 1 1-2.12-2.12l2.19-2.19a1.5 1.5 0 0 1 2.12 0zm-9.8 9.8a1.5 1.5 0 0 1 0 2.12l-2.19 2.19a1.5 1.5 0 1 1-2.12-2.12l2.19-2.19a1.5 1.5 0 0 1 2.12 0zm9.8 2.12a1.5 1.5 0 0 1-2.12 0l-2.19-2.19a1.5 1.5 0 0 1 2.12-2.12l2.19 2.19a1.5 1.5 0 0 1 0 2.12zM6.85 6.85a1.5 1.5 0 0 1-2.12 0L2.54 4.66a1.5 1.5 0 1 1 2.12-2.12l2.19 2.19a1.5 1.5 0 0 1 0 2.12z" />
          </svg>
        </div>
      )

    case 'deepseek':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
            <img src="/icons/deepseek.png" alt="DeepSeek" className="w-full h-full object-contain" />
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#4D6BFE] to-[#2B4BF2] flex items-center justify-center p-1.5 text-white">
          <img src="/icons/deepseek.png" alt="DeepSeek" className="w-full h-full object-contain brightness-0 invert" />
        </div>
      )

    case 'kimi':
      if (variant === 'official') {
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img src="/icons/kimi.png" alt="Kimi" className="w-full h-full object-cover" />
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#18181B] to-[#0A0A0C] flex items-center justify-center text-white font-black text-2xl select-none tracking-tighter relative">
          <span>K</span>
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] absolute top-2.5 right-3"></span>
        </div>
      )

    case 'qwen':
    case 'tongyi':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center p-2 text-[#625CF6]">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 51 51">
              <path d="M23.4166,39.5714L26.0038,35.0473L33.5055,21.929000000000002L39.1954,21.929000000000002C39.1954,21.929000000000002,44.1081,30.5232,44.1081,30.5232L38.933800000000005,30.5232L36.348600000000005,25.9991L26.0019,44.0955L23.4147,39.5714L23.4166,39.5714ZM10.48465,16.9508L15.65706,16.9508L18.2423,21.474899999999998L25.7422,34.597L22.8992,39.5752L13.0718,39.5752C13.0718,39.5752,15.65894,35.0473,15.65894,35.0473L20.831400000000002,35.0473C20.831400000000002,35.0473,10.48465,16.9508,10.48465,16.9508ZM15.91483,16.49858L20.8295,7.904448L23.4166,12.42857L20.8295,16.9527L41.5229,16.9527L38.9376,21.474899999999998L18.7616,21.474899999999998L15.91483,16.49858ZM20.8295,7.00000289931C20.6695,7.00000289931,20.5152,7.0437057,20.381700000000002,7.121609C20.2481,7.199513,20.1333,7.313519,20.0524,7.452225L15.65518,15.14381L15.13775,16.04635L10.48277,16.04635C10.32283,16.04635,10.16855,16.090049999999998,10.03496,16.16796C9.90137,16.24586,9.78659,16.35987,9.70757,16.49858L7.12042,21.0227C7.0413946,21.1614,7,21.3191,7,21.474899999999998C7,21.630699999999997,7.0395126,21.7884,7.12042,21.9271L12.03506,30.5232L9.70757,34.5951C9.628540000000001,34.7357,9.58715,34.8915,9.58715,35.0473C9.58715,35.2031,9.628540000000001,35.3608,9.70757,35.4995L12.29471,40.0236C12.37374,40.1624,12.48851,40.2764,12.6221,40.3543C12.757570000000001,40.4322,12.909980000000001,40.4759,13.06991,40.4759L22.8973,40.4759L25.2248,44.5478C25.3847,44.8271,25.6801,45,26,45L31.1724,45C31.3323,45,31.4866,44.9563,31.6202,44.8784C31.7538,44.8005,31.8686,44.6865,31.9476,44.5478L36.862300000000005,35.9517L41.5172,35.9517C41.6772,35.9517,41.8315,35.908,41.965,35.8301C42.0986,35.7522,42.2134,35.6382,42.2924,35.4995L44.8796,30.9754C44.9605,30.8367,45,30.679,45,30.5232C45,30.3674,44.9605,30.2097,44.8796,30.071L40.4843,22.3813L39.9668,21.474899999999998L42.2943,17.404899999999998C42.3733,17.266199999999998,42.4147,17.1085,42.4147,16.9527C42.4147,16.796889999999998,42.3752,16.63918,42.2943,16.50047L39.7072,11.97635C39.6281,11.83764,39.5134,11.72363,39.3798,11.64573C39.2462,11.56783,39.0919,11.52413,38.932,11.52413L29.1027,11.52413L26.7752,7.452222C26.6153,7.172908,26.3199,7,26,7L20.8276,7L20.8295,7.00000289931Z" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#625CF6] to-[#7B61FF] flex items-center justify-center p-2 text-white">
          <svg className="w-8 h-8 fill-white" viewBox="0 0 51 51">
            <path d="M23.4166,39.5714L26.0038,35.0473L33.5055,21.929000000000002L39.1954,21.929000000000002C39.1954,21.929000000000002,44.1081,30.5232,44.1081,30.5232L38.933800000000005,30.5232L36.348600000000005,25.9991L26.0019,44.0955L23.4147,39.5714L23.4166,39.5714ZM10.48465,16.9508L15.65706,16.9508L18.2423,21.474899999999998L25.7422,34.597L22.8992,39.5752L13.0718,39.5752C13.0718,39.5752,15.65894,35.0473,15.65894,35.0473L20.831400000000002,35.0473C20.831400000000002,35.0473,10.48465,16.9508,10.48465,16.9508ZM15.91483,16.49858L20.8295,7.904448L23.4166,12.42857L20.8295,16.9527L41.5229,16.9527L38.9376,21.474899999999998L18.7616,21.474899999999998L15.91483,16.49858ZM20.8295,7.00000289931C20.6695,7.00000289931,20.5152,7.0437057,20.381700000000002,7.121609C20.2481,7.199513,20.1333,7.313519,20.0524,7.452225L15.65518,15.14381L15.13775,16.04635L10.48277,16.04635C10.32283,16.04635,10.16855,16.090049999999998,10.03496,16.16796C9.90137,16.24586,9.78659,16.35987,9.70757,16.49858L7.12042,21.0227C7.0413946,21.1614,7,21.3191,7,21.474899999999998C7,21.630699999999997,7.0395126,21.7884,7.12042,21.9271L12.03506,30.5232L9.70757,34.5951C9.628540000000001,34.7357,9.58715,34.8915,9.58715,35.0473C9.58715,35.2031,9.628540000000001,35.3608,9.70757,35.4995L12.29471,40.0236C12.37374,40.1624,12.48851,40.2764,12.6221,40.3543C12.757570000000001,40.4322,12.909980000000001,40.4759,13.06991,40.4759L22.8973,40.4759L25.2248,44.5478C25.3847,44.8271,25.6801,45,26,45L31.1724,45C31.3323,45,31.4866,44.9563,31.6202,44.8784C31.7538,44.8005,31.8686,44.6865,31.9476,44.5478L36.862300000000005,35.9517L41.5172,35.9517C41.6772,35.9517,41.8315,35.908,41.965,35.8301C42.0986,35.7522,42.2134,35.6382,42.2924,35.4995L44.8796,30.9754C44.9605,30.8367,45,30.679,45,30.5232C45,30.3674,44.9605,30.2097,44.8796,30.071L40.4843,22.3813L39.9668,21.474899999999998L42.2943,17.404899999999998C42.3733,17.266199999999998,42.4147,17.1085,42.4147,16.9527C42.4147,16.796889999999998,42.3752,16.63918,42.2943,16.50047L39.7072,11.97635C39.6281,11.83764,39.5134,11.72363,39.3798,11.64573C39.2462,11.56783,39.0919,11.52413,38.932,11.52413L29.1027,11.52413L26.7752,7.452222C26.6153,7.172908,26.3199,7,26,7L20.8276,7L20.8295,7.00000289931Z" />
          </svg>
        </div>
      )

    case 'perplexity':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
            <img src="/icons/perplexity.png" alt="Perplexity" className="w-full h-full object-cover scale-[1.05]" />
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#20808D] flex items-center justify-center text-white p-2">
          <svg className="w-6 h-6 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
            <path d="M12 3v18M6 7l12 10M6 17L18 7M3 12h18" />
          </svg>
        </div>
      )

    case 'google':
      return (
        <div className="w-full h-full bg-white flex items-center justify-center p-2">
          <svg className="w-7 h-7" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.44 7.33 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.56 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
          </svg>
        </div>
      )

    case 'google-drive':
      return (
        <div className="w-full h-full bg-white flex items-center justify-center p-2">
          <svg className="w-7 h-7" viewBox="0 0 87.3 78">
            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
            <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
          </svg>
        </div>
      )

    case 'chrome-store':
      return (
        <div className="w-full h-full bg-white flex items-center justify-center p-1.5">
          <img src="/icons/chrome-store.png" alt="Chrome 网上应用店" className="w-full h-full object-contain" />
        </div>
      )

    case 'vercel':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-black flex items-center justify-center text-white">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M12 3L22 20H2L12 3Z" />
            </svg>
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-white border border-white/10">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12 3L22 20H2L12 3Z" />
          </svg>
        </div>
      )

    case 'xueqiu':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
            <img src="/icons/xueqiu.png" alt="雪球" className="w-full h-full object-cover" />
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#1855B8] flex items-center justify-center overflow-hidden">
          <img src="/icons/xueqiu.png" alt="雪球" className="w-full h-full object-cover" />
        </div>
      )

    case 'manmanbuy':
      if (variant === 'official') {
        return (
          <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
            <img src="/icons/manmanbuy.png" alt="慢慢买" className="w-full h-full object-cover" />
          </div>
        )
      }
      return (
        <div className="w-full h-full bg-[#FF4438] flex items-center justify-center overflow-hidden">
          <img src="/icons/manmanbuy.png" alt="慢慢买" className="w-full h-full object-cover" />
        </div>
      )

    case 'workbuddy':
      // Official WorkBuddy app icon is a self-contained SVG with its own
      // rounded-corner gradient background — render it edge-to-edge for both
      // variants so it looks like a native app icon at any size.
      return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img src="/icons/workbuddy.svg" alt="WorkBuddy" className="w-full h-full object-cover" />
        </div>
      )

    default:
      return null
  }
}
