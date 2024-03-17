// dashboard/page.tsx

import IsAuth from '@/src/components/IsAuth/isAuth'; // Note the capital "I" in IsAuth
import Nav from '../components/nav';
import styles from '@/src/styles/CSS/Home.module.css';

const Dashboard = () => {
  return (
    <>
      <Nav />
      <div className={`${styles.mainContainer}`}>
        <main className={`${styles.main}}`}>
          {/* <main className={`${styles.main} ${inter.className}`}> */}
          <h3 style={{ textAlign: 'center' }}>Hello Dashboard (HOC)</h3>
        </main>
      </div>
    </>
  );
};

export default IsAuth(Dashboard); // Use IsAuth as a higher-order component
