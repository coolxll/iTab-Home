import React, { useEffect, useState } from 'react'
import { Flame, RefreshCw } from 'lucide-react'

interface HotItem {
  rank: number
  title: string
  url: string
  heat?: string
  tag?: string
}

interface SourceState {
  items: HotItem[]
  error?: string
  loading: boolean
}

const SOURCES = [
  { id: 'weibo', label: '微博热搜', accent: 'text-[#FF8200]', dot: 'bg-[#FF8200]' },
  { id: 'zhihu', label: '知乎热榜', accent: 'text-[#0066FF]', dot: 'bg-[#0066FF]' },
] as const

type SourceId = (typeof SOURCES)[number]['id']

const ITEMS_PER_PAGE = 10
const REFRESH_INTERVAL = 5 * 60 * 1000

const rankColor = (rank: number) =>
  rank === 1
    ? 'text-[#FE2D46]'
    : rank === 2
      ? 'text-[#F60]'
      : rank === 3
        ? 'text-[#FAA90E]'
        : 'text-white/40'

export const HotListsCard: React.FC = () => {
  const [active, setActive] = useState<SourceId>('weibo')
  const [page, setPage] = useState(0)
  const [state, setState] = useState<Record<SourceId, SourceState>>({
    weibo: { items: [], loading: true },
    zhihu: { items: [], loading: true },
  })
  const [refreshing, setRefreshing] = useState(false)

  const load = async (bust = false) => {
    try {
      const res = await fetch(`/api/hot?sources=weibo,zhihu&limit=30${bust ? `&_t=${Date.now()}` : ''}`)
      if (!res.ok) throw new Error(`http ${res.status}`)
      const data = await res.json()
      setState((prev) => {
        const next = { ...prev }
        for (const s of SOURCES) {
          const payload = data?.sources?.[s.id]
          next[s.id] = {
            items: Array.isArray(payload?.items) ? payload.items : [],
            error: payload?.error,
            loading: false,
          }
        }
        return next
      })
    } catch (err) {
      setState((prev) => {
        const next = { ...prev }
        for (const s of SOURCES) {
          next[s.id] = {
            ...prev[s.id],
            error: prev[s.id].items.length ? prev[s.id].error : '加载失败',
            loading: false,
          }
        }
        return next
      })
    }
  }

  useEffect(() => {
    load()
    const timer = setInterval(() => load(), REFRESH_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await load(true)
    setRefreshing(false)
  }

  const current = state[active]
  const totalPages = Math.max(1, Math.ceil(current.items.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages - 1)
  const visible = current.items.slice(
    safePage * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  )

  return (
    <section className="w-full max-w-[720px] mt-5" aria-label="每日热门">
      <div className="mx-2 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.16)] px-4 pt-3 pb-2">
        {/* Header: source tabs + refresh */}
        <div className="flex items-center justify-between mb-1 px-1">
          <div className="flex items-center gap-3">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            {SOURCES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActive(s.id)
                  setPage(0)
                }}
                className={`flex items-center gap-1.5 text-[11px] font-medium tracking-wide transition-colors ${
                  active === s.id ? 'text-white' : 'text-white/45 hover:text-white/75'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${active === s.id ? '' : 'opacity-40'}`} />
                {s.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            title="刷新"
            className="p-1 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* List */}
        {current.loading ? (
          <div className="py-6 text-center text-[11px] text-white/40">加载中…</div>
        ) : current.items.length === 0 ? (
          <div className="py-6 text-center text-[11px] text-white/40">
            {current.error || '暂无数据'}
          </div>
        ) : (
          <ol className="divide-y divide-white/[0.06]">
            {visible.map((item) => (
              <li key={`${active}-${item.rank}-${item.title}`}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 py-[7px] px-1 rounded-lg hover:bg-white/[0.06] transition-colors group/item"
                >
                  <span
                    className={`w-4 text-center text-[12px] font-bold italic font-mono flex-shrink-0 ${rankColor(
                      item.rank
                    )}`}
                  >
                    {item.rank}
                  </span>
                  <span className="flex-1 min-w-0 truncate text-[12.5px] text-white/85 group-hover/item:text-white transition-colors">
                    {item.title}
                  </span>
                  {item.tag && (
                    <span className="flex-shrink-0 text-[9px] font-bold px-1 rounded-sm bg-[#FE2D46]/90 text-white leading-[14px]">
                      {item.tag}
                    </span>
                  )}
                  {item.heat && (
                    <span className="flex-shrink-0 text-[10.5px] text-white/35 tabular-nums">
                      {item.heat}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ol>
        )}

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-1.5 pb-0.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`第${i + 1}页`}
                onClick={() => setPage(i)}
                className={`h-1 rounded-full transition-all ${
                  i === safePage ? 'w-4 bg-white/70' : 'w-1 bg-white/25 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
