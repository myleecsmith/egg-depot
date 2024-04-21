import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar1'; // Assuming Sidebar component is in the same directory
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
        <div className='teamMemberContainer'>
          <div id="aboutbg">
          <h1>Mylee Smith</h1>
            <p>Year: Junior</p>
            <p>Major: Computer Engineering</p>
            <p>Project Role: Visuals/Frontend</p>
            <p>I like sailing, horses, and surfing.</p>
          </div>
        </div>
        <div className='teamMemberContainer'>
          <div id="aboutbg">
          <h1>Ramses Ziane-Cherif</h1>
            <p>Year: Junior</p>
            <p>Major: Computer Engineering</p>
            <p>Project Role: Backend</p>
            <p></p>
            <div className='Ramses_Duck'>
            <img src={require('./images/ramses_duck.gif')} alt="duck2" height={200} />
            </div>
          </div>
        </div>
        <div className='teamMemberContainer'>
          <div id="aboutbg">
          <h1>Victoria Pineda</h1>
            <p>Year: Sophomore</p>
            <p>Major: Computer Science</p>
            <p>Project Role: Research/Frontend</p>
            <p></p>
            <div className='Tori_Duck'>
            <img src={require('./images/tori_duck.gif')} alt="duck3" height={200} />
            </div>
          </div>
        </div>
        <div className='teamMemberContainer'>
          <div id="aboutbg">
          <h1>Devin Dubois</h1>
            <p>Year: Junior</p>
            <p>Major: Computer Science</p>
            <p>Project Role: Databases/Backend</p>
            <p></p>
            <div className='Devin_Duck'>
            <img src={require('./images/devin_duck.gif')} alt="duck4" height={200} />
            </div>
          </div>
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

