import { useState, useEffect } from 'react';
import Nav from '@/src/components/nav';
import styles from '@/src/styles/CSS/Home.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { options } from '../app/api/auth/[...nextauth]/options';
import AuthButton from '../components/AuthButton/AuthButton.js';

interface HomeProps {
  isAuth: boolean;
}

export default function Home({ isAuth }: HomeProps) {
  const { data: session } = useSession();
  // console.log('line: 1', session);

  return (
    <div>
      {session !== null ? (
        <div>
          <Nav />
          <div className={`${styles.mainContainer}`}>
            <main className={`${styles.main}}`}>
              <h3 style={{ textAlign: 'center' }}>Hello Home</h3>
              <h5 style={{ textAlign: 'center', marginTop: '-15px' }}>
                Overview Links:
              </h5>
              <div className={styles.linkContainer}>
                <h5 style={{ display: 'grid' }}>
                  Authentication with SignIn Form
                  <Link href="/">Home (visible for all)</Link>
                  <Link href="contact/page">Contact (visible for all)</Link>
                  <Link href="/admin">Admin (visible for admin)</Link>
                  <Link href="/login">Login (visible for all)</Link>
                  <Link href="/server">
                    Server (only visible for admin and user)
                  </Link>
                  <Link href="auth/signIn/page">Sign In (visible for all)</Link>
                  {/* <Link href="api/auth/signout">Sign Out (visible for all)</Link> */}
                  <Link href="download">Download Button</Link>
                  <Link href="example">
                    App Download Button (currently a page needs to be a
                    component)
                  </Link>
                </h5>
                <h5 style={{ display: 'grid' }}>
                  Authentication with Button
                  <Link href="/dashboard">
                    Dashboard (HOC) with SignInButton
                  </Link>
                  <Link href="/profile">
                    Profile (Auth Provider) with SignInButton
                  </Link>
                </h5>
                <AuthButton />
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          <h1 className="text-5xl">You Shall Not Pass!</h1>
        </div>
      )}
    </div>
  );
}
