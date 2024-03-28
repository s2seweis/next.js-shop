import React from 'react';
import styles from '../../styles/scss/components/Button.module.scss';

const Button = ({ children, className, ...rest }) => {
  return (
    <button className={`${styles.button} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
