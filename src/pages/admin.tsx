// import { isAuthenticated } from '@/src/components/IsAuth/Auth';
// import { useRouter } from 'next/router';
import Nav from '@/src/components/nav';
import styles from '@/src/styles/scss/pages/Admin.module.scss';
import IsAuthAdmin from '@/src/routes/isAuthAdmin';

const Admin = () => {
  // const isAuth = isAuthenticated;
  // const router = useRouter();

  // if (!isAuth) {
  //   router.push('/'); // Corrected the redirection
  //   return null; // You may want to return null or another component while the redirection is in progress
  // }

  return (
    <div className={styles.adminMain}>
      <Nav />
      <div className={styles.adminContainer}>
        <main className={styles.adminContainerAlign}>
          <h3 style={{ textAlign: 'center' }}>Hello Admin</h3>
        </main>
      </div>
    </div>
  );
};

export default IsAuthAdmin(Admin);
