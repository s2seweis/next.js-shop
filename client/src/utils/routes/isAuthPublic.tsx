import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useSession } from 'next-auth/react';

const IsAuthPublic = (WrappedComponent) => (props) => {
  const { data: session } = useSession();

  return (
    <div>
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    </div>
  );
};

export default IsAuthPublic;
