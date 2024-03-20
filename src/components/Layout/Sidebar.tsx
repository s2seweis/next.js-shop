// Sidebar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FaRegWindowClose, FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { useSidebarContext } from '../../context/SidebarContext';
import Link from 'next/link';
import styles from '../../styles/scss/layout/sidebar.module.scss'; // Import your CSS Modules styles
import { menuItems } from './menuItems';
// import AuthButton from '../AuthButton/AuthButton';
import SignInButton from '../SignInButton/SignInButton';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem('activeMenu');
    const storedActiveSubMenu = localStorage.getItem('activeSubMenu');

    if (isSidebarOpen) {
      // Only update state if the sidebar is open
      setActiveMenu(
        storedActiveMenu || getActiveMenu(window.location.pathname),
      );
      setActiveSubMenu(storedActiveSubMenu || null);
    }
  }, [isSidebarOpen]);

  const handleMenuClick = (menu: string) => {
    setActiveSubMenu((prevSubMenu) => (prevSubMenu === menu ? null : menu));
    localStorage.setItem('activeSubMenu', menu);

    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
    localStorage.setItem('activeMenu', menu);
  };

  const isSubMenuActive = (menu: string) => activeSubMenu === menu;

  const isLinkActive = (href: string) => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === href;
    }
    return false;
    // return false;
  };

  const getActiveMenu = (path: string) => {
    return path === '/'
      ? 'Home'
      : menuItems.find((item) => item.path === path)?.title || null;
  };

  const renderSubMenu = (submenus: { title: string; path: string }[]) => (
    <div className={styles.submenu}>
      {submenus.map((submenu) => (
        <Link key={submenu.path} href={submenu.path}>
          <span
            className={`${styles.submenuLink} ${
              isLinkActive(submenu.path) ? styles.active : ''
            }`}
          >
            {submenu.title}
          </span>
        </Link>
      ))}
    </div>
  );

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current && event.target === overlayRef.current) {
      toggleSidebar();
    }
  };

  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
      <div
        className={styles.overlay}
        ref={overlayRef}
        onClick={handleOverlayClick}
      ></div>
      <div className={styles.sidebarToggle} onClick={toggleSidebar}>
        <FaRegWindowClose />
      </div>
      <nav className={styles.nav}>
        <div
          className="logo"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <img
            style={{ width: '80px', marginTop: '40px' }}
            src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Deutsche_Angestellten-Akademie_Logo.svg"
            alt="Logo"
          />
        </div>
        <div className={styles.navLinks}>
          {menuItems.map((menuItem) => (
            <span
              key={menuItem.path || menuItem.title}
              className={`${styles.navLink} ${
                isSubMenuActive(menuItem.title) ? styles.active : ''
              }`}
              onClick={() => handleMenuClick(menuItem.title)}
            >
              {menuItem.title}{' '}
              {menuItem.submenus && isSubMenuActive(menuItem.title) ? (
                <FaAngleDown style={{ right: '28px', position: 'absolute' }} />
              ) : (
                <FaAngleRight style={{ right: '28px', position: 'absolute' }} />
              )}
              {menuItem.submenus &&
                isSubMenuActive(menuItem.title) &&
                renderSubMenu(menuItem.submenus)}
            </span>
          ))}
        </div>
        <div className="controllerContainer" style={{ marginTop: '60%' }}>
          {/* <AuthButton /> */}
          <SignInButton/>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
