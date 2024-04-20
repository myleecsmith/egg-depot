// Sidebar.jsx

import React from 'react';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import closeIcon from './images/close_icon.png';


const Sidebar = ({ isOpen, toggle, toggleAudio, isAudioPlaying }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navAbout = () => {
    navigate('/aboutUs');
    toggle();
  };

  const navLogin = () => {
    if (loggedIn) {
      setLoggedIn(false);
      navigate('/');
    } else {
      navigate('/login');
    }
    toggle();
  };

  const navHome = () => {
    navigate('/Welcome');
    toggle();
  };

  const handleCloseSidebar = () => {
    toggle();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <br></br>
      <div className={'closeContainer'}>
      <input 
        type="image" 
        src={closeIcon} 
        onClick={handleCloseSidebar}
      />
      </div>
      <ul>
      <input
          className={'inputButton'}
          type="sidebarButton"
          onClick={navAbout}
          value={'About Us'}
      />
        <li><a href="https://donate.ducks.org/yearend/ye2023/donateonlinesecure.aspx?promokey=yearend23&id=13906&_ga=2.105476736.269927928.1712091537-2041326361.1712091536&_gl=1*5vwfw0*_ga*MjA0MTMyNjM2MS4xNzEyMDkxNTM2*_ga_2X0ECQZQ09*MTcxMjEwMDE0OS4zLjEuMTcxMjEwMDE1MS41OC4wLjA." 
        target="_blank" className={'link'}>
          Donate</a></li>
      <input
          className={'inputButton'}
          type="sidebarButton"
          onClick={navHome}
          value={'Home'}
      />
      <input
          className={'inputButton'}
          type="sidebarButton"
          onClick={navLogin}
          value={'Log Out'}
      />
      </ul>
    </div>
  );
};

export default Sidebar;
