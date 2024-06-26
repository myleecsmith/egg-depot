import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cattail from './images/cattails.png';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  // Call the server API to check if the given email ID already exists
  const checkAccountExists = (callback) => {
    fetch('http://localhost:3080/check-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((r) => {
        callback(r?.userExists)
      })
  }

  // Log in a user using email and password
  const logIn = () => {
    fetch('http://localhost:3080/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ('success' === r.message) {
          localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
          props.setLoggedIn(true)
          props.setEmail(email)
          navigate('/Welcome')
        } else {
          window.alert('Wrong email or password')
        }
      })
  }

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    // Check if email has an account associated with it
    checkAccountExists((accountExists) => {
      // If yes, log in
      if (accountExists) logIn()
      // Else, ask user if they want to create a new account and if yes, then log in
      else if (
        window.confirm(
          'An account does not exist with this email address: ' + email + '. Do you want to create a new account?',
        )
      ) {
        logIn()
      }
    })
  }

  return (
    <div className={'mainContainer'}>
      <div id="loginbg">
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <div className="cattails">
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
            <img src={cattail} alt="plant" height={125} />
      </div>
      <div className={'duck1'}>
      <img src={require('./images/duck1.gif')} alt="duck1" height={200} />
      </div>
      <div className={'baby_duck'}>
      <img src={require('./images/baby_duck.gif')} alt="b_duck1" height={160} />
      </div>
      <div className={'baby_duck1'}>
      <img src={require('./images/baby_duck.gif')} alt="b_duck1" height={160} />
      </div>
      <div className={'baby_duck2'}>
      <img src={require('./images/baby_duck.gif')} alt="b_duck1" height={160} />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log In'} />
      </div>
    </div>
    </div>
  )
}

export default Login
