import { defineChain } from 'viem';

export const shardeumUnstable = defineChain({
  id: 8080,
  name: 'Shardeum Unstablenet',
  network: 'shardeum-unstable',
  nativeCurrency: {
    decimals: 18,
    name: 'Shardeum',
    symbol: 'SHM',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_SHARDEUM_RPC || 'https://api-unstable.shardeum.org'],
    },
    public: {
      http: [process.env.NEXT_PUBLIC_SHARDEUM_RPC || 'https://api-unstable.shardeum.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Shardeum Explorer',
      url: 'https://explorer-unstable.shardeum.org',
    },
  },
});