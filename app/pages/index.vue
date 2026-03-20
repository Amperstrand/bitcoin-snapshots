<script setup lang="ts">
useHead({
  title: 'Bitcoin UTXO Snapshots - Fast IBD via Assume UTXO & FastSync Torrents',
  meta: [
    { name: 'description', content: 'Download Bitcoin UTXO snapshots for fast initial block download. Verified Assume UTXO .dat files hardcoded in Bitcoin Core, or FastSync .tar.zst torrents for mainnet, testnet3, testnet4, and signet.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://bitcoin-snapshots.jaonoctus.dev/' },
    { property: 'og:title', content: 'Bitcoin UTXO Snapshots - Assume UTXO & FastSync Torrents' },
    { property: 'og:description', content: 'Download Bitcoin UTXO snapshots for fast initial block download. Verified Assume UTXO .dat files hardcoded in Bitcoin Core, or FastSync .tar.zst torrents for mainnet, testnet3, testnet4, and signet.' },
    { property: 'og:image', content: 'https://bitcoin-snapshots.jaonoctus.dev/censorship.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: 'https://bitcoin-snapshots.jaonoctus.dev/censorship.jpg' },
    { name: 'twitter:title', content: 'Bitcoin UTXO Snapshots - Assume UTXO & FastSync Torrents' },
    { name: 'twitter:description', content: 'Download Bitcoin UTXO snapshots for fast initial block download. Verified Assume UTXO .dat files hardcoded in Bitcoin Core, or FastSync .tar.zst torrents for mainnet, testnet3, testnet4, and signet.' },
  ],
  link: [
    { rel: 'canonical', href: 'https://bitcoin-snapshots.jaonoctus.dev/' },
  ],
})

const activeTab = ref<'assumeutxo' | 'snapshots'>('assumeutxo')
</script>

<template>
  <SiteHeader />

  <main class="site-main">
    <div class="sec-head">
      <h2>Browse Archives</h2>
      <div class="rule"></div>
    </div>

    <SnapshotTabs :active-tab="activeTab" @switch-tab="activeTab = $event" />
    <InfoCards :active-tab="activeTab" />
    <DonateSection />
  </main>

  <footer class="site-footer">
    <span class="copyleft">&copy;</span> Bitcoin Snapshots by <strong>jaonoctus</strong>
  </footer>
</template>
