import React from 'react'

export const MovieCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full group">
      {/* Card container with poster background */}
      <div className="relative w-full h-[140px] rounded-2xl p-2.5 shadow-xl text-white flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group/card border border-white/10">
        {/* Background poster image with dark gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110"
          style={{ backgroundImage: "url('/assets/movie_poster.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none" />

        {/* Top right date */}
        <div className="relative z-10 flex justify-end">
          <div className="flex items-baseline space-x-1 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded text-white/90">
            <span className="text-sm font-bold">07</span>
            <span className="text-[9px] text-white/70">9月/周一</span>
          </div>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 flex flex-col space-y-1">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-semibold text-white truncate drop-shadow">
              《活色生香》
            </span>
            <span className="text-[9px] bg-[#E58026] text-white px-1 py-0.2 rounded font-medium">
              豆瓣 7.6
            </span>
          </div>
          <p className="text-[10px] text-white/75 line-clamp-2 leading-tight drop-shadow-sm font-light">
            上帝创造了鱼，不是为了填满大海，而是让...
          </p>
        </div>
      </div>

      {/* Under-card text label */}
      <span className="mt-1.5 text-xs text-white/75 font-normal tracking-wide drop-shadow-sm select-none group-hover:text-white transition-colors">
        电影日历
      </span>
    </div>
  )
}
