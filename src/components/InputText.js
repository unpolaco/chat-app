import React, {useState} from 'react'

export default function InputText(props) {
const [msgToSend, setMsgToSend] = useState('')

  const handleWritingMsg = (e) => {
    setMsgToSend(e.target.value)
  }
  const onHandleSendMsg = (e) => {
    e.preventDefault();
    props.onHandleSendMsg(msgToSend)
    setMsgToSend('')
  }

  return (
    <div>
    <form onSubmit={e => onHandleSendMsg(e)}>
      <input 
        type="text" 
        onChange={e => handleWritingMsg(e)}
        placeholder='Write your message'
        value={msgToSend}
      />
      <button onClick={e => onHandleSendMsg(e)}>Send</button>
    </form>
    </div>
  )
}
