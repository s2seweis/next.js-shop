// passwordSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  password: null,
  status: 'idle',
  error: null,
};

export const fetchPassword = createAsyncThunk(
  'password/fetchPassword',
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3005/password/${userId}`,
      );
      console.log('line:500', response);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user password');
    }
  },
);

export const updatePassword = createAsyncThunk(
  'password/updatePassword',
  async ({ userId, formData }) => {
    console.log("line:1", userId);
    console.log("line:2", formData);
    try {
      const response = await axios.put(
        `http://localhost:3005/password/${userId}`,
        formData,
      );
      console.log("line:888", response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user password');
    }
  },
);

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.password = action.payload;
      })
      .addCase(fetchPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.password = action.payload;
      });
  },
});

export default passwordSlice.reducer;
