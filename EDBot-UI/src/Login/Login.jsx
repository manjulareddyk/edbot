import React, { useState,useContext} from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';
function Login() {
import { AuthContext } from "../Context/Authcontext";
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';

// create a context to store the JWT token and user ID


function Login({ children }) { // children prop added
  const {  login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {     
    navigate('/register'); 
  }

//   const handleGoogleLogin = async () => {
//   const provider = new GoogleLogin.auth.GoogleAuthProvider();
//     GoogleLogin.auth().signInWithPopup(provider)
//       .then((result) => {
//       console.log(result);
//        navigate('/gptui'); // Redirect to the UI page
//       }).catch((error) => {
//       console.log(error);
//   // Add code to display an error message or update the UI as necessary
//   });
    
// }
    
// const handleFacebookLogin = async () => {
// const provider = new FacebookLogin.auth.FacebookAuthProvider();
//   FacebookLogin.auth().signInWithPopup(provider)
//     .then((result) => {
//     console.log(result);
//     navigate('/gptui'); // Redirect to the UI page
//      }).catch((error) => {
//     console.log(error);
//     // Add code to display an error message or update the UI as necessary
//      });
//   }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validate())
    {
      const response = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful!');
        login(data.user._id,data.token);
        console.log(data.user._id,data.token);

        // login(data.user._id,response.headers.get('token'));
        // console.log(data.user._id,response.headers.get('token'));

        console.log(data.user.history);
        navigate('/gptui'); 
      } else {
        console.log('Login failed.');
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
          required // added required attribute
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
          required // added required attribute
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

export default Login;
