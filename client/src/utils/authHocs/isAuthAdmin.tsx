import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/Layout/Admin/AdminLayout';
import { useSession } from 'next-auth/react';

const useAuthAdmin = () => {
  const { data: session } = useSession();
  const key = session?.user?.role;
  const router = useRouter();

  useEffect(() => {
    if (!key) {
      router.push('/');
    }
  }, [key, router]);

  return key;
};

const IsAuthAdmin = (WrappedComponent) => (props) => {
  const key = useAuthAdmin();

  return (
    <div>
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

export default IsAuthAdmin;
