import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
const firebase = require('firebase');

export default function Login() {
  const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState(null)
	let history = useHistory();

	function handleSubmit(e) {
		e.preventDefault();
		firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
			.then(() => {
				history.push('/dashboard');
				}, err => {
					setLoginError('Server error');
					console.log(err);
					});
	}

	function handleTypingEmail(e) {
		setEmail(e.target.value);
	}
	function handleTypingPassword(e) {
		setPassword(e.target.value);
	}
	return (
		<div>
			<h3>Log in to the Chat</h3>
			<form onSubmit={handleSubmit}>
			<form>
				<label htmlFor='email'>Enter your e-mail</label>
				<input
          autoFocus
					autoComplete='email'
					onChange={(e) => handleTypingEmail(e)}
					value={email}
					id='email'
					type='text'
				/>
			</form>
			<form>
				<label htmlFor='password'>Enter your password</label>
				<input
				autoComplete='password'
					onChange={(e) => handleTypingPassword(e)}
					value={password}
					id='password'
					type='password'
				/>
			</form>
			<button onClick={handleSubmit}>Submit</button>
			</form>
			<div>
			Don't Have An Account?
				<Link rel='stylesheet' to='/signup'>
					Sign up
				</Link>
			</div>
		</div>
	);
}
