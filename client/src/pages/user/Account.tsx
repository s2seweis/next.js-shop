/* eslint-disable react/no-multi-comp */
// import { useDocumentTitle, useScrollTop } from 'hooks';
import { LoadingOutlined } from '@ant-design/icons';
import React, { lazy, Suspense } from 'react';
import UserTab from '@/src/components/Account/UserTab'
import Layout from '@/src/components/Layout/Layout';

const UserAccountTab = lazy(
  () => import('@/src/components/Account/UserAccountTab'),
);
const UpdateUserAccountTab = lazy(() => import('@/src/components/Account/UpdateUserAccountTab'));
const ChangePasswordComponent = lazy(() => import('@/src/components/Account/ChangePasswordAccountTab'));
const PreferenceTab = lazy(() => import('@/src/components/Account/PreferenceTab'));
// const UserOrdersTab = lazy(() => import('../components/UserOrdersTab'));

const Loader = () => (
  <div className="loader" style={{ minHeight: '80vh' }}>
    <LoadingOutlined />
    <h6>Loading ... </h6>
  </div>
);

const UserAccount = () => {
  return (
    <div className='tab-test'>
      <Layout>
        <UserTab>
          <div className='tab' index={0} label="User">
            <Suspense fallback={<Loader />}>
              <UserAccountTab />
            </Suspense>
          </div>
          <div index={1} label="Update">
            <Suspense fallback={<Loader />}>
              <UpdateUserAccountTab />
            </Suspense>
          </div>
          <div index={2} label="Password">
            <Suspense fallback={<Loader />}>{ <ChangePasswordComponent />}</Suspense>
          </div>
          <div index={3} label="Preferences">
            <Suspense fallback={<Loader />}> <PreferenceTab /> </Suspense>
          </div>
          <div index={4} label="Orders">
            <Suspense fallback={<Loader />}>{/* <UserOrdersTab /> */}</Suspense>
          </div>
        </UserTab>
      </Layout>
    </div>
  );
};

export default UserAccount;
