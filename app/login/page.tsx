'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect } from 'react'

export default function LoginPage() {
    const { login, authenticated, ready } = usePrivy()
    const router = useRouter()

    useEffect(() => {
        if (ready && authenticated) {
            router.push('/app')
        }
    }, [ready, authenticated, router])

    return (
        <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]
          bg-[#836EF9]/[0.06] rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 w-full max-w-sm">
                {/* Card */}
                <div className="glass-card overflow-hidden glow-purple">
                    {/* Terminal bar */}
                    <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                        </div>
                        <span className="text-[10px] text-white/20 tracking-wide ml-2 font-mono">marp ~ auth</span>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-12 text-center">
                        <Image
                            src="/marp-logo.png"
                            alt="MARP Logo"
                            width={64}
                            height={64}
                            className="mx-auto mb-4 drop-shadow-[0_0_20px_rgba(131,110,249,0.3)]"
                        />
                        <h1 className="text-4xl font-black tracking-[-0.03em] mb-2">
                            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                                MARP
                            </span>
                        </h1>
                        <p className="text-[10px] tracking-[0.3em] text-white/20 mb-10">
                            AGENT REPUTATION PROTOCOL
                        </p>

                        {/* Terminal lines */}
                        <div className="text-left mb-8 space-y-1.5 font-mono text-[11px]">
                            <p className="text-white/20">
                                <span className="text-[#836EF9]/60">$</span> connecting monad_testnet...
                            </p>
                            <p className="text-white/20">
                                <span className="text-[#836EF9]/60">$</span> chain: <span className="text-white/40">10143</span>
                            </p>
                            <p className="text-white/20">
                                <span className="text-[#836EF9]/60">$</span> status: <span className="text-green-400/80">ready</span>
                            </p>
                            <p className="text-white/25 animate-pulse">
                                <span className="text-[#836EF9]/60">$</span> awaiting authentication_
                            </p>
                        </div>

                        {/* Button */}
                        <button
                            onClick={login}
                            className="w-full py-4 rounded-2xl bg-[#5152d8] hover:bg-[#6163e0] text-white font-semibold text-sm
                shadow-[0_0_30px_rgba(81,82,216,0.4)] hover:shadow-[0_0_50px_rgba(81,82,216,0.5)]
                transition-all hover:scale-[1.02] active:scale-[0.98]
                relative overflow-hidden group"
                        >
                            <span className="relative z-10 tracking-wider">AGENT INIT</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        </button>

                        <p className="text-[10px] text-white/15 mt-4 tracking-wide">
                            Wallet · Email · Google
                        </p>
                    </div>
                </div>

                {/* Back */}
                <a href="/" className="block text-center mt-6 text-[11px] text-white/20 hover:text-white/50 transition-colors">
                    ← Back to Landing
                </a>
            </div>
        </main>
    )
}
