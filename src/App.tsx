import React, { useState } from 'react'
import { HeaderClock } from './components/HeaderClock'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { HolidayCard } from './components/HolidayCard'
import { StockCard } from './components/StockCard'
import { HotSearchCard } from './components/HotSearchCard'
import { AnniversaryCard } from './components/AnniversaryCard'
import { CalendarCard } from './components/CalendarCard'
import { WorkCountdownCard } from './components/WorkCountdownCard'
import { MovieCard } from './components/MovieCard'
import { AppGrid } from './components/AppGrid'
import { BottomDock } from './components/BottomDock'
import { FooterMotto } from './components/FooterMotto'
import { SettingsModal } from './components/SettingsModal'
import { AddShortcutModal } from './components/AddShortcutModal'
import { GuideModal } from './components/GuideModal'
import { loadSettings, saveSettings } from './utils/storage'
import type { Shortcut, UserSettings } from './types'

export const App: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(loadSettings())
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(false)

  // Persist settings whenever updated
  const handleUpdateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  const handleSelectEngine = (engineId: string) => {
    handleUpdateSettings({ ...settings, searchEngineId: engineId })
  }

  const handleAddShortcut = (shortcut: Shortcut) => {
    // Insert before the last item (which is "+ 添加图标")
    const newDock2 = [...settings.shortcutsDock2]
    const lastItem = newDock2.pop()
    newDock2.push(shortcut)
    if (lastItem) newDock2.push(lastItem)

    handleUpdateSettings({
      ...settings,
      shortcutsDock2: newDock2,
    })
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-white font-sans selection:bg-sky-500 selection:text-white">
      {/* Background Wallpaper with fallback gradient */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 transition-all duration-700 filter brightness-95"
        style={{
          backgroundImage: `url('${settings.wallpaper}')`,
          backgroundColor: '#1a1c23',
        }}
      />
      {/* Ambient background overlay for optimal contrast */}
      <div className="fixed inset-0 bg-black/15 backdrop-blur-[1px] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-between px-4 py-6 w-full max-w-7xl mx-auto">
        {/* Top Header Section: Clock & Search */}
        <div className="w-full flex flex-col items-center pt-2 md:pt-4 space-y-4">
          <HeaderClock />
          <SearchBar
            currentEngineId={settings.searchEngineId}
            onSelectEngine={handleSelectEngine}
          />
        </div>

        {/* Center Widgets Matrix */}
        <div className="my-auto py-6 flex flex-col items-center justify-center space-y-4 w-full">
          {/* Row 1: Weather, Holiday, Stock, Hot Search, Anniversary */}
          <div className="flex flex-wrap items-start justify-center gap-3 w-full">
            <WeatherCard city={settings.city} />
            <HolidayCard />
            <StockCard />
            <HotSearchCard />
            <AnniversaryCard
              birthDate={settings.birthDate}
              onClick={() => setIsSettingsOpen(true)}
            />
          </div>

          {/* Row 2: Calendar, Work Countdown, Movie Calendar, 6x2 App Grid */}
          <div className="flex flex-wrap items-start justify-center gap-3 w-full">
            <CalendarCard />
            <WorkCountdownCard
              offWorkTime={settings.offWorkTime}
              monthlySalary={settings.monthlySalary}
              workDaysPerMonth={settings.workDaysPerMonth}
            />
            <MovieCard />
            <div className="flex flex-col items-center">
              <div className="h-36 flex items-center justify-center px-1">
                <AppGrid
                  shortcuts={settings.shortcutsTop}
                  onOpenSettings={() => setIsSettingsOpen(true)}
                  onOpenGuide={() => setIsGuideOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: App Dock & Motto */}
        <div className="w-full flex flex-col items-center">
          <BottomDock
            dock1={settings.shortcutsDock1}
            dock2={settings.shortcutsDock2}
            onAddShortcut={() => setIsAddOpen(true)}
          />
          <FooterMotto />
        </div>
      </div>

      {/* Interactive Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleUpdateSettings}
      />

      <AddShortcutModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddShortcut}
      />

      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  )
}

export default App
