import Nav from '../../components/Nav/Nav';
import ProfileComponent from '@/src/components/Profile/ProfileComponent.js';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import Link from 'next/link';
import styles from '../../styles/scss/pages/profile/Profile.module.scss';

const UpdateProfile: React.FC = () => {
  const { data: session } = useSession(); // Retrieve session information
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <div>
      <Layout>
        <Nav />
        {session ? (
          <div className={styles.mainContainer}>
            <h2>Test</h2>
            <ProfileComponent userId={session.user.id} />
          </div>
        ) : (
          <div className={styles.mainContainer}>
            <div>
              <h1 className="text-5xl">You should log in first to see a profile!</h1>
              <Link href="/">
                <div style={{ textAlign: "center" }} className="goBack">
                  Go back to Home Page
                </div>
              </Link>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default UpdateProfile;
