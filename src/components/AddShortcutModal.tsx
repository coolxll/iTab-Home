import React, { useState } from 'react'
import { X, Globe, FolderPlus, Sparkles } from 'lucide-react'
import type { Shortcut } from '../types'
import { VectorIcon } from './VectorIcon'
import { hasVectorIcon, inferVectorIcon, POPULAR_ICON_OPTIONS } from '../utils/vectorIcons'

interface AddShortcutModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (shortcut: Shortcut) => void
  targetFolderId?: string | null
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

export const AddShortcutModal: React.FC<AddShortcutModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  targetFolderId,
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'folder'>('link')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0])
  const [customIcon, setCustomIcon] = useState<string>('')

  if (!isOpen) return null

  const inferredIcon = inferVectorIcon(title, url)
  const effectiveIcon = customIcon || inferredIcon

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    if (activeTab === 'folder') {
      const newFolder: Shortcut = {
        id: `folder-${Date.now()}`,
        title: title.trim(),
        isFolder: true,
        bgColor: selectedColor,
        children: [],
      }
      onAdd(newFolder)
    } else {
      if (!url.trim()) return
      let finalUrl = url.trim()
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = `https://${finalUrl}`
      }

      const newShortcut: Shortcut = {
        id: `custom-${Date.now()}`,
        title: title.trim(),
        url: finalUrl,
        icon: effectiveIcon,
        bgColor: selectedColor,
      }
      onAdd(newShortcut)
    }

    setTitle('')
    setUrl('')
    setCustomIcon('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-zinc-900/95 border border-white/20 rounded-2xl shadow-2xl p-6 text-white backdrop-blur-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-base font-semibold">
            {targetFolderId ? '添加到文件夹' : '添加快捷方式'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher (only when adding to main desktop) */}
        {!targetFolderId && (
          <div className="grid grid-cols-2 gap-2 mt-4 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('link')}
              className={`flex items-center justify-center space-x-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'link'
                  ? 'bg-sky-500 text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>添加网页图标</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('folder')}
              className={`flex items-center justify-center space-x-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'folder'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <FolderPlus className="w-4 h-4" />
              <span>新建文件夹</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              {activeTab === 'folder' ? '文件夹名称' : '名称'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={activeTab === 'folder' ? '例如: 常用开发、影音媒体' : '例如: 个人博客、Proxmox'}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-sky-400"
            />
          </div>

          {activeTab === 'link' && (
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

          {activeTab === 'link' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-white/70 flex items-center space-x-1">
                  <span>图标与预览</span>
                </label>
                {effectiveIcon && (
                  <span className="text-[11px] text-sky-400 font-normal flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{customIcon ? `已选: ${effectiveIcon}` : `已自动匹配: ${effectiveIcon}`}</span>
                  </span>
                )}
              </div>

              {/* Real-time Preview card */}
              <div className="flex items-center space-x-3 p-2.5 bg-white/5 border border-white/10 rounded-xl mb-2.5">
                <div className="w-11 h-11 rounded-[16px] overflow-hidden flex items-center justify-center bg-white/10 flex-shrink-0 shadow-sm border border-white/10">
                  {effectiveIcon && hasVectorIcon(effectiveIcon) ? (
                    <VectorIcon name={effectiveIcon} variant="official" />
                  ) : (
                    <div className={`w-full h-full ${selectedColor} flex items-center justify-center text-white font-bold text-xs`}>
                      {title ? title.slice(0, 2) : <Globe className="w-5 h-5 text-white/70" />}
                    </div>
                  )}
                </div>
                <div className="text-xs text-white/60 leading-relaxed">
                  {effectiveIcon ? (
                    <p className="text-white/90">
                      已绑定 <span className="text-sky-300 font-semibold">{effectiveIcon}</span> 官方高清图标，无网络依赖，秒级渲染。
                    </p>
                  ) : (
                    <p>
                      未指定内置图标，添加后将自动探测该网址的官方/内网 Favicon。
                    </p>
                  )}
                </div>
              </div>

              {/* Popular quick selector chips */}
              <div>
                <div className="text-[11px] text-white/50 mb-1.5">快速选择热门图标：</div>
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

          <div>
            <label className="block text-xs font-medium text-white/70 mb-2">背景色彩</label>
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
              确定创建
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
