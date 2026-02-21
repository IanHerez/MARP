# 🔧 Troubleshooting

Errores comunes y cómo resolverlos.

## Contratos

### "Error: Unsupported EVM version"
```
Error: Unsupported EVM version "prague"
```

**Solución:** Actualiza Foundry
```bash
foundryup
```

### "Error: No matching version for solc 0.8.28"

**Solución:** El compilador se descarga automático, espera unos segundos.

### "Error: insufficient funds"

**Solución:** Necesitas testnet MON
1. Ve a https://faucet.monad.xyz
2. Conecta tu wallet
3. Solicita MON

### "Error: No associated wallet"

**Solución:** No hardcodees direcciones en el deploy script.

❌ Mal:
```solidity
vm.startBroadcast(0x1234...);
```

✅ Bien:
```solidity
vm.startBroadcast();  // Usa --private-key flag
```

### "Transaction reverted without reason"

**Solución:** Verifica:
1. Tienes suficiente MON para gas
2. Los parámetros del contrato son correctos
3. El contrato está deployado en la red correcta

## Frontend

### "Error: Privy app not found"

**Solución:** Verifica tu `NEXT_PUBLIC_PRIVY_APP_ID` en `.env.local`

### "Error: Chain not configured"

**Solución:** Verifica que estés usando `monadTestnet` de viem/chains:
```typescript
import { monadTestnet } from 'viem/chains'
```

### "Error: Contract not found"

**Solución:** 
1. Verifica que el contrato esté deployado
2. Verifica la dirección en `.env.local`
3. Verifica que estés en la red correcta (Monad Testnet)

### Wallet no conecta

**Solución:**
1. Verifica que Privy esté configurado correctamente
2. Revisa la consola del browser para errores
3. Intenta con otro método de login (Google vs Email)

## Verificación de Contratos

### "Error: Verification failed"

**Solución:** Usa el API de verificación:
```bash
# Ver script de verificación en contracts/script/Verify.s.sol
```

## ¿Sigues con problemas?

Busca a un mentor de Frutero 🍓 — estamos aquí para ayudar!
