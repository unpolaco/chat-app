import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require("firebase")
require("firebase/firestore")

firebase.initializeApp({
  apiKey: "AIzaSyAM7OSmUzTEdz9wvO6gJaWqX4rPilXeQAM",
    authDomain: "chatapp-4ff48.firebaseapp.com",
    databaseURL: "https://chatapp-4ff48.firebaseio.com",
    projectId: "chatapp-4ff48",
    storageBucket: "chatapp-4ff48.appspot.com",
    messagingSenderId: "755440019702",
    appId: "1:755440019702:web:3a93b71f595c79415564d7"

})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
