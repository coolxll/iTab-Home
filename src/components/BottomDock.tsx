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
    <div className="flex flex-col items-center space-y-3 w-full max-w-[1060px] mx-auto px-2 mt-4">
      {/* Dock Row 1: Exactly 14 Columns Grid */}
      <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-2 w-full items-start justify-items-center">
        {dock1.map((item) => (
          <div key={item.id} className="w-full flex justify-center">
            <IconItem shortcut={item} size="large" />
          </div>
        ))}
      </div>

      {/* Dock Row 2: Centered with Identical Column Width */}
      <div className="flex items-start justify-center gap-2 w-full flex-wrap">
        {dock2.map((item) => {
          const isAdd = item.id === 'add-shortcut'
          return (
            <div
              key={item.id}
              className="w-[66px] sm:w-[68px] flex justify-center flex-shrink-0"
            >
              <IconItem
                shortcut={item}
                size="large"
                onClick={isAdd ? onAddShortcut : undefined}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
