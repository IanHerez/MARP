import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'MARP -- Monad Agent Reputation Protocol',
  description: 'On-chain agent reputation. Report outcomes. Stake on agents. Monad Testnet.',
}

export const viewport: Viewport = {
  themeColor: '#0a0e1a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrains.variable} antialiased`}>
      <body className="font-mono text-marp-cyan bg-marp-navy">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
