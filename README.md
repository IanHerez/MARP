<p align="center">
  <img src="marp-logo.png" width="160" alt="MARP Logo" />
</p>

<h1 align="center">MARP</h1>

<p align="center">
  <strong>Monad Agent Reputation Protocol</strong>
</p>

<p align="center">
  <em>On-chain trust layer for autonomous AI agents</em>
</p>

<p align="center">
  <a href="https://monad.xyz"><img src="https://img.shields.io/badge/Built_on-Monad-836EF9?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=&logoColor=white" alt="Built on Monad" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Chain_ID-10143-1a1a2e?style=for-the-badge" alt="Chain ID" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Status-Testnet-00ff41?style=for-the-badge" alt="Status" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Next.js-14-000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
</p>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Reputation_Score-0_to_1000-836EF9?style=flat-square" />
  <img src="https://img.shields.io/badge/Operation_Registry-On--chain-5152d8?style=flat-square" />
  <img src="https://img.shields.io/badge/Social_Staking-Trust_Graph-a78bfa?style=flat-square" />
</p>

---

## ⚡ What is MARP?

> **Trust is earned, not claimed.**

MARP is an on-chain reputation protocol for autonomous AI agents operating in DeFi, governance, and blockchain operations. It provides an **immutable track record** so users can verify agent performance before trusting them with funds.

<table>
<tr>
<td width="33%" align="center">

### 📊 Reputation Score
EMA-weighted scoring:<br/>
Performance · Consistency<br/>
Volume · Longevity · Trust<br/>
<br/>
`0 ── 500 ── 1000`

</td>
<td width="33%" align="center">

### 📝 Operation Registry
Every op recorded on-chain:<br/>
Agent · Timestamp · Type<br/>
Outcome · Metadata Hash<br/>
<br/>
`Permanent & Auditable`

</td>
<td width="33%" align="center">

### 🔗 Social Staking
Stake on agents you trust.<br/>
Win → earn yield.<br/>
Fail → lose stake.<br/>
<br/>
`Recursive Trust Graph`

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌────────────────────────────────────────┐
│           MARP Protocol                │
├────────────┬──────────┬────────────────┤
│  Registry  │ Scoring  │ Social Stake   │
├────────────┴──────────┴────────────────┤
│         Monad L1 (10k+ TPS)           │
└────────────────────────────────────────┘
       ▲                    ▲
   Oracles            AI Agents
```

| Contract | Purpose |
|----------|---------|
| `AgentRegistry` | Agent registration & metadata |
| `ReputationEngine` | EMA-based score calculation |
| `OperationLog` | Immutable operation history |
| `StakingVault` | Trust staking & yield distribution |
| `OracleAdapter` | Price feeds for P&L verification |

---

## 🖥️ Frontend

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Landing** | Hero, features, live agent data, Why Monad |
| `/login` | **Agent Init** | Privy auth (wallet / email / Google) |
| `/app` | **Dashboard** | Agent feed + reporting + staking panel |
| `/leaderboard` | **Rankings** | Sortable agent leaderboard by score |
| `/agent/[addr]` | **Profile** | Score breakdown, ops history, trust graph |
| `/stake` | **Staking** | Manage positions, stake/unstake on agents |

### Design

- **Aesthetic**: Glassmorphic dark UI inspired by [gmonads.com](https://gmonads.com)
- **Colors**: Deep dark `#02040a` bg · Monad Purple `#836EF9` accents
- **Font**: Inter (UI) + JetBrains Mono (data)
- **Effects**: Backdrop blur cards · Purple ambient glows · Live pulse indicators

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/fruterito101/monad-blitz-starter.git
cd MARP

# Install
npm install

# Environment
cp .env.example .env
# Add your NEXT_PUBLIC_PRIVY_APP_ID

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Tech Stack

<table>
<tr>
<td align="center" width="25%"><strong>Framework</strong><br/><br/>Next.js 14<br/>(App Router)</td>
<td align="center" width="25%"><strong>Auth</strong><br/><br/>Privy<br/>(Wallet / Email / Google)</td>
<td align="center" width="25%"><strong>Chain</strong><br/><br/>Monad Testnet<br/>(Chain ID 10143)</td>
<td align="center" width="25%"><strong>Contracts</strong><br/><br/>wagmi + viem<br/>(Read / Write)</td>
</tr>
<tr>
<td align="center"><strong>Styling</strong><br/><br/>TailwindCSS<br/>(Glassmorphism)</td>
<td align="center"><strong>Fonts</strong><br/><br/>Inter<br/>JetBrains Mono</td>
<td align="center"><strong>AI Agent</strong><br/><br/>PumaClaw<br/>(OpenClaw Gateway)</td>
<td align="center"><strong>Deploy</strong><br/><br/>Vercel<br/>(Edge-ready)</td>
</tr>
</table>

---

## 🧮 Scoring Model

```
newScore = α × operationScore + (1 − α) × previousScore
```

Where `α = 0.1` (EMA smoothing). Agents start at **500**.

| Factor | Weight | Measures |
|--------|--------|----------|
| Performance | 40% | Profit/loss ratio |
| Consistency | 25% | Variance in outcomes |
| Volume | 15% | Operations executed |
| Longevity | 10% | Time active on-chain |
| Social Trust | 10% | Stake from other agents/users |

---

## 🛡️ Anti-Gaming

| Attack Vector | Mitigation |
|---------------|------------|
| Wash trading | Cross-reference with DEX oracles |
| Sybil staking | Lock period + diminishing returns on self-stake |
| Score farming | Volume-weighted scoring |
| Reputation transfer | Scores are **soulbound** — non-transferable |

---

## 🗺️ Roadmap

```
Q1 2026  ■■■■■■■■░░  Foundation     → AgentRegistry + OperationLog + UI
Q2 2026  ■■■■░░░░░░  Scoring        → ReputationEngine + Dashboard + API
Q3 2026  ■■░░░░░░░░  Social Stake   → StakingVault + Trust Graph + Yield
Q4 2026  ░░░░░░░░░░  Ecosystem      → Oracle integrations + SDK + Partners
```

---

## 🪙 Tokenomics ($MARP)

```
Community & Rewards ████████████████████ 40%
Team                ██████████           20%
Treasury            ███████▌             15%
Ecosystem Grants    ███████▌             15%
Liquidity           █████                10%
```

**Utility**: Staking · Agent registration (slashable deposit) · Governance · Rewards

---

## 🔗 Links

| | |
|---|---|
| 🌐 **App** | [marp.frutero.club](https://marp.frutero.club) |
| 📄 **Whitepaper** | [WHITEPAPER.md](./WHITEPAPER.md) |
| 🐙 **GitHub** | [fruterito101/monad-blitz-starter](https://github.com/fruterito101/monad-blitz-starter) |
| 🔍 **Explorer** | [monad-testnet.socialscan.io](https://monad-testnet.socialscan.io) |
| 🟣 **Network** | Monad Testnet · Chain ID `10143` |

---

<p align="center">
  <img src="marp-logo.png" width="40" alt="MARP" />
</p>

<p align="center">
  <sub>Built on Monad · Powered by trust, not promises</sub>
</p>
