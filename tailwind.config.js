/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        monad: {
          purple: '#836EF9',
          dark: '#1a1a2e',
        },
        marp: {
          green: '#00ff41',
          'green-dim': '#00cc34',
          'green-bright': '#33ff66',
          cyan: '#0ef6cc',
          navy: '#0a0e1a',
          'navy-light': '#0f1628',
          'navy-card': '#111827',
          'navy-surface': '#161d2f',
          border: '#1a2744',
          'border-bright': '#243656',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 65, 0.15)',
        'glow-cyan': '0 0 20px rgba(14, 246, 204, 0.15)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(14, 246, 204, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 246, 204, 0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
