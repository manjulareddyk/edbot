import React from "react";
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import  Login  from "./Login/Login";
import  Register from "./Register/Register";
import WelcomePage from './WelcomePage';
import GPTUI from "./UI-Page/ui";
// import { useNavigate } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Routes>
      
        {/* <Switch> */}
        <Route  path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/gptui" element={<GPTUI />} />
        {/* </Switch> */}
    
    </Routes>
    </div>
  );
}



export default App;


