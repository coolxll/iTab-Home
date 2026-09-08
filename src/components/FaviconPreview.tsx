import React, { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'
import { getFaviconCandidates } from '../utils/favicon'

interface FaviconPreviewProps {
  url?: string
  title?: string
  bgColor?: string
  className?: string
}

/**
 * Live favicon preview that walks the same candidate chain as the desktop
 * icon (apple-touch-icon -> favicon.ico -> Google/local asset). Renders the
 * first candidate that loads; falls back to the title badge while loading or
 * when every candidate fails.
 */
export const FaviconPreview: React.FC<FaviconPreviewProps> = ({
  url,
  title,
  bgColor,
  className = '',
}) => {
  const [candidateIndex, setCandidateIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const candidates = getFaviconCandidates(url || '')

  // Restart the chain whenever the URL changes
  useEffect(() => {
    setCandidateIndex(0)
    setLoaded(false)
    setFailed(false)
  }, [url])

  const handleError = () => {
    setLoaded(false)
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex(candidateIndex + 1)
    } else {
      setFailed(true)
    }
  }

  const current = !failed && candidateIndex < candidates.length ? candidates[candidateIndex] : null
  const isAppleTouchIcon = current?.includes('apple-touch-icon')

  return (
    <div
      className={`w-full h-full ${
        bgColor || 'bg-white'
      } flex items-center justify-center relative overflow-hidden ${className}`}
    >
      {/* Title badge underneath while loading or when all candidates failed */}
      {(!loaded || !current) && (
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
          {title ? title.slice(0, 2) : <Globe className="w-5 h-5 text-white/70" />}
        </div>
      )}
      {current && (
        <img
          key={current}
          src={current}
          alt=""
          onLoad={(e) => {
            const img = e.currentTarget
            if (img.naturalWidth > 1 && img.naturalHeight > 1) {
              setLoaded(true)
            } else {
              handleError()
            }
          }}
          onError={handleError}
          className={`w-full h-full ${
            isAppleTouchIcon ? 'object-cover' : 'object-contain p-2'
          } transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}
