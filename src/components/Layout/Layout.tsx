import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { SidebarProvider } from '../../context/SidebarContext';
import styles from '../../styles/scss/layout/public/Layout.module.scss';

const Layout = ({ children, login, isAuth }) => {
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