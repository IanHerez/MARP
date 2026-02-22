# MARP — Monad Agent Reputation Protocol

> On-chain reputation for autonomous AI agents.

---

## Abstract

MARP es un sistema de reputación on-chain para agentes autónomos de IA. A medida que los agentes participan en DeFi, governance y operaciones blockchain, la necesidad de una capa de confianza verificable se vuelve crítica. MARP provee un **track record inmutable** para cada agente.

---

## 1. El Problema

Miles de agentes de IA operan en crypto hoy:

- **No hay visibilidad** del historial de un agente
- **No hay accountability** — cualquiera deploya un agente sin consecuencias
- **Los buenos agentes no pueden diferenciarse** del ruido
- **Confiar en un agente hoy = confiar en un extraño con tu dinero**

---

## 2. La Solución — Tres Primitivas

### 2.1 Reputation Score (0–1000)

| Factor       | Peso | Qué mide                        |
|-------------|------|----------------------------------|
| Performance  | 40%  | Profit/loss ratio               |
| Consistency  | 25%  | Varianza en resultados          |
| Volume       | 15%  | Operaciones ejecutadas          |
| Longevity    | 10%  | Tiempo activo                   |
| Social Trust | 10%  | Stake de otros agentes/usuarios |

### 2.2 Operation Registry

Cada operación se registra on-chain:
- Agente
- Timestamp
- Tipo
- Resultado
- Metadata hash

Auditoría permanente e inmutable.

### 2.3 Social Staking (Trust Graph)

- **Stakeas tokens** en un agente = "confío en él"
- Agente rinde bien → stakers ganan **yield**
- Agente falla → stakers pierden parte del stake
- Stake de agentes con alta reputación pesa **MÁS** → trust graph recursivo

---

## 3. Arquitectura

```
┌──────────────────────────────────┐
│         MARP Protocol            │
├──────────┬────────┬──────────────┤
│ Registry │ Scoring│ Social Stake │
├──────────┴────────┴──────────────┤
│        Monad L1 (10k TPS)        │
└──────────────────────────────────┘
       ▲                ▲
   Oracles          AI Agents
```

### Contratos

| Contrato | Función |
|----------|---------|
| **AgentRegistry** | Registro de agentes |
| **ReputationEngine** | Cálculo de scores |
| **OperationLog** | Registro de operaciones |
| **StakingVault** | Staking de confianza |
| **OracleAdapter** | Feeds de precio para P&L |

### Scoring (EMA)

```
newScore = 0.1 × operationScore + 0.9 × previousScore
```

Agentes nuevos arrancan en **500**. Hay que ganarse el score.

---

## 4. Anti-Gaming

| Vector | Mitigación |
|--------|------------|
| Wash trading | Cross-reference con oráculos DEX |
| Sybil staking | Lock period + rendimientos decrecientes en auto-stake |
| Score farming | Scoring ponderado por volumen |
| Transfer de reputación | Scores son **soulbound**, no transferibles |

---

## 5. Por qué Monad

| Chain    | Tx/día | Costo/Tx   | Viable |
|----------|--------|------------|--------|
| Ethereum | ~1.2M  | $2–50      | ❌     |
| L2s      | ~5M    | $0.01–0.10 | ⚠️     |
| Monad    | ~50M+  | <$0.001    | ✅     |

**1,000 agentes × 100 ops/día = 100k tx diarias.**
Solo Monad lo soporta en real-time sin batching.

---

## 6. Tokenomics ($MARP)

**Utilidad**: staking, registro de agentes (depósito slasheable), governance, rewards.

| Allocation          | %   |
|---------------------|-----|
| Community & Rewards | 40% |
| Team                | 20% |
| Treasury            | 15% |
| Ecosystem Grants    | 15% |
| Liquidity           | 10% |

---

## 7. Use Cases

- **DeFi Trading** — ¿qué agente genera alpha real?
- **Governance** — Track record de votaciones
- **Lending** — Reputation como colateral para préstamos
- **Agent-to-Agent** — Agentes verifican otros antes de colaborar
- **Insurance** — Pricing de riesgo basado en scores

---

## 8. Roadmap

| Fase | Período | Objetivos |
|------|---------|-----------|
| **Phase 1** — Foundation | Q1 2026 | Contrato AgentRegistry + OperationLog, UI básica, testnet |
| **Phase 2** — Scoring | Q2 2026 | ReputationEngine con EMA, dashboard de agentes, API pública |
| **Phase 3** — Social Staking | Q3 2026 | StakingVault, trust graph, yield distribution |
| **Phase 4** — Ecosystem | Q4 2026 | Oracle integrations, SDK para agentes, partnerships |

---

## 9. Links

- **App**: [marp.frutero.club](https://marp.frutero.club) *(próximamente)*
- **GitHub**: [github.com/fruterito101/monad-blitz-starter](https://github.com/fruterito101/monad-blitz-starter)
- **Network**: Monad Testnet (Chain ID: 10143)
- **Explorer**: [monad-testnet.socialscan.io](https://monad-testnet.socialscan.io)

---

*Built on Monad · Powered by trust, not promises.*
