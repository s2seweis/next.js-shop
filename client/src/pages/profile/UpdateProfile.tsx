import Nav from '../../components/Nav/Nav';
import styles from '@/src/styles/scss/pages/profile/Profile.module.scss';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';
import UpdateProfileComponent from '@/src/components/Profile/UpdateProfileComponent.js';
import { useSession } from 'next-auth/react';

const UpdateProfile: React.FC = () => {
  const { data: session, status } = useSession(); // Retrieve session information
  console.log('line:20', session);

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <h3 style={{ textAlign: 'center' }}>
            Hello UpdateProfile (IsAuthPublic Version)
          </h3>
          <UpdateProfileComponent userId={session?.user.id} />
        </main>
      </div>
    </>
  );
};

export default IsAuthPublic(UpdateProfile);
