import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, updateProduct, deleteProduct } from '../../../redux/slices/productSlice';
import styles from '../../../styles/scss/components/Products.module.scss'; // Importing SCSS module

const ProductComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  console.log("line:1", products);

  const [products1, setproducts1] = useState(products);
  console.log("line:2", products1);

  useEffect(() => {
    setproducts1(products); // Dispatch products state to products1 state
  }, [products]); // Trigger useEffect whenever products state changes

  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 

  // Local state to manage the edited product names
  const [editedNames, setEditedNames] = useState({});
  const [editedPrices, setEditedPrices] = useState({});

//   const [newProducts, setNewProducts] = useState(products);
//   console.log("line:1", newProducts);

  const handleUpdate = (productId, newName) => {
    
    console.log("State to be dispatched:", { id: productId, name: newName }); // Log the state to be dispatched
    dispatch(updateProduct({ id: productId, name: newName }));
  };

//   const handleDelete = (productId) => {
//     dispatch(deleteProduct(productId));
//   };

const handleDelete = (productId) => {
    // Remove the product from the const products array
    const updatedProducts = products1.filter(product => product.id !== productId);
    // Update the local state
    setproducts1(updatedProducts);
    // Dispatch deleteProduct action to remove product from Redux store
    dispatch(deleteProduct(productId));
  };

  const handleNameChange = (productId, newName) => {
    setEditedNames({
      ...editedNames,
      [productId]: newName
    });
  };

  const handlePriceChange = (productId, newPrice) => {
    setEditedPrices({
      ...editedPrices,
      [productId]: newPrice
    });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles['product-container']}>
      <h1>Products</h1>
      <ul>
        {products1.map((product) => (
          <li key={product.productid}>
            {/* Input field for editing the product name */}
            <input
              type="text"
              value={editedNames[product.productid] || product.productname} // Use editedName if available, otherwise use the product name
              onChange={(event) => handleNameChange(product.productid, event.target.value)}
            />
             {/* Input field for editing the product price */}
             <input
              type="text"
              value={editedPrices[product.productid] || product.price}
              onChange={(event) => handlePriceChange(product.productid, event.target.value)}
            />
            {/* Button to update the product name */}
            <button onClick={() => handleUpdate(product.productid, editedNames[product.productid] || product.productname)}>Update</button>
            {/* Button to delete the product */}
            <button onClick={() => handleDelete(product.productid)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductComponent;
