import React from 'react'
import { X, Sparkles, Layout, Settings, Compass } from 'lucide-react'

interface GuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-zinc-900/95 border border-white/20 rounded-2xl shadow-2xl p-6 text-white backdrop-blur-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-semibold">iTab 新手引导与使用说明</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs leading-relaxed text-white/80">
          <div className="flex items-start space-x-3 bg-white/5 p-3 rounded-xl border border-white/5">
            <Layout className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">全功能卡片与小组件</span>
              <p>
                包含 i天气 (6日预报)、下一个假期倒数、A股大盘指数、实时热搜榜 (保留微博与知乎)、纪念日、撕历日历、下班倒计时 (实时动态时薪) 以及电影日历。
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-white/5 p-3 rounded-xl border border-white/5">
            <Settings className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">高度个性化设置</span>
              <p>
                点击“设置”图标，支持切换壁纸（高清动漫壁纸 / 截图原图 / 必应每日 / 自定义图床）、调整纪念日基准、下班时间与城市，并支持导出/导入配置备份。
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-white/5 p-3 rounded-xl border border-white/5">
            <Compass className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block mb-0.5">Vercel 一键零配置部署</span>
              <p>
                本项目采用标准的 Vite + React + Tailwind CSS 纯静态架构，构建仅需几百毫秒。只需在 GitHub 新建 `iTab-Home` 仓库推送代码，直接在 Vercel 导入即可免费高速访问！
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs bg-sky-500 hover:bg-sky-400 text-white font-medium rounded-xl shadow-lg transition-colors"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  )
}
