import React, { useState } from 'react'
import { WEIBO_HOT, ZHIHU_HOT } from '../data/defaults'
import type { HotSearchItem } from '../types'

export const HotSearchCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weibo' | 'zhihu'>('weibo')

  const currentList: HotSearchItem[] = (activeTab === 'weibo' ? WEIBO_HOT : ZHIHU_HOT).slice(0, 4)

  const handleItemClick = (item: HotSearchItem) => {
    window.open(item.url, '_blank')
  }

  return (
    <div className="flex flex-col items-center group">
      {/* Card container */}
      <div className="w-64 h-36 rounded-2xl p-3 bg-black/45 backdrop-blur-xl border border-white/10 shadow-xl text-white flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        {/* Header tabs (Weibo & Zhihu only, Baidu omitted) */}
        <div className="flex items-center space-x-2 border-b border-white/10 pb-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('weibo')}
            className={`text-xs px-2 py-0.5 rounded-md transition-all ${
              activeTab === 'weibo'
                ? 'bg-white/20 text-white font-medium'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            微博
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('zhihu')}
            className={`text-xs px-2 py-0.5 rounded-md transition-all ${
              activeTab === 'zhihu'
                ? 'bg-white/20 text-white font-medium'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            知乎
          </button>
        </div>

        {/* Hot list items */}
        <div className="flex flex-col justify-between flex-1 pt-1.5 space-y-1">
          {currentList.map((item) => (
            <div
              key={item.rank}
              onClick={() => handleItemClick(item)}
              className="flex items-center justify-between text-xs group/item cursor-pointer hover:bg-white/5 px-1 py-0.5 rounded transition-colors"
            >
              <div className="flex items-center space-x-1.5 overflow-hidden pr-2">
                <span
                  className={`font-semibold text-[11px] w-3 flex-shrink-0 ${
                    item.rank <= 3 ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {item.rank}
                </span>
                <span className="text-[11px] text-white/90 truncate group-hover/item:text-sky-300 transition-colors">
                  {item.title}
                </span>
              </div>
              <span className="text-[10px] text-white/40 flex-shrink-0">{item.heat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Under-card text label */}
      <span className="mt-1.5 text-xs text-white/75 font-normal tracking-wide drop-shadow-sm select-none group-hover:text-white transition-colors">
        热搜榜
      </span>
    </div>
  )
}
