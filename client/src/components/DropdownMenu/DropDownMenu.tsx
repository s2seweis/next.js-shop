import React, { useState } from 'react';
import {
  AiFillCrown,
  AiFillHeart,
  AiOutlineBars,
  AiFillSetting,
} from 'react-icons/ai';
import { IoPerson } from 'react-icons/io5';
import Link from 'next/link'; // Import Link from next/link
import styles from '../../styles/scss/layout/public/DrowDownMenu.module.scss';
import SignInButton from '../Buttons/SignInButton/SignInButton';
import { useSession } from 'next-auth/react';

const DropdownMenu: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log("line:1", session);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to get the truncated name
  const getTruncatedName = (name: string) => {
    if (!name || name.length <= 0) {
      return 'Guest';
    } else if (name.length <= 10) {
      return name;
    } else {
      return name.substring(0, 10) + '.';
    }
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.icon} onClick={toggleMenu}>
        <IoPerson />
        <div
          style={{
            position: 'absolute',
            marginTop: '-8px',
            marginLeft: '-4px',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              marginLeft: '-60px',
              width: '150px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {getTruncatedName(
              session?.user?.userData?.login || session?.user.name,
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.menu}>
          <Link href="contact/page">
            <div className={styles.menuLink}>
              <AiFillHeart /> Contact
            </div>
          </Link>
          <Link href="/">
            <div className={styles.menuLink}>
              <AiOutlineBars /> Home
            </div>
          </Link>
          <Link href="/profile">
            <div className={styles.menuLink}>
              <IoPerson /> Profile
            </div>
          </Link>
          <SignInButton />
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
