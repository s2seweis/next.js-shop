import React, { useEffect } from 'react';
import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/home/Home.module.scss';
import Link from 'next/link';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import { useSession } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../src/redux/slices/profileSlice';
import { useAppSelector } from '@/src/redux/hooks';

const Home = () => {
  const { data: session } = useSession(); // Retrieve session information
  // console.log('line:1', session);
  // console.log('line:2', session?.user.userId);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.profile.status);
  // console.log('line:3', status);

  const userProfile = useSelector((state) => state.profile.userProfile);
  console.log("line:100", userProfile);

  const userProfile1 = useAppSelector((state) => state.profile.userProfile);
  console.log('line:101', userProfile1);

  useEffect(() => {
      if (status === 'idle' && session?.user.userId) {
      dispatch(fetchUserProfile(session?.user.userId));
    }
  }, [dispatch, status, session?.user.userId]); // Dispatch only when status or userId changes

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
                <Link href="/checkout/Page">
                  Checkout (only visible for admin and user)
                </Link>
                <Link href="auth/Register">Register (visible for all)</Link>
                <Link href="auth/SignIn">
                  Sign In (visible for all) - Other Route
                </Link>
                <Link href="download/DownloadApp">App Download Button (visible for all)</Link>
              </h4>
              <h4>
                Products Redux Test: Post, Get, Delete & Update
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
              <h4>
                Test Component
                <Link href="/user/Account">User Account</Link>
              </h4>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default IsAuthPublic(Home);
