import React from 'react';
import Navbar from '../Navbar';
import AdminNavbar from './AdminNavbar';
import Sidebar from '../Sidebar';
import AdminSidebar from './AdminSidebar';
// import Footer from './Footer';
import { SidebarProvider } from '../../../context/SidebarContext';
import styles from '../../../styles/scss/layout/main.module.scss';
// import AuthProvider from '../../context/AuthProvider'

const AdminLayout = ({ children, login, isAuth }) => {
  // console.log("line:11", children);
  // console.log("line:12", login);
  // console.log("line:13", logout);
  // console.log("line:14", isAuth);

  return (
    // <AuthProvider>
    <SidebarProvider>
      {/* <Navbar isAuth={isAuth} login={login} /> */}
      <AdminNavbar/>
      <div style={{display:"flex"}}>
      <AdminSidebar/>
      {/* <Sidebar /> */}
      <main className={styles.content} style={{ minHeight: '100vh',margin:"auto" }}>
        {children}
      </main>
      </div>
      {/* <Footer /> */}
    </SidebarProvider>
    // </AuthProvider>
  );
};

export default AdminLayout;
