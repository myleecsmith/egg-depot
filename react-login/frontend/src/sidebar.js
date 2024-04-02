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
        <li>Menu Item 2</li>
        <li onClick={handleMenuItemClick3}>{loggedIn ? 'Log in' : 'Log out'}</li>
      </ul>
    </div>
  );
};

export default Sidebar;
