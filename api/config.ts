import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import YAML from 'yaml'
import { SESSION_SECRET } from '../src/auth/config.js'
import { getSessionFromCookieHeader } from '../src/auth/session.js'
import type { Shortcut, UserSettings } from '../src/types/index.js'

type WallpaperType = UserSettings['wallpaperType']

interface PrivateConfigFile {
  settings?: Record<string, unknown>
  shortcuts?: Shortcut[]
}

const WALLPAPER_TYPES = new Set<WallpaperType>(['default', 'nature', 'space', 'bing', 'custom'])

function stringSetting(settings: Record<string, unknown>, key: string, fallback = ''): string {
  return typeof settings[key] === 'string' ? settings[key] : fallback
}

function buildSettings(config: PrivateConfigFile): UserSettings {
  if (!Array.isArray(config.shortcuts)) {
    throw new Error('shortcuts.yaml must contain a shortcuts array')
  }

  const raw = config.settings || {}
  const wallpaperTypeValue = raw.wallpaperType
  const wallpaperType = (
    typeof wallpaperTypeValue === 'string' && WALLPAPER_TYPES.has(wallpaperTypeValue as WallpaperType)
      ? wallpaperTypeValue
      : 'default'
  ) as WallpaperType

  return {
    birthDate: stringSetting(raw, 'birthDate'),
    city: stringSetting(raw, 'city'),
    wallpaper: stringSetting(raw, 'wallpaper', '/wallpapers/default.jpg'),
    wallpaperType,
    searchEngineId: stringSetting(raw, 'searchEngineId', 'bing'),
    showRealWidgets: raw.showRealWidgets === true,
    shortcuts: config.shortcuts,
    iconStyle: raw.iconStyle === 'optimized' ? 'optimized' : 'official',
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'private, no-store')

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!SESSION_SECRET) {
    res.status(500).json({ error: 'Session is not configured' })
    return
  }

  const session = await getSessionFromCookieHeader(req.headers.cookie)
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  try {
    const configPath = path.join(process.cwd(), 'src/config/shortcuts.yaml')
    const source = await readFile(configPath, 'utf8')
    const config = YAML.parse(source) as PrivateConfigFile
    res.status(200).json({ settings: buildSettings(config) })
  } catch (error) {
    console.error('Failed to load private iTab configuration:', error)
    res.status(500).json({ error: 'Failed to load configuration' })
  }
}
