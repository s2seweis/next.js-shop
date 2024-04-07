import Nav from '../../components/Nav/Nav';
import styles from '@/src/styles/scss/pages/profile/Profile.module.scss';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import ProfileComponent from '@/src/components/Profile/ProfileComponent.js';
import { useSession } from 'next-auth/react';

const Profile: React.FC = () => {
  const { data: session, status } = useSession(); // Retrieve session information
  console.log('line:2', session);
  console.log('line:3', session?.user.id);

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <h3 style={{ textAlign: 'center' }}>
            Hello Profile (IsAuthPublic Version)
          </h3>
          <ProfileComponent
          userId={session?.user.id}
          />
        </main>
      </div>
    </>
  );
};

export default IsAuthPublic(Profile);
