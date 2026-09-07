import React, { useState } from 'react'
import { X, RotateCcw, Download, Upload } from 'lucide-react'
import type { UserSettings } from '../types'
import { DEFAULT_SETTINGS } from '../utils/storage'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  settings: UserSettings
  onSave: (settings: UserSettings) => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [current, setCurrent] = useState<UserSettings>(settings)

  if (!isOpen) return null

  const handleSave = () => {
    onSave(current)
    onClose()
  }

  const handleReset = () => {
    if (window.confirm('确定要恢复初始默认设置吗？已添加的自定义图标也将重置。')) {
      setCurrent(DEFAULT_SETTINGS)
      onSave(DEFAULT_SETTINGS)
      onClose()
    }
  }

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(current, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `itab-settings-${Date.now()}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string)
        setCurrent({ ...DEFAULT_SETTINGS, ...parsed })
        alert('配置导入成功！点击保存即可应用。')
      } catch {
        alert('文件解析失败，请确保是有效的 JSON 配置文件。')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-900/95 border border-white/20 rounded-2xl shadow-2xl p-6 text-white backdrop-blur-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-base font-semibold">首选项与小组件设置</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-5">
          {/* Wallpaper selection */}
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2">背景壁纸</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  setCurrent({
                    ...current,
                    wallpaperType: 'default',
                    wallpaper: '/wallpapers/default.jpg',
                  })
                }
                className={`p-2 rounded-xl border text-center transition-all ${
                  current.wallpaperType === 'default'
                    ? 'border-sky-400 bg-sky-500/20 text-white font-medium'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                高清动漫壁纸
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrent({
                    ...current,
                    wallpaperType: 'original',
                    wallpaper: '/wallpapers/original_screenshot.png',
                  })
                }
                className={`p-2 rounded-xl border text-center transition-all ${
                  current.wallpaperType === 'original'
                    ? 'border-sky-400 bg-sky-500/20 text-white font-medium'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                原图截图背景
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrent({
                    ...current,
                    wallpaperType: 'bing',
                    wallpaper: 'https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN',
                  })
                }
                className={`p-2 rounded-xl border text-center transition-all ${
                  current.wallpaperType === 'bing'
                    ? 'border-sky-400 bg-sky-500/20 text-white font-medium'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                必应每日壁纸
              </button>
            </div>
            {/* Custom wallpaper input */}
            <div className="mt-2">
              <input
                type="text"
                value={current.wallpaper}
                onChange={(e) =>
                  setCurrent({
                    ...current,
                    wallpaperType: 'custom',
                    wallpaper: e.target.value,
                  })
                }
                placeholder="或输入自定义图片 URL..."
                className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-xs focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          {/* Anniversary date */}
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1">
              纪念日基准日期 (计算在世界上多少天)
            </label>
            <input
              type="date"
              value={current.birthDate}
              onChange={(e) => setCurrent({ ...current, birthDate: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-sky-400"
            />
          </div>

          {/* Work countdown and salary stats */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">下班目标时间</label>
              <input
                type="time"
                value={current.offWorkTime}
                onChange={(e) => setCurrent({ ...current, offWorkTime: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">天气所在城市</label>
              <input
                type="text"
                value={current.city}
                onChange={(e) => setCurrent({ ...current, city: e.target.value })}
                placeholder="例如: 浦东新区"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          {/* Salary ticker */}
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1">
              月薪数值 (用于实时计算今天赚了多少钱 ¥)
            </label>
            <input
              type="number"
              value={current.monthlySalary}
              onChange={(e) => setCurrent({ ...current, monthlySalary: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-sky-400"
            />
          </div>

          {/* Backup and restore */}
          <div className="pt-2 border-t border-white/10">
            <label className="block text-xs font-semibold text-white/80 mb-2">备份与重置</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center space-x-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs text-white/90 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>导出配置</span>
              </button>
              <label className="flex items-center space-x-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs text-white/90 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>导入配置</span>
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center space-x-1 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-xl text-xs transition-colors ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重置为默认</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-sm bg-sky-500 hover:bg-sky-400 text-white font-medium rounded-xl shadow-lg transition-colors"
          >
            保存并应用
          </button>
        </div>
      </div>
    </div>
  )
}
