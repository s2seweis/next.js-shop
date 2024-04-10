import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userProfile: null,
  status: 'idle',
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3005/userprofile/${userId}`,
      );
      console.log('line:500', response);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async ({ userId, updatedData }) => {
    try {
      const response = await axios.put(
        `http://localhost:3005/userprofile/${userId}`,
        updatedData,
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  },
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
