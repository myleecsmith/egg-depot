import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar'; // Assuming Sidebar component is in the same directory
import Button from './button'; // Assuming Button component is in the same directory
import './App.css'; // Assuming you have a CSS file for styling
import sound from './WelcomeSounds.wav';

const Welcome = (props) => {
  const { loggedIn } = props;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

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

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="welcome-page">
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
      {/* Button to toggle sidebar */}
      <Button onClick={toggleSidebar} />
      {/* Sidebar component */}
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
      {/* Main content */}
      <div className="home-bg">
        <div className="mainContainer">
          <div className="Flag1">
            <img src={require('./images/flag.gif')} alt="ducky" height={200} />
          </div>
          <div className={'titleContainer'}>
            <div className={'buttonContainer'}>
              {/* Buttons */}
              <input
                className={'inputButton'}
                type="button"
                onClick={onButtonClick}
                value={loggedIn ? 'Island 1' : 'Log in'}
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
