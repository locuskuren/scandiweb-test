import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client, categoriesQuery } from '../graphql/';

const initialState = {
  loading: false,
  categories: [],
  error: '',
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  () => {
    return client.request(categoriesQuery).then((response) => response);
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
      state.error = '';
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.error.message;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
