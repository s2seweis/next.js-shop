import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from '../../styles/scss/layout/navbar.module.scss';
import { useSidebarContext } from '../../context/SidebarContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DropdownMenu from '../DropdownMenu/DropDownMenu';
// import AuthController from '../AuthController/AuthController';
import AnyComponent from '../AnyComponent/AnyComponent.js';

const options = [
  { value: '', label: 'Home' },
  { value: 'contact', label: 'Contact' },
  { value: 'admin', label: 'Admin' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'profile', label: 'Profile' },
  { value: 'login', label: 'Login' },
];

// # - Destructure it and take out direct the properties
const Navbar = ({login, isAuth}) => {
  console.log("line:21", login);
  console.log("line:23", isAuth);
  
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > 100) {
        if (currentScrollPos > prevScrollPos) {
          setIsMenuOpen(false);
          setIsNavbarVisible(false);
        } else {
          setIsNavbarVisible(true);
        }
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleToggleClick = () => {
    toggleSidebar();
    setIsMenuOpen((prev) => !prev);
    setIsNavbarVisible(true);
  };

  return (
    <nav className={`${styles.navbar} ${isNavbarVisible ? '' : styles.hidden}`}>
      <div className={styles.navItem}>
        <div className={styles.sidebarToggle} onClick={handleToggleClick}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className={styles.logoMobile}>
          <img
            style={{ width: '80px', marginRight: '15px' }}
            src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Deutsche_Angestellten-Akademie_Logo.svg"
            alt="Logo"
          />
        </div>
      </div>

      <header className={styles.menu1}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <img
              style={{ width: '80px' }}
              src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Deutsche_Angestellten-Akademie_Logo.svg"
              alt="Logo"
            />
          </div>
          <div className={styles.navLinks}>
            {options.map((option) => (
              <div key={option.value}>
                <Link href={`/${option.value}`}>
                  <span className={styles.navLink}>{option.label}</span>
                </Link>
              </div>
            ))}
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <DropdownMenu />
          </div>
          {/* <AuthController isAuth={isAuth} login={login} /> */}
          <AnyComponent/>
        </nav>
      </header>

      <div className="loginButton" style={{ marginRight: '15px' }}>
        {/* ... */}
      </div>
    </nav>
  );
};

export default Navbar;
