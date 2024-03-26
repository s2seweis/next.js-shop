import Nav from '@/src/components/nav';
import styles from '@/src/styles/scss/pages/Home.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import AuthButton from '../components/AuthButton/AuthButton.js';

interface HomeProps {
  isAuth: boolean;
}

export default function Home({ isAuth }: HomeProps) {
  const { data: session } = useSession();
  // console.log('line: 1', session);

  return (
    <div className='homeContainer'>
      {session !== null ? (
        <div className={styles.homeContainerAlign}>
          <Nav />
          <div className={styles.mainContainer}>
            <main className={styles.main}>
              <h3 >Hello Home</h3>
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
                  {/* <Link href="api/auth/signout">Sign Out (visible for all)</Link> */}
                  <Link href="github">Github API (visible for admin)</Link>
                  <Link href="download">
                    App Download Button (currently a page needs to be a
                    component)
                  </Link>
                </h4>
                <h4>
                  Authentication with Button
                  <Link href="/dashboard">
                    Dashboard (HOC) with SignInButton
                  </Link>
                  <Link href="/profile">
                    Profile (Auth Provider) with SignInButton
                  </Link>
                </h4>
                <AuthButton />
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className={styles.lockedContainer}>
          <h1 className="text-5xl">You Shall Not Pass!</h1>
        </div>
      )}
    </div>
  );
}
