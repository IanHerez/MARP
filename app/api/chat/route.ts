import { NextResponse } from 'next/server'

const GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL || 'http://3.226.236.218:18789'
const GATEWAY_PASSWORD = process.env.OPENCLAW_GATEWAY_PASSWORD || ''

export async function POST(request: Request) {
  try {
    const { message, sessionId } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!GATEWAY_PASSWORD) {
      return NextResponse.json(
        { error: 'Gateway password not configured' },
        { status: 500 }
      )
    }

    // Use the OpenClaw WebSocket-based Control UI protocol
    // The gateway exposes a WebSocket at /ws for the control UI
    // We'll use the agent run endpoint via the internal RPC
    const wsUrl = GATEWAY_URL.replace(/^http/, 'ws') + '/ws'

    // Since Next.js API routes are short-lived, we use a Promise-based
    // WebSocket approach with a timeout
    const response = await callAgent(wsUrl, message, sessionId)

    return NextResponse.json({ reply: response })
  } catch (error: unknown) {
    console.error('Chat API error:', error)

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'

    // Detect billing errors
    if (errorMessage.includes('billing') || errorMessage.includes('credits')) {
      return NextResponse.json(
        {
          error: 'billing',
          reply:
            '⚠️ El agente tiene un problema de facturación con la API key. Contacta al admin.',
        },
        { status: 402 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to get response from agent', details: errorMessage },
      { status: 500 }
    )
  }
}

async function callAgent(
  wsUrl: string,
  message: string,
  sessionId?: string
): Promise<string> {
  // Dynamic import for ws (Node.js WebSocket client)
  // Falls back to a simpler HTTP approach if ws is not available
  try {
    const WebSocket = (await import('ws')).default

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        ws.close()
        reject(new Error('Agent response timeout (60s)'))
      }, 60000)

      const ws = new WebSocket(wsUrl, {
        headers: {
          Authorization: `Bearer ${GATEWAY_PASSWORD}`,
        },
      })

      let authenticated = false
      let turnId: string | null = null
      let fullReply = ''

      ws.on('open', () => {
        // Send auth
        ws.send(
          JSON.stringify({
            type: 'auth',
            password: GATEWAY_PASSWORD,
          })
        )
      })

      ws.on('message', (data: Buffer) => {
        try {
          const msg = JSON.parse(data.toString())

          // Handle auth response
          if (msg.type === 'auth' || msg.type === 'welcome') {
            authenticated = true
            // Send message to agent
            ws.send(
              JSON.stringify({
                type: 'agent.run',
                message: message,
                sessionId: sessionId || 'web:marp:default',
              })
            )
            return
          }

          // Handle agent content/reply chunks
          if (
            msg.type === 'agent.content' ||
            msg.type === 'content' ||
            msg.type === 'text'
          ) {
            fullReply += msg.content || msg.text || ''
            return
          }

          // Handle turn complete
          if (
            msg.type === 'agent.done' ||
            msg.type === 'done' ||
            msg.type === 'turn.complete'
          ) {
            clearTimeout(timeout)
            ws.close()
            resolve(
              fullReply ||
                msg.content ||
                msg.reply ||
                'Agent completed without a text reply.'
            )
            return
          }

          // Handle errors
          if (msg.type === 'error') {
            clearTimeout(timeout)
            ws.close()
            reject(new Error(msg.message || msg.error || 'Agent error'))
            return
          }
        } catch {
          // Not JSON, ignore
        }
      })

      ws.on('error', (err: Error) => {
        clearTimeout(timeout)
        reject(new Error(`WebSocket error: ${err.message}`))
      })

      ws.on('close', () => {
        clearTimeout(timeout)
        if (fullReply) {
          resolve(fullReply)
        }
      })
    })
  } catch {
    // Fallback: if ws module is not available, try a direct HTTP approach
    // Some OpenClaw versions support an HTTP chat endpoint
    const res = await fetch(`${GATEWAY_URL.replace('/ws', '')}/api/v1/agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GATEWAY_PASSWORD}`,
      },
      body: JSON.stringify({
        message,
        sessionId: sessionId || 'web:marp:default',
      }),
      signal: AbortSignal.timeout(60000),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Gateway HTTP error ${res.status}: ${text}`)
    }

    const data = await res.json()
    return data.reply || data.content || data.message || JSON.stringify(data)
  }
}
