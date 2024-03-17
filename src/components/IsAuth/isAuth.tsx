// src/components/IsAuth/isAuth.tsx

import { useAuth } from '../../context/AuthProviderMerged';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IsAuth = (WrappedComponent) => (props) => {
  const { isLoggedIn } = useAuth();
  const auth = isLoggedIn;
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push('/');
    }
  }, [auth, router]);

  return <WrappedComponent {...props} />;
};

export default IsAuth; // Export IsAuth as a named export
