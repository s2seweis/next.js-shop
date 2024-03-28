// dashboard/page.tsx

import IsAuthButton from '@/src/routes/isAuthButton'; // Note the capital "I" in IsAuthButton
import Nav from '../components/Nav/Nav';
import styles from '@/src/styles/scss/pages/Dashboard.module.scss';
import AuthButton from '../components/Buttons/AuthButton/AuthButton.js';

const Dashboard = () => {
  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <h3 style={{ textAlign: 'center' }}>Hello Dashboard (HOC)</h3>
          <AuthButton />
        </main>
      </div>
    </>
  );
};

export default IsAuthButton(Dashboard); // Use IsAuthButton as a higher-order component
