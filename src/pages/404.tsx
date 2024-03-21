import Link from 'next/link';
import { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  return (
    <div
      style={{ marginTop: '150px', justifyContent: 'center', display: 'flex' }}
      className="container"
    >
      <div style={{ display: 'grid' }}>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">
          Oops! The page you're looking for does not exist.
        </p>
        <Link href="/">
          <span className="text-blue-600 underline cursor-pointer">
            Go back to Home Page
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
