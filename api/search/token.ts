import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'private, no-store')

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  // Retrieve optional Vertex AI JWT or OAuth token from environment variables
  const token = process.env.GEN_SEARCH_AUTH_TOKEN || process.env.VERTEX_AI_JWT || ''

  res.status(200).json({ token })
}
