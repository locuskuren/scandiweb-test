import { gql } from 'graphql-request';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../graphql/client';

const initialState = {
  loading: false,
  product: {},
  error: '',
};

const query = gql`
  query getProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
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
      brand
    }
  }
`;

export const fetchproduct = createAsyncThunk('product/fetchproduct', (id) => {
  return client.request(query, { id }).then((response) => response);
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productReset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchproduct.pending, (state) => {
      state.loading = true;
      state.product = [];
      state.error = '';
    });
    builder.addCase(fetchproduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
      state.error = '';
    });
    builder.addCase(fetchproduct.rejected, (state, action) => {
      state.loading = false;
      state.product = [];
      state.error = action.error.message;
    });
  },
});

export const { productReset } = productSlice.actions;

export const productReducer = productSlice.reducer;
