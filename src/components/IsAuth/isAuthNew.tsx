// src/components/IsAuth/isAuth.tsx

// import { useAuth } from '../../context/AuthProviderMerged';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../Layout/Layout';
import { useSession } from 'next-auth/react';

const IsAuth = (WrappedComponent) => (props) => {
  const { data: session } = useSession();

//   const { isLoggedIn } = useAuth();
//   const auth = isLoggedIn;
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <div>
      {session !== null ? (
        <Layout>
          <WrappedComponent {...props} />
        </Layout>
      ) : (
        <div className="lockedContainer">
          <h1 className="text-5xl">You Shall Not Pass!</h1>
        </div>
      )}
    </div>
  );
};

export default IsAuth; // Export IsAuth as a named export
