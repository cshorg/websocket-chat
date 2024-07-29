import Message from "./Message"

interface ChatProps {
  messages: string[]
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <div className="h-[400px] p-2 rounded-md w-full bg-white flex flex-col gap-2 overflow-y-auto">
      {messages.length === 0 ? (
        <Message message={"There are no messages in chat currently."} />
      ) : (
        messages.map((message: any, index: number) => (
          <Message key={index} message={message} />
        ))
      )}
    </div>
  )
}

export default Chat
