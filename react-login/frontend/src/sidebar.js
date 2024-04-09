// Sidebar.jsx

import React from 'react';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle, toggleAudio, isAudioPlaying }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleMenuItemClick1 = () => {
    navigate('/aboutUs');
    toggle();
  };

  const handleMenuItemClick3 = () => {
    if (loggedIn) {
      setLoggedIn(false);
      navigate('/');
    } else {
      navigate('/login');
    }
    toggle();
  };

  const handleMenuItemClick4 = () => {
    navigate('/Welcome');
    toggle();
  };

  const handleCloseSidebar = () => {
    toggle();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={handleCloseSidebar}>Close</button>
      <ul>
        <li onClick={handleMenuItemClick1}>About Us</li>
        <li><a href="https://donate.ducks.org/yearend/ye2023/donateonlinesecure.aspx?promokey=yearend23&id=13906&_ga=2.105476736.269927928.1712091537-2041326361.1712091536&_gl=1*5vwfw0*_ga*MjA0MTMyNjM2MS4xNzEyMDkxNTM2*_ga_2X0ECQZQ09*MTcxMjEwMDE0OS4zLjEuMTcxMjEwMDE1MS41OC4wLjA.">Donate</a></li>
        <li onClick={handleMenuItemClick4}>Home</li>
        <li onClick={toggleAudio}>{isAudioPlaying ? 'Pause Audio' : 'Play Audio'}</li>
        <li onClick={handleMenuItemClick3}>{loggedIn ? 'Log in' : 'Log out'}</li>
      </ul>
    </div>
  );
};

export default Sidebar;
