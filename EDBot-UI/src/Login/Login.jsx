import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {     
    navigate('/register'); // Redirect to the register page
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validate())
    {
      const response = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        console.log('Login successful!');
        navigate('/gptui'); // Redirect to the UI page
      } else {
        console.log('Login failed.');
        // Add code to display an error message or update the UI as necessary
      }
    }
  }

  const validate = () => {
    let valid = true;

    //  email validation
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email');
      valid = false;
    } else {
      setEmailError('');
    }

    // password validation
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@gmail.com"
        />
        {emailError && <p className="error-message">{emailError}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
         {passwordError && <p className="error-message">{passwordError}</p>}
        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>
      <button
        className="link-btn"
        onClick={handleSignup}
      >
        Don't have an account? Sign up.
      </button>

    </div>
  );
};

export default Login;


