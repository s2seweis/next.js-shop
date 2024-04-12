import React from 'react';
import Layout from '../../components/Layout/Layout';

const IsAuthPublic = (WrappedComponent) => (props) => {

  return (
    <div>
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    </div>
  );
};

export default IsAuthPublic;
