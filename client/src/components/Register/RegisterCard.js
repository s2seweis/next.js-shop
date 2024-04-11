// components/RegisterCard.js

import React from 'react';
import styles from '../../styles/scss/components/register/Register.module.scss';

const RegisterCard = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{description}</p>
      {/* Add registration form here */}
    </div>
  );
};

export default RegisterCard;
