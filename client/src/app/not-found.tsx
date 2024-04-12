import Link from 'next/link';
import { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  return (
    <div
      style={{ marginTop: '150px', justifyContent: 'center', display: 'flex' }}
      className="container"
    >
      <div style={{ display: 'grid' }}>
        <h1 className="title">404 - Page Not Found</h1>
        <h4 className="subTitle">
          Oops The page you are looking for does not exist.
        </h4>
        <Link href="/">
          <div className="goBack">
            Go back to Home Page
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
