import Nav from '@/src/components/nav';
import styles from '@/src/styles/CSS/Home.module.css';
import Link from 'next/link'; // Import Link component from next/link

interface HomeProps {
  isAuth: boolean; // Specify the type of 'isAuth' as boolean
}

export default function Server({ isAuth }: HomeProps) {
  return (
    <div>
      <Nav />
      <div className={`${styles.mainContainer}`}>
        <main className={`${styles.main}}`}>
          <h3 style={{ textAlign: 'center' }}>Hello Server</h3>        
        </main>
      </div>
    </div>
  );
}
