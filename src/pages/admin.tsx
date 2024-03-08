import { isAuthenticated } from '@/src/utils/Auth';
import { useRouter } from 'next/router';
import Nav from '@/src/components/nav';
import styles from '@/src/styles/CSS/Home.module.css';

const Admin = () => {
  const isAuth = isAuthenticated;
  const router = useRouter();

  if (!isAuth) {
    router.push('/'); // Corrected the redirection
    return null; // You may want to return null or another component while the redirection is in progress
  }

  return (
    <>
      <Nav />
      <div className={`${styles.mainContainer}`}>
        <main className={`${styles.main}}`}>
          {/* <main className={`${styles.main} ${inter.className}`}> */}
          <h3 style={{ textAlign: 'center' }}>Hello Admin</h3>
        </main>
      </div>
    </>
  );
};

export default Admin;
