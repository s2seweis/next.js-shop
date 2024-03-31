import Nav from '@/src/components/Nav/Nav';
import styles from '@/src/styles/scss/pages/product/Product.module.scss';
import IsAuthPublic from '@/src/utils/routes/isAuthPublic';
// import ProductComponent from '../../components/Redux/Products/ProductComponent.js'

const UpdateProducts = () => {
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
            <h3>UpdateProducts:</h3>
           
            {/* <ProductComponent /> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default IsAuthPublic(UpdateProducts);
