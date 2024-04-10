import React, { useState, useEffect } from 'react';
import styles from '../../styles/scss/components/products/UpdateProduct.module.scss';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, updateProduct } from '../../redux/slices/productSlice';

const categoriesOptions = [
  { value: 'Adidas', label: 'Adidas' },
  { value: 'Nike', label: 'Nike' },
  { value: 'Puma', label: 'Puma' },
];

const UpdateProducts = () => {
  const [updateFormData, setUpdateFormData] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]); // Dispatch only when status changes

  const handleToggleUpdateForm = (productId) => {
    setUpdateFormData((prevFormData) => {
      if (selectedProductId !== productId) {
        const productToUpdate =
          products.length > 0
            ? products.find((product) => product.productid === productId)
            : undefined;

        return {
          ...prevFormData,
          [productId]: { ...productToUpdate } || {},
        };
      }

      return prevFormData;
    });

    setSelectedProductId((prevProductId) =>
      prevProductId === productId ? null : productId,
    );
  };

  const handleUpdateFormDataChange = (productId, field, value) => {
    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      [productId]: { ...prevFormData[productId], [field]: value },
    }));
  };

  const handleUpdateProduct = async (e, productId) => {
    e.preventDefault();
    const { productname, price, category } = updateFormData[productId] || {};

    try {
      await dispatch(
        updateProduct({
          productId,
          updatedData: { productname, price, category },
        }),
      );
      setSelectedProductId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className={styles.updateContainer}>
      <h2 className={styles['update-request-heading']}>Update Products</h2>
      {status === 'loading' ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div>
          {products.length > 0 ? (
            <div>
              {products.map((product) => (
                <div
                  key={product.productid}
                  className={`${styles['product-container']} ${
                    selectedProductId === product.productid ? styles.open : ''
                  }`}
                >
                  <div className={styles['product-info']}>
                    <span className={styles['product-name']}>
                      {product.productname}
                    </span>
                    <button
                      className={`${styles['toggle-button']} ${
                        selectedProductId === product.productid
                          ? styles.red
                          : ''
                      }`}
                      onClick={() => handleToggleUpdateForm(product.productid)}
                    >
                      {selectedProductId === product.productid
                        ? 'Close'
                        : 'Open Profile'}
                    </button>
                  </div>
                  {selectedProductId === product.productid && (
                    <form
                      onSubmit={(e) =>
                        handleUpdateProduct(e, product.productid)
                      }
                      className={styles.updateForm}
                    >
                      <div className={styles.formFields}>
                        <label htmlFor={`newName_${product.productid}`}>
                          Product ID:
                        </label>
                        <input
                          type="number"
                          id={`newName_${product.productid}`}
                          placeholder="Product ID"
                          value={
                            updateFormData[product.productid]?.productid || ''
                          }
                          onChange={(e) =>
                            handleUpdateFormDataChange(
                              product.productid,
                              'productid',
                              e.target.value,
                            )
                          }
                          disabled
                          className={styles.inputField}
                        />
                        <label htmlFor={`newName_${product.productid}`}>
                          Product Name:
                        </label>
                        <input
                          type="text"
                          id={`newName_${product.productid}`}
                          placeholder="Enter new name"
                          value={
                            updateFormData[product.productid]?.productname || ''
                          }
                          onChange={(e) =>
                            handleUpdateFormDataChange(
                              product.productid,
                              'productname',
                              e.target.value,
                            )
                          }
                          className={styles.inputField}
                        />
                        <label htmlFor={`newPrice_${product.productid}`}>
                          price:
                        </label>
                        <input
                          type="number"
                          id={`newPrice_${product.productid}`}
                          placeholder="Enter price"
                          value={updateFormData[product.productid]?.price || ''}
                          onChange={(e) =>
                            handleUpdateFormDataChange(
                              product.productid,
                              'price',
                              e.target.value,
                            )
                          }
                          className={styles.inputField}
                        />
                        <label htmlFor={`newCategory_${product.productid}`}>
                          Category:
                        </label>
                        <Select
                          id={`newCategory_${product.productid}`}
                          options={categoriesOptions}
                          value={{
                            value:
                              updateFormData[product.productid]?.category || '',
                            label:
                              updateFormData[product.productid]?.category || '',
                          }}
                          onChange={(selectedOption) =>
                            handleUpdateFormDataChange(
                              product.productid,
                              'category',
                              selectedOption.value,
                            )
                          }
                        />
                      </div>
                      <div className={styles['form-fields-second']}>
                        <button
                          type="submit"
                          className={styles['update-button']}
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateProducts;
