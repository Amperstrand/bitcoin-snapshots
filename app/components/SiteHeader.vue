<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const chars = '0123456789ABCDEF'
  const fs = 13
  let cols: number, drops: number[], trails: number[]
  let animId: number
  let frame = 0
  const speed = 6

  function init() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    cols = Math.floor(canvas.width / fs)
    drops = []
    trails = []
    for (let i = 0; i < cols; i++) {
      drops[i] = (Math.random() * -canvas.height / fs) | 0
      trails[i] = Math.floor(8 + Math.random() * 16)
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < cols; i++) {
      const y = drops[i]
      const len = trails[i]
      for (let j = 0; j < len; j++) {
        const row = y - j
        if (row < 0) continue
        const ratio = 1 - j / len
        let r, g, b, alpha
        if (j === 0) {
          r = 200; g = 255; b = 200; alpha = 0.35
        } else {
          r = 0; g = Math.floor(200 * ratio); b = Math.floor(60 * ratio)
          alpha = ratio * 0.18
        }
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.font = `${fs}px "IBM Plex Mono", monospace`
        ctx.fillText(chars[Math.random() * 16 | 0], i * fs, row * fs)
      }
      drops[i]++
      if (drops[i] * fs > canvas.height + trails[i] * fs) {
        drops[i] = (Math.random() * -20) | 0
        trails[i] = Math.floor(8 + Math.random() * 16)
      }
    }
  }

  function loop() {
    frame++
    if (frame % speed === 0) draw()
    animId = requestAnimationFrame(loop)
  }

  init()
  window.addEventListener('resize', init)
  loop()

  onUnmounted(() => {
    window.removeEventListener('resize', init)
    cancelAnimationFrame(animId)
  })
})
</script>

<template>
  <header class="site-header">
    <canvas ref="canvasRef" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;" />
    <div class="header-inner">
      <h1 class="site-title">BITCOIN SNAPSHOTS</h1>
      <div class="header-img"><img src="/censorship.jpg" alt="" /></div>
      <p class="site-subtitle">UTXO Set Archives &mdash; Assume UTXO &amp; FastSync</p>
      <div class="net-pills">
        <span class="net-pill">mainnet</span>
        <span class="net-pill">testnet4</span>
        <span class="net-pill">testnet3</span>
        <span class="net-pill">signet</span>
      </div>
    </div>
  </header>
</template>
