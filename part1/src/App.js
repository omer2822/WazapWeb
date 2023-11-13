import './App.css';
import LoginTable from './LoginPage/LoginTable';
import SignUpTable from './SignUpPage/SignUpTable';
import './LoginPage/Login.css'
import './SignUpPage/SignUp.css'
import './ChatPage/Chat.css'
import ChatPage from './ChatPage/Chat';
import React from 'react'
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isSignedUp, setIsSignedUp] = useState(true);

  const [token, setToken] = useState("");

  const [username, setUsername] = useState("");

  const [chats, setChats] = useState("");

  const [details, setDetails] = useState("");

  // handle login, set isLoggedIn to true
  const handleLogin = (currentToken, currentUsername, defaultChats, defalutDetails) => {
    setToken(currentToken);
    setUsername(currentUsername);
    setChats(defaultChats);
    setDetails(defalutDetails);
    setIsLoggedIn(true);
  }

  // handle logout, set isLoggedIn to false
  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  // handle signup, set isSignedUp to true
  const handleSignUp = () => {
    setIsSignedUp(true);
  }

  // handle not signup, set isSignedUp to false
  const handleNotSignedUp = () => {
    setIsSignedUp(false);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
        {isSignedUp && !isLoggedIn && (
          <Route path="/" element={<LoginTable handleLogin={handleLogin} handleNotSignedUp={handleNotSignedUp} />}></Route>
        )}
        {!isSignedUp && (
          <Route path="/" element={<SignUpTable handleSignUp={handleSignUp} />}></Route>
        )}
        {isLoggedIn && isSignedUp && (
          <Route path="/" element={<ChatPage token={token} username={username} handleLogout={handleLogout} defaultChats={chats} defaultDetails={details} />}></Route>
        )}
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
