import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar1'; // Assuming Sidebar component is in the same directory
import './App.css'; // Assuming you have a CSS file for styling
import sidebarButtonImage from './images/sidebar_button.png'; // Importing the sidebar button image

// this file manages our About Us page, which includes information about our team
const AboutUs = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  
  // toggles the sidebar, starting with it closed
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // displays each team member information, and a duck gif for each of us
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
          </div>
        </div>
        <div className='teamMemberContainer'>
          <div id="aboutbg">
          <h1>Ramses Ziane-Cherif</h1>
            <p>Year: Junior</p>
            <p>Major: Computer Engineering</p>
            <p>Project Role: Backend</p>
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
            <div className='Devin_Duck'>
            <img src={require('./images/devin_duck.gif')} alt="duck4" height={200} />
            </div>
          </div>
        </div>
      </div>
      {/* Displays an image button of three lines that is used to toggle the sidebar */}
        <div className="Sidebarbtn1">
      <img src={sidebarButtonImage} height={100} alt="Sidebar" onClick={toggleSidebar}/>
      </div>
      {/* Sidebar component */}
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
    </div>
    
  )
}

export default AboutUs

