// components/RegisterMenu.js

import React from 'react';
import RegisterCard from './RegisterCard';
import styles from '../../styles/scss/components/register/Register.module.scss';

const RegisterMenu = () => {
  return (
    <div className={styles.registerMenu}>
      <h1>Choose your registration type:</h1>
      <div className={styles.registerCards}>
        <RegisterCard title="Individual" description="Register as an individual user." />
        <RegisterCard title="Organization" description="Register as an organization." />
        <RegisterCard title="Business" description="Register as a business." />
      </div>
    </div>
  );
};

export default RegisterMenu;
