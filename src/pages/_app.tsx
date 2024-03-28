import React, { useState, useEffect } from 'react';
import AuthProvider from '../context/AuthProviderMerged';
import Loader from '../components/Loader/Loader'; // Import the Loader component
import '../styles/scss/global.scss';
import { ProSidebarProvider } from 'react-pro-sidebar';
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
      <ProSidebarProvider>
        {loading ? (
          <Loader /> // Show the loader while loading
        ) : (
          <Router>
            <Component {...pageProps} isAuth={isAuth} />
          </Router>
        )}
      </ProSidebarProvider>
    </AuthProvider>
  );
};

export default App;
