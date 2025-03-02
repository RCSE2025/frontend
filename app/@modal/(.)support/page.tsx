'use client'

import { PageModal } from '@/components/shared/modal'
import { useEffect, useRef, useState } from 'react'

export default function Support() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket('wss://ticket-system.ryazan-market.ru/api/v1/tickets/ws')

    ws.current.onmessage = (msg) => {
      setMessages((prev) => [...prev, msg.data as string])
    }

    return () => ws.current?.close()
  }, [])

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, message])
      ws.current?.send(message)
      setMessage('')
    }
  }

  return (
    <PageModal>
      <div className="w-[400px]">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Чат поддержки</h2>
        </div>

        <div className="h-64 overflow-y-auto p-2">
          {messages.map((msg, i) => (
            <>
              <span key={i} className="bg-gray-100 rounded" style={{ whiteSpace: 'pre-line' }}>
                {msg}
              </span>
              <br />
              <br />
            </>
          ))}
        </div>

        <div className="flex mt-2">
          <input
            type="text"
            className="flex-1 border p-2 rounded-l"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="bg-blue-500 text-white px-4 rounded-r" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>
    </PageModal>
  )
}
