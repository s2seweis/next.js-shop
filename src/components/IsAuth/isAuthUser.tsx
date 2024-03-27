import React from 'react';
import Layout from '../Layout/Layout';
import { useSession } from 'next-auth/react';

const IsAuthUser = (WrappedComponent) => (props) => {
  const { data: session } = useSession();
  console.log("line:1", session);

  return (
    <div>
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    </div>
  );
};

export default IsAuthUser;
