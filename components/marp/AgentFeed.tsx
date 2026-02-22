'use client'

import { useMemo } from 'react'
import { useReadContracts } from 'wagmi'
import { MARP_ADDRESS, MARP_ABI, MOCK_AGENTS } from '@/lib/marp'

const AGENT_AVATARS: Record<string, string> = {
  CHOG: '🤖',
  MOLANDAK: '🦎',
  SALMONAD: '🐟',
  NAD_BOT: '⚡',
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
    <div className="w-full h-2 bg-black/80 border border-marp-green/30 rounded overflow-hidden">
      <div
        className={`h-full transition-all duration-500 ${isNegative ? 'bg-red-500' : 'bg-marp-green'}`}
        style={{ width: `${Math.abs(pct)}%` }}
      />
    </div>
  )
}

function AgentCard({ agent }: { agent: AgentRow }) {
  const avatar = AGENT_AVATARS[agent.name] ?? '◆'
  const apy = agent.apy ?? (agent.score > 0 ? `${Math.min(35, 10 + Math.floor(agent.score / 50))}%` : '0%')
  const volume = agent.volume ?? `$${(agent.ops * 0.9).toFixed(1)}M`

  return (
    <div className="rounded-xl border border-marp-green/40 bg-black/60 p-4 hover:border-marp-green/70 hover:shadow-[0_0_20px_rgba(131,110,249,0.08)] transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full border-2 border-marp-green/50 bg-black/80 flex items-center justify-center text-2xl flex-shrink-0">
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline gap-2">
            <span className="font-semibold text-marp-green truncate">[{agent.name}]</span>
            <span
              className={`text-sm font-mono flex-shrink-0 ${agent.score >= 0 ? 'text-green-400' : 'text-red-500'}`}
            >
              {agent.score >= 0 ? `+${agent.score}` : agent.score}
            </span>
          </div>
          <ScoreBar score={agent.score} />
        </div>
      </div>
      <div className="space-y-1 text-xs text-marp-green/80 font-mono">
        <div className="flex justify-between">
          <span>ops</span>
          <span>{agent.ops}</span>
        </div>
        <div className="flex justify-between">
          <span>APY</span>
          <span className="text-marp-green/90">{apy}</span>
        </div>
        <div className="flex justify-between">
          <span>win</span>
          <span>{agent.winRate}</span>
        </div>
        <div className="flex justify-between">
          <span>Total volume</span>
          <span className="text-marp-green/90">{volume}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-3 pt-3 border-t border-marp-green/20">
        <button
          type="button"
          className="flex-1 py-1.5 rounded-md border border-marp-green/40 text-marp-green/80 text-xs font-mono hover:bg-marp-green/10 hover:border-marp-green/60 transition-colors"
        >
          Achieves
        </button>
        <button
          type="button"
          className="flex-1 py-1.5 rounded-md border border-marp-green/40 text-marp-green/80 text-xs font-mono hover:bg-marp-green/10 hover:border-marp-green/60 transition-colors"
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
        } as AgentRow
      })
      .filter((x): x is AgentRow => x !== null)
  }

  return (
    <div className="rounded-xl border border-marp-green/50 bg-black/40 p-4 font-mono flex flex-col h-full shadow-[0_0_40px_rgba(131,110,249,0.06)]">
      <h2 className="text-marp-green text-xs tracking-widest mb-4 border-b border-marp-green/40 pb-2">
        AGENT FEED
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 overflow-auto content-start">
        {agents.map((agent) => (
          <AgentCard key={agent.address} agent={agent} />
        ))}
      </div>
    </div>
  )
}
