import React, {useState} from 'react'

export default function InputText() {
const [msgToSend, setMsgToSend] = useState('')

  const handleWritingMsg = (e) => {
    setMsgToSend(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("message", msgToSend, "was sent");
    setMsgToSend('')
  }
  return (
    <div>
    <form onSubmit = {e => handleSubmit(e)}>
      <input 
        type="text" 
        onChange={e => handleWritingMsg(e)}
        placeholder='Write your message'
        value={msgToSend}
      />
      <button onClick={(e) => handleSubmit(e)}>Sent</button>
    </form>
    </div>
  )
}
