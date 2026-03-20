<script setup lang="ts">
import { assumeUtxoGroups, fastSyncGroups } from '~/data/index'

const props = defineProps<{
  activeTab: 'assumeutxo' | 'snapshots'
}>()

const emit = defineEmits<{
  switchTab: [tab: 'assumeutxo' | 'snapshots']
}>()

// ── Seeders ──────────────────────────────────────────────────────────────────

interface SeederData {
  seeders: number | null
  leechers: number | null
  completed: number | null
}

// Keyed by info hash extracted from magnet link
const seederMap = ref<Map<string, SeederData | 'loading'>>(new Map())

function getInfoHash(magnet: string): string {
  const match = magnet.match(/xt=urn:btih:([0-9a-fA-F]{40})/i)
  return match ? match[1].toLowerCase() : ''
}

async function fetchSeeders(magnet: string) {
  const hash = getInfoHash(magnet)
  if (!hash || seederMap.value.get(hash) !== undefined) return
  seederMap.value.set(hash, 'loading')
  try {
    const data = await $fetch<SeederData>('/api/seeders', {
      query: { magnet: encodeURIComponent(magnet) },
    })
    seederMap.value.set(hash, data)
  } catch {
    seederMap.value.set(hash, { seeders: null, leechers: null, completed: null })
  }
}

function seederLabel(magnet: string): string {
  const hash = getInfoHash(magnet)
  const entry = seederMap.value.get(hash)
  if (!entry || entry === 'loading') return '…'
  if (entry.seeders === null) return '—'
  return String(entry.seeders)
}

// Fetch on mount for the initial tab's rows
onMounted(() => {
  const groups = props.activeTab === 'assumeutxo' ? assumeUtxoGroups : fastSyncGroups
  groups.flatMap(g => g.entries).forEach(r => fetchSeeders(r.magnet))
})

// Fetch when switching tabs
watch(() => props.activeTab, (tab) => {
  const groups = tab === 'assumeutxo' ? assumeUtxoGroups : fastSyncGroups
  groups.flatMap(g => g.entries).forEach(r => fetchSeeders(r.magnet))
})

// ── Copy magnet ───────────────────────────────────────────────────────────────

const copiedMagnet = ref<string | null>(null)

async function copyMagnet(magnet: string) {
  await navigator.clipboard.writeText(magnet)
  copiedMagnet.value = magnet
  setTimeout(() => { copiedMagnet.value = null }, 1500)
}
</script>

<template>
  <!-- Tab bar -->
  <div class="tab-bar" role="tablist">
    <button
      class="tab-btn"
      :class="{ active: activeTab === 'assumeutxo' }"
      role="tab"
      :aria-selected="activeTab === 'assumeutxo'"
      aria-controls="tab-assumeutxo"
      @click="emit('switchTab', 'assumeutxo')"
    >
      Assume UTXO
    </button>
    <button
      class="tab-btn"
      :class="{ active: activeTab === 'snapshots' }"
      role="tab"
      :aria-selected="activeTab === 'snapshots'"
      aria-controls="tab-snapshots"
      @click="emit('switchTab', 'snapshots')"
    >
      FastSync
    </button>
  </div>

  <!-- Assume UTXO panel -->
  <div v-if="activeTab === 'assumeutxo'" id="tab-assumeutxo" class="tab-panel" role="tabpanel">
    <table class="snap-table" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th>File</th>
          <th>Height</th>
          <th>Best Block</th>
          <th>Hash Serialized</th>
          <th>Chain Txs</th>
          <th>Supply</th>
          <th style="text-align:center">Seeders</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="group in assumeUtxoGroups" :key="group.network">
          <tr class="net-row">
            <td colspan="8"><span :class="['nbadge', group.network]">{{ group.network.toUpperCase() }}</span></td>
          </tr>
          <tr v-for="row in group.entries" :key="row.file">
            <td>
              <div class="fname">{{ row.file }}</div>
              <div class="fsince">since <a :href="row.since.url" rel="nofollow" target="_blank">{{ row.since.label }}</a></div>
            </td>
            <td class="height">
              <a :href="row.blockUrl" target="_blank">{{ row.heightDisplay }}</a>
            </td>
            <td class="hash">{{ row.bestBlock[0] }}<br>{{ row.bestBlock[1] }}</td>
            <td class="hash">{{ row.hashSerialized[0] }}<br>{{ row.hashSerialized[1] }}</td>
            <td>{{ row.chainTxs }}</td>
            <td>{{ row.supply }}</td>
            <td class="seeders">{{ seederLabel(row.magnet) }}</td>
            <td>
              <a
                class="dl-btn"
                :href="row.magnet"
                target="_blank"
                @contextmenu.prevent="copyMagnet(row.magnet)"
              >
                <svg v-if="copiedMagnet !== row.magnet" viewBox="0 0 16 16"><path d="M8 2v9M4 8l4 4 4-4M2 14h12"/></svg>
                {{ copiedMagnet === row.magnet ? 'Copied!' : 'Torrent' }}
              </a>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <!-- FastSync panel -->
  <div v-if="activeTab === 'snapshots'" id="tab-snapshots" class="tab-panel" role="tabpanel">
    <div class="warning-panel">
      <strong>Warning:</strong> FastSync snapshots require you to trust the snapshot provider.
      This is a <a href="https://docs.btcpayserver.org/Docker/fastsync/#what-are-the-downsides-of-fast-sync" target="_blank" rel="noopener noreferrer">less secure method</a>.
      The recommended approach is to use
      <button style="background:none;border:none;color:var(--danger);text-decoration:underline;cursor:pointer;padding:0;font:inherit;" @click="emit('switchTab', 'assumeutxo')">Assume UTXO</button>
      files, which are verified by your Bitcoin Core node against a hash hardcoded in the source code.
    </div>

    <table class="snap-table" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th>File</th>
          <th>Height</th>
          <th>Best Block</th>
          <th>MuHash</th>
          <th>TxOuts</th>
          <th>Supply</th>
          <th style="text-align:center">Seeders</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="group in fastSyncGroups" :key="group.network">
          <tr class="net-row">
            <td colspan="8"><span :class="['nbadge', group.network]">{{ group.network.toUpperCase() }}</span></td>
          </tr>
          <tr v-for="row in group.entries" :key="row.file">
            <td>
              <div class="fname">{{ row.file }}</div>
              <div class="fsince">{{ row.note }}</div>
            </td>
            <td class="height">
              <a :href="row.blockUrl" target="_blank">{{ row.heightDisplay }}</a>
            </td>
            <td class="hash">{{ row.bestBlock[0] }}<br>{{ row.bestBlock[1] }}</td>
            <td class="hash">{{ row.muhash[0] }}<br>{{ row.muhash[1] }}</td>
            <td>{{ row.txouts }}</td>
            <td>{{ row.supply }}</td>
            <td class="seeders">{{ seederLabel(row.magnet) }}</td>
            <td>
              <a
                class="dl-btn"
                :href="row.magnet"
                target="_blank"
                @contextmenu.prevent="copyMagnet(row.magnet)"
              >
                <svg v-if="copiedMagnet !== row.magnet" viewBox="0 0 16 16"><path d="M8 2v9M4 8l4 4 4-4M2 14h12"/></svg>
                {{ copiedMagnet === row.magnet ? 'Copied!' : 'Torrent' }}
              </a>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
