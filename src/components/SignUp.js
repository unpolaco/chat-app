import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
const firebase = require('firebase');

export default function SignUp() {
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
		<div>
			<h3>Sign Up!</h3>
			<form onSubmit={handleSubmit}>
				<form>
					<label htmlFor='userName'>Enter your user name</label>
					<input
						autoFocus
						autoComplete='userName'
						onChange={(e) => handleTypingName(e)}
						value={userName}
						id='userName'
						type='text'
					/>
				</form>
				<form>
					<label htmlFor='email'>Enter your e-mail</label>
					<input
						autoComplete='email'
						onChange={(e) => handleTypingEmail(e)}
						value={email}
						id='email'
						type='text'
					/>
				</form>
				<form>
					<label htmlFor='password'>Create your password</label>
					<input
						autoComplete='password'
						onChange={(e) => handleTypingPassword(e)}
						value={password}
						id='password'
						type='password'
					/>
				</form>
				<form>
					<label htmlFor='passwordConfirm'>Confirm your password</label>
					<input
						autoComplete='password-confirm'
						onChange={(e) => handleTypingPasswordConfirm(e)}
						value={passwordConfirm}
						id='passwordConfirm'
						type='password'
					/>
				</form>
				<button onClick={handleSubmit}>Submit</button>
			</form>
			<div>
				Have an account already?
				<Link rel='stylesheet' to='/login'>
					Log in
				</Link>
			</div>
		</div>
	);
}
