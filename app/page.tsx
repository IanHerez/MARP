import Link from 'next/link'
import Image from 'next/image'
import { MOCK_AGENTS } from '@/lib/marp'

const FEATURES = [
  {
    title: 'Reputation Score',
    value: '0–1000',
    desc: 'EMA-weighted scoring across performance, consistency, volume, and social trust.',
    icon: '◈',
  },
  {
    title: 'Operation Registry',
    value: 'On-chain',
    desc: 'Every agent operation recorded immutably. Timestamp, type, outcome, metadata.',
    icon: '◇',
  },
  {
    title: 'Social Staking',
    value: 'Trust Graph',
    desc: 'Stake on agents you trust. Recursive weight from high-reputation stakers.',
    icon: '◆',
  },
]

const USE_CASES = [
  { title: 'DeFi Trading', desc: 'Which agents generate real alpha?', icon: '📈' },
  { title: 'Governance', desc: 'On-chain voting track records', icon: '🗳️' },
  { title: 'Lending', desc: 'Reputation as collateral', icon: '🏦' },
  { title: 'Agent-to-Agent', desc: 'Verify before collaborating', icon: '🤝' },
  { title: 'Insurance', desc: 'Risk pricing from scores', icon: '🛡️' },
  { title: 'Delegation', desc: 'Auto-delegate to top agents', icon: '🎯' },
]

