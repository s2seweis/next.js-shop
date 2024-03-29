// Home.jsx
import React from 'react';
import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/Home.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import AuthButton from '../components/Buttons/AuthButton/AuthButton.js';
import IsAuthPublic from '@/src/routes/isAuthPublic';

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className="homeContainer">
      <div className={styles.homeContainerAlign}>
        <Nav />
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            <h3>Hello Home</h3>
            <h5 style={{ textAlign: 'center', marginTop: '-15px' }}>
              Overview Links:
            </h5>
            <div className={styles.linkContainer}>
              <h4>
                Authentication with SignIn Form
                <Link href="/">Home (visible for all)</Link>
                <Link href="contact/page">Contact (visible for all)</Link>
                <Link href="/admin">Admin (visible for admin)</Link>
                <Link href="/server">
                  Server (only visible for admin and user)
                </Link>
                <Link href="register">Register (visible for all)</Link>
                <Link href="auth/signIn/page">Sign In (visible for all)</Link>
                <Link href="github">Github API (visible for admin)</Link>
                <Link href="download">
                  App Download Button (currently a page needs to be a component)
                </Link>
              </h4>
              <h4>
                Authentication with Button
                <Link href="/dashboard">Dashboard (HOC) with SignInButton</Link>
                <Link href="/profile">
                  Profile (Auth Provider) with SignInButton
                </Link>
              </h4>
              <h4>
                Redux Test
                <Link href="/redux">Redux</Link>
              </h4>
              <AuthButton />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default IsAuthPublic(Home);
