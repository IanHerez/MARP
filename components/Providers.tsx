'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig, monadTestnet } from '@/lib/wagmi'

const queryClient = new QueryClient()

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim()

function SetupRequired() {
  return (
    <main className="min-h-screen bg-black font-mono text-marp-green flex items-center justify-center p-6">
      <div className="border border-marp-green/50 rounded-lg p-8 max-w-md text-center">
        <h1 className="text-marp-green text-sm tracking-widest mb-4">
          [MARP] — Setup required
        </h1>
        <p className="text-marp-green/80 text-sm mb-4">
          Privy needs a valid App ID. Add to <code className="bg-black border border-marp-green/30 px-1 rounded">.env.local</code>:
        </p>
        <pre className="text-left text-xs text-marp-green/70 bg-black/50 border border-marp-green/30 rounded p-4 mb-4 overflow-x-auto">
          NEXT_PUBLIC_PRIVY_APP_ID=your_app_id
        </pre>
        <a
          href="https://dashboard.privy.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-marp-green text-marp-green px-4 py-2 rounded text-sm hover:bg-marp-green/10"
        >
          Get App ID at dashboard.privy.io →
        </a>
      </div>
    </main>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  if (!PRIVY_APP_ID) {
    return <SetupRequired />
  }

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#00ff41',
          logo: 'https://monad.xyz/monad-logo.svg',
        },
        loginMethods: ['email', 'google', 'wallet'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        defaultChain: monadTestnet,
        supportedChains: [monadTestnet],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
