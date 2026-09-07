import React from 'react'
import { MapPin, Sun, CloudRain, CloudSun } from 'lucide-react'
import { DEFAULT_WEATHER_FORECAST } from '../data/defaults'

interface WeatherCardProps {
  city?: string
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ city = '浦东新区' }) => {
  const renderWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'sun':
        return <Sun className="w-3.5 h-3.5 text-yellow-300" />
      case 'cloud-rain':
        return <CloudRain className="w-3.5 h-3.5 text-sky-200" />
      case 'cloud-sun':
      default:
        return <CloudSun className="w-3.5 h-3.5 text-yellow-200" />
    }
  }

  return (
    <div className="flex flex-col items-center group">
      {/* Card container */}
      <div className="w-64 h-36 rounded-2xl p-3 bg-gradient-to-br from-[#1E58C8]/90 via-[#2778E2]/90 to-[#3BA2F6]/90 backdrop-blur-md shadow-xl border border-white/20 text-white flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
        {/* Top header row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 opacity-95 hover:opacity-100 transition-opacity">
            <span className="font-medium text-[13px]">{city}</span>
            <MapPin className="w-3 h-3 text-white/80" />
          </div>
          <div className="flex items-center space-x-1.5 text-white/90 text-[11px]">
            <span>晴</span>
            <Sun className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span className="opacity-80">最低 24° 最高 31°</span>
          </div>
        </div>

        {/* Middle current temp */}
        <div className="flex items-baseline my-0.5">
          <span className="text-4xl font-light tracking-tight">27</span>
          <span className="text-2xl font-light ml-0.5">°</span>
        </div>

        {/* Bottom 6-day forecast bar */}
        <div className="grid grid-cols-6 gap-1 pt-1.5 border-t border-white/20 text-center">
          {DEFAULT_WEATHER_FORECAST.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-[10px] text-white/80 scale-90">{item.day}</span>
              <div className="my-0.5">{renderWeatherIcon(item.icon)}</div>
              <span className="text-[9px] text-white/90 font-light scale-90">{item.tempRange}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Under-card text label */}
      <span className="mt-1.5 text-xs text-white/75 font-normal tracking-wide drop-shadow-sm select-none group-hover:text-white transition-colors">
        i天气
      </span>
    </div>
  )
}
