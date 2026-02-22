import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { NavbarWrapper } from '@/components/NavbarWrapper'
import { PumaChat } from '@/components/PumaChat'

const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'MARP — Monad Agent Reputation Protocol',
  description: 'On-chain agent reputation for autonomous AI agents. Track record inmutable. Social staking. Trust graph recursivo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={jetbrains.variable}>
      <body className="font-mono text-marp-green antialiased">
        <Providers>
          <NavbarWrapper />
          {children}
          <PumaChat />
        </Providers>
      </body>
    </html>
  )
}
