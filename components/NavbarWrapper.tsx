'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'

const NAVBAR_ROUTES = ['/app', '/leaderboard', '/stake', '/agent']

export function NavbarWrapper() {
    const pathname = usePathname()
    const showNavbar = NAVBAR_ROUTES.some((r) => pathname.startsWith(r))

    if (!showNavbar) return null
    return <Navbar />
}
