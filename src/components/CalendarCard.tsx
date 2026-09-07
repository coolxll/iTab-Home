import React, { useState, useEffect } from 'react'
import { getLunarDateString, getDayOfYear, getWeekOfYear, getWeekdayName } from '../utils/lunar'

export const CalendarCard: React.FC = () => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const dayOfYear = getDayOfYear(now)
  const weekOfYear = getWeekOfYear(now)
  const weekdayShort = getWeekdayName(now, true)
  const lunar = getLunarDateString(now)

  return (
    <div className="flex flex-col items-center group">
      {/* Tear-off desk calendar container */}
      <div className="w-36 h-36 rounded-2xl bg-white shadow-xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
        {/* Top red header banner */}
        <div className="bg-[#FF4D4F] py-1.5 px-3 text-white text-center shadow-sm">
          <span className="text-xs font-semibold tracking-wider">{year}年{month}月</span>
        </div>

        {/* Large center day number */}
        <div className="flex items-center justify-center flex-1">
          <span className="text-5xl font-bold text-zinc-800 tracking-tighter">
            {date}
          </span>
        </div>

        {/* Bottom footer text */}
        <div className="bg-zinc-50 border-t border-zinc-100 py-1.5 px-2 flex flex-col items-center text-[10px] text-zinc-500 font-medium space-y-0.5">
          <span>第{dayOfYear}天 第{weekOfYear}周</span>
          <span className="text-zinc-700">{lunar} {weekdayShort}</span>
        </div>
      </div>

      {/* Under-card text label */}
      <span className="mt-1.5 text-xs text-white/75 font-normal tracking-wide drop-shadow-sm select-none group-hover:text-white transition-colors">
        日历
      </span>
    </div>
  )
}
