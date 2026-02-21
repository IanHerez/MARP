'use client'

import { useMemo } from 'react'
import { useReadContracts } from 'wagmi'
import Image from 'next/image'
import { MARP_ADDRESS, MARP_ABI, MOCK_AGENTS } from '@/lib/marp'

const AGENT_AVATARS: Record<string, string> = {
  CHOG: '/agents/chog.jpg',
  MOLANDAK: '/agents/molandak.jpg',
  SALMONAD: '/agents/salmonad.jpg',
  NAD_BOT: '/agents/nad_bot.jpg',
}

type AgentRow = {
  address: `0x${string}`
  name: string
  score: number
  ops: number
  winRate: string
  apy?: string
  volume?: string
}

function ScoreBar({ score }: { score: number }) {
  const max = 1500
  const pct = Math.min(100, Math.max(0, ((score + 500) / (max + 500)) * 100))
  const isNegative = score < 0
  return (
    <div className="w-full h-2.5 bg-marp-navy/80 rounded-full overflow-hidden border border-marp-border/50">
      <div
        className={`h-full rounded-full transition-all duration-700 ${
          isNegative
            ? 'bg-gradient-to-r from-red-600 to-red-400'
            : 'bg-gradient-to-r from-marp-green/80 to-marp-green'
        }`}
        style={{ width: `${Math.abs(pct)}%` }}
      />
    </div>
  )
}

function AgentCard({ agent }: { agent: AgentRow }) {
  const avatar = AGENT_AVATARS[agent.name] ?? '/agents/chog.jpg'
  const apy = agent.apy ?? (agent.score > 0 ? `${Math.min(35, 10 + Math.floor(agent.score / 50))}%` : '0%')
  const volume = agent.volume ?? `$${(agent.ops * 0.9).toFixed(1)}M`

  return (
    <div className="rounded-lg border border-marp-border bg-marp-navy-card/80 p-4 hover:border-marp-border-bright hover:shadow-card transition-all duration-300 group">
      {/* Top: Avatar + Name + Score */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-marp-border-bright/60 flex-shrink-0 group-hover:border-marp-cyan/50 transition-colors">
          <Image
            src={avatar}
            alt={`Agent ${agent.name}`}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-marp-cyan text-sm tracking-wide">[{agent.name}]</span>
          <div
            className={`text-2xl font-bold mt-0.5 ${
              agent.score >= 0 ? 'text-marp-green' : 'text-red-400'
            }`}
          >
            {agent.score >= 0 ? `+${agent.score}` : agent.score}
          </div>
          <div className="mt-1.5">
            <ScoreBar score={agent.score} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono mt-3">
        <div className="flex justify-between">
          <span className="text-marp-cyan/50">ops:</span>
          <span className="text-marp-cyan/80">{agent.ops}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-marp-cyan/50">win:</span>
          <span className="text-marp-cyan/80">{agent.winRate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-marp-cyan/50">APY:</span>
          <span className="text-marp-cyan/80">{apy}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-marp-cyan/50">vol:</span>
          <span className="text-marp-cyan/80">{agent.winRate === '91%' ? '0.10%' : '0.36%'}</span>
        </div>
        <div className="flex justify-between col-span-2">
          <span className="text-marp-cyan/50">Total volume</span>
          <span className="text-marp-cyan/90">{volume}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-marp-border/60">
        <button
          type="button"
          className="flex-1 py-1.5 rounded-md border border-marp-cyan/20 bg-marp-cyan/5 text-marp-cyan/70 text-xs font-mono hover:bg-marp-cyan/10 hover:border-marp-cyan/40 hover:text-marp-cyan transition-all"
        >
          Achieves
        </button>
        <button
          type="button"
          className="flex-1 py-1.5 rounded-md border border-marp-cyan/20 bg-marp-cyan/5 text-marp-cyan/70 text-xs font-mono hover:bg-marp-cyan/10 hover:border-marp-cyan/40 hover:text-marp-cyan transition-all"
        >
          Badges
        </button>
      </div>
    </div>
  )
}

export function AgentFeed() {
  const hasContract = MARP_ADDRESS && MARP_ADDRESS.length > 2

  const { data: listData } = useReadContracts({
    contracts: hasContract
      ? [{ address: MARP_ADDRESS, abi: MARP_ABI, functionName: 'getAllAgents' }]
      : [],
  })

  const agentAddresses = (listData?.[0]?.result as `0x${string}`[] | undefined) || []
  const infoContracts = useMemo(
    () =>
      agentAddresses.slice(0, 20).map((addr) => ({
        address: MARP_ADDRESS,
        abi: MARP_ABI,
        functionName: 'getAgentInfo' as const,
        args: [addr] as const,
      })),
    [agentAddresses.join(',')],
  )

  const { data: infoData } = useReadContracts({
    contracts: hasContract && infoContracts.length > 0 ? infoContracts : [],
  })

  let agents: AgentRow[] = MOCK_AGENTS.map((a) => ({
    address: a.address,
    name: a.name,
    score: a.score,
    ops: a.ops,
    winRate: a.win_rate,
    apy: (a as { apy?: string }).apy,
    volume: (a as { volume?: string }).volume,
  }))

  if (hasContract && agentAddresses.length > 0 && infoData && infoData.length >= agentAddresses.length) {
    agents = agentAddresses
      .map((addr, i) => {
        const r = infoData[i]?.result as [string, bigint, bigint, bigint, `0x${string}`, boolean] | undefined
        if (!r) return null
        const [name, score, totalOps, wins] = r
        const winRate = totalOps > 0n ? `${Number((wins * 100n) / totalOps)}%` : '0%'
        const ops = Number(totalOps)
        const sc = Number(score)
        return {
          address: addr,
          name: name || `Agent_${addr.slice(0, 8)}`,
          score: sc,
          ops,
          winRate,
          apy: sc > 0 ? `${Math.min(35, 10 + Math.floor(sc / 50))}%` : '0%',
          volume: `$${(ops * 0.9).toFixed(1)}M`,
        }
      })
      .filter((x): x is AgentRow => x !== null)
  }

  return (
    <div className="rounded-xl border border-marp-border bg-marp-navy-light/60 p-5 font-mono flex flex-col h-full backdrop-blur-sm">
      <h2 className="text-marp-cyan text-xs tracking-[0.2em] uppercase mb-5 pb-3 border-b border-marp-border font-semibold">
        Agent Feed
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 overflow-auto content-start pr-1">
        {agents.map((agent) => (
          <AgentCard key={agent.address} agent={agent} />
        ))}
      </div>
    </div>
  )
}
