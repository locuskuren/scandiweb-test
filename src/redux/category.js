import { gql } from 'graphql-request';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../graphql/client';

const initialState = {
  loading: false,
  category: {},
  error: '',
};

const query = gql`
  query getCategory($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        brand
        name
        inStock
        gallery
        attributes {
          id
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  (title) => {
    return client.request(query, { title }).then((response) => response);
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
