'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig, monadTestnet } from '@/lib/wagmi'

const queryClient = new QueryClient()

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim()

function SetupRequired() {
  return (
    <main className="min-h-screen bg-marp-navy font-mono text-marp-cyan flex items-center justify-center p-6">
      <div className="border border-marp-border rounded-xl p-8 max-w-md text-center bg-marp-navy-light/60 backdrop-blur-sm">
        <h1 className="text-marp-cyan text-sm tracking-[0.2em] mb-4 font-semibold">
          [MARP] -- Setup required
        </h1>
        <p className="text-marp-cyan/60 text-sm mb-4">
          Privy needs a valid App ID. Add to <code className="bg-marp-navy-card border border-marp-border px-1.5 py-0.5 rounded text-marp-green text-xs">.env.local</code>:
        </p>
        <pre className="text-left text-xs text-marp-cyan/50 bg-marp-navy-card border border-marp-border rounded-lg p-4 mb-4 overflow-x-auto">
          NEXT_PUBLIC_PRIVY_APP_ID=your_app_id
        </pre>
        <a
          href="https://dashboard.privy.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-marp-cyan/40 text-marp-cyan px-5 py-2.5 rounded-lg text-sm hover:bg-marp-cyan/10 hover:border-marp-cyan/60 transition-all"
        >
          Get App ID at dashboard.privy.io &rarr;
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
          accentColor: '#0ef6cc',
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
