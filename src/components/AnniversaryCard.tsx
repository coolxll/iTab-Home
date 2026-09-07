import React from 'react'
import { getDaysAlive } from '../utils/lunar'

interface AnniversaryCardProps {
  birthDate: string
  onClick?: () => void
}

export const AnniversaryCard: React.FC<AnniversaryCardProps> = ({
  birthDate,
  onClick,
}) => {
  const days = getDaysAlive(birthDate)

  return (
    <div className="flex flex-col items-center w-full group">
      {/* Card container with moon background */}
      <div
        onClick={onClick}
        className="relative w-full h-[140px] rounded-2xl p-3.5 bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl text-white flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group/card"
      >
        {/* Moon image background with atmospheric glow */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen scale-110 group-hover/card:scale-125 transition-transform duration-700"
          style={{ backgroundImage: "url('/assets/moon.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <span className="text-xs font-normal text-white/80 drop-shadow">你在世界已经</span>
        </div>

        <div className="relative z-10 flex flex-col my-auto">
          <div className="flex items-baseline space-x-0.5">
            <span className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
              {days}
            </span>
            <span className="text-sm font-medium text-white/90">天</span>
          </div>
        </div>

        <div className="relative z-10">
          <span className="text-[11px] text-white/60 tracking-wider font-mono drop-shadow">
            {birthDate}
          </span>
        </div>
      </div>

      {/* Under-card text label */}
      <span className="mt-1.5 text-xs text-white/75 font-normal tracking-wide drop-shadow-sm select-none group-hover:text-white transition-colors">
        纪念日
      </span>
    </div>
  )
}
