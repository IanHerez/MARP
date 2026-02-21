import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'MARP — Monad Agent Reputation Protocol',
  description: 'On-chain agent reputation. Report outcomes. Stake on agents.',
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
          {children}
        </Providers>
      </body>
    </html>
  )
}
