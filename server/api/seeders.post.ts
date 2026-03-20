import { parseMagnet, scrapeInfoHash } from '~/server/utils/scrape'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const magnets: unknown = body?.magnets

  if (!Array.isArray(magnets) || magnets.length === 0 || !magnets.every(m => typeof m === 'string')) {
    throw createError({ statusCode: 400, statusMessage: '`magnets` must be a non-empty string array' })
  }

  const parsed = magnets.map((m: string) => {
    try {
      return parseMagnet(decodeURIComponent(m))
    } catch {
      return null
    }
  })

  const results = await Promise.allSettled(
    parsed.map((p) => {
      if (!p || p.infoHash.length !== 40) return Promise.resolve(null)
      return scrapeInfoHash(p.infoHash, p.trackers).then(data => ({ infoHash: p.infoHash, data }))
    })
  )

  const out: Record<string, number | null> = {}
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      out[result.value.infoHash] = result.value.data.seeders
    }
  }
  return out
})
