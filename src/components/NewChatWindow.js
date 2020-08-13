import React, {useState} from 'react';

export default function NewChatWindow() {

  const [newUser, setNewUser] = useState(null)
  const [newMessage, setNewMessage] = useState(null)

  const handleNewMessage = e => {
    setNewMessage(e.target.value)
  }
  const handleNewUser = e => {
    setNewUser(e.target.value)
  }

	return (
		<div>
			<form>
				<fieldSet>
        <div>
					<label htmlFor='findUser'>Insert user email</label>
					<input 
            autoFocus 
            required 
            id='findUser' 
            type='text' 
            onChange={e => handleNewUser(e)} 
            value={newUser}
          />
        </div>
        <div>
					<label htmlFor='newMessage'>Write a message</label>
					<input 
            required 
            id='newMessage' 
            type='text' 
            onChange={e => handleNewMessage(e)} 
            value={newMessage}
          />
        </div>
				</fieldSet>
        <button>Submit</button>
			</form>
		</div>
	);
}
