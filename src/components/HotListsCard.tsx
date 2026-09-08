import React, { useEffect, useState } from 'react'
import { Flame, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react'

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
  { id: 'weibo', label: '微博', dot: 'bg-[#FF8200]' },
  { id: 'zhihu', label: '知乎', dot: 'bg-[#0066FF]' },
] as const

type SourceId = (typeof SOURCES)[number]['id']

const FETCH_LIMIT = 15
const COLLAPSED_COUNT = 3
const REFRESH_INTERVAL = 5 * 60 * 1000

const rankColor = (rank: number) =>
  rank === 1
    ? 'text-[#FE2D46]'
    : rank === 2
      ? 'text-[#F60]'
      : rank === 3
        ? 'text-[#FAA90E]'
        : 'text-white/40'

const HotRow: React.FC<{ item: HotItem; compact?: boolean }> = ({ item, compact }) => (
  <a
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    title={item.title}
    className={`flex items-center gap-2 rounded-lg hover:bg-white/[0.06] transition-colors group/item ${
      compact ? 'py-[5px] px-1.5' : 'py-[6px] px-2'
    }`}
  >
    <span
      className={`w-4 text-center text-[11.5px] font-bold italic font-mono flex-shrink-0 ${rankColor(
        item.rank
      )}`}
    >
      {item.rank}
    </span>
    <span className="flex-1 min-w-0 truncate text-[12px] text-white/80 group-hover/item:text-white transition-colors">
      {item.title}
    </span>
    {item.tag && (
      <span className="flex-shrink-0 text-[8.5px] font-bold px-1 rounded-sm bg-[#FE2D46]/90 text-white leading-[13px]">
        {item.tag}
      </span>
    )}
    {item.heat && (
      <span className="flex-shrink-0 text-[10px] text-white/30 tabular-nums hidden sm:inline">
        {item.heat}
      </span>
    )}
  </a>
)

/**
 * Compact hot-list widget with two presentations:
 * - default (centered strip): top 3 inline, expandable to a 3-column grid of 15
 * - sidebar: single-column scrollable list of 15, sized for the side rail
 */
export const HotListsCard: React.FC<{ variant?: 'default' | 'sidebar' }> = ({
  variant = 'default',
}) => {
  const [active, setActive] = useState<SourceId>('weibo')
  const [expanded, setExpanded] = useState(false)
  const [state, setState] = useState<Record<SourceId, SourceState>>({
    weibo: { items: [], loading: true },
    zhihu: { items: [], loading: true },
  })
  const [refreshing, setRefreshing] = useState(false)

  const load = async () => {
    try {
      const res = await fetch(`/api/hot?sources=weibo,zhihu&limit=${FETCH_LIMIT}`)
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
    } catch {
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
    const timer = setInterval(load, REFRESH_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await load()
    setRefreshing(false)
  }

  const current = state[active]
  const collapsed = current.items.slice(0, COLLAPSED_COUNT)
  const isSidebar = variant === 'sidebar'

  return (
    <section
      className={isSidebar ? 'w-full' : 'w-full max-w-[720px] mt-4'}
      aria-label="每日热门"
    >
      <div
        className={`rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.14)] px-3 pt-1.5 pb-1.5 ${
          isSidebar ? '' : 'mx-2'
        }`}
      >
        {/* Header row: tabs + controls */}
        <div className="flex items-center justify-between px-1 pb-1">
          <div className="flex items-center gap-2.5">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            {SOURCES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-1 text-[11px] font-medium tracking-wide transition-colors ${
                  active === s.id ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span className={`w-1 h-1 rounded-full ${s.dot} ${active === s.id ? '' : 'opacity-40'}`} />
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={handleRefresh}
              title="刷新"
              className="p-1 rounded-md text-white/35 hover:text-white/80 hover:bg-white/10 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            {!isSidebar && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                title={expanded ? '收起' : `展开 Top ${FETCH_LIMIT}`}
                className="flex items-center gap-0.5 px-1.5 py-1 rounded-md text-[10.5px] text-white/45 hover:text-white/85 hover:bg-white/10 transition-colors"
              >
                <span>{expanded ? '收起' : '展开'}</span>
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        {current.loading ? (
          <div className="py-2 text-center text-[11px] text-white/35">加载中…</div>
        ) : current.items.length === 0 ? (
          <div className="py-2 text-center text-[11px] text-white/35">{current.error || '暂无数据'}</div>
        ) : isSidebar ? (
          /* Sidebar: full single-column scrollable list */
          <div className="divide-y divide-white/[0.05] max-h-[300px] overflow-y-auto pr-0.5 [scrollbar-width:thin]">
            {current.items.map((item) => (
              <HotRow key={`${active}-${item.rank}-${item.title}`} item={item} />
            ))}
          </div>
        ) : expanded ? (
          /* Expanded: 3-column grid of the full list */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-1 animate-in fade-in duration-200">
            {current.items.map((item) => (
              <HotRow key={`${active}-${item.rank}-${item.title}`} item={item} compact />
            ))}
          </div>
        ) : (
          /* Collapsed: top 3 rows */
          <div className="divide-y divide-white/[0.05]">
            {collapsed.map((item) => (
              <HotRow key={`${active}-${item.rank}-${item.title}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
