import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

import axios from "axios";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const data = {
    firstName: name,
    email: email,
    pasword: password
  };
  const newdata = {
    email: email,
    pasword: password
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Submit the form
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);

    axios.post('http://localhost:8080/api/registerdata', data);
    axios.post('http://localhost:8080/api/logindata', newdata);
    navigate('/login');
  };

  return (
    <div>
      <div className="top-bar" style={{ backgroundColor: 'rgb(72, 99, 212)' }}>
        <h1>Budget Buddy</h1>
      </div>
      <div className="signup-box">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} required />
          </label>
          <label>
            Password:
            <div>
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} required />
              <input type="checkbox" checked={showPassword} onChange={handleShowPasswordToggle} />
            </div>
          </label>
          {error && <p>{error}</p>}
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
