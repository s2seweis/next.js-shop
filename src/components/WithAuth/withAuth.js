// withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Placeholder function, replace it with your actual authentication check
const isAuthenticated = () => {
  // Your authentication logic here, e.g., checking if the user is logged in
  // For demonstration purposes, always returning true
  return true;
};

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if user is authenticated, redirect if not
      if (!isAuthenticated()) {
        router.push('/login');
      }
    }, []);

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
