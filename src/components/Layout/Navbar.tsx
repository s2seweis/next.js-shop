import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { SiWolfram } from "react-icons/si";
import styles from '../../styles/scss/layout/navbar.module.scss';
import { useSidebarContext } from '../../context/SidebarContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DropdownMenu from '../DropdownMenu/DropDownMenu';
// import SignInButton from '../SignInButton/SignInButton';

const options = [
  { value: '', label: 'Home' },
  { value: 'contact/page', label: 'Contact' },
  // { value: 'admin', label: 'Admin' },
  // { value: 'dashboard', label: 'Dashboard' },
  // { value: 'profile', label: 'Profile' },
  { value: 'register', label: 'Register' },
  { value: 'auth/signIn/page', label: 'Sign In' },
];
// # - Destructure it and take out direct the properties
const Navbar = ({ login, isAuth }) => {
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
        {/* <div className={styles.logoMobile}>
          <img
            style={{ width: '80px', marginRight: '15px' }}
            src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Deutsche_Angestellten-Akademie_Logo.svg"
            alt="Logo"
          />
        </div> */}

        <div className={styles.logo}>
          <Link href="/">
            <div style={{ cursor: 'pointer' }}>
              <div style={{ width: '80px', fontSize: "4rem", display: "flex", color:"white" }}>
                <SiWolfram />
              </div>
            </div>
          </Link>
        </div>

      </div>

      <header className={styles.menu1}>
        <nav className={styles.navbar}>
          {/* <div className={styles.logo}>
            <img
              style={{ width: '80px' }}
              src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Deutsche_Angestellten-Akademie_Logo.svg"
              alt="Logo"
            />
          </div> */}

          <div className={styles.logo}>
            <Link href="/">
              <div style={{ cursor: 'pointer' }}>
                <div style={{ width: '80px', fontSize: "4rem", display: "flex", color:"white" }}>
                  <SiWolfram />
                </div>
              </div>
            </Link>
          </div>

          <div className={styles.navLinks}>
            {options.map((option) => (
              <div key={option.value}>
                <Link
                  className={styles.linkContainer}
                  href={`/${option.value}`}
                >
                  <span className={styles.navLink}>{option.label}</span>
                </Link>
              </div>
            ))}
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}></div>
          <DropdownMenu />
          {/* <SignInButton /> */}
        </nav>
      </header>
      <div
        className="dropDownContainer"
        style={{
          display: 'flex',
          alignItems: 'center',
          right: '25%',
          position: 'absolute',
        }}
      >
        <DropdownMenu />
        {/* <SignInButton /> */}
      </div>
    </nav>
  );
};

export default Navbar;
