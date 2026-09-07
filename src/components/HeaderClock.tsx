import React, { useState, useEffect } from 'react'
import { getLunarDateString, getWeekdayName } from '../utils/lunar'

export const HeaderClock: React.FC = () => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const timeString = `${hours}:${minutes}`

  const month = now.getMonth() + 1
  const date = now.getDate()
  const weekday = getWeekdayName(now)
  const lunar = getLunarDateString(now)

  return (
    <div className="flex flex-col items-center justify-center text-white drop-shadow-md select-none transition-transform hover:scale-105 duration-300">
      <h1 className="text-7xl md:text-8xl font-light tracking-tight tracking-wider drop-shadow-lg font-sans">
        {timeString}
      </h1>
      <div className="mt-2 text-sm md:text-base font-normal tracking-wide text-white/90 flex items-center space-x-3 drop-shadow">
        <span>{month}月{date}日</span>
        <span>{weekday}</span>
        <span>{lunar}</span>
      </div>
    </div>
  )
}
