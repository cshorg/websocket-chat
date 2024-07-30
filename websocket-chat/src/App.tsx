import React, { useState, useEffect, useCallback } from "react"
import Input from "./components/Input"
import Chat from "./components/Chat"

const App: React.FC = () => {
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket("ws://localhost:8080/echo")

    ws.onopen = () => {
      setMessages((prev) => [...prev, "Status: Connected"])
    }

    ws.onmessage = (e) => {
      setMessages((prev) => [...prev, `Server: ${e.data}`])
    }

    ws.onclose = () => {
      setMessages((prev) => [...prev, "Status: Disconnected"])
      setTimeout(connectWebSocket, 5000)
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      ws.close()
    }

    setSocket(ws)
  }, [])

  useEffect(() => {
    connectWebSocket()
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [connectWebSocket])

  const send = useCallback(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input)
      setInput("")
    } else {
      setMessages((prev) => [...prev, "Error: WebSocket is not connected"])
    }
  }, [socket, input])

  return (
    <main className="flex items-center justify-center w-full h-dvh bg-zinc-950">
      <section className="w-[300px]">
        <Chat messages={messages} />
        <Input input={input} setInput={setInput} sendMessage={send} />
      </section>
    </main>
  )
}

export default App
