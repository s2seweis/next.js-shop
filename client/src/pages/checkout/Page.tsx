import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/checkout/Checkout.module.scss';
import Link from 'next/link'; // Import Link component from next/link
import IsAuthUser from '@/src/utils/authHocs/isAuthUser';

interface HomeProps {
  isAuth: boolean; // Specify the type of 'isAuth' as boolean
}

const Checkout = () => {
  return (
    <div className={styles.serverMain}>
      <Nav />
      <div className={styles.serverContainer}>
        <main className={styles.serverContainerAlign}>
          <h3 style={{ textAlign: 'center' }}>Hello Checkout</h3>
        </main>
      </div>
    </div>
  );
};

export default IsAuthUser(Checkout);
