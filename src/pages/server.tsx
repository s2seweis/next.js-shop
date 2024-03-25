import Nav from '@/src/components/nav';
import styles from '@/src/styles/scss/pages/Server.module.scss';
import Link from 'next/link'; // Import Link component from next/link

interface HomeProps {
  isAuth: boolean; // Specify the type of 'isAuth' as boolean
}

export default function Server({ isAuth }: HomeProps) {
  return (
    <div className={styles.serverMain}>
      <Nav />
      <div className={styles.serverContainer}>
        <main className={styles.serverContainerAlign}>
          <h3 style={{ textAlign: 'center' }}>Hello Server</h3>
        </main>
      </div>
    </div>
  );
}
