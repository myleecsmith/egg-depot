import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar'; // Assuming Sidebar component is in the same directory
import './App.css'; // Assuming you have a CSS file for styling
import sound from './WelcomeSounds.wav';
import sidebarButtonImage from './images/sidebar_button.png'; // Importing the sidebar button image

const Welcome = (props) => {
  const { loggedIn } = props;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  useEffect(() => {
    const isAudioPlayingStr = localStorage.getItem('isAudioPlaying');
    const isAudioPlaying = isAudioPlayingStr === 'true';
    setIsAudioPlaying(isAudioPlaying);
  }, []);

  useEffect(() => {
    localStorage.setItem('isAudioPlaying', isAudioPlaying.toString());
  }, [isAudioPlaying]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const onButtonClick = () => {
    navigate('/');
  };

  const onButtonClick2 = () => {
    navigate('/Game1');
  };

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="welcome-page">
      {/* Main content */}
      <div className="home-bg">
        <div className="mainContainer">
           {/* Adding audio element for WelcomeSounds */}
      {isAudioPlaying && (
        <audio autoPlay loop>
          <source src={sound} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
      {/* Button to toggle audio */}
      <button onClick={toggleAudio}>
        {isAudioPlaying ? 'Pause Audio' : 'Play Audio'}
      </button>
      {/* Image button to toggle sidebar */}
      <div className="Sidebarbtn1">
      <img src={sidebarButtonImage} height={100} alt="Sidebar" onClick={toggleSidebar}/>
      </div>
      {/* Sidebar component */}
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
          <div className="Flag1">
            <img src={require('./images/flag.gif')} alt="ducky" height={200} />
          </div>
          <div className="Duck_Sprite">
            <img src={require('./images/duck_sprite1.gif')} alt="ducky" height={200} />
          </div>
          <div className={'titleContainer'}>
            <div className={'buttonContainer'}>
              {/* Buttons */}
              <input
                className={'inputButton'}
                type="button"
                onClick={onButtonClick2}
                value={'Island 1'}
              />
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
    </div>
  );
};

export default Welcome;
