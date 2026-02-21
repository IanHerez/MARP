'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useWallets } from '@privy-io/react-auth'

export function ConnectButton() {
  const { ready, authenticated, login, logout, user } = usePrivy()
  const { wallets } = useWallets()

  if (!ready) {
    return (
      <button
        disabled
        className="bg-black border border-marp-green/30 text-marp-green/50 px-4 py-2 rounded text-sm font-mono"
      >
        Loading...
      </button>
    )
  }

  if (!authenticated) {
    return (
      <button
        onClick={login}
        className="bg-black border border-marp-green text-marp-green px-4 py-2 rounded font-mono text-sm hover:bg-marp-green/10 transition-all"
      >
        Connect
      </button>
    )
  }

  const wallet = wallets[0]
  const shortAddress = wallet?.address
    ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
    : 'No wallet'

  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full border-2 border-marp-green/50 bg-black/80 flex items-center justify-center text-lg flex-shrink-0">
        🤖
      </div>
      <div className="text-right">
        <div className="font-mono text-marp-green text-sm">{shortAddress}</div>
        {user?.email && (
          <div className="text-marp-green/50 text-xs">{user.email.address}</div>
        )}
      </div>
      <button
        onClick={logout}
        className="bg-black border border-marp-green/50 hover:border-marp-green text-marp-green px-3 py-1.5 rounded-lg text-sm font-mono transition-all hover:shadow-[0_0_12px_rgba(0,255,65,0.15)]"
      >
        Exit
      </button>
    </div>
  )
}
