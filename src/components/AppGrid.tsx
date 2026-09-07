import React from 'react'
import type { Shortcut } from '../types'
import { IconItem } from './IconItem'

interface AppGridProps {
  shortcuts: Shortcut[]
  onOpenSettings: () => void
  onOpenGuide: () => void
}

export const AppGrid: React.FC<AppGridProps> = ({ shortcuts, onOpenSettings, onOpenGuide }) => {
  return (
    <div className="w-full h-[140px] grid grid-cols-6 grid-rows-2 gap-x-2 gap-y-1.5 items-center justify-items-center">
      {shortcuts.map((shortcut) => {
        let handleClick: (() => void) | undefined
        if (shortcut.id === 'settings') {
          handleClick = onOpenSettings
        } else if (shortcut.id === 'guide') {
          handleClick = onOpenGuide
        }

        return (
          <div key={shortcut.id} className="w-full flex justify-center">
            <IconItem
              shortcut={shortcut}
              size="normal"
              onClick={handleClick}
            />
          </div>
        )
      })}
    </div>
  )
}
