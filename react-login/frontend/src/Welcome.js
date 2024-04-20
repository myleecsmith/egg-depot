import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar1'; // Assuming Sidebar component is in the same directory
import './App.css'; // Assuming you have a CSS file for styling
import sound from './WelcomeSounds.wav';
import sidebarButtonImage from './images/sidebar_button.png'; // Importing the sidebar button image
import soundOn from './images/sound_on2.png';
import soundOff from './images/sound_off2.png';
import speechbubble from './images/bubble.png';

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
      <div className='audioContainer'>
      <li onClick={toggleAudio}>
        {isAudioPlaying ? <img src={soundOn} height={35}/> : <img src={soundOff} height={35}/>}
      </li>
      </div>
          <div className="Flag1">
            <img src={require('./images/flag.gif')} alt="ducky" height={200} />
          </div>
          <div className="Duck_Sprite">
            <img src={require('./images/duck_sprite1.gif')} alt="ducky" height={200} />
          </div>
          <div className="Duck_Sprite2">
            <img src={require('./images/duck_sprite2.gif')} alt="ducky2" height={225} />
          </div>
          <div className="speechbubble">
            <img src={speechbubble} alt="bubble" height={125} />
          </div>
          <div className="speechwording">
            <div>Hey, check out the donate <br/>
            button in the sidebar!</div>
          </div>
          <div className="speechbubble1">
            <img src={speechbubble} alt="bubble" height={175} width={240} />
          </div>
          <div className="speechwording1">
            <div>Welcome to the island! <br/>
            Play our game to learn <br/>
             more about ducks</div>
          </div>
          <div className={'titleContainer'}>
            <div className={'buttonContainer'}>
              {/* Buttons */}
              <input
                className={'inputButton'}
                type="button"
                onClick={onButtonClick}
                value={'Play Trivia Surf!'}
              />
            </div>
          </div>
          {/* Image button to toggle sidebar */}
      <div className="Sidebarbtn1">
      <img src={sidebarButtonImage} height={100} alt="Sidebar" onClick={toggleSidebar}/>
      </div>
      {/* Sidebar component */}
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
