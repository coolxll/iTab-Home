import React, { useState, useEffect, useRef } from 'react'
import {
  Search,
  Sparkles,
  X,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Globe,
  Compass,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import type { AiSearchResponse, AiSearchResultItem } from '../types'

interface AiSearchModalProps {
  isOpen: boolean
  initialQuery: string
  onClose: () => void
}

export const AiSearchModal: React.FC<AiSearchModalProps> = ({
  isOpen,
  initialQuery,
  onClose,
}) => {
  const [query, setQuery] = useState(initialQuery)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<string>('')
  const [results, setResults] = useState<AiSearchResultItem[]>([])
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set())
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const handleCopy = (text: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
      })
    }
  }

  const performSearch = async (searchQuery: string) => {
    const q = searchQuery.trim()
    if (!q) return

    setLoading(true)
    setError(null)
    setSummary('')
    setResults([])
    setExpandedIndices(new Set())

    try {
      const resp = await fetch(`/api/search/query?q=${encodeURIComponent(q)}`)
      const data = (await resp.json()) as AiSearchResponse

      if (!resp.ok) {
        throw new Error(data.error || `搜索请求失败 (${resp.status})`)
      }

      setSummary(data.summary || '')
      setResults(data.results || [])
    } catch (err: any) {
      console.error('AI search request failed:', err)
      setError(err?.message || '搜索服务暂不可用，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery)
      if (initialQuery.trim()) {
        performSearch(initialQuery)
      } else {
        setResults([])
        setSummary('')
        setError(null)
      }
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen, initialQuery])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      performSearch(query)
    }
  }

  const getHostname = (urlStr: string) => {
    try {
      return new URL(urlStr).hostname.replace(/^www\./, '')
    } catch {
      return ''
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl sm:max-w-4xl max-h-[90vh] flex flex-col bg-zinc-900/95 border border-white/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Search Header */}
        <div className="p-3.5 border-b border-white/10 bg-white/5">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="relative flex-1 flex items-center bg-black/40 border border-white/15 focus-within:border-amber-400/80 rounded-xl px-3 py-2 transition-all">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mr-2 animate-pulse" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="输入问题或关键词，AI 即刻检索与解答..."
                className="w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-0.5 rounded-full hover:bg-white/20 text-white/50 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-black font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {loading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
              <span>搜索</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="关闭 (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Loading Skeleton */}
          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-400/40" />
                  <div className="h-4 w-28 bg-amber-400/30 rounded" />
                </div>
                <div className="h-3 w-full bg-white/10 rounded" />
                <div className="h-3 w-5/6 bg-white/10 rounded" />
                <div className="h-3 w-4/6 bg-white/10 rounded" />
              </div>

              <div className="space-y-2 pt-2">
                <div className="h-3.5 w-24 bg-white/20 rounded" />
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2"
                  >
                    <div className="h-4 w-2/3 bg-white/20 rounded" />
                    <div className="h-3 w-full bg-white/10 rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {!loading && error && (
            <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 space-y-3">
              <div className="flex items-start gap-2.5 text-red-200">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-red-100">搜索异常</div>
                  <div className="text-xs text-red-200/80 mt-1 leading-relaxed">{error}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => performSearch(query)}
                  className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>重试</span>
                </button>
                <a
                  href={`https://www.bing.com/search?q=${encodeURIComponent(query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white/80 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <Compass className="w-3 h-3" />
                  <span>转用必应搜索</span>
                </a>
              </div>
            </div>
          )}

          {/* AI Generated Summary Card */}
          {!loading && !error && summary && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/15 to-amber-600/5 border border-amber-500/30 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>AI 智能综述</span>
                </div>
                <span className="text-[10px] text-amber-300/60 font-mono">Vertex AI</span>
              </div>
              <div className="text-xs text-white/90 leading-relaxed whitespace-pre-line">
                {summary}
              </div>
            </div>
          )}

          {/* Search Result Items */}
          {!loading && !error && results.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-medium text-white/50 px-1 flex items-center justify-between">
                <span>检索参考来源 ({results.length})</span>
                <span className="text-[10px]">可直接展开阅读全文或打开原网页</span>
              </div>

              <div className="space-y-3">
                {results.map((res, index) => {
                  const host = getHostname(res.url)
                  const isExpanded = expandedIndices.has(index)
                  const isLongText = Boolean(res.snippet && res.snippet.length > 180)

                  return (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-amber-400/30 transition-all duration-200 space-y-2.5"
                    >
                      {/* Card Header: Title Link + Domain + Copy Button */}
                      <div className="flex items-start justify-between gap-3">
                        <a
                          href={res.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex-1 flex items-start gap-1.5 min-w-0"
                        >
                          <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors leading-snug">
                            {res.title || '无标题网页'}
                          </h4>
                          <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-amber-300 transition-colors shrink-0 mt-0.5" />
                        </a>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {res.snippet && (
                            <button
                              type="button"
                              onClick={(e) => handleCopy(res.snippet, index, e)}
                              className="px-2 py-1 bg-white/5 hover:bg-white/15 text-white/50 hover:text-white rounded-md text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                              title="复制预览文本"
                            >
                              {copiedIndex === index ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400 text-[10px]">已复制</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span className="text-[10px]">复制</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Extractive Key Answers (if available) */}
                      {res.extractiveAnswers && res.extractiveAnswers.length > 0 && (
                        <div className="p-2.5 rounded-lg bg-amber-500/10 border-l-2 border-amber-400 text-amber-100 text-xs space-y-1">
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-300">
                            <Sparkles className="w-3 h-3" />
                            <span>核心摘要</span>
                          </div>
                          {res.extractiveAnswers.map((ans, aIdx) => (
                            <p key={aIdx} className="leading-relaxed font-medium">
                              {ans}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Rich Preview Snippet */}
                      {res.snippet && (
                        <div>
                          <p
                            className={`text-xs text-white/80 leading-relaxed whitespace-pre-line ${
                              isExpanded ? '' : 'line-clamp-4 sm:line-clamp-6'
                            }`}
                          >
                            {res.snippet}
                          </p>

                          {isLongText && (
                            <button
                              type="button"
                              onClick={() => toggleExpand(index)}
                              className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-amber-400/90 hover:text-amber-300 transition-colors cursor-pointer font-medium"
                            >
                              <span>{isExpanded ? '收起预览' : `展开阅读全文 (${res.snippet.length} 字)`}</span>
                              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                          )}
                        </div>
                      )}

                      {/* Card Footer: Domain + Original URL button */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-white/40 font-mono">
                        {host ? (
                          <div className="flex items-center gap-1.5 truncate">
                            <Globe className="w-3 h-3 shrink-0" />
                            <span className="truncate">{host}</span>
                          </div>
                        ) : (
                          <span />
                        )}

                        {res.url && (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-sky-400/80 hover:text-sky-300 transition-colors font-sans flex items-center gap-1"
                          >
                            <span>打开来源</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && !summary && results.length === 0 && (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-white/80">未找到相关内容</div>
                <div className="text-xs text-white/40 max-w-sm mx-auto">
                  知识库中暂时没有匹配的结果，建议更换关键词重试或切换通用搜索引擎。
                </div>
              </div>
              <div className="pt-2 flex justify-center gap-2">
                <a
                  href={`https://www.bing.com/search?q=${encodeURIComponent(query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white/80 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <Compass className="w-3 h-3" />
                  <span>在必应中搜索</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-white/5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>服务端直连 Vertex AI Discovery Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <span>按 <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-[10px]">Esc</kbd> 退出</span>
          </div>
        </div>
      </div>
    </div>
  )
}
