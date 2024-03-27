// SignIn.tsx

import React, { useRef } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link'; // Import Link from Next.js
import styles from '@/src/styles/scss/pages/SignIn.module.scss'; // Import SCSS file
import Button from './Button';
import IsAuthUser from '@/src/components/IsAuth/isAuthUser'; 

const SignIn = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = userNameRef.current?.value || '';
    const password = passRef.current?.value || '';

    const result = await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  const handleGitHubSignIn = async () => {
    await signIn('github', { callbackUrl: '/' });
  };

  return (
    <div
      style={{ display: 'flex', height: '100vh', alignItems: 'center' }}
      className={styles.loginPageContainer}
    >
      <div style={{ margin: 'auto' }} className={styles.loginFormContainer}>
        <h3 className={styles.loginFormTitle}>Login</h3>
        <form className={styles.SignInForm} onSubmit={onSubmit}>
          <div className={styles.formField}>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              ref={userNameRef}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passRef}
              className={styles.inputField}
            />
          </div>
          <div className={styles.signInButtonContainer}>
            <Button
              type="submit"
              className={`${styles.signInCredentials} ${styles.signInButton}`}
            >
              SIGN IN with E-Mail
            </Button>

            <Button
            
              onClick={handleGitHubSignIn}
              className={`${styles.signInButtonGithub} ${styles.signInButton}`}
            >
              SIGN IN with GitHub
            </Button>
            {/* #without Button Component */}
            {/* <button
            
              onClick={handleGitHubSignIn()}
              className={`${styles.signInButtonGithub} ${styles.signInButton}`}
            >
              SIGN IN with GitHub
            </button> */}

          </div>
          <div className={styles.signInButtonContainer}>
            <Button
              onClick={onSubmit}
              className={`${styles.signInButtonGoogle} ${styles.signInButton}`}
            >
              SIGN IN with Google
            </Button>
            <Button
              onClick={handleGitHubSignIn}
              className={`${styles.signInButtonFacebook} ${styles.signInButton}`}
            >
              SIGN IN with Facebook
            </Button>
          </div>
        </form>
        <div className={styles.goToSignIn}>
          <Link href="/register">Go to SignIn</Link>
        </div>
      </div>
    </div>
  );
};

export default IsAuthUser(SignIn);
