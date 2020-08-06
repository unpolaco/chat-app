import React, { useState } from 'react';

export default function SignUp() {

  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  function handleSubmit(e) {
      e.preventDefault();
      if(password !== passwordConfirm) {
        alert("Wrong password confirmation!")
        setPassword('')
        setPasswordConfirm('')
      }
  }

  function handleTypingNick(e) {
    setNickName(e.target.value)
  }
  function handleTypingEmail(e) {
    setEmail(e.target.value)
  }
  function handleTypingPassword(e) {
    setPassword(e.target.value)
  }
  function handleTypingPasswordConfirm(e) {
    setPasswordConfirm(e.target.value)
  }

	return (
		<div>
			<h3>Sign Up!</h3>
			<form>
				<label htmlFor='nickName'>Enter your nick name</label>
				<input 
          autoFocus 
          autoComplete         
          onChange={(e) => handleTypingNick(e)} 
          value={nickName} 
          id='nickName' 
          type='text' 
        />
			</form>
			<form>
				<label htmlFor='email'>Enter your e-mail</label>
				<input 
          autoComplete
          onChange={(e) => handleTypingEmail(e)} 
          value={email} 
          id='email' 
          type='text' 
        />
			</form>
			<form>
				<label htmlFor='password'>Create your password</label>
				<input
          autoComplete 
          onChange={(e) => handleTypingPassword(e)} 
          value={password} 
          id='password' 
          type='password' 
        />
			</form>
			<form>
				<label htmlFor='passwordConfirm'>Confirm your password</label>
				<input
          autoComplete 
          onChange={(e) => handleTypingPasswordConfirm(e)} 
          value={passwordConfirm} 
          id='passwordConfirm' 
          type='password' 
        />
			</form>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}
