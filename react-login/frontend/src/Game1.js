import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import './App.css';
import sound from './SurfnTurf.wav';
import sidebarButtonImg from './images/sidebar_button.png';
import soundOn from './images/sound_on3.png';
import soundOff from './images/sound_off3.png';

const Game1 = (props) => {
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

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="welcome-page">
      <div className="Game1-bg">
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
              {isAudioPlaying ? <img src={soundOn} height={60}/> : <img src={soundOff} height={60}/>}
            </li>
          </div>
          {/* Sidebar button */}
          <div className="Sidebarbtn">
            <img src={sidebarButtonImg} alt="sidebar button" height={100} onClick={toggleSidebar} />
          </div>
          {/* Sidebar component */}
          <Sidebar isOpen={isOpen} toggle={toggleSidebar} toggleAudio={toggleAudio} isAudioPlaying={isAudioPlaying} />
          {/* Main content */}
          <div className="surfboard">
            <img src={require('./images/surfboard.png')} alt="surfboard" height={350} />
          </div>
          <div className="Duck_Sprite_g">
            <img src={require('./images/duck_sprite1.gif')} alt="ducky" height={300} />
          </div>
          <div className={'titleContainer'}></div>
        </div>
      </div>
    </div>
  );
};

export default Game1;
