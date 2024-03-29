import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import font awesome icons
import styles from '../../../styles/scss/layout/admin/FooterAdmin.module.scss'; // Import CSS Modules styles

const FooterAdmin: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socialLinks}>
          <a href="https://www.facebook.com/" className={styles.socialIcon}>
            <FaFacebook />
          </a>
          <h5>a product from ...</h5>
        </div>
        <p className={styles.copyRight}>
          &copy; {new Date().getFullYear()} Your need some instructions?
        </p>
      </div>
    </footer>
  );
};

export default FooterAdmin;
