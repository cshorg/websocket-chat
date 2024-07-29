import React, { useEffect, useRef, useState } from "react"
import Input from "./components/Input"
import Chat from "./components/Chat"

const App: React.FC = () => {
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080/echo")

    socketRef.current.onopen = () => {
      console.log("WebSocket connected")
      setMessages((prev) => [...prev, "status: connected"])
    }

    socketRef.current.onmessage = (event) => {
      console.log("Server message:", event.data)
      setMessages((prevMessages) => [...prevMessages, `Server: ${event.data}`])
    }

    socketRef.current.onerror = (error) => {
      console.error("WebSocket Error:", error)
      setMessages((prevMessages) => [...prevMessages, `Error: ${error}`])
    }

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected")
      setMessages((prevMessages) => [...prevMessages, "Status: Disconnected"])
    }

    return () => {
      socketRef.current?.close()
    }
  }, [])

  const sendMessage = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(input)
      setInput("")
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        "Error: WebSocket is not open."
      ])
    }
  }

  return (
    <main className="h-dvh w-full bg-zinc-950 flex items-center justify-center">
      <section className="w-[300px]">
        <Chat messages={messages} />
        <Input input={input} setInput={setInput} sendMessage={sendMessage} />
      </section>
    </main>
  )
}

export default App
