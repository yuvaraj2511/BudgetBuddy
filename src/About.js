import React, { useState } from 'react';
import './About.css';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import Chatbot from './Chatbot';
import logo from './img/logo.jpg';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function About() {
  const navigate=useNavigate;
  const [showChatbot, setShowChatbot] = useState(false);

  const handleChatbotToggle = () => {
    setShowChatbot(!showChatbot);
  }
  return (
    <div>
     <div className='navbar1'>
                <p></p>
               
                <Link to ='/contact'>
                <p>Contact Us</p>
                </Link >

                <Link to ='/cashbook'>
                <p>Cashbook</p>
                </Link >

                <Link to="/">
                    <p>Home</p>
                </Link>
                    <img src={logo} alt="Logo" onClick={()=>navigate("/")}></img>
            </div>
      <div className="about-content">
      <h1>About Us</h1>
      <p>At BudgetBuddy, we believe that managing your finances should be simple and accessible to everyone. That's why we created our cashbook software - a tool that makes it easy for you to track your income, expenses, and savings all in one place.</p>
      <p>Our team is passionate about helping people take control of their finances. We understand that managing money can be overwhelming, and we want to simplify the process for you.</p>
      <h2>Our Mission</h2>
      <p>Our mission is to empower people to make informed financial decisions by providing them with the tools and resources they need to manage their money effectively.</p>
      <h2>Why Choose BudgetBuddy?</h2>
      <ul>
        <li>Easy-to-use interface</li>
        <li>Automated calculations</li>
        <li>Customizable categories</li>
        <li>Detailed reports</li>
        <li>Secure storage</li>
        <li>24/7 customer support</li>
      </ul>
      <p>With BudgetBuddy, you can feel confident that your finances are in good hands. Our software is designed to help you save time and money, so you can focus on the things that matter most to you.</p>
      <p>Thank you for choosing BudgetBuddy as your financial management tool. We look forward to helping you achieve your financial goals!</p>
      </div>
      <div className="App">
      {showChatbot && <Chatbot />}
      <button className="chatbot-button" onClick={handleChatbotToggle}>
      <FontAwesomeIcon icon={faRobot} className="robot-icon" />
      </button>
    </div>
    </div>
  );
}

export default About;
