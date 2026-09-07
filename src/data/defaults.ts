import type { SearchEngine, Shortcut } from '../types'

export const SEARCH_ENGINES: SearchEngine[] = [
  {
    id: 'bing',
    name: '必应',
    icon: 'bing',
    url: 'https://www.bing.com/search?q=',
    placeholder: '输入搜索内容',
  },
  {
    id: 'google',
    name: '谷歌',
    icon: 'google',
    url: 'https://www.google.com/search?q=',
    placeholder: '在 Google 上搜索',
  },
  {
    id: 'baidu',
    name: '百度',
    icon: 'baidu',
    url: 'https://www.baidu.com/s?wd=',
    placeholder: '百度一下，你就知道',
  },
  {
    id: 'bilibili',
    name: 'B站',
    icon: 'bilibili',
    url: 'https://search.bilibili.com/all?keyword=',
    placeholder: '在 Bilibili 上搜索',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github',
    url: 'https://github.com/search?q=',
    placeholder: 'Search GitHub',
  },
  {
    id: 'zhihu',
    name: '知乎',
    icon: 'zhihu',
    url: 'https://www.zhihu.com/search?type=content&q=',
    placeholder: '在知乎搜索感兴趣的讨论',
  },
  {
    id: 'weibo',
    name: '微博',
    icon: 'weibo',
    url: 'https://s.weibo.com/weibo?q=',
    placeholder: '在微博搜索热搜与讨论',
  },
]

import YAML from 'yaml'
import rawShortcutsYaml from '../config/shortcuts.yaml?raw'

export { rawShortcutsYaml }

export function parseShortcutsYaml(yamlContent: string): Shortcut[] {
  try {
    const data = YAML.parse(yamlContent)
    if (data && Array.isArray(data.shortcuts)) {
      return data.shortcuts
    }
  } catch (err) {
    console.error('Failed to parse shortcuts YAML', err)
  }
  return []
}

export const DEFAULT_DESKTOP_SHORTCUTS: Shortcut[] = parseShortcutsYaml(rawShortcutsYaml)
