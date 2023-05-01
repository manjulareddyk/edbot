import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from "./Login/Login";
import Register from "./Register/Register";
import WelcomePage from './WelcomePage';
import GPTUI from "./UI-Page/ui";
// import ChatHistory   from './UI-Page/ChatHistory';
import { AuthContext } from "./Context/Authcontext";
import { useCallback, useState } from 'react';


function App() {
  
 const [token,setToken]=useState(false);
 const [userId,setUserId]=useState(false);

 const login=useCallback((uid,token)=>{
  setToken(token);
  setUserId(uid);
 },[]);

 const logout=useCallback(()=>{
  setToken(null);
  setUserId(null);
 },[]);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn:!!token,
      token:token,
      userId:userId,
      login:login,
      logut:logout
     }}>

      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gptui" element={<GPTUI addMessage={(message) => {}}/>}/>
          {/* <Route path="/chatHistory" element={<ChatHistory />} /> */}
        </Routes>
      </div>
      
    </AuthContext.Provider>
  );
}

export default App;
