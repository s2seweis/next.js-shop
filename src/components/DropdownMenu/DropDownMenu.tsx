// DropdownMenu.tsx
import React, { useState } from 'react';
import {
  AiFillCrown,
  AiFillHeart,
  AiOutlineBars,
  AiFillSetting,
} from 'react-icons/ai';
import Link from 'next/link'; // Import Link from next/link
import styles from '../../styles/scss/layout/drowDownMenu.module.scss';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const handleMenuItemClick = (item: string) => {
  const handleMenuItemClick = (item: string) => {
    // console.log(`Clicked on ${item}`);
    // Add your logic here, such as navigating to a different page
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.icon} onClick={toggleMenu}>
        <AiFillCrown />
      </div>
      {isOpen && (
        <div className={styles.menu}>
          <Link href="/contact">
            <div
              className={styles.menuLink}
              onClick={() => handleMenuItemClick('Favorite')}
            >
              <AiFillHeart /> Contact
            </div>
          </Link>
          <Link href="/">
            <div
              className={styles.menuLink}
              onClick={() => handleMenuItemClick('List')}
            >
              <AiOutlineBars /> Home
            </div>
          </Link>
          <Link href="/settings">
            <div
              className={styles.menuLink}
              onClick={() => handleMenuItemClick('Settings')}
            >
              <AiFillSetting /> Settings
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
