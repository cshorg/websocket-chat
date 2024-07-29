export default function Input() {
  return (
    <div className="flex items-center">
      <input type="text" name="message" id="message" placeholder="message" />
      <button>send</button>
    </div>
  )
}
