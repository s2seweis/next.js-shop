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
          <h3 style={{ textAlign: 'center' }}>Hello Home</h3>
          <h5 style={{ textAlign: 'center', marginTop: '-15px' }}>
            Overview Links:
          </h5>
          {/* Corrected Link components without <a> child */}
          <div className={styles.linkContainer}>
            <Link href="/">Home</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/dashboard">Dashboard (HOC)</Link>
            <Link href="/profile">Profile (Auth Provider)</Link>
            <Link href="/login">Login</Link>
            <Link href="/api/auth/signin">Login With Github 1</Link>
            <Link href="/server">Login With Github 2</Link>
            <Link href="/api/auth/signin">Sign In</Link>
            <Link href="/api/auth/signout">Sign Out</Link>
          </div>
        </main>
      </div>
    </div>
  );
}
