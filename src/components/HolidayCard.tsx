import React from 'react'
import { DEFAULT_HOLIDAYS } from '../data/defaults'

export const HolidayCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center group">
      {/* Card container */}
      <div className="w-36 h-36 rounded-2xl p-3 bg-black/45 backdrop-blur-xl border border-white/10 shadow-xl text-white flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer hover:bg-black/50">
        <div className="flex flex-col justify-around h-full space-y-1.5">
          {DEFAULT_HOLIDAYS.map((holiday, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-1 last:border-0 last:pb-0">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-white/90">{holiday.name}</span>
                <span className="text-[10px] text-white/40">{holiday.dateRange}</span>
              </div>
              <div className="flex items-baseline space-x-0.5">
                <span className="text-sm font-semibold text-white/95">{holiday.daysRemaining}</span>
                <span className="text-[10px] text-white/60">天</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Under-card text label */}
      <span className="mt-1.5 text-xs text-white/75 font-normal tracking-wide drop-shadow-sm select-none group-hover:text-white transition-colors">
        下一个假期
      </span>
    </div>
  )
}
