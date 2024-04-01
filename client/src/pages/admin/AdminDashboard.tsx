import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/admin/Admin.module.scss';
import IsAuthAdmin from '@/src/utils/authHocs/isAuthAdmin';

const AdminDashboard = () => {
  return (
    <div className={styles.adminMain}>
      <Nav />
      <div className={styles.adminContainer}>
        <main className={styles.adminContainerAlign}>
          <h3 style={{ textAlign: 'center' }}>Hello AdminDashboard</h3>
        </main>
      </div>
    </div>
  );
};

export default IsAuthAdmin(AdminDashboard);
