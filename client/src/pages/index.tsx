// Home.jsx
import React from 'react';
import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/Home.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import AuthButton from '../components/Buttons/AuthButton/AuthButton.js';
import IsAuthPublic from '@/src/utils/routes/isAuthPublic.tsx';

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
                <Link href="contact/ContactForm">
                  Contact (visible for all)
                </Link>
                <Link href="/admin/AdminDashboard">
                  Admin (visible for admin)
                </Link>
                <Link href="/profile/Server">
                  Server (only visible for admin and user)
                </Link>
                <Link href="auth/Register">Register (visible for all)</Link>
                <Link href="auth/SignIn">
                  Sign In (visible for all) - Other Route
                </Link>
                <Link href="test/Github">Github API (visible for admin)</Link>
                <Link href="download/DownloadApp">App Download Button</Link>
              </h4>
              <h4>
                Authentication with Button
                <Link href="/profile/Dashboard">
                  Dashboard (HOC) with SignInButton
                </Link>
                <Link href="/profile/UserProfile">
                  Profile (Auth Provider) with SignInButton
                </Link>
              </h4>
              <h4>
                Redux Test
                <Link href="test/Redux">Redux</Link>
                <Link href="/product/Products">
                  Get/Delete Products - Redux/ API Call
                </Link>
                <Link href="/product/AddProduct">
                  Add Products - Redux/ API Call
                </Link>
                <Link href="/product/UpdateProducts">
                  Update Products - Redux/ API Call
                </Link>
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
