// AuthButton.js
import React from 'react';
import { useAuth } from '../../../context/AuthProviderMerged';
import styles from '../../../styles/scss/components/AuthButton.module.scss';

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
      className={styles.loginButtonContainer}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      {isLoggedIn ? (
        <button className={styles.buttonLogout} onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className={styles.buttonLogin} onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default AuthButton;
