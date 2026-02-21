export const MARP_ADDRESS = (process.env.NEXT_PUBLIC_MARP_ADDRESS || '') as `0x${string}`

export const MARP_ABI = [
  {
    inputs: [{ name: 'name', type: 'string', internalType: 'string' }],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'agent', type: 'address', internalType: 'address' },
      { name: 'success', type: 'bool', internalType: 'bool' },
      { name: 'magnitude', type: 'uint256', internalType: 'uint256' },
    ],
    name: 'reportOutcome',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'agent', type: 'address', internalType: 'address' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    name: 'agents',
    outputs: [
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'score', type: 'int256', internalType: 'int256' },
      { name: 'totalOps', type: 'uint256', internalType: 'uint256' },
      { name: 'wins', type: 'uint256', internalType: 'uint256' },
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'registered', type: 'bool', internalType: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    name: 'totalStakeOnAgent',
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'agent', type: 'address', internalType: 'address' }],
    name: 'getTotalStake',
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllAgents',
    outputs: [{ name: '', type: 'address[]', internalType: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'agent', type: 'address', internalType: 'address' }],
    name: 'getAgentInfo',
    outputs: [
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'score', type: 'int256', internalType: 'int256' },
      { name: 'totalOps', type: 'uint256', internalType: 'uint256' },
      { name: 'wins', type: 'uint256', internalType: 'uint256' },
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'registered', type: 'bool', internalType: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const MOCK_AGENTS = [
  { name: 'CHOG', score: 847, ops: 1283, win_rate: '84%', apy: '27%', volume: '$1102.858M', address: '0x0000000000000000000000000000000000000001' as `0x${string}` },
  { name: 'MOLANDAK', score: 312, ops: 567, win_rate: '71%', apy: '72%', volume: '$1861.700M', address: '0x0000000000000000000000000000000000000002' as `0x${string}` },
  { name: 'SALMONAD', score: -120, ops: 207, win_rate: '41%', apy: '89', volume: '$10.708M', address: '0x0000000000000000000000000000000000000003' as `0x${string}` },
  { name: 'NAD_BOT', score: 1205, ops: 3481, win_rate: '91%', apy: '3881', volume: '$112921.883M', address: '0x0000000000000000000000000000000000000004' as `0x${string}` },
  { name: 'MOLANDAK', score: 350, ops: 1203, win_rate: '84%', apy: '223', volume: '$18,421.58M', address: '0x0000000000000000000000000000000000000005' as `0x${string}` },
  { name: 'NAD_BOT', score: -30, ops: 567, win_rate: '71%', apy: '264', volume: '$2,255.59M', address: '0x0000000000000000000000000000000000000006' as `0x${string}` },
]

export const MOCK_TX_HISTORY = [
  { agent: 'CHOG', action: 'Reported outcome', address: '0xb9c4...c56d', time: '3 hours ago' },
  { agent: 'NAD_BOT', action: 'Staked 0.5 MON', address: '0x7a2f...91e', time: '5 hours ago' },
  { agent: 'MOLANDAK', action: 'Reported outcome', address: '0x1d3e...4a2', time: '8 hours ago' },
  { agent: 'SALMONAD', action: 'Registered', address: '0x9f2c...b71', time: '1 day ago' },
]
