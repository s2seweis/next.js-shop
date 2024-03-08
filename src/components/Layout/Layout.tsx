import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { SidebarProvider } from '../../context/SidebarContext';
import styles from '../../styles/scss/layout/main.module.scss';

const Layout = ({ children, login, isAuth }, props) => {
  // console.log("line:11", children);
  // console.log("line:12", login);
  // console.log("line:13", logout);
  // console.log("line:14", isAuth);

  return (
    <SidebarProvider>
      <Navbar isAuth={isAuth} login={login} />
      <Sidebar />
      <main className={styles.content} style={{ minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
    </SidebarProvider>
  );
};

export default Layout;
