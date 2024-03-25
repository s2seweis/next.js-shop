import { useAuth } from '../context/AuthProviderMerged';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Nav from '../components/nav';
import styles from '@/src/styles/scss/pages/Profile.module.scss';
import AuthButton from '../components/AuthButton/AuthButton.js';

const Profile: React.FC = () => {
  const { isLoggedIn } = useAuth(); // Use the useAuth hook to access the AuthContext
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          {/* <main className={`${styles.main} ${inter.className}`}> */}
          <h3 style={{ textAlign: 'center' }}>Hello Profile (Auth Provider)</h3>
          <AuthButton />
        </main>
      </div>
    </>
  );
};

export default Profile;
