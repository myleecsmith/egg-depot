import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    navigate('/login')
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Eggsplore Oasis: A Nestacular Adventure!</div>
      </div>
      <div>~hosted by the eggxtra eggcellent eggregation</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value='Log In'
        />
      </div>
    </div>
  )
}

export default Home