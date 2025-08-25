import { Chain } from 'wagmi';

export const shardeumUnstable: Chain = {
  id: 8082,
  name: 'Shardeum Unstablenet',
  network: 'shardeum-unstable',
  nativeCurrency: {
    name: 'Shardeum',
    symbol: 'SHM',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://api-unstable.shardeum.org'],
    },
    public: {
      http: ['https://api-unstable.shardeum.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Shardeum Explorer',
      url: 'https://explorer-unstable.shardeum.org',
    },
  },
  testnet: true,
};