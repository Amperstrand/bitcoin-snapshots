export type Network = 'mainnet' | 'testnet4' | 'testnet3' | 'signet'

export interface SnapshotEntry {
  file: string
  since: { label: string; url: string }
  height: number
  heightDisplay: string
  blockUrl: string
  bestBlock: [string, string]
  hashSerialized: [string, string]
  chainTxs: string
  supply: string
  magnet: string
  url: string
}

export interface FastSyncEntry {
  file: string
  note: string
  height: number
  heightDisplay: string
  blockUrl: string
  bestBlock: [string, string]
  muhash: [string, string]
  txouts: string
  supply: string
  magnet: string
  url: string
}

export interface NetworkGroup<T> {
  network: Network
  entries: T[]
}

export const assumeUtxoGroups: NetworkGroup<SnapshotEntry>[] = [
  {
    network: 'mainnet',
    entries: [
      {
        file: 'utxo-935000.dat',
        since: { label: 'v31.0', url: 'https://github.com/bitcoin/bitcoin/blob/d3737769caac16570f3456fb437106a562fc8eef/src/kernel/chainparams.cpp#L185-L190' },
        height: 935000, heightDisplay: '935,000',
        blockUrl: 'https://mempool.space/block/0000000000000000000147034958af1652b2b91bba607beacc5e72a56f0fb5ee',
        bestBlock: ['CC5E 72A5', '6F0F B5EE'],
        hashSerialized: ['D041 25E2', 'A602 5050'],
        chainTxs: '1,305,397,408', supply: '19.98M',
        magnet: 'magnet:?xt=urn:btih:3492d082655d173d3459f7a5e454f3dd4ed0101b&dn=utxo-935000.dat&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce',
        url: 'https://files-vps02.jaonoctus.dev/utxo-935000.dat',
      },
      {
        file: 'utxo-910000.dat',
        since: { label: 'v30.0', url: 'https://github.com/bitcoin/bitcoin/blob/d0f6d9953a15d7c7111d46dcb76ab2bb18e5dee3/src/kernel/chainparams.cpp#L184-L189' },
        height: 910000, heightDisplay: '910,000',
        blockUrl: 'https://mempool.space/block/0000000000000000000108970acb9522ffd516eae17acddcb1bd16469194a821',
        bestBlock: ['B1BD 1646', '9194 A821'],
        hashSerialized: ['96FA 59A4', 'DA2F 1568'],
        chainTxs: '1,226,586,151', supply: '19.90M',
        magnet: 'magnet:?xt=urn:btih:7019437a2b1530624b100c0795cfc5f90b8322ca&dn=utxo-910000.dat&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969',
        url: 'https://files-vps02.jaonoctus.dev/utxo-910000.dat',
      },
      {
        file: 'utxo-880000.dat',
        since: { label: 'v29.0', url: 'https://github.com/bitcoin/bitcoin/blob/d360a6ef565f7f387c01075c36f567d5bb362ebf/src/kernel/chainparams.cpp#L195-L200' },
        height: 880000, heightDisplay: '880,000',
        blockUrl: 'https://mempool.space/block/000000000000000000010b17283c3c400507969a9c2afd1dcf2082ec5cca2880',
        bestBlock: ['CF20 82EC', '5CCA 2880'],
        hashSerialized: ['5378 2175', 'FBAD CEA9'],
        chainTxs: '1,145,604,538', supply: '19.81M',
        magnet: 'magnet:?xt=urn:btih:559bd78170502971e15e97d7572e4c824f033492&dn=utxo-880000.dat&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969',
        url: 'https://files-vps02.jaonoctus.dev/utxo-880000.dat',
      },
      {
        file: 'utxo-840000.dat',
        since: { label: 'v28.0', url: 'https://github.com/bitcoin/bitcoin/blob/e44d72b6480acb356f0a4793a76a5e2bc4e4118d/src/kernel/chainparams.cpp#L187-L192' },
        height: 840000, heightDisplay: '840,000',
        blockUrl: 'https://mempool.space/block/0000000000000000000320283a032748cef8227873ff4872689bf23f1cda83a5',
        bestBlock: ['689B F23F', '1CDA 83A5'],
        hashSerialized: ['8F77 6873', '1076 8F96'],
        chainTxs: '991,032,194', supply: '19.68M',
        magnet: 'magnet:?xt=urn:btih:596c26cc709e213fdfec997183ff67067241440c&dn=utxo-840000.dat&xl=9772098907&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969',
        url: 'https://files-vps02.jaonoctus.dev/utxo-840000.dat',
      },
    ],
  },
  {
    network: 'testnet4',
    entries: [
      {
        file: 'utxo-testnet4-120000.dat',
        since: { label: 'v31.0', url: 'https://github.com/bitcoin/bitcoin/blob/d3737769caac16570f3456fb437106a562fc8eef/src/kernel/chainparams.cpp#L407-L412' },
        height: 120000, heightDisplay: '120,000',
        blockUrl: 'https://mempool.space/testnet4/block/000000000bd2317e51b3c5794981c35ba894ce27d3e772d5c39ecd9cbce01dc8',
        bestBlock: ['C39E CD9C', 'BCE0 1DC8'],
        hashSerialized: ['F8F3 7FB2', '9C47 94B0'],
        chainTxs: '14,141,057', supply: '5.99M',
        magnet: 'magnet:?xt=urn:btih:25733a7e451ca435f2901921b805c167f560424d&dn=utxo-testnet4-120000.dat&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce',
        url: 'https://files-vps02.jaonoctus.dev/utxo-testnet4-120000.dat',
      },
      {
        file: 'utxo-testnet4-90000.dat',
        since: { label: 'v30.0', url: 'https://github.com/bitcoin/bitcoin/blob/d0f6d9953a15d7c7111d46dcb76ab2bb18e5dee3/src/kernel/chainparams.cpp#L382-L387' },
        height: 90000, heightDisplay: '90,000',
        blockUrl: 'https://mempool.space/testnet4/block/0000000002ebe8bcda020e0dd6ccfbdfac531d2f6a81457191b99fc2df2dbe3b',
        bestBlock: ['91B9 9FC2', 'DF2D BE3B'],
        hashSerialized: ['8FDB C957', '46F8 B9B5'],
        chainTxs: '11,347,043', supply: '4.49M',
        magnet: 'magnet:?xt=urn:btih:7bc8da992eccff153c342512e15269c45e8ee6c6&dn=utxo-testnet4-90000.dat&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce',
        url: 'https://files-vps02.jaonoctus.dev/utxo-testnet4-90000.dat',
      },
    ],
  },
  {
    network: 'testnet3',
    entries: [
      {
        file: 'utxo-testnet-4840000.dat',
        since: { label: 'v31.0', url: 'https://github.com/bitcoin/bitcoin/blob/d3737769caac16570f3456fb437106a562fc8eef/src/kernel/chainparams.cpp#L294-L299' },
        height: 4840000, heightDisplay: '4,840,000',
        blockUrl: 'https://mempool.space/testnet/block/00000000000000f4971a7fb37fbdff89315b69a2e1920c467654a382f0d64786',
        bestBlock: ['7654 A382', 'F0D6 4786'],
        hashSerialized: ['AF46 8982', 'A0C8 DB2A'],
        chainTxs: '536,078,574', supply: '20.99M',
        magnet: 'magnet:?xt=urn:btih:dfe62321ec8e9538a47e4f019d34a88510eaa751&dn=utxo-testnet-4840000.dat&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce',
        url: 'https://files-vps02.jaonoctus.dev/utxo-testnet-4840000.dat',
      },
      {
        file: 'utxo-testnet-2500000.dat',
        since: { label: 'v26.0', url: 'https://github.com/bitcoin/bitcoin/blob/44d8b13c81e5276eb610c99f227a4d090cc532f6/src/kernel/chainparams.cpp#L270-L275' },
        height: 2500000, heightDisplay: '2,500,000',
        blockUrl: 'https://mempool.space/testnet/block/0000000000000093bcb68c03a9a168ae252572d348a2eaeba2cdf9231d73206f',
        bestBlock: ['A2CD F923', '1D73 206F'],
        hashSerialized: ['6C3C A68D', 'B807 1BE7'],
        chainTxs: '66,484,552', supply: '20.99M',
        magnet: 'magnet:?xt=urn:btih:4063ff1580db4923e6dbc3ac6cab3baf4cf19bc4&dn=utxo-testnet-2500000.dat&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce',
        url: 'https://files-vps02.jaonoctus.dev/utxo-testnet-2500000.dat',
      },
    ],
  },
  {
    network: 'signet',
    entries: [
      {
        file: 'utxo-signet-290000.dat',
        since: { label: 'v31.0', url: 'https://github.com/bitcoin/bitcoin/blob/d3737769caac16570f3456fb437106a562fc8eef/src/kernel/chainparams.cpp#L528-L533' },
        height: 290000, heightDisplay: '290,000',
        blockUrl: 'https://mempool.space/signet/block/0000000577f2741bb30cd9d39d6d71b023afbeb9764f6260786a97969d5c9ac0',
        bestBlock: ['786A 9796', '9D5C 9AC0'],
        hashSerialized: ['888B BD21', '60D1 4545'],
        chainTxs: '28,547,497', supply: '12.49M',
        magnet: 'magnet:?xt=urn:btih:304c3ee0ac2ce34ba64173b50d1950976544e8a3&dn=utxo-signet-290000.dat&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce',
        url: 'https://files-vps02.jaonoctus.dev/utxo-signet-290000.dat',
      },
      {
        file: 'utxo-signet-160000.dat',
        since: { label: 'v26.0', url: 'https://github.com/bitcoin/bitcoin/blob/44d8b13c81e5276eb610c99f227a4d090cc532f6/src/kernel/chainparams.cpp#L379-L384' },
        height: 160000, heightDisplay: '160,000',
        blockUrl: 'https://mempool.space/signet/block/0000003ca3c99aff040f2563c2ad8f8ec88bd0fd6b8f0895cfaf1ef90353a62c',
        bestBlock: ['CFAF 1EF9', '0353 A62C'],
        hashSerialized: ['B7D7 0783', 'DBDF 928A'],
        chainTxs: '2,289,496', supply: '7.99M',
        magnet: 'magnet:?xt=urn:btih:ae77ab03cbf8e2cb5971c1971b9bf6ee91d9a72b&dn=utxo-signet-160000.dat&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce',
        url: 'https://files-vps02.jaonoctus.dev/utxo-signet-160000.dat',
      },
    ],
  },
]

