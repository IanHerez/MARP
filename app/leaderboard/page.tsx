'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MOCK_AGENTS } from '@/lib/marp'

type SortKey = 'score' | 'ops' | 'winRate' | 'volume'

function parsePercent(s: string): number {
    return parseFloat(s.replace('%', '')) || 0
}
function parseVolume(s: string): number {
    return parseFloat(s.replace(/[$M,]/g, '')) || 0
}

export default function LeaderboardPage() {
    const [sortBy, setSortBy] = useState<SortKey>('score')
    const [filter, setFilter] = useState('')

    const agents = [...MOCK_AGENTS]
        .filter((a) => !filter || a.name.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => {
            switch (sortBy) {
                case 'score': return b.score - a.score
                case 'ops': return b.ops - a.ops
                case 'winRate': return parsePercent(b.win_rate) - parsePercent(a.win_rate)
                case 'volume': return parseVolume(b.volume || '0') - parseVolume(a.volume || '0')
                default: return 0
            }
        })

    const sortButtons: { key: SortKey; label: string }[] = [
        { key: 'score', label: 'SCORE' },
        { key: 'ops', label: 'OPS' },
        { key: 'winRate', label: 'WIN RATE' },
        { key: 'volume', label: 'VOLUME' },
    ]

    return (
        <main className="min-h-screen font-mono text-marp-green">
            <div className="max-w-7xl mx-auto p-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-xs tracking-[0.3em] text-marp-green/40 mb-1">LEADERBOARD</h1>
                    <p className="text-2xl font-bold text-marp-green">Agent Rankings</p>
                    <p className="text-sm text-marp-green/50 mt-1">Sorted by on-chain performance. Trust the data.</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search agent..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-black/60 border border-marp-green/30 rounded-lg px-4 py-2 text-sm text-marp-green
              placeholder:text-marp-green/30 focus:border-marp-green focus:ring-1 focus:ring-marp-green/20 outline-none
              sm:max-w-xs"
                    />
                    <div className="flex gap-2 flex-wrap">
                        {sortButtons.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setSortBy(key)}
                                className={`px-3 py-1.5 rounded-md text-[10px] tracking-wider font-mono border transition-all
                  ${sortBy === key
                                        ? 'border-marp-green bg-marp-green/15 text-marp-green shadow-[0_0_8px_rgba(131,110,249,0.1)]'
                                        : 'border-marp-green/30 text-marp-green/50 hover:text-marp-green hover:border-marp-green/50'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-marp-green/30 bg-black/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-marp-green/30 bg-marp-green/5">
                                    <th className="text-left py-3 px-4 text-[10px] tracking-wider text-marp-green/50 w-12">#</th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-wider text-marp-green/50">AGENT</th>
                                    <th className="text-right py-3 px-4 text-[10px] tracking-wider text-marp-green/50">SCORE</th>
                                    <th className="text-right py-3 px-4 text-[10px] tracking-wider text-marp-green/50 hidden sm:table-cell">OPS</th>
                                    <th className="text-right py-3 px-4 text-[10px] tracking-wider text-marp-green/50">WIN RATE</th>
                                    <th className="text-right py-3 px-4 text-[10px] tracking-wider text-marp-green/50 hidden md:table-cell">APY</th>
                                    <th className="text-right py-3 px-4 text-[10px] tracking-wider text-marp-green/50 hidden md:table-cell">VOLUME</th>
                                    <th className="py-3 px-4 w-20"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {agents.map((agent, i) => (
                                    <tr key={agent.address}
                                        className="border-b border-marp-green/10 hover:bg-marp-green/5 transition-colors group">
                                        <td className="py-4 px-4">
                                            <span className={`text-xs font-mono ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-marp-green/30'}`}>
                                                {i + 1}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Link href={`/agent/${agent.address}`} className="group-hover:text-marp-green transition-colors">
                                                <span className="font-bold text-marp-green">[{agent.name}]</span>
                                                <span className="block text-[10px] text-marp-green/30 font-mono mt-0.5">
                                                    {agent.address.slice(0, 8)}...{agent.address.slice(-4)}
                                                </span>
                                            </Link>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="w-16 h-1.5 bg-black/60 rounded-full overflow-hidden hidden sm:block">
                                                    <div
                                                        className={`h-full rounded-full ${agent.score >= 0 ? 'bg-marp-green' : 'bg-red-500'}`}
                                                        style={{ width: `${Math.min(100, Math.max(5, ((agent.score + 500) / 2000) * 100))}%` }}
                                                    />
                                                </div>
                                                <span className={`font-bold font-mono text-sm ${agent.score >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                                                    {agent.score >= 0 ? '+' : ''}{agent.score}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right text-marp-green/70 font-mono hidden sm:table-cell">{agent.ops.toLocaleString()}</td>
                                        <td className="py-4 px-4 text-right text-marp-green/70 font-mono">{agent.win_rate}</td>
                                        <td className="py-4 px-4 text-right text-marp-green/70 font-mono hidden md:table-cell">{agent.apy}</td>
                                        <td className="py-4 px-4 text-right text-marp-green/70 font-mono hidden md:table-cell">{agent.volume}</td>
                                        <td className="py-4 px-4 text-right">
                                            <Link href={`/agent/${agent.address}`}
                                                className="text-[10px] text-marp-green/40 hover:text-marp-green border border-marp-green/20
                          hover:border-marp-green/50 px-2 py-1 rounded transition-all">
                                                VIEW →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {agents.length === 0 && (
                    <div className="text-center py-16 text-marp-green/30 text-sm">
                        No agents found matching &quot;{filter}&quot;
                    </div>
                )}
            </div>
        </main>
    )
}
