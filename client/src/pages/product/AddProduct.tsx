import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/product/Product.module.scss';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic.tsx';
import AddProductComponent from '../../components/Products/AddProductComponent.js';

const AddProduct = () => {
  return (
    <div className={styles.adminMain}>
      <Nav />
      <div className={styles.adminContainer}>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className={styles.adminContainerAlign}
        >
          <div>
            <h3>Add Products:</h3>

            <AddProductComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IsAuthPublic(AddProduct);
