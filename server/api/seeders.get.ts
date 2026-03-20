import dgram from 'node:dgram'
import crypto from 'node:crypto'

interface ScrapeResult {
  seeders: number
  leechers: number
  completed: number
  tracker: string
}

// UDP tracker connect magic (BEP 15)
const CONNECT_MAGIC = Buffer.from('0000041727101980', 'hex')

function parseMagnet(magnet: string): { infoHash: string; trackers: string[] } {
  const url = new URL(magnet)
  const xt = url.searchParams.get('xt') ?? ''
  const infoHash = xt.replace('urn:btih:', '').toLowerCase()
  const trackers = url.searchParams.getAll('tr')
  return { infoHash, trackers }
}

function scrapeUdpTracker(trackerUrl: string, infoHashBuf: Buffer): Promise<ScrapeResult> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(trackerUrl)
    const host = parsed.hostname
    const port = parseInt(parsed.port) || 6969

    const socket = dgram.createSocket('udp4')
    let timer: ReturnType<typeof setTimeout>

    const cleanup = (err?: Error) => {
      clearTimeout(timer)
      try { socket.close() } catch {}
      if (err) reject(err)
    }

    timer = setTimeout(() => cleanup(new Error(`Timeout: ${trackerUrl}`)), 5000)

    const txId = crypto.randomInt(0, 0xFFFFFFFF)

    // --- Step 1: Connect request ---
    const connectReq = Buffer.alloc(16)
    CONNECT_MAGIC.copy(connectReq, 0)
    connectReq.writeUInt32BE(0, 8)   // action = connect
    connectReq.writeUInt32BE(txId, 12)

    socket.on('error', (err) => cleanup(err))

    socket.on('message', (msg) => {
      if (msg.length < 8) return
      const action = msg.readUInt32BE(0)
      const rxTxId = msg.readUInt32BE(4)
      if (rxTxId !== txId) return

      if (action === 0 && msg.length >= 16) {
        // --- Step 2: Scrape request ---
        const connectionId = msg.subarray(8, 16)
        const scrapeReq = Buffer.alloc(36)
        connectionId.copy(scrapeReq, 0)
        scrapeReq.writeUInt32BE(2, 8)   // action = scrape
        scrapeReq.writeUInt32BE(txId, 12)
        infoHashBuf.copy(scrapeReq, 16)
        socket.send(scrapeReq, port, host)
      } else if (action === 2 && msg.length >= 20) {
        // --- Scrape response ---
        const seeders   = msg.readUInt32BE(8)
        const completed = msg.readUInt32BE(12)
        const leechers  = msg.readUInt32BE(16)
        cleanup()
        resolve({ seeders, leechers, completed, tracker: trackerUrl })
      } else if (action === 3) {
        // Error response
        cleanup(new Error(`Tracker error: ${msg.subarray(8).toString()}`))
      }
    })

    socket.send(connectReq, port, host, (err) => {
      if (err) cleanup(err)
    })
  })
}

// Simple in-memory cache (hash → {data, expiresAt})
const cache = new Map<string, { data: unknown; expiresAt: number }>()
const CACHE_TTL_MS = 5 * 60 * 1000

export default defineEventHandler(async (event) => {
  const { magnet } = getQuery(event)

  if (!magnet || typeof magnet !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'magnet query parameter required' })
  }

  let parsed: { infoHash: string; trackers: string[] }
  try {
    parsed = parseMagnet(decodeURIComponent(magnet))
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid magnet link' })
  }

  const { infoHash, trackers } = parsed

  if (infoHash.length !== 40) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid info hash in magnet link' })
  }

  // Cache check
  const cached = cache.get(infoHash)
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data
  }

  const infoHashBuf = Buffer.from(infoHash, 'hex')
  const udpTrackers = trackers
    .map(t => decodeURIComponent(t))
    .filter(t => t.startsWith('udp://'))

  const results = await Promise.allSettled(
    udpTrackers.map(t => scrapeUdpTracker(t, infoHashBuf))
  )

  const successful = results
    .filter((r): r is PromiseFulfilledResult<ScrapeResult> => r.status === 'fulfilled')
    .map(r => r.value)

  const data = successful.length === 0
    ? { seeders: null, leechers: null, completed: null, trackers: [] }
    : {
        // Take the max seeders as the most representative count
        ...successful.reduce((best, r) => r.seeders > best.seeders ? r : best),
        trackers: successful,
      }

  cache.set(infoHash, { data, expiresAt: Date.now() + CACHE_TTL_MS })

  return data
})
