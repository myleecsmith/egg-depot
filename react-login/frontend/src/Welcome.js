import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar'; // Assuming Sidebar component is in the same directory
import Button from './button'; // Assuming Button component is in the same directory
import './App.css'; // Assuming you have a CSS file for styling

const Welcome = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const onButtonClick = () => {
    navigate('/');
  };

  return (
    <div className="welcome-page">
      <Button onClick={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
      <div className="home-bg">
        <div className="mainContainer">
          <div className={'titleContainer'}>
            <div className={'buttonContainer'}>
              <input
                className={'inputButton'}
                type="island1"
                onClick={onButtonClick}
                value={loggedIn ? 'Island 1' : 'Log in'}
              />
              <input
                className={'inputButton'}
                type="button"
                onClick={onButtonClick}
                value={loggedIn ? 'Log out' : 'Log in'}
              />
              <img src='./images/duck.jpeg' alt='ducky'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
