import { gql } from 'graphql-request';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../graphql/client';

const initialState = {
  loading: false,
  categories: [],
  error: '',
};

const query = gql`
  {
    categories {
      name
    }
  }
`;

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  () => {
    return client.request(query).then((response) => response);
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
