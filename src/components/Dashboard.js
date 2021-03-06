import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChatList from './ChatList';
import ChatView from './ChatView';
import InputText from './InputText';
import NewChatWindow from './NewChatWindow';
const firebase = require('firebase');

export default function Dashboard() {
	const [selectedChat, setSelectedChat] = useState(null);
	const [chats, setChats] = useState([]);
	const [userEmail, setUserEmail] = useState(null);
	const [userName, setUserName] = useState(null);
	const [newChatVisible, setNewChatVisible] = useState(false);
	const [currentSecondUserEmail, setCurrentSecondUserEmail] = useState(null);
	let history = useHistory();

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (!user) {
				history.push('/login');
			} else {
				await firebase
					.firestore()
					.collection('chats')
					.where('users', 'array-contains', user.email)
					.onSnapshot(async (res) => {
						const chats = res.docs.map((doc) => doc.data());
						await setUserEmail(user.email);
						await setChats(chats);
						await setUserName(user.userName);
					});
			}
		});
	}, [history, userEmail, userName]);

	const findCurrentSecondUser = (chatIndex) => {
		const anotherUser = chats[chatIndex].users
			.filter((user) => user !== userEmail)
			.toString();
		return anotherUser;
	};

	const handleSelectChat = async (chatIndex) => {
		await setSelectedChat(chatIndex);
		await setCurrentSecondUserEmail(findCurrentSecondUser(chatIndex));
		await setNewChatVisible(false);
	};
	const handleNewChat = () => {
		setNewChatVisible(true);
		setSelectedChat(null);
	};
	const handleSignOut = () => {
		firebase.auth().signOut();
	};

	const createDocKey = () => {
		return [userEmail, currentSecondUserEmail].sort().join(':');
	};
	const handleSendMsg = (msgToSend) => {
		const docKey = createDocKey();
		firebase
			.firestore()
			.collection('chats')
			.doc(docKey)
			.update({
				messages: firebase.firestore.FieldValue.arrayUnion({
					sender: userEmail,
					message: msgToSend,
					timestamp: Date.now(),
				}),
			});
	};

  const handleNewChatSubmit = async (chatObj) => {
    const docKey = createDocKey(chatObj.sendTo);
    await 
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .set({
          messages: [{
            message: chatObj.message,
            sender: userEmail
          }],
          users: [userEmail, chatObj.sendTo],
          receiverHasRead: false
        })
				setNewChatVisible(false);
				handleSelectChat(chats.length - 1);
  }

	const goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(':');
    const chat = chats.find(chat => usersInChat.every(user => chat.users.includes(user)));
    setNewChatVisible(false);
    await handleSelectChat(chats.indexOf(chat));
    handleNewChatSubmit(msg);
  }

	return (
		<div>
			<h2>{userEmail} Dashboard</h2>
			<ChatList
				history={history}
				newChat={handleNewChat}
				selectChat={handleSelectChat}
				chats={chats}
				userEmail={userEmail}
				userName={userName}
				selectedChat={selectedChat}
			/>
			<button onClick={handleSignOut}>Sign out</button>
			{ selectedChat !== null ? (
				<>
					<ChatView
						user={userEmail}
						chat={chats[selectedChat]}
						selectedChat={selectedChat}
					/>
					<InputText onHandleSendMsg={handleSendMsg} />
				</>
			) : null}
			{ newChatVisible ? 
        <NewChatWindow newChatSubmit={handleNewChatSubmit} goToChat={goToChat}/> : 
        null
      }
		</div>
	);
}
