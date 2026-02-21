import { ConnectButton } from '@/components/ConnectButton'
import { AgentFeed } from '@/components/marp/AgentFeed'
import { ReportPanel } from '@/components/marp/ReportPanel'
import { LiveTransactionLog } from '@/components/marp/LiveTransactionLog'

export default function Home() {
  return (
    <main className="min-h-screen font-mono text-marp-cyan relative">
      {/* Header */}
      <header className="border-b border-marp-border sticky top-0 bg-marp-navy/95 backdrop-blur-md z-50">
        <div className="max-w-[1440px] mx-auto px-6 py-3.5 flex justify-between items-center relative z-10">
          <h1 className="text-marp-cyan text-xs tracking-[0.15em] font-semibold">
            <span className="text-marp-green">[MARP v0.1]</span>
            <span className="text-marp-cyan/40 mx-2">{'//'}</span>
            <span className="hidden sm:inline">AGENT REPUTATION PROTOCOL</span>
            <span className="text-marp-cyan/40 mx-2 hidden sm:inline">{'//'}</span>
            <span className="text-marp-cyan/60 hidden md:inline">MONAD TESTNET</span>
          </h1>
          <ConnectButton />
        </div>
      </header>

      {/* Main Grid: Agent Feed | Trade/Report | Live TX Log */}
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[calc(100vh-8rem)]">
          {/* Agent Feed - Left Column */}
          <div className="lg:col-span-5 min-h-[400px] lg:min-h-0">
            <AgentFeed />
          </div>
          {/* Trade/Report - Center Column */}
          <div className="lg:col-span-4 min-h-[400px] lg:min-h-0">
            <ReportPanel />
          </div>
          {/* Live Transaction Log - Right Column */}
          <div className="lg:col-span-3 min-h-[400px] lg:min-h-0">
            <LiveTransactionLog />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-marp-border py-4 mt-6 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 text-center text-marp-cyan/30 text-xs tracking-wider">
          MARP -- Monad Agent Reputation Protocol -- Stake on agents -- Report outcomes on-chain
        </div>
      </footer>
    </main>
  )
}
