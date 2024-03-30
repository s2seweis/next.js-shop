// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import Axios

// Dummy data to be used if no API is available
const dummyData = [
  { productid: 1, productname: 'Dummy Product 1', price: 10.99 },
  { productid: 2, productname: 'Dummy Product 2', price: 19.99 },
  { productid: 3, productname: 'Dummy Product 3', price: 5.49 },
  { productid: 4, productname: 'Dummy Product 4', price: 7.99 },
  { productid: 5, productname: 'Dummy Product 5', price: 14.99 },
  { productid: 6, productname: 'Dummy Product 6', price: 12.49 },
  // Add more dummy data as needed
];


// Define the initial state
const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    // Simulate API availability (set to true for the example)
    // const isApiAvailable = true;
    const isApiAvailable = true;

    if (isApiAvailable) {
      // Fetch from the API
      const response = await axios.get('http://localhost:3005/product');
      // const response = await axios.get('/api/products');
      return response.data;
    } else {
      // Fetch from the local source (dummy data)
      return dummyData;
    }
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
});

// Define the asynchronous thunk for updating a product
export const updateProduct = createAsyncThunk('products/updateProduct', async (productData) => {
  try {
    // Simulate API update (set to true for the example)
    const isApiAvailable = true;

    if (isApiAvailable) {
      // Update product on the API
      const response = await axios.put(`/api/products/${productData.id}`, productData);
      return response.data;
    } else {
      // Simulate local update
      return productData;
    }
  } catch (error) {
    throw new Error('Failed to update product');
  }
});

// Define the asynchronous thunk for deleting a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  console.log("line:2", productId);
  try {
    // Simulate API delete (set to true for the example)
    const isApiAvailable = true;

    if (isApiAvailable) {
      // Delete product from the API
      await axios.delete(`http://localhost:3005/product/${productId}`);
      return productId;
    } else {
      // Simulate local delete
      return productId;
    }
  } catch (error) {
    throw new Error('Failed to delete product');
  }
});

// Create the slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Additional reducers can go here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        // Update product in state
        state.products = state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // Remove deleted product from state
        state.products = state.products.filter(product =>
          product.productid !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
