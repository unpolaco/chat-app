import React, { useState } from 'react';
import { TextField, withStyles } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import styles from './InputText_styles';

function InputText(props) {
	const [msgToSend, setMsgToSend] = useState('');
	const { classes } = props;
	const handleWritingMsg = (e) => {
		setMsgToSend(e.target.value);
	};
	const onHandleSendMsg = (e) => {
		e.preventDefault();
		props.onHandleSendMsg(msgToSend);
		setMsgToSend('');
	};

	return (
		<div className={classes.inputTextContainer}>
			<form
				onSubmit={(e) => onHandleSendMsg(e)}
			>
				<TextField
					type='text'
					className={classes.inputText}
					onChange={(e) => handleWritingMsg(e)}
					placeholder='Write your message'
					value={msgToSend}
				/>
				<Send
					className={classes.sendBtn}
					onClick={(e) => onHandleSendMsg(e)}
				></Send>
			</form>
		</div>
	);
}
export default withStyles(styles)(InputText);
