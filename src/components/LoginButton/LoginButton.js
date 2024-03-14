// LoginButton.js
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/css/LoginButton.css';

const LoginButton = () => {
  const { isLoggedIn, login, logout } = useAuth();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className="loginButtonContainer"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {/* <p>User is {isLoggedIn ? 'logged in' : 'logged out'}</p> */}
      {isLoggedIn ? (
        <button className="buttonLogout" onClick={handleLogout}>
          Logout1
        </button>
      ) : (
        <button className="buttonLogin" onClick={handleLogin}>
          Login1
        </button>
      )}
    </div>
  );
};

export default LoginButton;
