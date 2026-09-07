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
    <div className="grid grid-cols-6 gap-x-3 gap-y-2 items-start justify-items-center">
      {shortcuts.map((shortcut) => {
        let handleClick: (() => void) | undefined
        if (shortcut.id === 'settings') {
          handleClick = onOpenSettings
        } else if (shortcut.id === 'guide') {
          handleClick = onOpenGuide
        }

        return (
          <IconItem
            key={shortcut.id}
            shortcut={shortcut}
            size="large"
            onClick={handleClick}
          />
        )
      })}
    </div>
  )
}
