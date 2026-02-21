'use client'

import Image from 'next/image'
import { MOCK_TX_HISTORY, MOCK_AGENTS } from '@/lib/marp'

const AGENT_AVATARS: Record<string, string> = {
  CHOG: '/agents/chog.jpg',
  MOLANDAK: '/agents/molandak.jpg',
  SALMONAD: '/agents/salmonad.jpg',
  NAD_BOT: '/agents/nad_bot.jpg',
}

function generateMockAddress() {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const EXTENDED_TX = [
  ...MOCK_TX_HISTORY,
  { agent: 'CHOG', action: 'pasterated', address: '0x8880088', time: '1 hour ago' },
  { agent: 'MOLANDAK', action: 'Staked 0.2 MON', address: '0x8809162', time: '3 hours ago' },
  { agent: 'MOLANDAK', action: 'Reported outcome', address: '0x6837645', time: '5 hours ago' },
  { agent: 'NAD_BOT', action: 'Registered', address: '0x8808943', time: '5 hours ago' },
  { agent: 'SALMONAD', action: 'Staked 1.0 MON', address: '0x5800102', time: '2 hours ago' },
  { agent: 'MOLANDAK', action: 'Reported outcome', address: '0x6887652', time: '6 hours ago' },
  { agent: 'MOLANDAK', action: 'Staked 0.05 MON', address: '0x8880022', time: '32 hours ago' },
  { agent: 'NAD_BOT', action: 'Reported outcome', address: '0x6887503', time: '1 day ago' },
]

export function LiveTransactionLog() {
  return (
    <div className="rounded-xl border border-marp-border bg-marp-navy-light/60 p-5 font-mono flex flex-col h-full backdrop-blur-sm">
      <h2 className="text-marp-cyan text-xs tracking-[0.2em] uppercase mb-4 pb-3 border-b border-marp-border font-semibold">
        Live Transaction Log
      </h2>

      {/* Filter */}
      <div className="mb-4">
        <select className="w-full bg-marp-navy-card border border-marp-border rounded-lg px-3 py-2.5 text-marp-cyan text-xs font-mono focus:border-marp-cyan/50 outline-none appearance-none cursor-pointer">
          <option>All</option>
          <option>Reports</option>
          <option>Stakes</option>
          <option>Registrations</option>
        </select>
      </div>

      {/* Transaction List */}
      <ul className="space-y-1.5 flex-1 overflow-auto pr-1">
        {EXTENDED_TX.map((tx, i) => {
          const avatar = AGENT_AVATARS[tx.agent] ?? '/agents/chog.jpg'
          return (
            <li
              key={i}
              className="flex items-center gap-3 py-2.5 px-3 rounded-lg border border-marp-border/40 bg-marp-navy-card/50 hover:border-marp-border-bright/60 hover:bg-marp-navy-card/80 transition-all cursor-default"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border border-marp-border-bright/50 flex-shrink-0">
                <Image
                  src={avatar}
                  alt={tx.agent}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-marp-cyan text-xs font-semibold">
                  Agent {tx.agent}
                </div>
                <div className="text-marp-cyan/40 text-[10px] truncate">
                  salmoned...{tx.address.slice(-7)}
                </div>
              </div>
              <div className="text-marp-cyan/30 text-[10px] flex-shrink-0">
                {tx.time}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
