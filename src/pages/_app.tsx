import React, { useState, useEffect } from 'react';
// import { AppProps } from 'next/app';
import AuthProvider from '../context/AuthProviderMerged';
import Layout from '../components/Layout/Layout';
import Loader from '../components/Loader/Loader'; // Import the Loader component
import '../styles/scss/global.scss';
import AppRouter from '../pages/AppRouter.js';
// import AppRouterNew from '../pages/AppRouterNew/AppRouterNew.js';
import { BrowserRouter as Router } from 'react-router-dom';

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(true);

  const login = () => {
    // Toggle the value of isAuth
    const updatedIsAuth = !isAuth;

    // Set the updated value using setIsAuth
    setIsAuth(updatedIsAuth);
  };

  useEffect(() => {
    // Simulate some asynchronous operation
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a delay of 2 seconds
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <AuthProvider>
      {loading ? (
        <Loader /> // Show the loader while loading
      ) : (
        // <Layout
        //   login={login} // Pass login function as a prop
        //   isAuth={isAuth} // Pass isAuth state as a prop
        // >
        <Router>
          <Component {...pageProps} isAuth={isAuth} />
        </Router>
        // </Layout>
      )}
    </AuthProvider>
  );
};

export default App;
