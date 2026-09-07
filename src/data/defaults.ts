import type { SearchEngine, Shortcut, StockItem, HolidayItem, HotSearchItem, WeatherForecast } from '../types'

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

export const DEFAULT_STOCKS: StockItem[] = [
  {
    name: '深证成指',
    code: '399001',
    price: '13605.02',
    changePercent: '+0.65%',
    isUp: true,
  },
  {
    name: '上证指数',
    code: '000001',
    price: '3942.51',
    changePercent: '+0.32%',
    isUp: true,
  },
  {
    name: '创业板指',
    code: '399006',
    price: '3326.42',
    changePercent: '+1.21%',
    isUp: true,
  },
]

export const DEFAULT_HOLIDAYS: HolidayItem[] = [
  {
    name: '中秋节',
    dateRange: '9.25-9.27',
    daysRemaining: 18,
  },
  {
    name: '国庆节',
    dateRange: '10.1-10.7',
    daysRemaining: 24,
  },
  {
    name: '元旦',
    dateRange: '1.1',
    daysRemaining: 116,
  },
]

export const WEIBO_HOT: HotSearchItem[] = [
  { rank: 1, title: '400元买块“塑料砖头”戒手机', heat: '780.9万', url: 'https://s.weibo.com/weibo?q=400元买块塑料砖头戒手机' },
  { rank: 2, title: '7个村庄采水点 一滴真实水样也没采', heat: '771.4万', url: 'https://s.weibo.com/weibo?q=7个村庄采水点一滴真实水样也没采' },
  { rank: 3, title: '“电动中国，靠你们了！”', heat: '761.7万', url: 'https://s.weibo.com/weibo?q=电动中国靠你们了' },
  { rank: 4, title: '折叠屏手机迎超级发布周', heat: '752.3万', url: 'https://s.weibo.com/weibo?q=折叠屏手机迎超级发布周' },
  { rank: 5, title: '中秋国庆连休放假安排出炉', heat: '710.2万', url: 'https://s.weibo.com/weibo?q=中秋国庆放假安排' },
  { rank: 6, title: '国产AI大模型跑分迎重磅突破', heat: '685.0万', url: 'https://s.weibo.com/weibo?q=国产AI大模型突破' },
]

export const ZHIHU_HOT: HotSearchItem[] = [
  { rank: 1, title: '人类历史上发生过哪些令人匪夷所思的巧合事件？', heat: '1290万', url: 'https://www.zhihu.com/search?type=content&q=人类历史上巧合事件' },
  { rank: 2, title: '如何评价新一代大语言模型的推理与思考能力？', heat: '985万', url: 'https://www.zhihu.com/search?type=content&q=大语言模型推理能力' },
  { rank: 3, title: '为什么越来越多年轻人喜欢极简桌面和 Homelab？', heat: '840万', url: 'https://www.zhihu.com/search?type=content&q=极简桌面Homelab' },
  { rank: 4, title: '有哪些小众但体验惊艳的效率工具或浏览器扩展？', heat: '760万', url: 'https://www.zhihu.com/search?type=content&q=小众惊艳效率工具' },
  { rank: 5, title: '深度使用 Tailwind CSS 与现代前端的体验是怎样的？', heat: '690万', url: 'https://www.zhihu.com/search?type=content&q=TailwindCSS体验' },
]

export const DEFAULT_WEATHER_FORECAST: WeatherForecast[] = [
  { day: '明天', tempRange: '24~30', icon: 'cloud-sun', condition: '多云' },
  { day: '周三', tempRange: '23~28', icon: 'cloud-rain', condition: '小雨' },
  { day: '周四', tempRange: '24~28', icon: 'cloud-rain', condition: '小雨' },
  { day: '周五', tempRange: '24~30', icon: 'cloud-rain', condition: '阵雨' },
  { day: '周六', tempRange: '25~28', icon: 'cloud-rain', condition: '小雨' },
  { day: '周日', tempRange: '25~31', icon: 'cloud-rain', condition: '雷阵雨' },
]

// Top 6x2 App Grid
export const DEFAULT_SHORTCUTS_TOP: Shortcut[] = [
  { id: 'settings', title: '设置', url: '#settings', icon: 'settings', bgColor: 'bg-zinc-700/80', isSpecial: true },
  { id: 'chrome-apps', title: 'Chrome 应用', url: 'chrome://apps', icon: 'chrome-apps', bgColor: 'bg-white' },
  { id: 'taobao', title: '淘宝', url: 'https://www.taobao.com', bgColor: 'bg-[#FF5000]' },
  { id: 'jd', title: '京东商城', url: 'https://www.jd.com', bgColor: 'bg-[#E1251B]' },
  { id: 'weibo', title: '新浪微博', url: 'https://weibo.com', bgColor: 'bg-[#E6162D]' },
  { id: 'coze', title: '扣子空间', url: 'https://www.coze.cn', bgColor: 'bg-[#6042EC]' },
  { id: 'douban', title: '豆瓣', url: 'https://www.douban.com', bgColor: 'bg-[#007722]' },
  { id: '10jqka', title: '同花顺财经', url: 'https://www.10jqka.com.cn', bgColor: 'bg-[#E60012]' },
  { id: 'doubao', title: '豆包-你的AI朋友', url: 'https://www.doubao.com', bgColor: 'bg-sky-400' },
  { id: 'xiaohongshu', title: '小红书', url: 'https://www.xiaohongshu.com', bgColor: 'bg-[#FF2442]' },
  { id: 'guide', title: 'iTab新手引导', url: '#guide', icon: 'guide', bgColor: 'bg-[#F59E0B]', isSpecial: true },
  { id: 'extensions', title: '扩展管理', url: 'chrome://extensions', icon: 'extensions', bgColor: 'bg-zinc-600' },
]

