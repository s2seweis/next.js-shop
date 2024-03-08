// AnyComponent.js
import React from 'react';
import { useAuth } from '../../context/AuthProvider';

const AnyComponent = () => {
  const { isLoggedIn, login, logout } = useAuth();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {/* <p>User is {isLoggedIn ? 'logged in' : 'logged out'}</p> */}
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default AnyComponent;
