// pages/login.tsx
import { signIn } from 'next-auth/react';
import styles from '../styles/css/Login.module.css';

const LoginPage: React.FC = () => {
  const handleSignIn = () => {
    signIn('credentials', { redirect: false });
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default LoginPage;
