import { useState, useEffect } from 'react';
import Nav from '@/src/components/nav';
import styles from '@/src/styles/CSS/Home.module.css';
import Link from 'next/link';
// import UserCard from '../components/Usercard/UserCard';
// import { getServerSession } from 'next-auth/next';
import { useSession } from "next-auth/react"
import { options } from '../app/api/auth/[...nextauth]/options';

interface HomeProps {
  isAuth: boolean;
}

export default function Home({ isAuth }: HomeProps) {
  const { data: session } = useSession()
  console.log("line: 1", session);
  
  // const [session, setSession] = useState(null);
  // console.log("line:1", session);

  console.log('line:3', isAuth);

  return (
    <div>
      {session !== null ? (
      // {session !== null ? (
        <div>
          <Nav />
          <div className={`${styles.mainContainer}`}>
            <main className={`${styles.main}}`}>
              <h3 style={{ textAlign: 'center' }}>Hello Home</h3>
              <h5 style={{ textAlign: 'center', marginTop: '-15px' }}>
                Overview Links:
              </h5>
              <div className={styles.linkContainer}>
                <Link href="/">Home</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/admin">Admin</Link>
                <Link href="/dashboard">Dashboard (HOC)</Link>
                <Link href="/profile">Profile (Auth Provider)</Link>
                <Link href="/login">Login</Link>
                <Link href="/api/auth/signin">Login With Github 1</Link>
                <Link href="/server">Server</Link>
                <Link href="/api/auth/signin">Sign In</Link>
                <Link href="/api/auth/signout">Sign Out</Link>
              </div>
            </main>
          </div>
        </div>
      ) : (

        <div style={{marginTop:"100px", textAlign:"center"}}>
          <h1 className="text-5xl">You Shall Not Pass!</h1>
        </div>
      )}
    </div>
  );
}
