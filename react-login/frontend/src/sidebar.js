import React, { useState } from 'react';
import './sidebar.css';
import './images/duck_icon.png'
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false); // State to manage login status

  const handleMenuItemClick1 = () => {
    navigate('/aboutUs');
    toggle();
  };

  const handleMenuItemClick3 = () => {
    if (loggedIn) {
      // If logged in, set to logout and perform logout actions
      setLoggedIn(false);
      navigate('/');
    } else {
      // If not logged in, perform login actions
      navigate('/login');
    }
    toggle();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li onClick={handleMenuItemClick1}>About Us</li>
        <li><a href="https://donate.ducks.org/yearend/ye2023/donateonlinesecure.aspx?promokey=yearend23&id=13906&_ga=2.105476736.269927928.1712091537-2041326361.1712091536&_gl=1*5vwfw0*_ga*MjA0MTMyNjM2MS4xNzEyMDkxNTM2*_ga_2X0ECQZQ09*MTcxMjEwMDE0OS4zLjEuMTcxMjEwMDE1MS41OC4wLjA.">Donate</a></li>
        <li onClick={handleMenuItemClick3}>{loggedIn ? 'Log in' : 'Log out'}</li>
      </ul>
    </div>
  );
};

export default Sidebar;
