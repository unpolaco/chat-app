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

function Login({ classes }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState(null);
	let history = useHistory();

	function handleSubmit(e) {
		e.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(
				() => {
					history.push('/dashboard');
				},
				(err) => {
					setLoginError('Server error');
					console.log(err);
				}
			);
	}

	function handleTypingEmail(e) {
		setEmail(e.target.value);
	}
	function handleTypingPassword(e) {
		setPassword(e.target.value);
	}
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					Log in to the Chat
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<FormControl required fullWidth margin='normal'>
						<InputLabel htmlFor='email'>Enter your e-mail</InputLabel>
						<Input
							autoFocus
							autoComplete='email'
							onChange={(e) => handleTypingEmail(e)}
							value={email}
							id='email'
							type='text'
						/>
					</FormControl>
					<FormControl required fullWidth margin='normal'>
						<InputLabel htmlFor='password'>Enter your password</InputLabel>
						<Input
							autoComplete='password'
							onChange={(e) => handleTypingPassword(e)}
							value={password}
							id='password'
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
				<Typography component="h4">
					Don't Have An Account?
				</Typography>
					<Link 
						className={classes.link} 
						rel='stylesheet' 
						to='/signup'
					>
						Sign up
					</Link>
			</Paper>
		</main>
	);
}
export default withStyles(styles)(Login);
