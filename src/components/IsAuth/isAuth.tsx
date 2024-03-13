import { useAuth } from '../../context/AuthContext';
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

export default IsAuth;
