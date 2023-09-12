import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forget.css';
import axios from 'axios';

function Forget() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const loginpassworddata = {
    email: email,
    pasword: confirmPassword,
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log(`Email: ${email}, New Password: ${newPassword}, Confirm Password: ${confirmPassword}`);
    event.preventDefault();

    axios
      .put(`http://localhost:8080/api/forgotpassword/login/${email}`, loginpassworddata)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="top-bar" style={{ backgroundColor: 'rgb(72, 99, 212)' }}>
        <h1>Budget Buddy</h1>
      </div>
      <div className="forget-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>
          <label>
            New Password:
            <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
          </label>
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </label>
          {error && <p>{error}</p>}
          <button type="submit" className='forgot_pas_pg_btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Forget;
