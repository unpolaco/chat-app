import React from 'react';

export default function ChatList(props) {
	const newChat = () => {
		console.log('new chat clicked');
	};
  const selectChat = (index) => {
    console.log('selected chat index is', index);
  }
	return (
		<div>
			<p>Hello from Chatlist!</p>
			<button onClick={newChat}>New chat</button>
			<ul>
        {props.chats.length > 0 ? 
          props.chats.map((chat, index) => {
            return (
              <li key={index} onClick={() => {selectChat(index)}}>
                <p>
                  {chat.users.filter( user => user !== props.userEmail)[0]}
                </p>
                <p>
                  {chat.messages[chat.messages.length - 1].message.substring(0,30)}
                </p>
              </li>
            )
          }) :
          null
        }
			</ul>
		</div>
	);
}
