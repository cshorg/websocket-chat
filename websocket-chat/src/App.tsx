import Input from "./components/Input"
import Chat from "./components/Chat"

function App() {
  return (
    <main className="h-dvh w-full bg-zinc-950 flex items-center justify-center">
      <section>
        <Chat />
        <Input />
      </section>
    </main>
  )
}

export default App
