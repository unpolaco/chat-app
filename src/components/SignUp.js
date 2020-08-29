import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
	Paper,
	Button,
	FormControl,
	Input,
	InputLabel,
	Typography,
	withStyles,
} from '@material-ui/core';
import styles from './Login_styles';

const firebase = require('firebase');

function SignUp({ classes }) {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [signUpError, setSignUpError] = useState('');
	let history = useHistory();

	function handleSubmit(e) {
		e.preventDefault();
		if (password !== passwordConfirm) {
			alert('Wrong password confirmation!');
			setPassword('');
			setPasswordConfirm('');
		}
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(
				(authRes) => {
					const userObj = {
						email: authRes.user.email,
						userName: userName,
					};
					firebase
						.firestore()
						.collection('users')
						.doc(email)
						.set(userObj)
						.then(
							() => {
								history.push('./dashboard');
							},
							(dbError) => {
								console.log(dbError);
								setSignUpError('Failed to add user');
							}
						);
				},
				(authErr) => {
					console.log(authErr);
					setSignUpError('Failed to add user');
				}
			);
	}

	function handleTypingName(e) {
		setUserName(e.target.value);
	}
	function handleTypingEmail(e) {
		setEmail(e.target.value);
	}
	function handleTypingPassword(e) {
		setPassword(e.target.value);
	}
	function handleTypingPasswordConfirm(e) {
		setPasswordConfirm(e.target.value);
	}

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Sign Up!
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<FormControl required fullWidth margin='normal'>
						<InputLabel htmlFor='userName'>Enter your user name</InputLabel>
						<Input
							autoFocus
							autoComplete='userName'
							onChange={(e) => handleTypingName(e)}
							value={userName}
							id='userName'
							type='text'
						/>
					</FormControl>
					<FormControl required fullWidth margin='normal'>
						<InputLabel htmlFor='email'>Enter your e-mail</InputLabel>
						<Input
							autoComplete='email'
							onChange={(e) => handleTypingEmail(e)}
							value={email}
							id='email'
							type='text'
						/>
					</FormControl>
					<FormControl required fullWidth margin='normal'>
						<InputLabel htmlFor='password'>Create your password</InputLabel>
						<Input
							autoComplete='password'
							onChange={(e) => handleTypingPassword(e)}
							value={password}
							id='password'
							type='password'
						/>
					</FormControl>
					<FormControl required fullWidth margin='normal'>
						<InputLabel htmlFor='passwordConfirm'>
							Confirm your password
						</InputLabel>
						<Input
							autoComplete='password-confirm'
							onChange={(e) => handleTypingPasswordConfirm(e)}
							value={passwordConfirm}
							id='passwordConfirm'
							type='password'
						/>
					</FormControl>
					<Button 
						fullWidth 
						variant='contained' 
						color='primary' 
						className={classes.submitBtn} 
						type='submit'
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</form>
				<Typography component='h4'>Have an account already?</Typography>
				<Link 
					className={classes.link} 
					rel='stylesheet' 
					to='/login'>
					Log in
				</Link>
			</Paper>
		</main>
	);
}
export default withStyles(styles)(SignUp);
