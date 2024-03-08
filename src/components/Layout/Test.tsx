import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import FaTimes for the close icon
import Select, { ActionMeta, SingleValue } from 'react-select';
import styles from '../../../styles/layout/navbar.module.scss';
import { useSidebarContext } from '../../../context/SidebarContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: '', label: 'Home' },
  { value: 'posts', label: 'Posts' },
  { value: 'calender', label: 'Calender' },
];

const Navbar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  console.log('Line:20', isSidebarOpen);

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOptionChange = (
    newValue: SingleValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => {
    if (newValue && 'value' in newValue) {
      router.push(`/${newValue.value}`);
      setIsMenuOpen(false); // Close the menu when an option is selected
    }
  };

  const handleToggleClick = () => {
    toggleSidebar();
    setIsMenuOpen((prev) => !prev); // Toggle the menu state
  };

  return (
    <nav style={{ display: 'flex' }} className={styles.navbar}>
      <div className={styles.navItem}>
        <div className={styles.sidebarToggle} onClick={handleToggleClick}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
          {/* {isMenuOpen ? <FaTimes /> : <FaBars />} */}
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
        </nav>
      </header>

      <div className="loginButton" style={{ marginRight: '15px' }}></div>

      <Select
        className={styles.select}
        options={options}
        defaultValue={options[0]}
        onChange={handleOptionChange}
      />
    </nav>
  );
};
