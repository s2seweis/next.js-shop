import React, { useState, useEffect } from 'react';
import AuthProvider from '../context/AuthProviderMerged';
import Loader from '../components/Loader/Loader'; // Import the Loader component
import '../styles/scss/global.scss';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter as Router } from 'react-router-dom';

import { store, persistor } from '../redux/store.js'; // Import store and persistor
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

const App = ({ Component, pageProps }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate some asynchronous operation
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a delay of 2 seconds
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}> {/* Use PersistGate */}
        <AuthProvider>
          <ProSidebarProvider>
            {loading ? (
              <Loader /> // Show the loader while loading
            ) : (
              <Router>
                <Component 
                />
              </Router>
            )}
          </ProSidebarProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
