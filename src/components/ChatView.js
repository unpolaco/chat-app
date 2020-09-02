import React from 'react';
import { Paper, Typography, withStyles } from '@material-ui/core';
import styles from './ChatView_styles';

function ChatView({ classes, chat, user, currentSecondUserEmail }) {
	return (
		<main className={classes.chatViewContainer}>
			<div className={classes.chatHeader}>
				<Typography>Chatview with {currentSecondUserEmail}</Typography>
				<div className={classes.messagesBox}>
					<Paper className={classes.paper}>
						{chat.messages.map((msg) => {
							return (
								<Typography
									className={
										msg.sendBy === user 
										? `${classes.message} ${classes.userSent}` 
										: `${classes.message} ${classes.friendSent}`
									}
								>
									{msg.message}
								</Typography>
							);
						})}
					</Paper>
				</div>
			</div>
		</main>
	);
}
export default withStyles(styles)(ChatView);
