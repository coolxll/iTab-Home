import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Daily hot lists aggregator (login-free sources only).
 *
 * GET /api/hot?sources=weibo,zhihu
 *
 * - Weibo:  https://weibo.com/ajax/statuses/hot_band  (no cookie required)
 * - Zhihu:  https://api.zhihu.com/topstory/hot-lists/total (open mobile API)
 *
 * Responses are edge-cached for 5 minutes to be a good citizen upstream and
 * to keep page loads instant.
 */

export interface HotItem {
  rank: number
  title: string
  url: string
  heat?: string
  tag?: string
}

const UA_DESKTOP =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const UA_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'

function formatHeat(num: number): string {
  if (num >= 1_000_000) return `${Math.round(num / 10_000)}万`
  if (num >= 10_000) return `${(num / 10_000).toFixed(1)}万`
  return String(num)
}

async function fetchWeibo(limit: number): Promise<HotItem[]> {
  const res = await fetch('https://weibo.com/ajax/statuses/hot_band', {
    headers: {
      'User-Agent': UA_DESKTOP,
      Referer: 'https://weibo.com/',
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`weibo upstream ${res.status}`)

  const data: any = await res.json()
  const band: any[] = data?.data?.band_list
  if (!Array.isArray(band)) throw new Error('weibo: unexpected payload')

  return band
    .filter((e) => e && typeof e.word === 'string' && e.is_ad !== 1)
    .slice(0, limit)
    .map((e, i) => ({
      rank: typeof e.realpos === 'number' ? e.realpos : i + 1,
      title: e.word as string,
      url: `https://s.weibo.com/weibo?q=%23${encodeURIComponent(e.word)}%23`,
      heat: typeof e.num === 'number' ? formatHeat(e.num) : undefined,
      tag: e.label_name || e.icon_desc || undefined,
    }))
}

async function fetchZhihu(limit: number): Promise<HotItem[]> {
  const res = await fetch(`https://api.zhihu.com/topstory/hot-lists/total?limit=${limit}`, {
    headers: {
      'User-Agent': UA_MOBILE,
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`zhihu upstream ${res.status}`)

  const data: any = await res.json()
  const feeds: any[] = data?.data
  if (!Array.isArray(feeds)) throw new Error('zhihu: unexpected payload')

  return feeds
    .filter((f) => f?.target?.title)
    .slice(0, limit)
    .map((f, i) => {
      const t = f.target
      const questionId = t.url?.match(/questions\/(\d+)/)?.[1] || t.id
      const detailText: string | undefined = f.detail_text // e.g. "437 万热度"
      return {
        rank: i + 1,
        title: t.title as string,
        url: questionId
          ? `https://www.zhihu.com/question/${questionId}`
          : 'https://www.zhihu.com/hot',
        heat: detailText?.replace(/\s+/g, '') || undefined,
        tag: f.card_label?.type === 'hot' ? '热' : undefined,
      }
    })
}

const FETCHERS: Record<string, (limit: number) => Promise<HotItem[]>> = {
  weibo: fetchWeibo,
  zhihu: fetchZhihu,
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const rawSources = typeof req.query.sources === 'string' ? req.query.sources : 'weibo,zhihu'
  const sources = rawSources
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s in FETCHERS)

  if (sources.length === 0) {
    res.status(400).json({ error: 'no valid sources; supported: weibo, zhihu' })
    return
  }

  const limit = Math.min(Math.max(parseInt(String(req.query.limit || '10'), 10) || 10), 50)

  const results = await Promise.all(
    sources.map(async (name) => {
      try {
        const items = await FETCHERS[name](limit)
        return [name, { items }] as const
      } catch (err) {
        return [name, { items: [], error: err instanceof Error ? err.message : 'fetch failed' }] as const
      }
    })
  )

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  res.status(200).json({
    updatedAt: Date.now(),
    sources: Object.fromEntries(results),
  })
}
