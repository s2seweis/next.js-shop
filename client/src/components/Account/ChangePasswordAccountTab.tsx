import Nav from '../Nav/Nav';
import ChangePasswordComponent from '@/src/components/Account/Profile/ChangePasswordComponent';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/src/styles/scss/pages/account/Profile.module.scss';

const ChangePasswordAccountTab: React.FC = () => {
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
        <Nav />
        {session ? (
          <div className={styles.mainContainer}>
            <ChangePasswordComponent userId={session.user.userId}  />
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
    </div>
  );
};

export default ChangePasswordAccountTab;
