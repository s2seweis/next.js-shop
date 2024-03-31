import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { SidebarProvider } from '../../../utils/context/SidebarContext';
import styles from '../../../styles/scss/layout/admin/AdminLayout.module.scss';
import Footer from '../Admin/FooterAdmin';

const AdminLayout = ({ children, login, isAuth }) => {
  return (
    <SidebarProvider>
      <AdminNavbar />
      <div style={{ display: 'flex', height: '90vh' }}>
        <AdminSidebar />
        <main
          className={styles.content}
          style={{ minHeight: '100vh', margin: 'auto' }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </SidebarProvider>
  );
};

export default AdminLayout;
