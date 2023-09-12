import React, { useState } from 'react';
import './ContactUs.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from './img/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import Chatbot from './Chatbot'; // Import your Chatbot component


function ContactUs() {
  const navigate=useNavigate;
  const [showChatbot, setShowChatbot] = useState(false);

  const handleChatbotToggle = () => {
    setShowChatbot(!showChatbot);
  };
  return (
    <>
    <div className='navbar1'>
                <p></p>

                <Link to ='/about'>
                    <p>About Us</p>
                </Link >
               
                <Link to ='/'>
                <p>Home</p>
                </Link >

                <Link to ='/cashbook'>
                <p>Cashbook</p>
                </Link >
                
                
                    <img src={logo} alt="Logo" onClick={()=>navigate("/")}></img>
            </div>
    <div className="conversation-container">
      <div className="conversation">
        <div className="message user">
          <div className="message-content">
            <p className="message-text">Hi, I have a question about Budget Buddy.</p>
            <span className="message-time">10:00 AM</span>
          </div>
        </div>
        <div className="message bot">
          <div className="message-content">
            <p className="message-text">Hi there! I'm here to help. What would you like to know?</p>
            <span className="message-time">10:01 AM</span>
          </div>
        </div>
        <div className="message user">
          <div className="message-content">
            <p className="message-text">How can I contact your support team?</p>
            <span className="message-time">10:02 AM</span>
          </div>
        </div>
        <div className="message bot">
          <div className="message-content">
            <p className="message-text">You can reach our support team by email or phone.</p>
            <p className="message-text">Email: support@budgetbuddy.com</p>
            <p className="message-text">Phone: 555-123-4567</p>
            <span className="message-time">10:03 AM</span>
          </div>
        </div>
        <div className="message user">
          <div className="message-content">
            <p className="message-text">Thank you! What are your working hours?</p>
            <span className="message-time">10:04 AM</span>
          </div>
        </div>
        <div className="message bot">
          <div className="message-content">
            <p className="message-text">Our support team is available from Monday to Friday, 9am to 5pm (EST).</p>
            <span className="message-time">10:05 AM</span>
          </div>
        </div>
        <div className="message user">
          <div className="message-content">
            <p className="message-text">Great! I'll reach out if I have any more questions.</p>
            <span className="message-time">10:06 AM</span>
          </div>
        </div>
        <div className="message bot">
          <div className="message-content">
            <p className="message-text">Sure, feel free to contact us anytime. Have a great day!</p>
            <span className="message-time">10:07 AM</span>
          </div>
        </div>
      </div>
    </div>
    <div className="App">
      {showChatbot && <Chatbot />}
      <button className="chatbot-button" onClick={handleChatbotToggle}>
      <FontAwesomeIcon icon={faRobot} className="robot-icon" />
      </button>
    </div>
    </>
  );
};

export default ContactUs;
