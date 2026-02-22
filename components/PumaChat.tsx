'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
    id: string
    role: 'user' | 'agent'
    content: string
    timestamp: Date
}

export function PumaChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'agent',
            content:
                '🐆 PumaClaw online. ¿En qué puedo ayudarte?\n\nTengo acceso a GitHub, búsqueda web, y más.',
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return

        const userMsg: Message = {
            id: `u-${Date.now()}`,
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMsg])
        setInput('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.content }),
            })

            const data = await res.json()

            const agentMsg: Message = {
                id: `a-${Date.now()}`,
                role: 'agent',
                content:
                    data.reply ||
                    data.error ||
                    '⚠️ Sin respuesta del agente. Intenta de nuevo.',
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, agentMsg])
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: `e-${Date.now()}`,
                    role: 'agent',
                    content:
                        '⚠️ Error de conexión. Verifica que el gateway esté activo.',
                    timestamp: new Date(),
                },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            {/* Floating button */}
            <button
                id="pumachat-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full
          border-2 border-marp-green bg-black/90 backdrop-blur-sm
          text-marp-green hover:bg-marp-green/10
          transition-all duration-300 flex items-center justify-center
          shadow-[0_0_20px_rgba(131,110,249,0.3)] hover:shadow-[0_0_30px_rgba(131,110,249,0.5)]
          group"
                aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat con PumaClaw'}
            >
                {isOpen ? (
                    <svg
                        className="w-6 h-6 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                        🐆
                    </span>
                )}
            </button>

            {/* Chat panel */}
            <div
                className={`fixed bottom-24 right-6 z-[9998] w-[380px] max-w-[calc(100vw-2rem)]
          transition-all duration-300 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}
        `}
            >
                <div
                    className="flex flex-col h-[520px] max-h-[70vh] rounded-lg overflow-hidden
          border border-marp-green/60 bg-black/95 backdrop-blur-md
          shadow-[0_0_40px_rgba(131,110,249,0.15)]"
                >
                    {/* Header */}
                    <div
                        className="flex items-center gap-3 px-4 py-3 border-b border-marp-green/40
            bg-gradient-to-r from-black to-marp-green/5"
                    >
                        <div className="relative">
                            <span className="text-xl">🐆</span>
                            <span
                                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 
                rounded-full bg-marp-green border border-black
                animate-pulse"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-marp-green text-xs font-bold tracking-wider">
                                PUMACLAW AGENT
                            </h3>
                            <p className="text-marp-green/50 text-[10px] tracking-widest">
                                OPENCLAW // MARP NETWORK
                            </p>
                        </div>
                        <div className="text-marp-green/30 text-[10px] font-mono">v0.1</div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-md px-3 py-2 text-xs leading-relaxed
                    ${msg.role === 'user'
                                            ? 'bg-marp-green/15 text-marp-green border border-marp-green/30'
                                            : 'bg-white/5 text-marp-green/80 border border-white/10'
                                        }
                  `}
                                >
                                    {msg.role === 'agent' && (
                                        <span className="text-marp-green/40 text-[10px] block mb-1">
                                            {'>'} PUMA://
                                        </span>
                                    )}
                                    <pre className="whitespace-pre-wrap font-mono break-words">
                                        {msg.content}
                                    </pre>
                                    <span className="text-[9px] text-marp-green/30 block text-right mt-1">
                                        {msg.timestamp.toLocaleTimeString('es-MX', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 rounded-md px-3 py-2">
                                    <span className="text-marp-green/40 text-[10px] block mb-1">
                                        {'>'} PUMA://
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <span
                                            className="w-1.5 h-1.5 rounded-full bg-marp-green/60 
                      animate-[pulse_1s_ease-in-out_infinite]"
                                        />
                                        <span
                                            className="w-1.5 h-1.5 rounded-full bg-marp-green/60 
                      animate-[pulse_1s_ease-in-out_0.2s_infinite]"
                                        />
                                        <span
                                            className="w-1.5 h-1.5 rounded-full bg-marp-green/60 
                      animate-[pulse_1s_ease-in-out_0.4s_infinite]"
                                        />
                                        <span className="text-marp-green/40 text-[10px] ml-2">
                                            procesando...
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-marp-green/30 p-3 bg-black/50">
                        <div className="flex items-center gap-2">
                            <span className="text-marp-green/50 text-xs">$</span>
                            <input
                                ref={inputRef}
                                id="pumachat-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Escribe tu mensaje..."
                                disabled={isLoading}
                                className="flex-1 bg-transparent text-marp-green text-xs
                  placeholder:text-marp-green/30 outline-none
                  caret-marp-green font-mono
                  disabled:opacity-50"
                            />
                            <button
                                id="pumachat-send"
                                onClick={sendMessage}
                                disabled={!input.trim() || isLoading}
                                className="text-marp-green/60 hover:text-marp-green
                  disabled:text-marp-green/20 disabled:cursor-not-allowed
                  transition-colors p-1"
                                aria-label="Enviar mensaje"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
