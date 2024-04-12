import Nav from '@/src/components/Nav/Nav';
// import styles from '@/src/styles/scss/pages/admin/Admin.module.scss';
import AdminLayout from '../../components/Layout/Admin/AdminLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const AdminDashboard = () => {

  const { data: session } = useSession();
  console.log('line:100', session);

  const key = session?.user?.role;
  const router = useRouter();

  useEffect(() => {
    if (!key) {
      router.push('/');
    }
  }, [key, router]);

  return (
    <div>
      {key === 'admin' ? (
        <AdminLayout>
          <div>
            <Nav></Nav>
            <h4>Dashboard</h4>
          </div>
        </AdminLayout>
      ) : (
        <div className="lockedContainer">
          <h1 className="text-5xl">You Shall Not Pass1!</h1>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
