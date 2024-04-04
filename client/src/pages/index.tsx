// Home.jsx
import React, { useState, useEffect } from 'react';
import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/home/Home.module.scss';
import Link from 'next/link';
import AuthButton from '../components/Buttons/AuthButton/AuthButton.js';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import { jwtDecode } from "jwt-decode";
import { useSession } from 'next-auth/react';


const Home = () => {

  const { data: session, status } = useSession(); // Retrieve session information
  console.log("line:1", session);
  
  const [decodedToken, setDecodedToken] = useState(null);
  // console.log("line:2", session?.user.jwt);
  // console.log("line:3", decodedToken);
  

  // useEffect(() => {
  //   if (session?.user.jwt) {
  //     const token = session?.user.jwt;
  //     console.log("line:4", token); // Log token for debugging
  //     try {
  //       const decoded = jwtDecode(token);
  //       console.log("line:5", decoded); // Log decoded token for debugging
  //       setDecodedToken(decoded);
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //       setDecodedToken(null);
  //     }
  //   }
  // }, [session]);


  return (
    <div className={styles.homeContainer}>
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
