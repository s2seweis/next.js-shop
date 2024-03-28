import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/Admin.module.scss';
import IsAuthAdmin from '@/src/routes/isAuthAdmin';

const Admin = () => {

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
