export default function Message({ message }: any) {
  return (
    <div className="w-full bg-blue-500 rounded-md p-2 text-sm" key={message}>
      {message}
    </div>
  )
}
