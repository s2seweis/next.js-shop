import Nav from '../Nav/Nav';
import UpdateProfileComponent from '@/src/components/Account/Profile/UpdateProfileComponent.js';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import Layout from '../../components/Layout/Layout';
import Link from 'next/link';
import styles from '../../styles/scss/pages/account/Profile.module.scss';

const UpdateUserAccountTab: React.FC = () => {
  const { data: session } = useSession(); // Retrieve session information
  console.log("line:1",session );
  
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <div>
      {/* <Layout> */}
        <Nav />
        {session ? (
          <div className={styles.mainContainer}>
            {/* <h2>Test</h2> */}
            <UpdateProfileComponent userId={session.user.userId}  />
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
      {/* </Layout> */}
    </div>
  );
};

export default UpdateUserAccountTab;
