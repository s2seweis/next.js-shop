import React from 'react';
import Link from 'next/link';
import styles from '../../../styles/scss/layout/admin/AdminNavbar.module.scss';
import { SiWolfram } from 'react-icons/si';

const AdminNavbar: React.FC = () => {
  return (
    <nav className={styles.adminNavbar}>
      <div className={styles.adminNavbarContainer}>
        <div className={styles.adminNavbarTitle}>
          <h3>Admin Area</h3>
        </div>
        <div className={styles.logo}>
          <Link href="/">
            <div style={{ cursor: 'pointer' }}>
              <div
                style={{
                  width: '80px',
                  fontSize: '4rem',
                  display: 'flex',
                  color: 'white',
                }}
              >
                <SiWolfram />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
