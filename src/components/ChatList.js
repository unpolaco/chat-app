import React from 'react';
import {
	Card,
	CardHeader,
	Box,
	Avatar,
	Paper,
	Divider,
	Button,
	Typography,
	withStyles,
} from '@material-ui/core';
import styles from './ChatList_styles';

function ChatList(props) {
	const { chats, userEmail, classes } = props;

	const newChat = () => {
		props.newChat();
	};
	const selectChat = (index) => {
		props.selectChat(index);
	};

	return (
		<main className={classes.chatListContainer}>
			<Typography> Your inbox </Typography>
			<Paper>
				{chats.length > 0
					? chats.map((chat, index) => {
							return (
								<>
									<Card
										onClick={() => {
											selectChat(index);
										}}
									>
										<CardHeader
											avatar={
												<Avatar>
													{chat.users
														.filter((user) => user !== userEmail)[0]
														.slice(0, 2)
														.toUpperCase()}
												</Avatar>
											}
											title={chat.users.filter((user) => user !== userEmail)[0]}
											subheader={chat.messages[
												chat.messages.length - 1
											].message.substring(0, 30)}
										/>
									</Card>
									<Divider />
								</>
							);
					  })
					: null}
			</Paper>
			<Divider />
			<Button
				fullWidth
				variant='contained'
				color='primary'
				className={classes.newChatBtn}
				onClick={newChat}
			>
				New chat
			</Button>
		</main>
	);
}

export default withStyles(styles)(ChatList);
