import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar'; // Assuming Sidebar component is in the same directory
import './App.css'; // Assuming you have a CSS file for styling
import sidebarButtonImage from './images/sidebar_button.png'; // Importing the sidebar button image

const AboutUs = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        About the Team
      </div>
      <br></br>
      <div className='aboutContainer'>
        <div id="aboutbg">
        <h1>Mylee Smith</h1>
          <p>I like sailing, horses, and surfing.</p>
        </div>
        <div id="aboutbg">
        <h1>Ramses Ziane-Cherif</h1>
          <p></p>
        </div>
        <div id="aboutbg">
        <h1>Victoria Pineda</h1>
          <p></p>
        </div>
        <div id="aboutbg">
        <h1>Devin Dubois</h1>
          <p></p>
        </div>
      </div>
        <div className="Sidebarbtn1">
      <img src={sidebarButtonImage} height={100} alt="Sidebar" onClick={toggleSidebar}/>
      </div>
      {/* Sidebar component */}
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
    </div>
    
  )
}

export default AboutUs

