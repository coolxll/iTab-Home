import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * A-share index quotes (login-free).
 *
 * GET /api/indices
 *
 * Proxies Tencent's public quote endpoint qt.gtimg.cn for the three headline
 * indices and returns a normalized, tiny payload. Edge-cached for 1 minute
 * (quotes only need near-realtime granularity for a homepage widget).
 */

export interface IndexQuote {
  code: string
  name: string
  price: number
  change: number
  changePct: number
  high: number
  low: number
  prevClose: number
}

const SYMBOLS: Array<{ symbol: string; code: string; fallbackName: string }> = [
  { symbol: 'sh000001', code: 'SH000001', fallbackName: '上证指数' },
  { symbol: 'sz399001', code: 'SZ399001', fallbackName: '深证成指' },
  { symbol: 'sz399006', code: 'SZ399006', fallbackName: '创业板指' },
]

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

function num(v: string | undefined): number {
  const n = parseFloat(v || '')
  return Number.isFinite(n) ? n : 0
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const upstream = await fetch(
      `https://qt.gtimg.cn/q=${SYMBOLS.map((s) => s.symbol).join(',')}`,
      {
        headers: {
          'User-Agent': UA,
          Referer: 'https://stockapp.finance.qq.com',
        },
        signal: AbortSignal.timeout(6000),
      }
    )
    if (!upstream.ok) throw new Error(`tencent upstream ${upstream.status}`)

    // qt.gtimg.cn responds in GBK
    const text = new TextDecoder('gbk').decode(await upstream.arrayBuffer())

    const quotes: IndexQuote[] = []
    for (const { symbol, code, fallbackName } of SYMBOLS) {
      const match = text.match(new RegExp(`v_${symbol}="([^"]*)"`))
      if (!match) continue
      const f = match[1].split('~')
      // Field layout: 1 name, 3 price, 4 prevClose, 31 change, 32 changePct,
      // 33 high, 34 low
      quotes.push({
        code,
        name: f[1] || fallbackName,
        price: num(f[3]),
        prevClose: num(f[4]),
        change: num(f[31]),
        changePct: num(f[32]),
        high: num(f[33]),
        low: num(f[34]),
      })
    }

    if (quotes.length === 0) throw new Error('tencent: no quotes parsed')

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120')
    res.status(200).json({ updatedAt: Date.now(), quotes })
  } catch (err) {
    res.status(502).json({
      error: err instanceof Error ? err.message : 'quote fetch failed',
    })
  }
}
