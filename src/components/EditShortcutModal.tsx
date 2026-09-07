import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Shortcut } from '../types'

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
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0])
  const [iconStyle, setIconStyle] = useState<'auto' | 'official' | 'optimized'>('auto')

  useEffect(() => {
    if (shortcut) {
      setTitle(shortcut.title)
      setUrl(shortcut.url || '')
      setSelectedColor(shortcut.bgColor || COLOR_OPTIONS[0])
      setIconStyle(shortcut.iconStyle || 'auto')
    }
  }, [shortcut])

  if (!isOpen || !shortcut) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSave({
      ...shortcut,
      title: title.trim(),
      url: shortcut.isFolder ? undefined : url.trim(),
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
