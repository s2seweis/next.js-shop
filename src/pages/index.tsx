// import Image from 'next/image';
// import { Inter } from 'next/font/google';
import Nav from '@/src/components/nav';
import styles from '@/src/styles/CSS/Home.module.css';
// import AnyComponent from '../components/LoginButton/LoginButton.js';

// const inter = Inter({ subsets: ['latin'] });

export default function Home({ isAuth }) {
  console.log('line:55', isAuth);

  return (
    <>
      <Nav />
      <div className={`${styles.mainContainer}`}>
        <main className={`${styles.main}}`}>
          {/* <main className={`${styles.main} ${inter.className}`}> */}
          <h3 style={{ textAlign: 'center' }}>Hello Home</h3>
          {/* <AnyComponent/> */}
        </main>
      </div>
    </>
  );
}
