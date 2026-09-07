import React from 'react'
import type { Shortcut } from '../types'
import { IconItem } from './IconItem'

interface BottomDockProps {
  dock1: Shortcut[]
  dock2: Shortcut[]
  onAddShortcut: () => void
}

export const BottomDock: React.FC<BottomDockProps> = ({ dock1, dock2, onAddShortcut }) => {
  return (
    <div className="flex flex-col items-center space-y-3 w-full max-w-6xl mx-auto px-4 mt-4">
      {/* Dock Row 1 */}
      <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2">
        {dock1.map((item) => (
          <IconItem key={item.id} shortcut={item} />
        ))}
      </div>

      {/* Dock Row 2 */}
      <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2">
        {dock2.map((item) => {
          const isAdd = item.id === 'add-shortcut'
          return (
            <IconItem
              key={item.id}
              shortcut={item}
              onClick={isAdd ? onAddShortcut : undefined}
            />
          )
        })}
      </div>
    </div>
  )
}
