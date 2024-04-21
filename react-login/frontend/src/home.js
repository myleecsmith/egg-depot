import React from 'react'
import { useNavigate } from 'react-router-dom'
import cattail from './images/cattails.png';

const Home = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    navigate('/login')
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div id="titlebg">
        <div>Eggsplore Oasis: A Nestacular Adventure!</div>
        </div>
      </div>
      <div>hosted by: the eggxtra eggcellent eggregation</div>
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
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value='Play!'
        />
      </div>
    </div>
  )
}

export default Home