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
]

export const DEFAULT_DESKTOP_SHORTCUTS: Shortcut[] = [
  // Top level single icons
  { id: 'github', title: 'GitHub', url: 'https://github.com', icon: 'github', bgColor: 'bg-black' },
  { id: 'chatgpt', title: 'ChatGPT', url: 'https://chatgpt.com', icon: 'chatgpt', bgColor: 'bg-[#10A37F]' },
  { id: 'bilibili', title: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'bilibili', bgColor: 'bg-[#FB7299]' },
  { id: 'youtube', title: 'YouTube', url: 'https://www.youtube.com', icon: 'youtube', bgColor: 'bg-[#FF0000]' },
  { id: 'zhihu', title: '知乎', url: 'https://www.zhihu.com', icon: 'zhihu', bgColor: 'bg-[#0066FF]' },
  { id: 'twitter', title: 'Twitter', url: 'https://x.com', icon: 'twitter', bgColor: 'bg-black' },
  { id: 'linuxdo', title: 'Linux.do', url: 'https://linux.do', icon: 'linuxdo', bgColor: 'bg-black' },
  { id: 'v2ex', title: 'V2EX', url: 'https://www.v2ex.com', icon: 'v2ex', bgColor: 'bg-[#1F1F1F]' },
  { id: 'cloudflare', title: 'Cloudflare', url: 'https://dash.cloudflare.com', icon: 'cloudflare', bgColor: 'bg-[#F38020]' },
  { id: 'feedly', title: 'Feedly', url: 'https://feedly.com', icon: 'feedly', bgColor: 'bg-[#2BB24C]' },
  { id: 'gmail', title: 'Gmail', url: 'https://mail.google.com', icon: 'gmail', bgColor: 'bg-white' },

  // Folder 1: Homelab 私有云
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

  // Folder 2: AI 空间
  {
    id: 'folder-ai',
    title: 'AI 空间',
    isFolder: true,
    bgColor: 'bg-white/20',
    children: [
      { id: 'gemini', title: 'Gemini', url: 'https://gemini.google.com', icon: 'gemini', bgColor: 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600' },
      { id: 'aistudio', title: 'AI Studio', url: 'https://aistudio.google.com', icon: 'aistudio', bgColor: 'bg-black' },
      { id: 'metaso', title: '秘塔AI搜索', url: 'https://metaso.cn', icon: 'metaso', bgColor: 'bg-[#2955FF]' },
      { id: 'doubao', title: '豆包', url: 'https://www.doubao.com', icon: 'doubao', bgColor: 'bg-sky-400' },
      { id: 'coze', title: '扣子空间', url: 'https://www.coze.cn', icon: 'coze', bgColor: 'bg-[#6042EC]' },
      { id: 'tongyi', title: '通义千问', url: 'https://tongyi.aliyun.com', icon: 'tongyi', bgColor: 'bg-[#615CED]' },
      { id: 'yuanbao', title: '腾讯元宝', url: 'https://yuanbao.tencent.com', icon: 'yuanbao', bgColor: 'bg-[#00C853]' },
    ],
  },

  // Folder 3: 生活与购物
  {
    id: 'folder-life',
    title: '生活与购物',
    isFolder: true,
    bgColor: 'bg-white/20',
    children: [
      { id: 'taobao', title: '淘宝', url: 'https://www.taobao.com', icon: 'taobao', bgColor: 'bg-[#FF5000]' },
      { id: 'jd', title: '京东商城', url: 'https://www.jd.com', icon: 'jd', bgColor: 'bg-[#E1251B]' },
      { id: 'xiaohongshu', title: '小红书', url: 'https://www.xiaohongshu.com', icon: 'xiaohongshu', bgColor: 'bg-[#FF2442]' },
      { id: 'smzdm', title: '什么值得买', url: 'https://www.smzdm.com', icon: 'smzdm', bgColor: 'bg-[#F04141]' },
      { id: 'douban', title: '豆瓣', url: 'https://www.douban.com', icon: 'douban', bgColor: 'bg-[#007722]' },
      { id: 'weibo', title: '新浪微博', url: 'https://weibo.com', icon: 'weibo', bgColor: 'bg-[#E6162D]' },
      { id: '10jqka', title: '同花顺财经', url: 'https://www.10jqka.com.cn', icon: '10jqka', bgColor: 'bg-[#E60012]' },
      { id: 'nga', title: 'NGA社区', url: 'https://bbs.nga.cn', icon: 'nga', bgColor: 'bg-[#3A220F]' },
    ],
  },

  // Actions
  { id: 'settings', title: '设置', url: '#settings', icon: 'settings', bgColor: 'bg-zinc-700/80', isSpecial: true },
  { id: 'guide', title: '新手引导', url: '#guide', icon: 'guide', bgColor: 'bg-[#F59E0B]', isSpecial: true },
  { id: 'add-shortcut', title: '添加图标', url: '#add', icon: 'plus', bgColor: 'bg-[#0091FF]', isSpecial: true },
]
