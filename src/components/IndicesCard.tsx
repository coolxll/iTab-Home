import React, { useEffect, useState } from 'react'

interface IndexQuote {
  code: string
  name: string
  price: number
  change: number
  changePct: number
  high: number
  low: number
  prevClose: number
}

const REFRESH_INTERVAL = 60 * 1000

// A-share convention: red = up, green = down
const trendColor = (change: number) =>
  change > 0 ? 'text-[#F43F3B]' : change < 0 ? 'text-[#0EB27E]' : 'text-white/70'

const formatPrice = (n: number) =>
  n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const formatChange = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(2)}`

const formatPct = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(2)}%`

/**
 * Compact strip of the three headline A-share indices. Data comes from
 * /api/indices (Tencent quote endpoint, login-free), refreshed every minute.
 */
export const IndicesCard: React.FC = () => {
  const [quotes, setQuotes] = useState<IndexQuote[]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  const load = async () => {
    try {
      const res = await fetch('/api/indices')
      if (!res.ok) throw new Error(`http ${res.status}`)
      const data = await res.json()
      if (!Array.isArray(data?.quotes) || data.quotes.length === 0) throw new Error('empty')
      setQuotes(data.quotes)
      setFailed(false)
    } catch {
      if (quotes.length === 0) setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const timer = setInterval(load, REFRESH_INTERVAL)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <section className="w-full max-w-[720px] mt-4" aria-label="股市指数">
        <div className="mx-2 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl px-3 py-2 text-center text-[11px] text-white/35">
          行情加载中…
        </div>
      </section>
    )
  }

  if (failed) return null

  return (
    <section className="w-full max-w-[720px] mt-4" aria-label="股市指数">
      <div className="mx-2 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.14)] px-2 py-1.5 grid grid-cols-3 divide-x divide-white/[0.07]">
        {quotes.map((q) => (
          <div
            key={q.code}
            className="flex flex-col items-center justify-center px-1 py-0.5 select-none"
            title={`最高 ${formatPrice(q.high)} / 最低 ${formatPrice(q.low)} / 昨收 ${formatPrice(q.prevClose)}`}
          >
            <span className="text-[10.5px] text-white/50 tracking-wide leading-tight">
              {q.name}
            </span>
            <span className={`text-[15px] font-semibold tabular-nums leading-snug ${trendColor(q.change)}`}>
              {formatPrice(q.price)}
            </span>
            <span className={`text-[10px] tabular-nums leading-tight ${trendColor(q.change)}`}>
              {formatChange(q.change)} {formatPct(q.changePct)}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
