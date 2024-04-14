/* eslint-disable react/no-multi-comp */
import { LoadingOutlined } from '@ant-design/icons';
// import { useDocumentTitle, useScrollTop } from 'hooks';
import React, { lazy, Suspense } from 'react';
import UserTab from '../../components/User/UserTab';
import Layout from '@/src/components/Layout/Layout';

const UserAccountTab = lazy(
  () => import('../../components/User/UserAccountTab'),
);
const UpdateUserAccountTab = lazy(() => import('../../components/User/UpdateUserAccountTab'));
const ChangePasswordComponent = lazy(() => import('../../components/User/ChangePasswordAccountTab'));
// const UserOrdersTab = lazy(() => import('../components/UserOrdersTab'));

const Loader = () => (
  <div className="loader" style={{ minHeight: '80vh' }}>
    <LoadingOutlined />
    <h6>Loading ... </h6>
  </div>
);

const UserAccount = () => {
  // useScrollTop();
  // useDocumentTitle('My Account | Dign');

  return (
    <div className='tab-test'>
      <Layout>
        <UserTab>
          <div className='tab' index={0} label="User">
            <Suspense fallback={<Loader />}>
              <UserAccountTab />
            </Suspense>
          </div>
          <div index={1} label="Update User">
            <Suspense fallback={<Loader />}>
              <UpdateUserAccountTab />
            </Suspense>
          </div>
          <div index={2} label="Change Password">
            <Suspense fallback={<Loader />}>{ <ChangePasswordComponent />}</Suspense>
          </div>
          <div index={3} label="Orders">
            <Suspense fallback={<Loader />}>{/* <UserOrdersTab /> */}</Suspense>
          </div>
          <div index={4} label="User Preferences">
            <Suspense fallback={<Loader />}>{/* <UserOrdersTab /> */}</Suspense>
          </div>
        </UserTab>
      </Layout>
    </div>
  );
};

export default UserAccount;
