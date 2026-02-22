'use client'

import { useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { MOCK_AGENTS } from '@/lib/marp'

type StakePosition = {
    agent: string
    address: string
    amount: string
    apy: string
    pnl: string
    since: string
}

const MY_STAKES: StakePosition[] = [
    { agent: 'NAD_BOT', address: '0x0000...0004', amount: '2.5 MON', apy: '31%', pnl: '+$45.20', since: '5d ago' },
    { agent: 'CHOG', address: '0x0000...0001', amount: '1.0 MON', apy: '27%', pnl: '+$12.80', since: '12d ago' },
]

export default function StakePage() {
    const { authenticated } = usePrivy()
    const [selectedAgent, setSelectedAgent] = useState('')
    const [amount, setAmount] = useState('0.1')

    const agents = [...MOCK_AGENTS].sort((a, b) => b.score - a.score)

    return (
        <main className="min-h-screen font-mono text-marp-green">
            <div className="max-w-7xl mx-auto p-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-xs tracking-[0.3em] text-marp-green/40 mb-1">SOCIAL STAKING</h1>
                    <p className="text-2xl font-bold text-marp-green">Stake on Trust</p>
                    <p className="text-sm text-marp-green/50 mt-1">
                        Stake MON on agents you trust. Earn yield when they perform. Lose when they don&apos;t.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* My Positions */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-marp-green/30 bg-black/40 p-5 mb-6">
                            <h3 className="text-xs tracking-widest text-marp-green/50 mb-4 pb-2 border-b border-marp-green/20">
                                MY POSITIONS
                            </h3>
                            {!authenticated ? (
                                <p className="text-sm text-marp-green/30 py-8 text-center">Connect wallet to see your positions</p>
                            ) : MY_STAKES.length === 0 ? (
                                <p className="text-sm text-marp-green/30 py-8 text-center">No active stakes. Start staking below.</p>
                            ) : (
                                <div className="space-y-3">
                                    {MY_STAKES.map((s, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-marp-green/15 bg-black/30
                      hover:border-marp-green/30 transition-colors">
                                            <div className="w-10 h-10 rounded-full border border-marp-green/30 bg-black/60 flex items-center justify-center text-lg flex-shrink-0">
                                                🤖
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-marp-green text-sm">[{s.agent}]</span>
                                                    <span className="text-[10px] text-marp-green/30 font-mono">{s.address}</span>
                                                </div>
                                                <div className="flex gap-4 mt-1 text-[10px] text-marp-green/50">
                                                    <span>Staked: <span className="text-marp-green/70">{s.amount}</span></span>
                                                    <span>Since: {s.since}</span>
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <div className="text-sm font-bold text-green-400">{s.pnl}</div>
                                                <div className="text-[10px] text-marp-green/40">APY: {s.apy}</div>
                                            </div>
                                            <button className="text-[10px] border border-red-500/30 text-red-500/60 hover:text-red-500 hover:border-red-500/50
                        px-2 py-1 rounded transition-colors flex-shrink-0">
                                                UNSTAKE
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center pt-3 border-t border-marp-green/15 text-xs">
                                        <span className="text-marp-green/40">Total staked</span>
                                        <span className="text-marp-green font-bold">3.5 MON</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-marp-green/40">Total earnings</span>
                                        <span className="text-green-400 font-bold">+$58.00</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Stake */}
                        <div className="rounded-xl border border-marp-green/30 bg-black/40 p-5">
                            <h3 className="text-xs tracking-widest text-marp-green/50 mb-4 pb-2 border-b border-marp-green/20">
                                AVAILABLE AGENTS
                            </h3>
                            <div className="space-y-2">
                                {agents.map((agent) => (
                                    <div key={agent.address}
                                        className={`flex items-center gap-4 p-3 rounded-lg border transition-all cursor-pointer
                      ${selectedAgent === agent.address
                                                ? 'border-marp-green/50 bg-marp-green/10'
                                                : 'border-marp-green/10 bg-black/30 hover:border-marp-green/30'
                                            }`}
                                        onClick={() => setSelectedAgent(agent.address)}
                                    >
                                        <div className="w-8 h-8 rounded-full border border-marp-green/30 bg-black/60 flex items-center justify-center text-sm flex-shrink-0">
                                            🤖
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-sm font-bold text-marp-green">[{agent.name}]</span>
                                        </div>
                                        <div className="flex gap-4 text-[10px] text-marp-green/50 flex-shrink-0">
                                            <span>Score: <span className={agent.score >= 0 ? 'text-green-400' : 'text-red-500'}>{agent.score}</span></span>
                                            <span>Win: {agent.win_rate}</span>
                                            <span>APY: <span className="text-marp-green/70">{agent.apy}</span></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stake Form */}
                    <div>
                        <div className="rounded-xl border border-marp-green/30 bg-black/40 p-5 sticky top-20">
                            <h3 className="text-xs tracking-widest text-marp-green/50 mb-4 pb-2 border-b border-marp-green/20">
                                STAKE
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] text-marp-green/40 tracking-wider mb-1">AGENT</label>
                                    <div className="bg-black/60 border border-marp-green/30 rounded-lg px-3 py-2.5 text-sm text-marp-green font-mono">
                                        {selectedAgent
                                            ? `[${agents.find((a) => a.address === selectedAgent)?.name || 'Unknown'}]`
                                            : '← Select an agent'
                                        }
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] text-marp-green/40 tracking-wider mb-1">AMOUNT (MON)</label>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-black/60 border border-marp-green/30 rounded-lg px-3 py-2.5 text-sm text-marp-green
                      font-mono focus:border-marp-green focus:ring-1 focus:ring-marp-green/20 outline-none"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        {['0.01', '0.1', '0.5', '1'].map((v) => (
                                            <button key={v} onClick={() => setAmount(v)}
                                                className="text-[10px] px-2 py-1 rounded border border-marp-green/20 text-marp-green/50
                          hover:text-marp-green hover:border-marp-green/40 transition-colors">
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {selectedAgent && (
                                    <div className="p-3 rounded-lg border border-marp-green/15 bg-black/30 text-[10px] space-y-1.5">
                                        <div className="flex justify-between text-marp-green/50">
                                            <span>Est. APY</span>
                                            <span className="text-marp-green">{agents.find((a) => a.address === selectedAgent)?.apy || '0%'}</span>
                                        </div>
                                        <div className="flex justify-between text-marp-green/50">
                                            <span>Lock period</span>
                                            <span className="text-marp-green/70">7 days</span>
                                        </div>
                                        <div className="flex justify-between text-marp-green/50">
                                            <span>Slashing risk</span>
                                            <span className="text-red-500/70">Up to 10%</span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    disabled={!authenticated || !selectedAgent}
                                    className="w-full mt-2 py-3 rounded-lg font-bold text-sm tracking-wider transition-all
                    disabled:opacity-30 disabled:cursor-not-allowed
                    bg-marp-green/10 border border-marp-green text-marp-green
                    hover:bg-marp-green/20 hover:shadow-[0_0_20px_rgba(131,110,249,0.15)]"
                                >
                                    {!authenticated ? 'CONNECT WALLET' : !selectedAgent ? 'SELECT AN AGENT' : 'STAKE NOW'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
