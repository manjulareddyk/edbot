import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage(props) {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/register");
  };

  return (   
    <div className="welcome-page">
      <div className="welcome-message">
        <h1>Welcome to EDBot</h1>
        <p>Log in with your account to continue</p>
      </div>
      <div className="button-container">
        <button className="login-button" onClick={handleLoginClick}> 
          Login
        </button>
        <button className="signup-button" onClick={handleSignupClick}> 
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;