export const fastSyncGroups: NetworkGroup<FastSyncEntry>[] = [
  {
    network: 'mainnet',
    entries: [
      {
        file: 'utxo-snapshot-bitcoin-mainnet-941429',
        note: 'pruned',
        height: 941429, heightDisplay: '941,429',
        blockUrl: 'https://mempool.space/block/00000000000000000000879f3d5d4e2f8103d0df07d8a533731358207000b56a',
        bestBlock: ['7313 5820', '7000 B56A'],
        muhash: ['881A CA64', 'B5C9 DF46'],
        txouts: '164.89M', supply: '20.00M',
        magnet: 'magnet:?xt=urn:btih:ff50001d942b536fe968912da3a937c2b9a52995&dn=utxo-snapshot-bitcoin-mainnet-941429&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969',
        url: 'https://files-vps02.jaonoctus.dev/utxo-snapshot-bitcoin-mainnet-941429/',
      },
    ],
  },
  {
    network: 'testnet4',
    entries: [
      {
        file: 'utxo-snapshot-bitcoin-testnet4-110034',
        note: 'full, txindex, coinstatsindex, blockfilterindex',
        height: 110034, heightDisplay: '110,034',
        blockUrl: 'https://mempool.space/testnet4/block/00000000000000019103e1945e3bd4792a5d9cdfbdc3fa2fc2248be33ae4cabe',
        bestBlock: ['C224 8BE3', '3AE4 CABE'],
        muhash: ['E604 9DC8', 'E72B 981E'],
        txouts: '13.53M', supply: '5.50M',
        magnet: 'magnet:?xt=urn:btih:bd01f34d936d61816d7613c18213c2676185e3c4&dn=utxo-snapshot-bitcoin-testnet4-110034&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2fexplodie.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80&tr=udp%3a%2f%2ftracker.bitcoin.sprovoost.nl%3a6969',
        url: 'https://files-vps02.jaonoctus.dev/utxo-snapshot-bitcoin-testnet4-110034/',
      },
    ],
  },
  {
    network: 'testnet3',
    entries: [
      {
        file: 'utxo-snapshot-bitcoin-testnet3-4840663',
        note: 'pruned',
        height: 4840663, heightDisplay: '4,840,663',
        blockUrl: 'https://mempool.space/testnet/block/000000000000002fd042bf91696d9b77b57ccf195cfc8259a35ea90b09520351',
        bestBlock: ['A35E A90B', '0952 0351'],
        muhash: ['B512 2F6E', 'C4A5 D803'],
        txouts: '235.05M', supply: '21.00M',
        magnet: 'magnet:?xt=urn:btih:40f14641a1089d12273f0e65b0ecf21ddf40b350&dn=utxo-snapshot-bitcoin-testnet3-4840663&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969',
        url: 'https://files-vps02.jaonoctus.dev/utxo-snapshot-bitcoin-testnet3-4840663/',
      },
    ],
  },
  {
    network: 'signet',
    entries: [
      {
        file: 'utxo-snapshot-bitcoin-signet-298958',
        note: 'full, txindex, coinstatsindex, blockfilterindex',
        height: 298958, heightDisplay: '298,958',
        blockUrl: 'https://mempool.space/signet/block/000000056e8042442d87ac51c461239ac47af7c944f52f661864721de0275dd8',
        bestBlock: ['1864 721D', 'E027 5DD8'],
        muhash: ['877D A65B', '0E16 CECD'],
        txouts: '64.21M', supply: '12.72M',
        magnet: 'magnet:?xt=urn:btih:bca420caedbd132fb6e256b6296d39723e306043&dn=utxo-snapshot-bitcoin-signet-298958&tr=udp%3A%2F%2Ftracker.bitcoin.sprovoost.nl%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce',
        url: 'https://files-vps02.jaonoctus.dev/utxo-snapshot-bitcoin-signet-298958/',
      },
    ],
  },
]
