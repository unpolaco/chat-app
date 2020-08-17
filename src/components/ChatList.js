import React from 'react';

export default function ChatList(props) {
  const { chats, userEmail } = props;
	const newChat = () => {
    props.newChat();
	};
  const selectChat = (index) => {
    props.selectChat(index)
  }
	return (
		<div>
			<p>Hello from Chatlist!</p>
			<button onClick={newChat}>New chat</button>
			<ul>
        {chats.length > 0 ? 
          chats.map((chat, index) => {
            return (
              <li key={index} onClick={() => {selectChat(index)}}>
                <p>
                  {chat.users.filter( user => user !== userEmail)[0]}
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
