<script setup lang="ts">
defineProps<{
  activeTab: 'assumeutxo' | 'snapshots'
}>()
</script>

<template>
  <div class="info-grid">

    <div class="info-card">
      <h3>Torrenting Explained</h3>
      <p>
        Unlike direct downloads, torrenting breaks files into packets distributed across peers.
        Each client downloads from multiple sources simultaneously, increasing speed and resilience.
      </p>
      <p>
        <b>Why seed?</b> Seeding means sharing downloaded pieces with others.
        Without seeders, files become unavailable. Please seed after downloading.
      </p>
    </div>

    <div class="info-card">
      <h3>File Types</h3>
      <ul class="ftypes">
        <li>
          <span class="ext">*.dat</span>
          <span><a href="https://bitcoinops.org/en/topics/assumeutxo/" target="_blank">Assume UTXO</a> chainstate snapshot</span>
        </li>
        <li>
          <span class="ext">*.tar.zst</span>
          <span>Zstandard-compressed snapshot archive</span>
        </li>
        <li>
          <span class="ext">*.sha512sum.txt</span>
          <span>SHA-512 checksums for integrity verification</span>
        </li>
        <li>
          <span class="ext">*.asc</span>
          <span>GPG signature for authenticity verification</span>
        </li>
      </ul>
    </div>

    <!-- FastSync-only card -->
    <div v-if="activeTab === 'snapshots'" class="info-card full-width">
      <h3>Don&rsquo;t Trust, Verify</h3>

      <p><b>Verify authenticity (GPG signature):</b></p>
      <div class="cmd"><span class="prompt">$ </span>gpg --verify ./*.asc</div>
      <pre class="cmd-out">gpg: assuming signed data in '&lt;filename&gt;.sha512sum.txt'
gpg: Signature made &lt;timestamp&gt;
gpg:                using EDDSA key EBBB81751DB809DE50DD58C4AC75C86B6EE74334
gpg: Good signature from "jaonoctus &lt;jaonoctus@protonmail.com&gt;" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 7B69 6A61 6F73 1337 520B  8A19 D8F3 1505 B581 D617
     Subkey fingerprint: EBBB 8175 1DB8 09DE 50DD  58C4 AC75 C86B 6EE7 4334</pre>

      <p><b>Verify integrity (SHA-512 checksum):</b></p>
      <div class="cmd"><span class="prompt">$ </span>sha512sum --check --ignore-missing ./*.sha512sum.txt</div>
      <div class="cmd-out">&lt;filename&gt;: OK</div>
    </div>

    <!-- Assume UTXO-only card -->
    <div v-if="activeTab === 'assumeutxo'" class="info-card full-width">
      <h3>How to Restore Assume UTXO</h3>

      <p><b>1. Start your node:</b></p>
      <div class="cmd"><span class="prompt">$ </span>bitcoind</div>

      <p style="margin-top:14px"><b>2. Wait until headers are in sync:</b></p>
      <div class="cmd"><span class="prompt">$ </span>bitcoin-cli getblockchaininfo</div>
      <pre class="cmd-out">{
  "headers": 935000,
  "blocks": 0,
  ...
}</pre>
      <p>Wait until blocks starts incrementing before proceeding.</p>

      <p style="margin-top:14px"><b>3. Disconnect from the network:</b></p>
      <div class="cmd"><span class="prompt">$ </span>bitcoin-cli setnetworkactive false</div>

      <p style="margin-top:14px"><b>4. Load the UTXO snapshot:</b></p>
      <div class="cmd"><span class="prompt">$ </span>bitcoin-cli -rpcclienttimeout=0 loadtxoutset /path/to/utxo-935000.dat</div>
      <p style="margin-top:8px">The -rpcclienttimeout=0 flag prevents the RPC client from timing out while the snapshot is being loaded. Once complete, your node will resume syncing from the snapshot height.</p>

      <p style="margin-top:14px"><b>5. Reconnect to the network:</b></p>
      <div class="cmd"><span class="prompt">$ </span>bitcoin-cli setnetworkactive true</div>

      <p style="margin-top:14px"><b>6. Check chain states:</b></p>
      <div class="cmd"><span class="prompt">$ </span>bitcoin-cli getchainstates</div>
      <pre class="cmd-out">{
  "headers": 935000,
  "chainstates": [
    {
      "blocks": 12045,
      "bestblockhash": "00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee",
      "difficulty": 1.00000,
      "verificationprogress": 0.000013,
      "coins_db_cache_bytes": 8388608,
      "coins_tip_cache_bytes": 0,
      "validated": true
    },
    {
      "blocks": 935000,
      "bestblockhash": "0000000000000000000147034958af1652b2b91bba607beacc5e72a56f0fb5ee",
      "difficulty": 110568428484950.8,
      "verificationprogress": 0.999998,
      "snapshot_blockhash": "0000000000000000000147034958af1652b2b91bba607beacc5e72a56f0fb5ee",
      "coins_db_cache_bytes": 8388608,
      "coins_tip_cache_bytes": 452984,
      "validated": false
    }
  ]
}</pre>
    </div>

  </div>
</template>
