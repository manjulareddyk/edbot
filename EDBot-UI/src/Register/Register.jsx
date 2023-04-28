import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import './Register.css';

function Register (props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {     
    navigate('/login'); // Redirect to the register page
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneError("Phone number must be 10 digits");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          phoneNumber,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const enteredValue = e.target.value;
    if (/^\d*$/.test(enteredValue)) { // only allow numbers
      setPhoneNumber(enteredValue);
      setPhoneError("");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>SignUp</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">User Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="User Name"
          required
        />
        <label htmlFor="email">Email Id</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordError("");
          }}
          type="password"
          placeholder="********"
          id="confirmPassword"
          name="confirmPassword"
          required
        />
        {passwordError && <span className="error-message">{passwordError}</span>}
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          type="tel"
          placeholder="Eg: 9876543210"
          id="phoneNumber"
          name="phoneNumber"
          maxLength="10"
          required
        />
        {phoneError && <span className="error-message">{phoneError}</span>}
        <button type="submit" className="register-button">     
          Register
          </button>
    </form>
      <button
        className="link-btn"
        onClick={handleSignup}
      >
        Already have an account? Login here.
     </button>
   </div>
 );
};

export default Register;

