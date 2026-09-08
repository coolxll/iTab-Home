export const KNOWN_VECTOR_ICONS = new Set([
  'v2ex',
  'feedly',
  'twitter',
  'metaso',
  'zhihu',
  'bilibili',
  'youtube',
  'gemini',
  'aistudio',
  'gmail',
  'yuanbao',
  'tongyi',
  'smzdm',
  'nga',
  'github',
  'chatgpt',
  'homepage',
  'cloudflare',
  'rn-proxy',
  'cpa-keeper',
  'cli-proxy',
  'cpa-usage',
  'codex-usage',
  'linuxdo',
  'taobao',
  'jd',
  'weibo',
  'coze',
  'douban',
  '10jqka',
  'doubao',
  'xiaohongshu',
  'settings',
  'plus',
  'tinyauth',
  'beszel',
  'komodo',
  'sublinkpro',
  '3x-ui',
  'claude',
  'deepseek',
  'kimi',
  'qwen',
  'perplexity',
  'google',
  'google-drive',
  'chrome-store',
  'vercel',
  'xueqiu',
  'manmanbuy',
  'workbuddy',
])

export function hasVectorIcon(name?: string): boolean {
  if (!name) return false
  return KNOWN_VECTOR_ICONS.has(name)
}

export const POPULAR_ICON_OPTIONS = [
  { id: 'deepseek', label: 'DeepSeek' },
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'claude', label: 'Claude' },
  { id: 'kimi', label: 'Kimi' },
  { id: 'qwen', label: '通义千问' },
  { id: 'yuanbao', label: '腾讯元宝' },
  { id: 'perplexity', label: 'Perplexity' },
  { id: 'metaso', label: '秘塔AI' },
  { id: 'aistudio', label: 'AI Studio' },
  { id: 'gemini', label: 'Gemini' },
  { id: 'github', label: 'GitHub' },
  { id: 'cloudflare', label: 'Cloudflare' },
  { id: 'vercel', label: 'Vercel' },
  { id: 'beszel', label: 'Beszel 监控' },
  { id: 'komodo', label: 'Komodo' },
  { id: 'sublinkpro', label: 'SublinkPro' },
  { id: '3x-ui', label: '3x-ui' },
  { id: 'cli-proxy', label: 'CLI Proxy' },
  { id: 'cpa-keeper', label: 'CPA Keeper' },
  { id: 'homepage', label: 'Homepage' },
  { id: 'tinyauth', label: 'TinyAuth' },
  { id: 'google', label: 'Google' },
  { id: 'gmail', label: 'GMail' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'bilibili', label: 'Bilibili' },
  { id: 'linuxdo', label: 'Linux.do' },
  { id: 'v2ex', label: 'V2EX' },
  { id: 'workbuddy', label: 'WorkBuddy' },
]

export function inferVectorIcon(title?: string, url?: string): string | undefined {
  const text = `${title || ''} ${url || ''}`.toLowerCase()
  if (!text.trim()) return undefined

  if (text.includes('deepseek')) return 'deepseek'
  if (text.includes('chatgpt') || text.includes('openai')) return 'chatgpt'
  if (text.includes('claude') || text.includes('anthropic')) return 'claude'
  if (text.includes('kimi') || text.includes('moonshot')) return 'kimi'
  if (text.includes('qwen') || text.includes('tongyi') || text.includes('通义') || text.includes('千问')) return 'qwen'
  if (text.includes('yuanbao') || text.includes('元宝')) return 'yuanbao'
  if (text.includes('perplexity')) return 'perplexity'
  if (text.includes('metaso') || text.includes('秘塔')) return 'metaso'
  if (text.includes('aistudio') || text.includes('ai studio')) return 'aistudio'
  if (text.includes('gemini')) return 'gemini'
  if (text.includes('github')) return 'github'
  if (text.includes('cloudflare')) return 'cloudflare'
  if (text.includes('vercel')) return 'vercel'
  if (text.includes('bilibili') || text.includes('b站') || text.includes('哔哩')) return 'bilibili'
  if (text.includes('youtube') || text.includes('油管')) return 'youtube'
  if (text.includes('gmail')) return 'gmail'
  if (text.includes('drive.google') || text.includes('google drive')) return 'google-drive'
  if (text.includes('google')) return 'google'
  if (text.includes('chrome') && (text.includes('store') || text.includes('应用'))) return 'chrome-store'
  if (text.includes('sublink')) return 'sublinkpro'
  if (text.includes('keeper')) return 'cpa-keeper'
  if (text.includes('cli-proxy') || text.includes('cliproxy')) return 'cli-proxy'
  if (text.includes('usage')) return 'cpa-usage'
  if (text.includes('codex')) return 'codex-usage'
  if (text.includes('beszel')) return 'beszel'
  if (text.includes('komodo')) return 'komodo'
  if (text.includes('3x-ui') || text.includes('x-ui')) return '3x-ui'
  if (text.includes('tinyauth')) return 'tinyauth'
  if (text.includes('homepage') || text.includes('nav.')) return 'homepage'
  if (text.includes('v2ex')) return 'v2ex'
  if (text.includes('linux.do') || text.includes('linuxdo')) return 'linuxdo'
  if (text.includes('smzdm') || text.includes('什么值得买')) return 'smzdm'
  if (text.includes('zhihu') || text.includes('知乎')) return 'zhihu'
  if (text.includes('weibo') || text.includes('微博')) return 'weibo'
  if (text.includes('xiaohongshu') || text.includes('小红书')) return 'xiaohongshu'
  if (text.includes('douban') || text.includes('豆瓣')) return 'douban'
  if (text.includes('xueqiu') || text.includes('雪球')) return 'xueqiu'
  if (text.includes('feedly')) return 'feedly'
  if (text.includes('workbuddy') || text.includes('work buddy') || text.includes('codebuddy')) return 'workbuddy'
  if (text.includes('nga')) return 'nga'

  return undefined
}
