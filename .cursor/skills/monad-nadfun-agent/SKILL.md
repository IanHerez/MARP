---
name: monad-nadfun-agent
description: Recursos y referencias para que el agente entienda Monad, nad.fun (crear/tradear tokens), wallets, contratos y verificación. Usar cuando el usuario pida crear tokens en nad.fun, tradear, deployar en Monad, verificar contratos, fondear testnet o integrar con la red Monad.
---

# Monad + Nad.fun para Agentes IA

Índice de documentación, APIs y skills externas para trabajar con Monad y nad.fun.

## Cuándo usar este skill

- Usuario pide crear o tradear tokens en nad.fun
- Deploy o verificación de contratos en Monad
- Fondear wallet en testnet
- Integrar app/dApp con Monad o nad.fun

## Documentación principal

| Recurso | URL | Uso |
|--------|-----|-----|
| **Nad.fun Skill** | https://nad.fun/skill.md | Arquitectura, constantes, setup viem |
| **Nad.fun Token Creation** | https://nad.fun/create.md | Flujo detallado creación de tokens |
| **Nad.fun Trading** | https://nad.fun/trading.md | Buy, sell, permit |
| **Monad Docs** | https://docs.monad.xyz | Guías oficiales Monad |
| **Monad LLMs.txt** | https://docs.monad.xyz/llms.txt | Resumen para LLMs/agentes |
| **Nad.fun llms.txt** | https://nad.fun/llms.txt | Resumen nad.fun para agentes |

## APIs útiles

### Faucet (fondear wallet testnet)

```http
POST https://agents.devnads.com/v1/faucet
Content-Type: application/json

{"chainId": 10143, "address": "0x..."}
```

### Verificación de contratos

```http
POST https://agents.devnads.com/v1/verify
```

(Consultar body/params en docs del endpoint si hace falta.)

## RPCs

| Red | RPC |
|-----|-----|
| Testnet | https://testnet-rpc.monad.xyz |
| Mainnet | https://rpc.monad.xyz |

Chain IDs: Testnet **10143**, Mainnet **143**.

## Skills externas (instalar / referenciar)

El usuario puede pedir al agente que "se instale" estas skills leyendo los siguientes recursos:

1. **Nad.fun (overview para agentes)**  
   - https://nad.fun/llms.txt

2. **Monad development (wallets, contratos, verificación)**  
   - https://raw.githubusercontent.com/portdeveloper/skills/refs/heads/master/skills/monad-development/SKILL.md

Descargar o abrir esos URLs y usar su contenido como contexto cuando el usuario pida crear tokens en nad.fun, deployar en Monad o verificar contratos.

## Ejemplo de prompt para el usuario

El usuario puede dar al agente un mensaje como:

> "Instálate estas skills y crea un token en nad.fun para mi app. Cuando tengas lista la wallet pásamela para mandarte $MON"
>
> https://nad.fun/llms.txt  
> https://raw.githubusercontent.com/portdeveloper/skills/refs/heads/master/skills/monad-development/SKILL.md

## Resumen rápido nad.fun

- **Red**: Monad testnet (10143) o mainnet (143).
- **Stack**: viem, sin SDK obligatorio.
- **Conceptos**: bonding curve → graduación a Uniswap V3; permit (EIP-2612) para approve sin gas.
- **Constantes y ABIs**: ver https://nad.fun/skill.md y https://nad.fun/abi.md.
- **Login**: no necesario para tradear ni crear tokens; solo para gestión de API keys (límites 10 vs 100 req/min).

## Recurso agregado (Moltiverse)

Moltiverse Resources (Notion): skills, docs y recursos Monad/nad.fun en un solo lugar. El usuario puede buscarlo como "Moltiverse Resources" si necesita más enlaces.
