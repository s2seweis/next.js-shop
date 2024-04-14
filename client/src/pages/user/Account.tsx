/* eslint-disable react/no-multi-comp */
import { LoadingOutlined } from '@ant-design/icons';
// import { useDocumentTitle, useScrollTop } from 'hooks';
import React, { lazy, Suspense } from 'react';
import UserTab from '../../components/User/UserTab';
import Layout from '@/src/components/Layout/Layout';

const UserAccountTab = lazy(
  () => import('../../components/User/UserAccountTab'),
);
// const ProductForm = lazy(() => import('../../admin/components/ProductForm'));
// const UserWishListTab = lazy(() => import('../components/UserWishListTab'));
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
    <div>
      <Layout>
        <UserTab>
          <div index={0} label="Account1">
            <Suspense fallback={<Loader />}>
              <UserAccountTab />
            </Suspense>
          </div>
          <div index={1} label="My Wish List">
            <Suspense fallback={<Loader />}>
              {/* <UserWishListTab /> */}
            </Suspense>
          </div>
          <div index={2} label="My Orders">
            <Suspense fallback={<Loader />}>{/* <UserOrdersTab /> */}</Suspense>
          </div>
        </UserTab>
      </Layout>
    </div>
  );
};

export default UserAccount;
