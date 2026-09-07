import React, { useState, useEffect } from 'react'

interface WorkCountdownCardProps {
  offWorkTime?: string
  monthlySalary?: number
  workDaysPerMonth?: number
}

export const WorkCountdownCard: React.FC<WorkCountdownCardProps> = ({
  offWorkTime = '18:00',
  monthlySalary = 20000,
  workDaysPerMonth = 21.75,
}) => {
  const [countdown, setCountdown] = useState('08:30:00')
  const [earnedToday, setEarnedToday] = useState('75.706')
  const [daysToFriday, setDaysToFriday] = useState(4)

  useEffect(() => {
    const updateStats = () => {
      const now = new Date()
      const [targetH, targetM] = offWorkTime.split(':').map(Number)

      const target = new Date(now)
      target.setHours(targetH, targetM, 0, 0)

      let diff = target.getTime() - now.getTime()
      if (diff <= 0) {
        setCountdown('00:00:00')
      } else {
        const totalSeconds = Math.floor(diff / 1000)
        const h = Math.floor(totalSeconds / 3600)
        const m = Math.floor((totalSeconds % 3600) / 60)
        const s = totalSeconds % 60
        setCountdown(
          `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        )
      }

      const currentDay = now.getDay()
      const diffToFriday = currentDay <= 5 ? 5 - currentDay : 7 - currentDay + 5
      setDaysToFriday(diffToFriday)

      const workStart = new Date(now)
      workStart.setHours(9, 0, 0, 0)
      const dailySalary = monthlySalary / workDaysPerMonth
      const perSecondSalary = dailySalary / (8 * 3600)

      let workedSeconds = Math.floor((now.getTime() - workStart.getTime()) / 1000)
      if (workedSeconds < 0) workedSeconds = 0
      if (workedSeconds > 8 * 3600) workedSeconds = 8 * 3600

      const currentEarned = workedSeconds * perSecondSalary
      setEarnedToday(currentEarned.toFixed(3))
    }

    updateStats()
    const timer = setInterval(updateStats, 1000)
    return () => clearInterval(timer)
  }, [offWorkTime, monthlySalary, workDaysPerMonth])

  return (
    <div className="flex flex-col items-center w-full group">
      {/* Card container */}
      <div className="w-full h-[140px] rounded-2xl bg-white shadow-xl p-3 flex justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative">
        {/* Left side content */}
        <div className="flex flex-col justify-between flex-1 z-10 mr-1">
          <div>
            <span className="text-xs font-medium text-zinc-500">下班还有</span>
            <div className="text-2xl font-bold tracking-tight text-zinc-800 font-mono mt-0.5">
              {countdown}
            </div>
          </div>

          {/* 4 Bottom mini badge blocks */}
          <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-zinc-100">
            <div className="bg-zinc-50 rounded-lg p-1 text-center flex flex-col justify-center">
              <span className="text-[9px] text-zinc-400">发薪</span>
              <span className="text-[10px] font-semibold text-zinc-700">3 天</span>
            </div>
            <div className="bg-zinc-50 rounded-lg p-1 text-center flex flex-col justify-center">
              <span className="text-[9px] text-zinc-400">周五</span>
              <span className="text-[10px] font-semibold text-zinc-700">{daysToFriday} 天</span>
            </div>
            <div className="bg-zinc-50 rounded-lg p-1 text-center flex flex-col justify-center">
              <span className="text-[9px] text-zinc-400">教师节</span>
              <span className="text-[10px] font-semibold text-zinc-700">3 天</span>
            </div>
            <div className="bg-zinc-50 rounded-lg p-1 text-center flex flex-col justify-center overflow-hidden">
              <span className="text-[9px] text-zinc-400 truncate">今天赚了</span>
              <span className="text-[9px] font-semibold text-amber-600 truncate font-mono">
                {earnedToday}¥
              </span>
            </div>
          </div>
        </div>

        {/* Right side 3D Cat illustration */}
        <div className="w-24 h-full flex items-center justify-center flex-shrink-0 -mr-1">
          <img
            src="/assets/cat_mascot.jpg"
            alt="Cat Mascot"
            className="w-20 h-20 object-contain drop-shadow-md hover:rotate-3 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Under-card text label */}
      <span className="mt-1.5 text-xs text-white/75 font-normal tracking-wide drop-shadow-sm select-none group-hover:text-white transition-colors">
        下班倒计时
      </span>
    </div>
  )
}
