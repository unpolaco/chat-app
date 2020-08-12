import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import ChatList from './ChatList'
import ChatView from './ChatView'
const firebase = require('firebase');


export default function Dashboard() {
const [selectedChat, setSelectedChat] = useState(null)
const [chats, setChats] = useState([])
const [userEmail, setUserEmail] = useState(null)
const [userName, setUserName] = useState(null)
const [newChatVisible, setNewChatVisible] = useState(false)
let history = useHistory();

useEffect(() => {
  firebase.auth().onAuthStateChanged(async user => {
    if(!user) {
      history.push('/login')
    } else {
      await firebase
      .firestore()
      .collection('chats')
      .where('users', 'array-contains', user.email)
      .onSnapshot(
        async res => {
        const chats = res.docs.map(doc => doc.data());
        await setUserEmail(user.email)
        await setChats(chats)
        await setUserName(user.userName)
      })
    }
  })
}, [history, userEmail, userName])

const handleSelectChat = (chatIndex) => {
  setSelectedChat(chatIndex)
}
const handleNewChat = () => {
  setNewChatVisible(true)
  setSelectedChat(null)
}
const handleSignOut = () => {
  firebase.auth().signOut()
}
  return (
    <div>
      <h2>{userEmail} Dashboard</h2>
      <ChatList
        history={history}
        newChatBtn={handleNewChat}
        selectChat={handleSelectChat}
        chats={chats}
        userEmail={userEmail}
        userName={userName}
        selectedChat={selectedChat}
      />
    <button onClick={handleSignOut}>Sign out</button>
    <ChatView 
      user={userEmail}
      chat={chats[selectedChat]}
      selectedChat={selectedChat}
    />
    </div>
  )
};
