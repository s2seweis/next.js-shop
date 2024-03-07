// import Image from 'next/image';
import { Inter } from 'next/font/google';
import Nav from '@/src/components/nav';
import styles from '@/src/styles/CSS/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Nav />

      <main className={`${styles.main} ${inter.className}`}>
        <h3>Hello World2</h3>
      </main>
    </>
  );
}
