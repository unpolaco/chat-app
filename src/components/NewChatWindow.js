import React, {useState} from 'react';
const firebase = require('firebase');

export default function NewChatWindow(props) {

  const [newUser, setNewUser] = useState(null)
  const [newMessage, setNewMessage] = useState(null)

  const handleNewMessage = e => {
    setNewMessage(e.target.value)
  }
  const handleNewUser = e => {
    setNewUser(e.target.value)
  }

  async function chatExists() {
    const docKey = buildDocKey();
    const chat = await 
      firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .get();
    console.log(chat.exists);
    return chat.exists;
  }
  
  const userExists = async () => {
    const usersSnapshot = await 
    firebase
      .firestore()
      .collection('users')
      .get();
    const exists = usersSnapshot
      .docs
        .map(doc => doc.data().email)
        .includes(newUser);
    return exists;
  }

  const submitNewChat = async (e) => {
    e.preventDefault();
      const isUser = await userExists();
    if(isUser) {
      const isChat = await chatExists();
      isChat ? goToChat() : createChat();
    }
  }

  const createChat = () => {
    props.newChatSubmit({
      sendTo: newUser,
      message: newMessage
    });
  }
  const buildDocKey = () => [firebase.auth().currentUser.email, newUser].sort().join(':');
  const goToChat = () => props.goToChat(buildDocKey(), newMessage);
  

	return (
		<div>
			<form onSubmit={(e) => submitNewChat(e)}>
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


