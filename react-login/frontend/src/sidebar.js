// Sidebar.jsx

import React from 'react';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import closeIcon from './images/close_icon.png'; // image button to close the sidebar

// this is our sidebar, where the user can navigate to other areas of the website
const Sidebar = ({ isOpen, toggle, toggleAudio, isAudioPlaying, clearTimer }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);

  // navigates to the About Us Page
  const navAbout = () => {
    clearTimer();
    navigate('/aboutUs');
    toggle();
  };

  // navigates to the Login page
  const navLogin = () => {
    clearTimer();
    if (loggedIn) {
      setLoggedIn(false);
      navigate('/');
    } else {
      navigate('/login');
    }
    toggle();
  };

  // navigates to the Home page
  const navHome = () => {
    clearTimer();
    navigate('/Welcome');
    toggle();
  };

  // toggles the sidebar
  const handleCloseSidebar = () => {
    toggle();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* When the sidebar is open, this is the displayed content inside */}
      {/* Various buttons to navigate to other pages within the app */}
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
          onClick={navHome}
          value={'Home'}
      />
      {/* This will take the user to the Ducks Unlimited donation page */}
        <li><a href="https://donate.ducks.org/yearend/ye2023/donateonlinesecure.aspx?promokey=yearend23&id=13906&_ga=2.105476736.269927928.1712091537-2041326361.1712091536&_gl=1*5vwfw0*_ga*MjA0MTMyNjM2MS4xNzEyMDkxNTM2*_ga_2X0ECQZQ09*MTcxMjEwMDE0OS4zLjEuMTcxMjEwMDE1MS41OC4wLjA." 
        target="_blank" className={'link'}>
          Donate</a></li>
      <input
          className={'inputButton'}
          type="sidebarButton"
          onClick={navAbout}
          value={'About Us'}
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
