// AuthButton.js
import React from 'react';
import { useAuth } from '../../context/AuthProviderMerged';
// import { useAuth } from '../../context/AuthContext';
import '../../styles/css/AuthButton.css';

const AuthButton = () => {
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
          Logout
        </button>
      ) : (
        <button className="buttonLogin" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default AuthButton;
