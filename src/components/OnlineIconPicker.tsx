import React, { useEffect, useState } from 'react'
import { getOnlineIconCandidates, isIconUrl } from '../utils/favicon'

interface OnlineIconPickerProps {
  pageUrl: string
  /** Currently pinned icon (URL, builtin name, or 'favicon') */
  pinnedIcon: string
  onPick: (iconUrl: string) => void
}

interface ProbeState {
  status: 'loading' | 'ok' | 'fail'
  size: number
}

/**
 * Probes multiple third-party high-res icon providers for the given URL and
 * lets the user pin the sharpest result with one click. Each candidate is
 * rendered at real size so quality differences are immediately visible;
 * failures are hidden automatically.
 */
export const OnlineIconPicker: React.FC<OnlineIconPickerProps> = ({
  pageUrl,
  pinnedIcon,
  onPick,
}) => {
  const [candidates, setCandidates] = useState(() => getOnlineIconCandidates(pageUrl))
  const [probes, setProbes] = useState<Record<string, ProbeState>>({})

  useEffect(() => {
    setCandidates(getOnlineIconCandidates(pageUrl))
    setProbes({})
  }, [pageUrl])

  if (candidates.length === 0) return null

  const mark = (url: string, state: ProbeState) =>
    setProbes((prev) => ({ ...prev, [url]: state }))

  return (
    <div>
      <div className="text-[11px] text-white/50 mb-1.5">在线抓取高清图标（点击固定）：</div>
      <div className="flex items-center gap-2 flex-wrap">
        {candidates.map((c) => {
          const probe = probes[c.url]
          if (probe?.status === 'fail') return null
          const isActive = isIconUrl(pinnedIcon) && pinnedIcon === c.url
          return (
            <button
              key={c.url}
              type="button"
              title={`${c.label} 图标`}
              onClick={() => onPick(c.url)}
              className={`relative w-9 h-9 rounded-[10px] overflow-hidden border transition-all bg-white flex items-center justify-center ${
                isActive
                  ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-110'
                  : 'border-white/15 hover:border-white/40 hover:scale-105'
              }`}
            >
              <img
                src={c.url}
                alt={c.label}
                onLoad={(e) => {
                  const img = e.currentTarget
                  if (img.naturalWidth > 1 && img.naturalHeight > 1) {
                    mark(c.url, { status: 'ok', size: img.naturalWidth })
                  } else {
                    mark(c.url, { status: 'fail', size: 0 })
                  }
                }}
                onError={() => mark(c.url, { status: 'fail', size: 0 })}
                className="w-full h-full object-contain"
              />
              {/* Source badge */}
              <span className="absolute bottom-0 inset-x-0 text-center text-[7px] leading-[10px] font-bold text-white bg-black/55 backdrop-blur-[1px]">
                {c.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