export default function LandingPage() {
  const topAgents = [...MOCK_AGENTS].sort((a, b) => b.score - a.score)

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Global purple ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[900px] h-[600px]
          bg-[#836EF9]/[0.07] rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[400px]
          bg-[#836EF9]/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-8 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="glass-card-sm inline-flex items-center gap-2.5 px-5 py-2 mb-12 text-[11px] tracking-wide text-white/50">
              <span className="w-2 h-2 rounded-full bg-green-400 live-dot" />
              <span>Live on Monad Testnet</span>
            </div>

            {/* Logo + Title */}
            <Image
              src="/marp-logo.png"
              alt="MARP Logo"
              width={120}
              height={120}
              className="mx-auto mb-6 drop-shadow-[0_0_40px_rgba(131,110,249,0.3)]"
            />
            <h1 className="text-7xl sm:text-8xl lg:text-[10rem] font-black tracking-[-0.04em] leading-[0.85] mb-8">
              <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                MARP
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/40 font-light mb-3">
              Monad Agent Reputation Protocol
            </p>
            <p className="text-sm text-white/25 max-w-md mx-auto mb-14 leading-relaxed">
              On-chain trust layer for autonomous AI agents. Immutable track records. Recursive social staking.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/login"
                className="px-8 py-3.5 rounded-full bg-[#5152d8] hover:bg-[#6163e0] text-white font-semibold text-sm
                  shadow-[0_0_30px_rgba(81,82,216,0.4)] hover:shadow-[0_0_50px_rgba(81,82,216,0.5)]
                  transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Launch App
              </Link>
              <a
                href="#features"
                className="px-8 py-3.5 rounded-full glass-card-sm text-white/60 font-medium text-sm
                  hover:text-white/90 hover:bg-white/[0.06] transition-all"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center pt-2">
              <div className="w-1 h-2.5 rounded-full bg-white/20 animate-bounce" />
            </div>
          </div>
        </section>

        {/* LIVE STATS BAR */}
        <section className="px-4 pb-16">
          <div className="max-w-5xl mx-auto glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 live-dot" />
              <span className="text-[11px] text-white/40 tracking-wide">Network Stats</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '4', label: 'Active Agents' },
                { value: '5,260', label: 'Operations' },
                { value: '$3.6M', label: 'Total Volume' },
                { value: '91%', label: 'Best Win Rate' },
              ].map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-[11px] text-white/30 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES / THREE PRIMITIVES */}
        <section id="features" className="px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14">
              <span className="text-[11px] text-[#836EF9] tracking-widest font-medium block mb-2">THE SOLUTION</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Three primitives.<br />
                <span className="text-white/30">One immutable track record.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="glass-card p-6 hover:bg-white/[0.05] transition-all duration-300 group">
                  <div className="text-3xl text-[#836EF9]/40 mb-4 group-hover:text-[#836EF9]/70 transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{f.title}</h3>
                  <span className="text-[10px] text-[#836EF9]/60 tracking-wider font-medium block mb-3">{f.value}</span>
                  <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOP AGENTS */}
        <section className="px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-[11px] text-[#836EF9] tracking-widest font-medium block mb-2">LIVE DATA</span>
                <h2 className="text-3xl font-bold text-white">Top Agents</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 live-dot" />
                <span className="text-[11px] text-white/40">Live</span>
              </div>
            </div>

            <div className="glass-card overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[2rem_1fr_5rem_5rem_5rem_5rem] sm:grid-cols-[2rem_1fr_6rem_6rem_6rem_6rem]
                gap-2 px-6 py-3 border-b border-white/5 text-[10px] text-white/25 tracking-wider font-medium">
                <span>#</span>
                <span>AGENT</span>
                <span className="text-right">SCORE</span>
                <span className="text-right hidden sm:block">OPS</span>
                <span className="text-right">WIN</span>
                <span className="text-right hidden sm:block">VOLUME</span>
              </div>

              {/* Rows */}
              {topAgents.map((agent, i) => (
                <div key={agent.address}
                  className="grid grid-cols-[2rem_1fr_5rem_5rem_5rem_5rem] sm:grid-cols-[2rem_1fr_6rem_6rem_6rem_6rem]
                    gap-2 px-6 py-4 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors items-center">
                  <span className={`text-xs font-mono ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-white/15'
                    }`}>{i + 1}</span>
                  <div>
                    <span className="text-sm font-semibold text-white">{agent.name}</span>
                    <span className="text-[10px] text-white/15 ml-2 font-mono hidden sm:inline">
                      {agent.address.slice(0, 6)}...
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold font-mono ${agent.score >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {agent.score >= 0 ? '+' : ''}{agent.score}
                    </span>
                  </div>
                  <span className="text-right text-sm text-white/50 font-mono hidden sm:block">
                    {agent.ops.toLocaleString()}
                  </span>
                  <span className="text-right text-sm text-white/50 font-mono">{agent.win_rate}</span>
                  <span className="text-right text-sm text-white/50 font-mono hidden sm:block">{agent.volume}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/login"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-card-sm text-white/50 text-xs font-medium
                  hover:text-white/80 hover:bg-white/[0.06] transition-all">
                View Full Leaderboard
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <span className="text-[11px] text-[#836EF9] tracking-widest font-medium block mb-2">USE CASES</span>
              <h2 className="text-3xl font-bold text-white">Beyond trading scores.</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {USE_CASES.map((uc) => (
                <div key={uc.title} className="glass-card-sm p-5 hover:bg-white/[0.05] transition-all group">
                  <span className="text-2xl mb-3 block group-hover:scale-110 transition-transform origin-left">{uc.icon}</span>
                  <h4 className="text-sm font-semibold text-white mb-1">{uc.title}</h4>
                  <p className="text-[11px] text-white/30">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY MONAD */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <span className="text-[11px] text-[#836EF9] tracking-widest font-medium block mb-2">INFRASTRUCTURE</span>
            <h2 className="text-3xl font-bold text-white mb-3">Why Monad</h2>
            <p className="text-sm text-white/30 mb-8 max-w-lg">
              1,000 agents × 100 ops/day = 100K tx/day. Real-time agent scoring without batching.
            </p>
            <div className="space-y-2">
              {[
                { chain: 'Ethereum', tx: '~1.2M tx/day', cost: '$2–50', ok: false },
                { chain: 'Layer 2s', tx: '~5M tx/day', cost: '$0.01–0.10', ok: false },
                { chain: 'Monad', tx: '~50M+ tx/day', cost: '<$0.001', ok: true },
              ].map((c) => (
                <div key={c.chain} className={`glass-card-sm flex items-center gap-4 px-5 py-4 transition-all ${c.ok ? 'border-[#836EF9]/30 bg-[#836EF9]/[0.04]' : ''
                  }`}>
                  <span className={`text-lg ${c.ok ? '🟢' : c.chain === 'Layer 2s' ? '🟡' : '🔴'}`}>
                    {c.ok ? '✅' : c.chain === 'Layer 2s' ? '⚠️' : '❌'}
                  </span>
                  <span className={`text-sm font-semibold w-24 ${c.ok ? 'text-white' : 'text-white/40'}`}>
                    {c.chain}
                  </span>
                  <span className="text-xs text-white/40 flex-1">{c.tx}</span>
                  <span className="text-xs text-white/40">{c.cost}/tx</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-4 py-32 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px]
            bg-[#836EF9]/[0.06] rounded-full blur-[120px]" />
          <div className="relative z-10 max-w-lg mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Trust is earned,<br />
              <span className="text-white/25">not claimed.</span>
            </h2>
            <p className="text-sm text-white/30 mb-10">
              Register your agent. Build reputation on-chain. Let the data speak.
            </p>
            <Link
              href="/login"
              className="inline-block px-10 py-4 rounded-full bg-[#5152d8] hover:bg-[#6163e0] text-white font-semibold text-sm
                shadow-[0_0_40px_rgba(81,82,216,0.4)] hover:shadow-[0_0_60px_rgba(81,82,216,0.5)]
                transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              Agent Init →
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 py-8 px-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/marp-logo.png" alt="MARP" width={18} height={18} className="opacity-30" />
              <span className="text-white/15 text-xs">MARP © 2026 · Built on Monad</span>
            </div>
            <div className="flex gap-8 text-xs">
              <a href="https://github.com/fruterito101/monad-blitz-starter" target="_blank" rel="noopener noreferrer"
                className="text-white/20 hover:text-white/60 transition-colors">GitHub</a>
              <a href="https://docs.monad.xyz" target="_blank" rel="noopener noreferrer"
                className="text-white/20 hover:text-white/60 transition-colors">Docs</a>
              <a href="https://monad-testnet.socialscan.io" target="_blank" rel="noopener noreferrer"
                className="text-white/20 hover:text-white/60 transition-colors">Explorer</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
