import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    navigate('/')
  }

  return (
    <div className="home-bg">
    <div className="mainContainer">
      <div className={'titleContainer'}>
      <div className={'buttonContainer'}>
        <input
        className={'inputButton'}
        type="island1"
        onClick={onButtonClick}
        value={loggedIn ? 'Island 1' : 'Log in'}>
        
        </input>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
      </div>
      </div>
      </div>
    </div>
  )
}

export default Welcome