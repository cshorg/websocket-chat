interface InputProps {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  sendMessage: () => void
}

const Input: React.FC<InputProps> = ({ input, setInput, sendMessage }) => {
  return (
    <div className="flex items-center gap-2 w-full mt-2">
      <input
        type="text"
        className="w-full px-3 py-2 text-sm text-zinc-900 border-[1px] border-zinc-700 rounded-md"
        name="message"
        id="message"
        placeholder="message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="px-3 py-2 text-sm text-white border-[1px] border-zinc-700 rounded-md hover:bg-zinc-700 transition eas duration-100"
      >
        Send
      </button>
    </div>
  )
}

export default Input
