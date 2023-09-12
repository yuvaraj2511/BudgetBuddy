import React, { useState, useEffect } from "react";
import "./LoginSuccessPopup.css"; 

const LoginSuccessPopup = ({ onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 10);
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress <= 0) {
      onClose();
    }
  }, [progress, onClose]);

  return (
    <div className="login-success-popup">
      <div className="login-success-content">
        <h3>Login Successful!</h3>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessPopup;
