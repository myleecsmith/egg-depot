import React from 'react'
import Duck from "./images/duck.jpg";
import { useNavigate } from 'react-router-dom'

const Welcome = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    navigate('/')
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Here's a duck</div>
        <img src={Duck} height= "400" width="600"/>
      </div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : <div />}
      </div>
    </div>
  )
}

export default Welcome