// Dock Row 1 (Public Services)
export const DEFAULT_SHORTCUTS_DOCK1: Shortcut[] = [
  { id: 'v2ex', title: 'V2EX', url: 'https://www.v2ex.com', bgColor: 'bg-[#1F1F1F]' },
  { id: 'feedly', title: 'Feedly', url: 'https://feedly.com', bgColor: 'bg-[#2BB24C]' },
  { id: 'twitter', title: 'Twitter', url: 'https://x.com', bgColor: 'bg-black' },
  { id: 'metaso', title: '秘塔AI搜索', url: 'https://metaso.cn', bgColor: 'bg-[#2955FF]' },
  { id: 'zhihu', title: '知乎', url: 'https://www.zhihu.com', bgColor: 'bg-[#0066FF]' },
  { id: 'bilibili', title: '哔哩哔哩', url: 'https://www.bilibili.com', bgColor: 'bg-[#FB7299]' },
  { id: 'youtube', title: 'YouTube', url: 'https://www.youtube.com', bgColor: 'bg-[#FF0000]' },
  { id: 'gemini', title: 'Gemini', url: 'https://gemini.google.com', bgColor: 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600' },
  { id: 'aistudio', title: 'Google AI Studio', url: 'https://aistudio.google.com', bgColor: 'bg-black' },
  { id: 'gmail', title: 'Gmail', url: 'https://mail.google.com', bgColor: 'bg-white' },
  { id: 'yuanbao', title: '腾讯元宝 - 轻...', url: 'https://yuanbao.tencent.com', bgColor: 'bg-[#00C853]' },
  { id: 'tongyi', title: '通义千问', url: 'https://tongyi.aliyun.com', bgColor: 'bg-[#615CED]' },
  { id: 'smzdm', title: '什么值得买', url: 'https://www.smzdm.com', bgColor: 'bg-[#F04141]' },
  { id: 'nga', title: 'NGA玩家社区', url: 'https://bbs.nga.cn', bgColor: 'bg-[#3A220F]' },
]

// Dock Row 2 (Homelab & Cloud Services, aligned with TinyAuth / homelab-infra)
export const DEFAULT_SHORTCUTS_DOCK2: Shortcut[] = [
  { id: 'github', title: 'GitHub', url: 'https://github.com', bgColor: 'bg-black' },
  { id: 'chatgpt', title: 'ChatGPT', url: 'https://chatgpt.com', bgColor: 'bg-[#10A37F]' },
  { id: 'homepage', title: 'Homepage', url: 'https://nav.229929605.xyz', bgColor: 'bg-[#3B82F6]' },
  { id: 'cloudflare', title: 'Cloudflare - ...', url: 'https://dash.cloudflare.com', bgColor: 'bg-[#F38020]' },
  { id: 'rn-proxy', title: 'RN PROXY API', url: 'https://cpa.229929605.xyz/management.html', icon: '/icons/cliproxyapi.png', bgColor: 'bg-[#FF8800]' },
  { id: 'cpa-keeper', title: 'CPA Keeper', url: 'https://cpa.229929605.xyz/keeper/', icon: '/icons/cpa-usage-keeper.svg', bgColor: 'bg-[#FF9900]' },
  { id: 'cli-proxy', title: 'CLI Proxy API', url: 'https://claude.229929605.xyz/management.html', icon: '/icons/cliproxyapi.png', bgColor: 'bg-[#E11D48]' },
  { id: 'cpa-usage', title: 'CPA USAGE ...', url: 'https://claude.229929605.xyz/keeper/', icon: '/icons/cpa-usage-keeper.svg', bgColor: 'bg-[#EF4444]' },
  { id: 'codex-usage', title: 'Codex Usage', url: 'https://cpa.229929605.xyz/keeper/', icon: '/icons/cpa-usage-keeper.svg', bgColor: 'bg-[#EA580C]' },
  { id: 'linuxdo', title: 'Linux.do', url: 'https://linux.do', bgColor: 'bg-black' },
  { id: 'tinyauth', title: 'TinyAuth SSO', url: 'https://auth.229929605.xyz', bgColor: 'bg-blue-600' },
  { id: 'add-shortcut', title: '添加图标', url: '#add', icon: 'plus', bgColor: 'bg-[#0091FF]', isSpecial: true },
]
