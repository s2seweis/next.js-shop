import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation
import styles from '../../../styles/scss/layout/AdminNavbar.module.scss'; // Import CSS Modules styles
import { SiWolfram } from 'react-icons/si';

const AdminNavbar: React.FC = () => {
  return (
    <nav className={styles.adminNavbar}>
      <h3>Test NavbarAdmin</h3>
      <div className={styles.logo}>
        <Link to="/">
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
    </nav>
  );
};

export default AdminNavbar;
