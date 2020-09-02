import React, { useState } from 'react';
import {
	Button,
	Paper,
	Input,
	InputLabel,
	FormControl,
	withStyles,
} from '@material-ui/core';
import styles from './NewChatWindow_styles';

const firebase = require('firebase');

function NewChatWindow(props) {
	const [newUser, setNewUser] = useState(null);
	const [newMessage, setNewMessage] = useState(null);
	const { classes } = props;

	const handleNewMessage = (e) => {
		setNewMessage(e.target.value);
	};
	const handleNewUser = (e) => {
		setNewUser(e.target.value);
	};

	async function chatExists() {
		const docKey = buildDocKey();
		const chat = await firebase
			.firestore()
			.collection('chats')
			.doc(docKey)
			.get();
		console.log(chat.exists);
		return chat.exists;
	}

	const userExists = async () => {
		const usersSnapshot = await firebase.firestore().collection('users').get();
		const exists = usersSnapshot.docs
			.map((doc) => doc.data().email)
			.includes(newUser);
		return exists;
	};

	const submitNewChat = async (e) => {
		e.preventDefault();
		const isUser = await userExists();
		if (isUser) {
			const isChat = await chatExists();
			isChat ? goToChat() : createChat();
		}
	};

	const createChat = () => {
		props.newChatSubmit({
			sendTo: newUser,
			message: newMessage,
		});
	};
	const buildDocKey = () =>
		[firebase.auth().currentUser.email, newUser].sort().join(':');
	const goToChat = () => props.goToChat(buildDocKey(), newMessage);

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<fieldSet
					className={classes.fieldSet}
					onSubmit={(e) => submitNewChat(e)}
				>
					<FormControl required fullWidth margin='normal'>
						<InputLabel htmlFor='findUser'>Insert user email</InputLabel>
						<Input
							autoFocus
							autoComplete='off'
							id='findUser'
							type='text'
							onChange={(e) => handleNewUser(e)}
							value={newUser}
						/>
					</FormControl>
					<FormControl required fullWidth margin='normal'>
						<InputLabel htmlFor='newMessage'>Write a message</InputLabel>
						<Input
							autoComplete='off'
							id='newMessage'
							type='text'
							onChange={(e) => handleNewMessage(e)}
							value={newMessage}
						/>
					</FormControl>
				</fieldSet>
				<Button variant='contained' color='primary'>
					Submit
				</Button>
			</Paper>
		</main>
	);
}

export default withStyles(styles)(NewChatWindow);
