import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userPreference: null,
  status: 'idle',
  error: null,
};

export const fetchUserPreference = createAsyncThunk(
  'userPreference/fetchUserPreference',
  async (userId) => {
    console.log("line:100", userId);
    try {
      const response = await axios.get(
        `http://localhost:3005/user-preference/${userId}`,
      );
      console.log("line:200", response);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  },
);

export const updateUserPreference = createAsyncThunk(
  'userPreference/updateUserPreference',
  async ({ userId, formData }) => {
    console.log("line:100", userId);
    console.log("line:200", formData);
    try {
      const response = await axios.put(
        `http://localhost:3005/user-preference/${userId}`,
        formData,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  },
);

const userPreferenceSlice = createSlice({
  name: 'userPreference',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPreference.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPreference.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userPreference = action.payload;
      })
      .addCase(fetchUserPreference.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserPreference.fulfilled, (state, action) => {
        state.userPreference = action.payload;
      });
  },
});

export default userPreferenceSlice.reducer;
