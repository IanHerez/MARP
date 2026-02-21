'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useWallets } from '@privy-io/react-auth'
import Image from 'next/image'

export function ConnectButton() {
  const { ready, authenticated, login, logout, user } = usePrivy()
  const { wallets } = useWallets()

  if (!ready) {
    return (
      <button
        disabled
        className="bg-marp-navy-card border border-marp-border text-marp-cyan/40 px-5 py-2.5 rounded-lg text-xs font-mono tracking-wider"
      >
        Loading...
      </button>
    )
  }

  if (!authenticated) {
    return (
      <button
        onClick={login}
        className="bg-marp-navy-card border border-marp-cyan/40 text-marp-cyan px-5 py-2.5 rounded-lg font-mono text-xs tracking-wider hover:bg-marp-cyan/10 hover:border-marp-cyan/60 hover:shadow-glow-cyan transition-all"
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
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-marp-cyan/30 flex-shrink-0">
        <Image
          src="/agents/chog.jpg"
          alt="User avatar"
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-right">
        <div className="font-mono text-marp-green text-sm font-semibold">{shortAddress}</div>
        {user?.email && (
          <div className="text-marp-cyan/40 text-xs">{user.email.address}</div>
        )}
      </div>
      <button
        onClick={logout}
        className="bg-marp-navy-card border border-marp-border hover:border-red-500/50 text-marp-cyan/60 hover:text-red-400 px-3 py-2 rounded-lg text-xs font-mono transition-all"
      >
        Exit
      </button>
    </div>
  )
}
