import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client, categoryQuery } from '../graphql';

const initialState = {
  loading: false,
  category: {},
  error: '',
};

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  (title) => {
    return client
      .request(categoryQuery, { title })
      .then((response) => response);
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true;
      state.category = {};
      state.error = '';
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload.category;
      state.error = '';
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.category = {};
      state.error = action.error.message;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
