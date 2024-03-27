import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { SidebarProvider } from '../../../context/SidebarContext';
import styles from '../../../styles/scss/layout/main.module.scss';

const AdminLayout = ({ children, login, isAuth }) => {
  return (
    <SidebarProvider>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <AdminSidebar />
        <main
          className={styles.content}
          style={{ minHeight: '100vh', margin: 'auto' }}
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
