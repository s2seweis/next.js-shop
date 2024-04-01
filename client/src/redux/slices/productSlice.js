import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axios.get('http://localhost:3005/product');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  try {
    await axios.delete(`http://localhost:3005/product/${productId}`);
    return productId;
  } catch (error) {
    throw new Error('Failed to delete product');
  }
});

export const addProduct = createAsyncThunk('products/addProduct', async (data) => {
  try {
    const response = await axios.post(`http://localhost:3005/product`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add product');
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ productId, updatedData }) => {
  try {
    const response = await axios.put(`http://localhost:3005/product/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update product');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product =>
          product.productid !== action.payload
        );
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        // Find the index of the updated product
        const index = state.products.findIndex(product => product.productid === action.payload.productid);
        // Replace the old product with the updated one
        state.products[index] = action.payload;
      });
  },
});

export default productSlice.reducer;
