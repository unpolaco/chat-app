import React, {useState} from 'react'
import ChatList from './ChatList'
import { useHistory } from "react-router-dom";
const firebase = require('firebase');


export default function Dashboard() {

const [selectedChat, setSelectedChat] = useState(null)
const [chats, setChats] = useState([])
const [userEmail, setUserEmail] = useState(null)
const [userName, setUserName] = useState(null)
const [newChatVisible, setNewChatVisible] = useState(false)
let history = useHistory();


const selectChat = (chatIndex) => {
  console.log("Selected chat", chatIndex);
}
const newChatBtn = () => setNewChatVisible(true)

  return (
    <div>
      <p>{userName} Dashboard</p>
      <ChatList
        history={history}
        newChatBtn={newChatBtn}
        selectChat={selectChat}
        chats={chats}
        userEmail={userEmail}
        userName={userName}
        selectedChat={selectedChat}
      />
    </div>
  )
};
