'use client'

import { use } from 'react'
import Link from 'next/link'
import { MOCK_AGENTS, MOCK_TX_HISTORY } from '@/lib/marp'

const SCORE_FACTORS = [
    { label: 'Performance', weight: '40%', value: 85 },
    { label: 'Consistency', weight: '25%', value: 72 },
    { label: 'Volume', weight: '15%', value: 90 },
    { label: 'Longevity', weight: '10%', value: 60 },
    { label: 'Social Trust', weight: '10%', value: 45 },
]

const MOCK_OPS = [
    { type: 'Swap', result: 'Profit', amount: '+$142.50', time: '2h ago', score: '+12' },
    { type: 'Yield Farm', result: 'Profit', amount: '+$89.30', time: '5h ago', score: '+8' },
    { type: 'Arbitrage', result: 'Loss', amount: '-$23.10', time: '8h ago', score: '-5' },
    { type: 'Swap', result: 'Profit', amount: '+$201.00', time: '12h ago', score: '+15' },
    { type: 'Governance', result: 'Neutral', amount: '$0.00', time: '1d ago', score: '+2' },
    { type: 'Liquidation', result: 'Profit', amount: '+$567.80', time: '2d ago', score: '+25' },
]

export default function AgentDetailPage({ params }: { params: Promise<{ address: string }> }) {
    const { address } = use(params)
    const agent = MOCK_AGENTS.find((a) => a.address === address) || MOCK_AGENTS[0]

    const scorePercent = Math.min(100, Math.max(0, ((agent.score + 500) / 2000) * 100))
    const tier = agent.score >= 1000 ? 'ELITE' : agent.score >= 700 ? 'TRUSTED' : agent.score >= 400 ? 'RISING' : agent.score >= 0 ? 'NEW' : 'RISKY'
    const tierColor = agent.score >= 1000 ? 'text-yellow-400' : agent.score >= 700 ? 'text-green-400' : agent.score >= 400 ? 'text-blue-400' : agent.score >= 0 ? 'text-marp-green/60' : 'text-red-500'

    return (
        <main className="min-h-screen font-mono text-marp-green">
            <div className="max-w-7xl mx-auto p-4">
                {/* Breadcrumb */}
                <div className="mb-6 text-xs text-marp-green/40">
                    <Link href="/leaderboard" className="hover:text-marp-green transition-colors">LEADERBOARD</Link>
                    <span className="mx-2">/</span>
                    <span className="text-marp-green/60">[{agent.name}]</span>
                </div>

                {/* Agent Header */}
                <div className="rounded-xl border border-marp-green/30 bg-black/50 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div className="w-20 h-20 rounded-full border-2 border-marp-green/50 bg-black/80 flex items-center justify-center text-4xl flex-shrink-0">
                            🤖
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <h1 className="text-2xl font-bold text-marp-green">[{agent.name}]</h1>
                                <span className={`text-[10px] tracking-wider px-2 py-0.5 rounded border ${tierColor} border-current`}>
                                    {tier}
                                </span>
                            </div>
                            <p className="text-xs text-marp-green/40 font-mono mb-4">{address}</p>

                            {/* Score */}
                            <div className="flex items-end gap-4">
                                <div>
                                    <div className="text-[10px] text-marp-green/40 tracking-wider mb-1">REPUTATION SCORE</div>
                                    <span className={`text-4xl font-bold ${agent.score >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                                        {agent.score}
                                    </span>
                                    <span className="text-marp-green/30 text-sm ml-1">/ 1000</span>
                                </div>
                                <div className="flex-1 max-w-xs mb-2">
                                    <div className="w-full h-3 bg-black/80 border border-marp-green/20 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${agent.score >= 0 ? 'bg-gradient-to-r from-marp-green/50 to-marp-green' : 'bg-red-500'}`}
                                            style={{ width: `${scorePercent}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {[
                        { label: 'OPS', value: agent.ops.toLocaleString() },
                        { label: 'WIN RATE', value: agent.win_rate },
                        { label: 'APY', value: agent.apy || '0%' },
                        { label: 'VOLUME', value: agent.volume || '$0' },
                        { label: 'TOTAL STAKED', value: '$12.4K' },
                    ].map((s) => (
                        <div key={s.label} className="p-4 rounded-lg border border-marp-green/20 bg-black/40 text-center">
                            <div className="text-lg font-bold text-marp-green">{s.value}</div>
                            <div className="text-[10px] tracking-wider text-marp-green/40">{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Score Breakdown */}
                    <div className="rounded-xl border border-marp-green/30 bg-black/40 p-5">
                        <h3 className="text-xs tracking-widest text-marp-green/50 mb-4 pb-2 border-b border-marp-green/20">
                            SCORE BREAKDOWN
                        </h3>
                        <div className="space-y-4">
                            {SCORE_FACTORS.map((f) => (
                                <div key={f.label}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-marp-green/70">{f.label}</span>
                                        <span className="text-marp-green/40">{f.weight} · {f.value}/100</span>
                                    </div>
                                    <div className="w-full h-2 bg-black/80 border border-marp-green/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-marp-green/60 rounded-full"
                                            style={{ width: `${f.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Operations */}
                    <div className="lg:col-span-2 rounded-xl border border-marp-green/30 bg-black/40 p-5">
                        <h3 className="text-xs tracking-widest text-marp-green/50 mb-4 pb-2 border-b border-marp-green/20">
                            RECENT OPERATIONS
                        </h3>
                        <div className="space-y-2">
                            {MOCK_OPS.map((op, i) => (
                                <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-lg border border-marp-green/10 bg-black/30
                  hover:border-marp-green/30 transition-colors">
                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${op.result === 'Profit' ? 'bg-green-400' : op.result === 'Loss' ? 'bg-red-500' : 'bg-marp-green/30'
                                        }`} />
                                    <span className="text-xs text-marp-green/70 w-20">{op.type}</span>
                                    <span className={`text-xs font-mono flex-1 ${op.result === 'Profit' ? 'text-green-400' : op.result === 'Loss' ? 'text-red-500' : 'text-marp-green/40'
                                        }`}>{op.amount}</span>
                                    <span className={`text-[10px] font-mono ${op.score.startsWith('+') ? 'text-green-400/60' : 'text-red-500/60'
                                        }`}>{op.score} pts</span>
                                    <span className="text-[10px] text-marp-green/30 w-16 text-right">{op.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stakers */}
                <div className="mt-6 rounded-xl border border-marp-green/30 bg-black/40 p-5">
                    <h3 className="text-xs tracking-widest text-marp-green/50 mb-4 pb-2 border-b border-marp-green/20">
                        TRUST GRAPH — WHO STAKES ON THIS AGENT
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { addr: '0xb9c4...c56d', amount: '2.5 MON', since: '3 days ago' },
                            { addr: '0x7a2f...91e0', amount: '1.0 MON', since: '1 week ago' },
                            { addr: '0x1d3e...4a2b', amount: '0.5 MON', since: '2 weeks ago' },
                        ].map((s, i) => (
                            <div key={i} className="p-3 rounded-lg border border-marp-green/15 bg-black/30">
                                <div className="text-xs text-marp-green/70 font-mono">{s.addr}</div>
                                <div className="text-sm font-bold text-marp-green mt-1">{s.amount}</div>
                                <div className="text-[10px] text-marp-green/30 mt-1">{s.since}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
