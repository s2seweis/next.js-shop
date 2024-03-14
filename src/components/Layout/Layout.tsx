import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { SidebarProvider } from '../../context/SidebarContext';
import styles from '../../styles/scss/layout/main.module.scss';
// import AuthProvider from '../../context/AuthProvider'

const Layout = ({ children, login, isAuth }, props) => {
  // console.log("line:11", children);
  // console.log("line:12", login);
  // console.log("line:13", logout);
  // console.log("line:14", isAuth);

  return (
    // <AuthProvider>
      <SidebarProvider>
        <Navbar isAuth={isAuth} login={login} />
        <Sidebar />
        <main className={styles.content} style={{ minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
      </SidebarProvider>
    // </AuthProvider>
  );
};

export default Layout;
