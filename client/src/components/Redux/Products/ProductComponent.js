import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../redux/slices/productSlice';
import styles from '../../../styles/scss/components/Products.module.scss'; // Importing SCSS module

const ProductComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteProduct = async (productId) => {
    try {
      // Delete the product from the API
      dispatch(deleteProduct(productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.productContainer}>
      <h1>All Products</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.productid} className={styles.productCard}>
            <div className={styles.productInfo}>
              <p className={styles.productName}>{product.productname}</p>
              <p className={styles.productCategory}>Category: {product.category}</p>
              <p className={styles.productPrice}>Price: ${product.price}</p>
            </div>
            <div className={styles.productActions}>
              <button onClick={() => handleDeleteProduct(product.productid)} className={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComponent;
