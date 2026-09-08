import React, { useState } from 'react'
import { X, Globe, Sparkles } from 'lucide-react'
import type { Shortcut } from '../types'
import { VectorIcon } from './VectorIcon'
import { FaviconPreview } from './FaviconPreview'
import { FAVICON_ICON } from '../utils/favicon'
import { hasVectorIcon, inferVectorIcon, POPULAR_ICON_OPTIONS } from '../utils/vectorIcons'

interface EditShortcutModalProps {
  isOpen: boolean
  shortcut: Shortcut | null
  onClose: () => void
  onSave: (updated: Shortcut) => void
}

const COLOR_OPTIONS = [
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-zinc-800',
  'bg-black',
]

export const EditShortcutModal: React.FC<EditShortcutModalProps> = ({
  isOpen,
  shortcut,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(shortcut?.title || '')
  const [url, setUrl] = useState(shortcut?.url || '')
  const [selectedColor, setSelectedColor] = useState(shortcut?.bgColor || COLOR_OPTIONS[0])
  const [iconStyle, setIconStyle] = useState<'auto' | 'official' | 'optimized'>(
    shortcut?.iconStyle || 'auto'
  )
  const [customIcon, setCustomIcon] = useState<string>(shortcut?.icon || '')

  if (!isOpen || !shortcut) return null

  const inferredIcon = inferVectorIcon(title, url)
  const effectiveIcon = customIcon || inferredIcon
  const useFavicon = effectiveIcon === FAVICON_ICON
  const previewIcon = useFavicon ? undefined : effectiveIcon

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSave({
      ...shortcut,
      title: title.trim(),
      url: shortcut.isFolder ? undefined : url.trim(),
      icon: effectiveIcon || undefined,
      bgColor: selectedColor,
      iconStyle,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-zinc-900/95 border border-white/20 rounded-2xl shadow-2xl p-6 text-white backdrop-blur-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-base font-semibold">
            {shortcut.isFolder ? '编辑文件夹' : '编辑网页快捷方式'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">名称</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-sky-400"
            />
          </div>

          {!shortcut.isFolder && (
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">网址 (URL)</label>
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-sky-400"
              />
            </div>
          )}

          {!shortcut.isFolder && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-white/70 flex items-center space-x-1">
                  <span>图标与预览</span>
                </label>
                {useFavicon ? (
                  <span className="text-[11px] text-emerald-400 font-normal">
                    🌐 将使用网站原生 Favicon
                  </span>
                ) : (
                  effectiveIcon && (
                    <span className="text-[11px] text-sky-400 font-normal flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{customIcon ? `已选: ${effectiveIcon}` : `已自动匹配: ${effectiveIcon}`}</span>
                    </span>
                  )
                )}
              </div>

              {/* Real-time Preview card */}
              <div className="flex items-center space-x-3 p-2.5 bg-white/5 border border-white/10 rounded-xl mb-2.5">
                <div className="w-11 h-11 rounded-[16px] overflow-hidden flex items-center justify-center bg-white/10 flex-shrink-0 shadow-sm border border-white/10">
                  {useFavicon ? (
                    <FaviconPreview url={url} title={title} bgColor={selectedColor} />
                  ) : previewIcon && hasVectorIcon(previewIcon) ? (
                    <VectorIcon name={previewIcon} variant={iconStyle === 'optimized' ? 'optimized' : 'official'} />
                  ) : (
                    <div className={`w-full h-full ${selectedColor} flex items-center justify-center text-white font-bold text-xs`}>
                      {title ? title.slice(0, 2) : <Globe className="w-5 h-5 text-white/70" />}
                    </div>
                  )}
                </div>
                <div className="text-xs text-white/60 leading-relaxed">
                  {useFavicon ? (
                    <p className="text-white/90">
                      将实时抓取并展示该网站的 <span className="text-emerald-300 font-semibold">原生 Favicon</span>（预览即所得），不再使用内置图标。
                    </p>
                  ) : previewIcon ? (
                    <p className="text-white/90">
                      已绑定 <span className="text-sky-300 font-semibold">{previewIcon}</span> 官方矢量/高清图标，不受内网或网络阻断影响。
                    </p>
                  ) : (
                    <p>
                      未绑定内置图标，系统将尝试探测并展示该网址的原生 Favicon。
                    </p>
                  )}
                </div>
              </div>

              {/* Popular quick selector chips */}
              <div className="mb-2">
                <div className="text-[11px] text-white/50 mb-1.5">切换或重设内置图标：</div>
                <div className="flex items-center gap-1.5 flex-wrap max-h-24 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => setCustomIcon('')}
                    className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                      !customIcon
                        ? 'border-sky-400 bg-sky-500/20 text-sky-300 shadow-xs'
                        : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    ✨ 智能识别
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomIcon(FAVICON_ICON)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                      customIcon === FAVICON_ICON
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-xs'
                        : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    🌐 网站 Favicon
                  </button>
                  {POPULAR_ICON_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCustomIcon(item.id)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                        customIcon === item.id
                          ? 'border-sky-400 bg-sky-500/20 text-sky-300 shadow-xs'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!shortcut.isFolder && (
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">图标风格版本</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setIconStyle('auto')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                    iconStyle === 'auto'
                      ? 'border-sky-400 bg-sky-500/20 text-white shadow-xs'
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  跟随全局
                </button>
                <button
                  type="button"
                  onClick={() => setIconStyle('official')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                    iconStyle === 'official'
                      ? 'border-sky-400 bg-sky-500/20 text-white shadow-xs'
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  🏛️ 官方版
                </button>
                <button
                  type="button"
                  onClick={() => setIconStyle('optimized')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                    iconStyle === 'optimized'
                      ? 'border-sky-400 bg-sky-500/20 text-white shadow-xs'
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  🎨 优化版
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-white/70 mb-2">图标背景色</label>
            <div className="flex items-center space-x-2 flex-wrap gap-y-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`w-6 h-6 rounded-full ${c} transition-transform ${
                    selectedColor === c ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-sky-500 hover:bg-sky-400 text-white font-medium rounded-xl shadow-lg transition-colors"
            >
              保存修改
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
