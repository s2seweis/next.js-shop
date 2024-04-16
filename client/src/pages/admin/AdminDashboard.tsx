import Nav from '@/src/components/Nav/Nav';
import AdminLayout from '../../components/Layout/Admin/AdminLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';

const AdminDashboard = () => {

  const userProfile = useSelector((state) => state.profile.userProfile);
  console.log("line:4000", userProfile);
  console.log("line:4001", userProfile?.role);
  

  const { data: session } = useSession();
  console.log('line:100', session);

  // const key = session?.user?.role;
  const key = userProfile?.role;
  console.log("line:4002", key);
  
  const router = useRouter();

  useEffect(() => {
    if (key !== 'admin') {
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
