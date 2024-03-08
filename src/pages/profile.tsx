import { useAuth } from '../context/AuthProvider.js';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Nav from '../components/nav';
import styles from '@/src/styles/CSS/Home.module.css';

const Profile = () => {
  const { isLoggedIn } = useAuth(); // Use the useAuth hook to access the AuthContext
  console.log('line:999', isLoggedIn);

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
      <div className={`${styles.mainContainer}`}>
        <main className={`${styles.main}`}>
          <h3 style={{ textAlign: 'center' }}>Hello Profile</h3>
        </main>
      </div>
    </>
  );
};

export default Profile;
