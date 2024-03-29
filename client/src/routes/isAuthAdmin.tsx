// src/components/IsAuth/isAuth.tsx

// import { useAuth } from '../../context/AuthProviderMerged';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import Layout from '../Layout/Layout';
import AdminLayout from '../components/Layout/Admin/AdminLayout';

import { useSession } from 'next-auth/react';

const IsAuthAdmin = (WrappedComponent) => (props) => {
  const { data: session } = useSession();

  const key = session?.user?.role;

  //   const { isLoggedIn } = useAuth();
  //   const auth = isLoggedIn;
  const router = useRouter();

  useEffect(() => {
    if (!key) {
      router.push('/');
    }
  }, [key, router]);

  return (
    <div>
      {/* {session !== null ? ( */}
      {key === 'admin' ? (
        <AdminLayout>
          <WrappedComponent {...props} />
        </AdminLayout>
      ) : (
        <div className="lockedContainer">
          <h1 className="text-5xl">You Shall Not Pass1!</h1>
        </div>
      )}
    </div>
  );
};

export default IsAuthAdmin; // Export IsAuth as a named export
