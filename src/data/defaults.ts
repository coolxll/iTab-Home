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

export const DEFAULT_DESKTOP_SHORTCUTS: Shortcut[] = [
  // Primary Daily & Social Apps (Including 小红书, 微博, 设置 per user request)
  { id: 'xiaohongshu', title: '小红书', url: 'https://www.xiaohongshu.com', icon: 'xiaohongshu', bgColor: 'bg-[#FF2442]' },
  { id: 'weibo', title: '新浪微博', url: 'https://weibo.com', icon: 'weibo', bgColor: 'bg-[#E6162D]' },
  { id: 'zhihu', title: '知乎', url: 'https://www.zhihu.com', icon: 'zhihu', bgColor: 'bg-[#0066FF]' },
  { id: 'bilibili', title: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'bilibili', bgColor: 'bg-[#FB7299]' },
  { id: 'youtube', title: 'YouTube', url: 'https://www.youtube.com', icon: 'youtube', bgColor: 'bg-white' },
  { id: 'twitter', title: 'Twitter', url: 'https://x.com', icon: 'twitter', bgColor: 'bg-black' },
  { id: 'v2ex', title: 'V2EX', url: 'https://www.v2ex.com', icon: 'v2ex', bgColor: 'bg-white' },
  { id: 'linuxdo', title: 'Linux.do', url: 'https://linux.do', icon: 'linuxdo', bgColor: 'bg-black' },
  { id: 'feedly', title: 'Feedly', url: 'https://feedly.com', icon: 'feedly', bgColor: 'bg-[#2BB24C]' },
  { id: 'gmail', title: 'Gmail', url: 'https://mail.google.com', icon: 'gmail', bgColor: 'bg-white' },

  // AI & Development
  { id: 'github', title: 'GitHub', url: 'https://github.com', icon: 'github', bgColor: 'bg-black' },
  { id: 'chatgpt', title: 'ChatGPT', url: 'https://chatgpt.com', icon: 'chatgpt', bgColor: 'bg-[#10A37F]' },
  { id: 'metaso', title: '秘塔AI搜索', url: 'https://metaso.cn', icon: 'metaso', bgColor: 'bg-[#2955FF]' },
  { id: 'gemini', title: 'Gemini', url: 'https://gemini.google.com', icon: 'gemini', bgColor: 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600' },
  { id: 'cloudflare', title: 'Cloudflare', url: 'https://dash.cloudflare.com', icon: 'cloudflare', bgColor: 'bg-white' },
  { id: 'smzdm', title: '什么值得买', url: 'https://www.smzdm.com', icon: 'smzdm', bgColor: 'bg-[#F04141]' },

  // Folder: Homelab 私有云与监控
  {
    id: 'folder-homelab',
    title: 'Homelab',
    isFolder: true,
    bgColor: 'bg-white/20',
    children: [
      { id: 'homepage', title: 'Homepage', url: 'https://nav.229929605.xyz', icon: 'homepage', bgColor: 'bg-[#3B82F6]' },
      { id: 'tinyauth', title: 'TinyAuth SSO', url: 'https://auth.229929605.xyz', icon: 'tinyauth', bgColor: 'bg-blue-600' },
      { id: 'rn-proxy', title: 'RN PROXY API', url: 'https://cpa.229929605.xyz/management.html', icon: 'rn-proxy', bgColor: 'bg-[#FF8800]' },
      { id: 'cpa-keeper', title: 'CPA Keeper', url: 'https://cpa.229929605.xyz/keeper/', icon: 'cpa-keeper', bgColor: 'bg-[#FF9900]' },
      { id: 'cli-proxy', title: 'CLI Proxy API', url: 'https://claude.229929605.xyz/management.html', icon: 'cli-proxy', bgColor: 'bg-[#E11D48]' },
      { id: 'cpa-usage', title: 'CPA USAGE', url: 'https://claude.229929605.xyz/keeper/', icon: 'cpa-usage', bgColor: 'bg-[#EF4444]' },
      { id: 'codex-usage', title: 'Codex Usage', url: 'https://cpa.229929605.xyz/keeper/', icon: 'codex-usage', bgColor: 'bg-[#EA580C]' },
      { id: 'beszel', title: 'Beszel 监控', url: 'https://beszel.229929605.xyz', icon: 'beszel', bgColor: 'bg-blue-500' },
      { id: 'komodo', title: 'Komodo 控制面', url: 'https://komodo.229929605.xyz', icon: 'komodo', bgColor: 'bg-emerald-600' },
      { id: 'sublink', title: 'SublinkPro', url: 'https://sublink.229929605.xyz', icon: 'sublinkpro', bgColor: 'bg-indigo-600' },
      { id: 'xui', title: '3x-ui 节点', url: 'https://xui.229929605.xyz', icon: '3x-ui', bgColor: 'bg-sky-600' },
    ],
  },

  // Actions
  { id: 'settings', title: '设置', url: '#settings', icon: 'settings', bgColor: 'bg-zinc-700', isSpecial: true },
  { id: 'add-shortcut', title: '添加图标', url: '#add', icon: 'plus', bgColor: 'bg-[#0091FF]', isSpecial: true },
]
