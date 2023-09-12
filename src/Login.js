import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import LoginSuccessPopup from './LoginSuccessPopup';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [pasword, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setPopup] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate(); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    if (!email) {
      setEmailError('The Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!pasword) {
      setPasswordError('The Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) {
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid Email address');
      return;
    }

    if (!email && !pasword) {
      return;
    } else {
      axios
        .post('http://localhost:8080/api/logindata/auth', { email, pasword })
        .then((response) => {
          if (response.data === 'Login Successful') {
            sessionStorage.setItem('email', email);
            localStorage.setItem('email', email);
            setPopup(true);
          } else {
            setPopup(false);
            alert('Invalid Username or Password');
          }
        })
        .catch((error) => {
          alert(error);
        });

      
    }
  };

  const handleClosePopup = () => {
    setPopup(false);
    navigate('/cashbook');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    navigate('/Forget');
  };

  const handleSignUp = () => {
    console.log('New user sign up clicked');
    navigate('/signup');
  };

  function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    return re.test(email);
  }

  return (
    <div className="login">
      <div className="login__top-bar">
        <h1 className="login__title">Budget Buddy</h1>
      </div>
      <div className="login__box">
        <h2 className="login__heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="login__form-group">
            <label className="login__label">Email:</label>
            <input className="login__input" type="email" value={email} onChange={handleEmailChange} required />
            {emailError && <span className="login__error">{emailError}</span>}
          </div>
          <div className="login__form-group">
            <label className="login__label">Password:</label>
            <div className="login__password-input">
              <input className="login__input" type={showPassword ? 'text' : 'password'} value={pasword} onChange={handlePasswordChange} required />
              <input className="login__show-password-checkbox" type="checkbox" checked={showPassword} onChange={handleShowPasswordToggle} />
            </div>
            {passwordError && <span className="login__error">{passwordError}</span>}
          </div>
          <div className="login__form-group">
            <button className="login__submit-button" type="submit">Submit</button>
          </div>
          {showPopup && <LoginSuccessPopup onClose={handleClosePopup} />}
        </form>
      </div>
      <div className="login__options">
        <button className="login__option-button_for" type="button" onClick={handleForgotPassword}>Forgot password</button>
        <button className="login__option-button_sign" type="button" onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
