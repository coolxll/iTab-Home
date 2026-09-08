import type { VercelRequest, VercelResponse } from '@vercel/node'
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const url = `https://cloud.feedly.com/v3/streams/contents?streamId=${encodeURIComponent('feed/https://linux.do/top.rss')}&count=3`
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } })
  const body = (await r.text()).slice(0, 500)
  res.status(200).json({ status: r.status, body })
}
