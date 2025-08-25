import { createConfig } from 'wagmi';
import { http } from 'viem';
import { mainnet } from 'wagmi/chains';

// Use a simple configuration to get the frontend working
export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});