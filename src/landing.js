import React from 'react';
import './landing.css';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './img/logo.jpg';

const CashbookBudgetBuddy = () => {

  const email = localStorage.getItem('email');
  const handleLogout = () => {
    
    localStorage.removeItem('email');
  };
  return (
    <>
      <div className='navbar1'>
        <p></p>

        {email ? (
          <Link to='/login' onClick={handleLogout}>
            <p>Logout</p>
          </Link>
        ) : (
          <Link to='/login'>
            <p>Login</p>
          </Link>
        )}

        <Link to='/contact'>
          <p>Contact Us</p>
        </Link>

        <Link to="/about">
          <p>About Us</p>
        </Link>
        <img src={logo} alt="Logo" />
      </div>

      <div className="bg-image_1">
      </div>
      <div className="text-img_1">
        <h1>Take Full Control of Your Finances.</h1>
        <p>Manage your budget, track your expenses, and save money effortlessly with BudgetBuddy.</p>
      </div>

      <div className="bg-image_2">
      </div>
      <div className="text-img_2">
        <h1>Track your expenses with ease.</h1>
        <p>With CashbookBuddy, you can easily record all your expenses<br />in one place and track your spending against your budget in real-time.</p>
      </div>

      <div className="bg-image_3">
      </div>
      <div className="text-img_3">
        <h1>Accurate budget planning.</h1>
        <p>The CashbookBuddy app helps you plan a realistic budget that works for you, and it adjusts as your plans change.</p>
      </div>

      <div className="bg-image_4">
      </div>
      <div className="text-img_4">
        <h1>Achieve your savings goals.</h1>
        <p>By keeping track of your expenses and budgeting closely,<br />you'll be able to save more for the things that matter most to you.</p>
      </div>
      <div className="get-started-button">
        <Link to="/cashbook">
          <button>Get Started</button>
        </Link>
      </div>
    </>
  );
};

export default CashbookBudgetBuddy;
