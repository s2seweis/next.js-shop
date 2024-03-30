import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/components/Counter.module.scss';
import IsAuthPublic from '@/src/routes/isAuthPublic';

// import { ProductComponent } from '@/src/components/Redux/Products/Products.js';
import ProductComponent from '../components/Redux/Products/ProductComponent.js'
// import { ProductComponent } from '../components/Redux/Products/Products.js';

const Products = () => {
  return (
    <div className={styles.adminMain}>
      <Nav />
      <div className={styles.adminContainer}>
        <main
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className={styles.adminContainerAlign}
        >
          <div>
            <h3>Products Overview:</h3>
           
            <ProductComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IsAuthPublic(Products);
