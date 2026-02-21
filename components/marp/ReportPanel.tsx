'use client'

import { useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { MARP_ADDRESS, MARP_ABI, MOCK_AGENTS } from '@/lib/marp'

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
    <div className="rounded-xl border border-marp-border bg-marp-navy-light/60 p-5 font-mono flex flex-col h-full backdrop-blur-sm">
      <h2 className="text-marp-cyan text-xs tracking-[0.2em] uppercase mb-4 pb-3 border-b border-marp-border font-semibold">
        Trade / Report
      </h2>

      {/* Register */}
      {hasContract && authenticated && (
        <div className="flex gap-2 mb-4 pb-3 border-b border-marp-border/60">
          <input
            type="text"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            placeholder="Register as agent..."
            className="flex-1 bg-marp-navy-card border border-marp-border rounded-lg px-3 py-2.5 text-marp-cyan text-sm focus:border-marp-cyan/60 focus:ring-1 focus:ring-marp-cyan/20 outline-none placeholder:text-marp-cyan/30 transition-colors"
          />
          <button
            onClick={handleRegister}
            disabled={registerPending || registerConfirming}
            className="border border-marp-border hover:border-marp-cyan/50 px-4 py-2.5 text-marp-cyan text-xs rounded-lg hover:bg-marp-cyan/5 disabled:opacity-40 transition-all"
          >
            {registerPending || registerConfirming ? '...' : 'REGISTER'}
          </button>
          {registerSuccess && registerHash && (
            <a href={`https://monad-testnet.socialscan.io/tx/${registerHash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-marp-cyan/60 hover:text-marp-cyan self-center transition-colors">Tx &rarr;</a>
          )}
        </div>
      )}
      {registerError && <p className="text-red-400 text-xs mb-2">{registerError.message.slice(0, 50)}</p>}

      {/* Tabs */}
      <div className="flex gap-1 mb-5">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`px-3 py-2.5 rounded-lg text-[10px] tracking-wider font-semibold transition-all ${
              activeTab === id
                ? 'bg-marp-cyan/10 border border-marp-cyan/50 text-marp-cyan shadow-glow-cyan'
                : 'border border-marp-border text-marp-cyan/40 hover:border-marp-border-bright hover:text-marp-cyan/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab: REPORT OUTCOME */}
      {activeTab === 'report' && (
        <div className="space-y-5 flex-1 overflow-auto pr-1">
          {/* Agent address */}
          <div>
            <label className="block text-[10px] tracking-wider text-marp-cyan/60 mb-2 uppercase font-semibold">Agent (address)</label>
            <input
              type="text"
              value={agentAddress}
              onChange={(e) => setAgentAddress(e.target.value)}
              placeholder="0x"
              className="w-full bg-marp-navy-card border border-marp-border rounded-lg px-3 py-2.5 text-marp-cyan text-sm font-mono focus:border-marp-cyan/50 focus:ring-1 focus:ring-marp-cyan/20 outline-none placeholder:text-marp-cyan/25 transition-colors"
            />
            <div className="flex gap-2 flex-wrap mt-2.5">
              {agentSuggestions.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => setAgentAddress(a.address)}
                  className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold tracking-wider transition-all ${
                    agentAddress === a.address
                      ? 'border border-marp-cyan/50 bg-marp-cyan/10 text-marp-cyan'
                      : 'border border-marp-border text-marp-cyan/50 hover:border-marp-border-bright hover:text-marp-cyan/80'
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div>
            <label className="block text-[10px] tracking-wider text-marp-cyan/60 mb-2 uppercase font-semibold">Outcome</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOutcome('success')}
                className={`flex-1 py-3 rounded-lg text-sm font-mono border-2 transition-all flex items-center justify-center gap-2 ${
                  outcome === 'success'
                    ? 'border-marp-green/60 bg-marp-green/10 text-marp-green shadow-glow-green'
                    : 'border-marp-border text-marp-cyan/40 hover:border-marp-border-bright'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                  <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Profit
              </button>
              <button
                type="button"
                onClick={() => setOutcome('fail')}
                className={`flex-1 py-3 rounded-lg text-sm font-mono border-2 transition-all flex items-center justify-center gap-2 ${
                  outcome === 'fail'
                    ? 'border-red-500/60 bg-red-500/10 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                    : 'border-marp-border text-marp-cyan/40 hover:border-marp-border-bright'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                  <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Loss
              </button>
            </div>
          </div>

          {/* Magnitude */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] tracking-wider text-marp-cyan/60 mb-2 uppercase font-semibold">
              Magnitude
              <span className="w-4 h-4 rounded-full border border-marp-cyan/30 flex items-center justify-center text-marp-cyan/40 text-[8px] cursor-help" title="Weight of the outcome (e.g. 10 = +10 or -10 score)">i</span>
            </label>
            <input
              type="number"
              min="1"
              value={magnitude}
              onChange={(e) => setMagnitude(e.target.value)}
              className="w-full bg-marp-navy-card border border-marp-border rounded-lg px-3 py-2.5 text-marp-cyan text-sm font-mono focus:border-marp-cyan/50 focus:ring-1 focus:ring-marp-cyan/20 outline-none transition-colors"
            />
          </div>

          {hasContract && authenticated ? (
            <>
              <button
                onClick={handleReport}
                disabled={reportPending || reportConfirming}
                className="w-full border-2 border-marp-cyan/40 bg-marp-cyan/5 text-marp-cyan py-3 rounded-lg font-mono text-sm font-semibold tracking-wider hover:bg-marp-cyan/10 hover:border-marp-cyan/60 hover:shadow-glow-cyan disabled:opacity-40 transition-all"
              >
                {reportPending || reportConfirming ? 'Confirming...' : 'REPORT OUTCOME'}
              </button>
              {reportSuccess && reportHash && (
                <a href={`https://monad-testnet.socialscan.io/tx/${reportHash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-marp-cyan/60 hover:text-marp-cyan block transition-colors">View tx &rarr;</a>
              )}
              {reportError && <p className="text-red-400 text-xs">{reportError.message.slice(0, 60)}...</p>}
            </>
          ) : (
            <p className="text-marp-cyan/30 text-xs">Connect wallet + set NEXT_PUBLIC_MARP_ADDRESS to report</p>
          )}
        </div>
      )}

      {/* Tab: STAKE */}
      {activeTab === 'stake' && (
        <div className="space-y-5 flex-1 overflow-auto pr-1">
          {/* Stake on agent */}
          <div>
            <label className="block text-[10px] tracking-wider text-marp-cyan/60 mb-2 uppercase font-semibold">Stake on agent (address)</label>
            <input
              type="text"
              value={stakeAgent}
              onChange={(e) => setStakeAgent(e.target.value)}
              placeholder="0x..."
              className="w-full bg-marp-navy-card border border-marp-border rounded-lg px-3 py-2.5 text-marp-cyan text-sm font-mono focus:border-marp-cyan/50 focus:ring-1 focus:ring-marp-cyan/20 outline-none placeholder:text-marp-cyan/25 transition-colors"
            />
            <div className="flex gap-2 flex-wrap mt-2.5">
              {agentSuggestions.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => setStakeAgent(a.address)}
                  className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold tracking-wider transition-all ${
                    stakeAgent === a.address
                      ? 'border border-marp-cyan/50 bg-marp-cyan/10 text-marp-cyan'
                      : 'border border-marp-border text-marp-cyan/50 hover:border-marp-border-bright hover:text-marp-cyan/80'
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[10px] tracking-wider text-marp-cyan/60 mb-2 uppercase font-semibold">Amount (MON)</label>
            <input
              type="text"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.01"
              className="w-full bg-marp-navy-card border border-marp-border rounded-lg px-3 py-2.5 text-marp-cyan text-sm font-mono focus:border-marp-cyan/50 focus:ring-1 focus:ring-marp-cyan/20 outline-none placeholder:text-marp-cyan/25 transition-colors"
            />
          </div>

          {/* Outcome for stake */}
          <div>
            <label className="block text-[10px] tracking-wider text-marp-cyan/60 mb-2 uppercase font-semibold">Prediction</label>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-3 rounded-lg text-sm font-mono border-2 border-marp-green/60 bg-marp-green/10 text-marp-green shadow-glow-green transition-all flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                  <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Profit
              </button>
              <button
                type="button"
                className="flex-1 py-3 rounded-lg text-sm font-mono border-2 border-marp-border text-marp-cyan/40 hover:border-marp-border-bright transition-all flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                  <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Loss
              </button>
            </div>
          </div>

          {hasContract && authenticated ? (
            <>
              <button
                onClick={handleStake}
                disabled={stakePending || stakeConfirming}
                className="w-full border-2 border-marp-cyan/40 bg-marp-cyan/5 text-marp-cyan py-3 rounded-lg font-mono text-sm font-semibold tracking-wider hover:bg-marp-cyan/10 hover:border-marp-cyan/60 hover:shadow-glow-cyan disabled:opacity-40 transition-all"
              >
                {stakePending || stakeConfirming ? 'Confirming...' : 'STAKE ON AGENT'}
              </button>
              {stakeSuccess && stakeHash && (
                <a href={`https://monad-testnet.socialscan.io/tx/${stakeHash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-marp-cyan/60 hover:text-marp-cyan block transition-colors">View tx &rarr;</a>
              )}
              {stakeError && <p className="text-red-400 text-xs">{stakeError.message.slice(0, 60)}...</p>}
            </>
          ) : (
            <p className="text-marp-cyan/30 text-xs">Connect wallet + set NEXT_PUBLIC_MARP_ADDRESS to stake</p>
          )}
        </div>
      )}

      {/* Tab: TRANSACTION HISTORY */}
      {activeTab === 'history' && (
        <div className="flex-1 overflow-auto pr-1">
          <p className="text-marp-cyan/40 text-xs">Transaction history is shown in the Live Transaction Log panel.</p>
        </div>
      )}
    </div>
  )
}
