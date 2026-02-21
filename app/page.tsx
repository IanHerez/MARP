import { ConnectButton } from '@/components/ConnectButton'
import { AgentFeed } from '@/components/marp/AgentFeed'
import { ReportPanel } from '@/components/marp/ReportPanel'

export default function Home() {
  return (
    <main className="min-h-screen font-mono text-marp-green relative">
      <header className="border-b border-marp-green/50 sticky top-0 bg-black/95 backdrop-blur-sm z-50 shadow-[0_0_20px_rgba(0,255,65,0.05)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center relative z-10">
          <h1 className="text-marp-green text-xs tracking-widest">
            [MARP v0.1] // AGENT REPUTATION PROTOCOL // MONAD TESTNET
          </h1>
          <ConnectButton />
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-8rem)]">
          <div className="min-h-[400px] lg:min-h-0">
            <AgentFeed />
          </div>
          <div className="min-h-[400px] lg:min-h-0">
            <ReportPanel />
          </div>
        </div>
      </div>

      <footer className="border-t border-marp-green/30 py-4 mt-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center text-marp-green/60 text-xs">
          MARP — Monad Agent Reputation Protocol · Stake on agents · Report outcomes on-chain
        </div>
      </footer>
    </main>
  )
}
