import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from '../../styles/scss/components/products/AddProductComponent.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct } from '../../redux/slices/productSlice';

const categoryOptions = [
  { value: 'Nike', label: 'Nike' },
  { value: 'Puma', label: 'Puma' },
  { value: 'Adidas', label: 'Adidas' },
];

const AddProductsComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  console.log('line:1', products);
  // const status = useSelector((state) => state.products.status);
  // const error = useSelector((state) => state.products.error);

  const [formData, setFormData] = useState({
    ProductName: '',
    Price: '',
    Category: null,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const data = {
    ProductName: formData.ProductName,
    Price: formData.Price,
    // Category: formData.Category,
    Category: formData.Category?.value,
  };
  console.log('line:2', data);

  const handleAddProduct = async (e, data) => {
    e.preventDefault(); // Prevent form submission
    try {
      dispatch(addProduct(data));
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Use a regular expression to allow any characters for ProductName
    const newValue =
      name === 'ProductName' ? value : value.replace(/[^0-9.]/g, '');

    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, Category: selectedOption });
  };

  useEffect(() => {
    dispatch(fetchProducts());
    setIsLoading(false);
  }, []);

  return (
    <div className={styles.postRequestContainer}>
      <h2 className={styles.productsHeading}>Add AddProducts</h2>
      <form
        className={styles.formPost}
        onSubmit={(e) => handleAddProduct(e, data)}
      >
        <div className={styles.formGroup}>
          <label htmlFor="ProductName">Product Name:</label>
          <input
            type="text"
            id="ProductName"
            name="ProductName"
            value={formData.ProductName}
            onChange={handleInputChange}
            required
            placeholder="Enter product name"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Price">Price:</label>
          <input
            type="text"
            id="Price"
            name="Price"
            value={formData.Price}
            onChange={handleInputChange}
            required
            pattern="^\d+(\.\d{1,2})?$"
            placeholder="Enter price"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Category">Category:</label>
          <Select
            id="Category"
            name="Category"
            value={formData.Category}
            onChange={handleCategoryChange}
            options={categoryOptions}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <button className={styles.submitButton} type="submit">
            Add Product
          </button>
        </div>
      </form>
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      {isLoading ? (
        <p>Loading...4</p>
      ) : (
        <div className={styles.userDataContainer}>
          <h3>Product Data:</h3>
          <div className={styles.userList}>
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.productid} className={styles.productCard}>
                  <p className={styles.productName}>{product.productname}</p>
                  <p className={styles.productPrice}>${product.price}</p>
                  <p className={styles.productCategorya}>{product.category}</p>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductsComponent;
