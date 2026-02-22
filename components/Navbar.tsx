'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ConnectButton } from './ConnectButton'
import { useState } from 'react'

const NAV_LINKS = [
    { href: '/', label: 'HOME' },
    { href: '/app', label: 'DASHBOARD' },
    { href: '/leaderboard', label: 'LEADERBOARD' },
    { href: '/stake', label: 'STAKE' },
]

export function Navbar() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 border-b border-marp-green/30 bg-black/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <Image
                        src="/marp-logo.png"
                        alt="MARP"
                        width={28}
                        height={28}
                        className="group-hover:drop-shadow-[0_0_8px_rgba(131,110,249,0.5)] transition-all"
                    />
                    <span className="text-white text-sm font-bold tracking-wider
            group-hover:text-[#836EF9] transition-colors">
                        MARP
                    </span>
                    <span className="hidden sm:inline text-marp-green/40 text-[10px] tracking-wider">
                        AGENT REPUTATION
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(({ href, label }) => {
                        const isActive = pathname === href
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`px-3 py-1.5 rounded-md text-xs font-mono tracking-wider transition-all
                  ${isActive
                                        ? 'text-marp-green bg-marp-green/10 border border-marp-green/40 shadow-[0_0_8px_rgba(131,110,249,0.1)]'
                                        : 'text-marp-green/50 hover:text-marp-green hover:bg-marp-green/5 border border-transparent'
                                    }`}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <ConnectButton />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-marp-green/70 hover:text-marp-green p-1"
                        aria-label="Menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile nav */}
            {mobileOpen && (
                <nav className="md:hidden border-t border-marp-green/20 bg-black/95 px-4 py-2 space-y-1">
                    {NAV_LINKS.map(({ href, label }) => {
                        const isActive = pathname === href
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setMobileOpen(false)}
                                className={`block px-3 py-2 rounded-md text-xs font-mono tracking-wider transition-all
                  ${isActive
                                        ? 'text-marp-green bg-marp-green/10 border border-marp-green/40'
                                        : 'text-marp-green/50 hover:text-marp-green border border-transparent'
                                    }`}
                            >
                                {label}
                            </Link>
                        )
                    })}
                </nav>
            )}
        </header>
    )
}
