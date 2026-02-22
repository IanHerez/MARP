'use client'

import { useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { MARP_ADDRESS, MARP_ABI, MOCK_AGENTS, MOCK_TX_HISTORY } from '@/lib/marp'

type Tab = 'report' | 'stake' | 'history'

export function ReportPanel() {
  const { authenticated } = usePrivy()
  const [activeTab, setActiveTab] = useState<Tab>('report')
  const [agentAddress, setAgentAddress] = useState('')
  const [outcome, setOutcome] = useState<'success' | 'fail'>('success')
  const [magnitude, setMagnitude] = useState('10')
  const [stakeAgent, setStakeAgent] = useState('')
  const [stakeAmount, setStakeAmount] = useState('0.01')
  const [registerName, setRegisterName] = useState('')

  const { writeContract: writeRegister, data: registerHash, isPending: registerPending, error: registerError } = useWriteContract()
  const { isLoading: registerConfirming, isSuccess: registerSuccess } = useWaitForTransactionReceipt({ hash: registerHash })

  const { writeContract: writeReport, data: reportHash, isPending: reportPending, error: reportError } = useWriteContract()
  const { isLoading: reportConfirming, isSuccess: reportSuccess } = useWaitForTransactionReceipt({ hash: reportHash })

  const { writeContract: writeStake, data: stakeHash, isPending: stakePending, error: stakeError } = useWriteContract()
  const { isLoading: stakeConfirming, isSuccess: stakeSuccess } = useWaitForTransactionReceipt({ hash: stakeHash })

  const handleReport = () => {
    if (!agentAddress || !MARP_ADDRESS) return
    writeReport({
      address: MARP_ADDRESS,
      abi: MARP_ABI,
      functionName: 'reportOutcome',
      args: [agentAddress as `0x${string}`, outcome === 'success', BigInt(magnitude) || 10n],
    })
  }

  const handleRegister = () => {
    if (!registerName.trim() || !MARP_ADDRESS) return
    writeRegister({
      address: MARP_ADDRESS,
      abi: MARP_ABI,
      functionName: 'register',
      args: [registerName.trim()],
    })
  }

  const handleStake = () => {
    if (!stakeAgent || !stakeAmount || !MARP_ADDRESS) return
    const wei = parseEther(stakeAmount)
    if (wei <= 0n) return
    writeStake({
      address: MARP_ADDRESS,
      abi: MARP_ABI,
      functionName: 'stake',
      args: [stakeAgent as `0x${string}`],
      value: wei,
    })
  }

  const hasContract = MARP_ADDRESS && MARP_ADDRESS.length > 2
  const agentSuggestions = MOCK_AGENTS

  const tabs: { id: Tab; label: string }[] = [
    { id: 'report', label: 'REPORT OUTCOME' },
    { id: 'stake', label: 'STAKE' },
    { id: 'history', label: 'TRANSACTION HISTORY' },
  ]

  return (
    <div className="rounded-xl border border-marp-green/50 bg-black/40 p-4 font-mono flex flex-col h-full shadow-[0_0_40px_rgba(131,110,249,0.06)]">
      <h2 className="text-marp-green text-xs tracking-widest mb-4 border-b border-marp-green/40 pb-2">
        TRADE / REPORT
      </h2>

      {/* Register — compact */}
      {hasContract && authenticated && (
        <div className="flex gap-2 mb-4 pb-3 border-b border-marp-green/30">
          <input
            type="text"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            placeholder="Register as agent..."
            className="flex-1 bg-black/80 border border-marp-green/40 rounded-lg px-3 py-2 text-marp-green text-sm focus:border-marp-green focus:ring-1 focus:ring-marp-green/30 outline-none placeholder:text-marp-green/40"
          />
          <button
            onClick={handleRegister}
            disabled={registerPending || registerConfirming}
            className="border border-marp-green/50 hover:border-marp-green px-3 py-2 text-marp-green text-xs rounded-lg hover:bg-marp-green/10 disabled:opacity-50 transition-colors"
          >
            {registerPending || registerConfirming ? '...' : 'REGISTER'}
          </button>
          {registerSuccess && registerHash && (
            <a href={`https://monad-testnet.socialscan.io/tx/${registerHash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-marp-green/70 hover:text-marp-green self-center">Tx →</a>
          )}
        </div>
      )}
      {registerError && <p className="text-red-500 text-xs mb-2">{registerError.message.slice(0, 50)}</p>}

      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`px-3 py-2 rounded-lg text-xs font-mono transition-all ${
              activeTab === id
                ? 'bg-marp-green/20 border border-marp-green text-marp-green shadow-[0_0_12px_rgba(131,110,249,0.2)]'
                : 'border border-marp-green/30 text-marp-green/70 hover:border-marp-green/50 hover:text-marp-green/90'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab: REPORT OUTCOME */}
      {activeTab === 'report' && (
        <div className="space-y-4 flex-1 overflow-auto">
          <div>
            <label className="block text-xs text-marp-green/80 mb-1">Agent (address)</label>
            <input
              type="text"
              value={agentAddress}
              onChange={(e) => setAgentAddress(e.target.value)}
              placeholder="0x..."
              className="w-full bg-black/80 border border-marp-green/40 rounded-lg px-3 py-2 text-marp-green text-sm font-mono focus:border-marp-green focus:ring-1 focus:ring-marp-green/30 outline-none placeholder:text-marp-green/40"
            />
            <div className="flex gap-2 flex-wrap mt-2">
              {agentSuggestions.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => setAgentAddress(a.address)}
                  className="border border-marp-green/40 hover:border-marp-green hover:bg-marp-green/10 px-2 py-1.5 rounded-md text-xs text-marp-green/80 hover:text-marp-green transition-colors"
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-marp-green/80 mb-2">Outcome</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOutcome('success')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-mono border transition-all ${
                  outcome === 'success'
                    ? 'border-marp-green bg-marp-green/20 text-marp-green shadow-[0_0_12px_rgba(131,110,249,0.15)]'
                    : 'border-marp-green/40 text-marp-green/70 hover:border-marp-green/60'
                }`}
              >
                ✓ Profit
              </button>
              <button
                type="button"
                onClick={() => setOutcome('fail')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-mono border transition-all ${
                  outcome === 'fail'
                    ? 'border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.15)]'
                    : 'border-marp-green/40 text-marp-green/70 hover:border-red-500/50'
                }`}
              >
                ✗ Loss
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-marp-green/80 mb-1">
              Magnitude
              <span className="ml-1.5 text-marp-green/50 cursor-help" title="Weight of the outcome (e.g. 10 = +10 or -10 score)">ⓘ</span>
            </label>
            <input
              type="number"
              min="1"
              value={magnitude}
              onChange={(e) => setMagnitude(e.target.value)}
              className="w-full bg-black/80 border border-marp-green/40 rounded-lg px-3 py-2 text-marp-green text-sm font-mono focus:border-marp-green focus:ring-1 focus:ring-marp-green/30 outline-none"
            />
          </div>

          {hasContract && authenticated ? (
            <>
              <button
                onClick={handleReport}
                disabled={reportPending || reportConfirming}
                className="w-full border border-marp-green bg-marp-green/10 text-marp-green py-2.5 rounded-lg font-mono text-sm hover:bg-marp-green/20 hover:shadow-[0_0_16px_rgba(131,110,249,0.12)] disabled:opacity-50 transition-all"
              >
                {reportPending || reportConfirming ? 'Confirming...' : 'REPORT OUTCOME'}
              </button>
              {reportSuccess && reportHash && (
                <a href={`https://monad-testnet.socialscan.io/tx/${reportHash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-marp-green/80 hover:text-marp-green block">View tx →</a>
              )}
              {reportError && <p className="text-red-500 text-xs">{reportError.message.slice(0, 60)}...</p>}
            </>
          ) : (
            <p className="text-marp-green/50 text-xs">Connect wallet + set NEXT_PUBLIC_MARP_ADDRESS to report</p>
          )}
        </div>
      )}

      {/* Tab: STAKE */}
      {activeTab === 'stake' && (
        <div className="space-y-4 flex-1 overflow-auto">
          <div>
            <label className="block text-xs text-marp-green/80 mb-1">Stake on agent (address)</label>
            <input
              type="text"
              value={stakeAgent}
              onChange={(e) => setStakeAgent(e.target.value)}
              placeholder="0x..."
              className="w-full bg-black/80 border border-marp-green/40 rounded-lg px-3 py-2 text-marp-green text-sm font-mono focus:border-marp-green focus:ring-1 focus:ring-marp-green/30 outline-none placeholder:text-marp-green/40"
            />
            <div className="flex gap-2 flex-wrap mt-2">
              {agentSuggestions.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => setStakeAgent(a.address)}
                  className="border border-marp-green/40 hover:border-marp-green hover:bg-marp-green/10 px-2 py-1.5 rounded-md text-xs text-marp-green/80 hover:text-marp-green transition-colors"
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-marp-green/80 mb-1">Amount (MON)</label>
            <input
              type="text"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.01"
              className="w-full bg-black/80 border border-marp-green/40 rounded-lg px-3 py-2 text-marp-green text-sm font-mono focus:border-marp-green focus:ring-1 focus:ring-marp-green/30 outline-none placeholder:text-marp-green/40"
            />
          </div>
          {hasContract && authenticated ? (
            <>
              <button
                onClick={handleStake}
                disabled={stakePending || stakeConfirming}
                className="w-full border border-marp-green bg-marp-green/10 text-marp-green py-2.5 rounded-lg font-mono text-sm hover:bg-marp-green/20 hover:shadow-[0_0_16px_rgba(131,110,249,0.12)] disabled:opacity-50 transition-all"
              >
                {stakePending || stakeConfirming ? 'Confirming...' : 'STAKE ON AGENT'}
              </button>
              {stakeSuccess && stakeHash && (
                <a href={`https://monad-testnet.socialscan.io/tx/${stakeHash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-marp-green/80 hover:text-marp-green block">View tx →</a>
              )}
              {stakeError && <p className="text-red-500 text-xs">{stakeError.message.slice(0, 60)}...</p>}
            </>
          ) : (
            <p className="text-marp-green/50 text-xs">Connect wallet + set NEXT_PUBLIC_MARP_ADDRESS to stake</p>
          )}
        </div>
      )}

      {/* Tab: TRANSACTION HISTORY */}
      {activeTab === 'history' && (
        <div className="flex-1 overflow-auto">
          <div className="flex items-center gap-2 mb-3">
            <select className="bg-black/80 border border-marp-green/40 rounded-lg px-3 py-2 text-marp-green text-xs font-mono focus:border-marp-green outline-none">
              <option>All</option>
            </select>
          </div>
          <ul className="space-y-2">
            {MOCK_TX_HISTORY.map((tx, i) => (
              <li
                key={i}
                className="flex items-center gap-3 py-2 px-3 rounded-lg border border-marp-green/20 bg-black/40 hover:border-marp-green/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-marp-green/40 bg-black/80 flex items-center justify-center text-sm">
                  🤖
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-marp-green text-xs font-mono">Agent {tx.agent}</div>
                  <div className="text-marp-green/60 text-xs truncate">{tx.action}</div>
                </div>
                <div className="text-marp-green/50 text-xs font-mono truncate max-w-[80px]">{tx.address}</div>
                <div className="text-marp-green/50 text-xs flex-shrink-0">{tx.time}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
