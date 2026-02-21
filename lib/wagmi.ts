import { http } from 'wagmi'
import { monadTestnet } from 'viem/chains'
import { createConfig } from '@privy-io/wagmi'

export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
})

export { monadTestnet }
