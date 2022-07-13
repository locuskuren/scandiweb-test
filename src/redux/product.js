import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client, productQuery } from '../graphql';

const initialState = {
  loading: false,
  product: {},
  error: '',
};

export const fetchproduct = createAsyncThunk('product/fetchproduct', (id) => {
  return client.request(productQuery, { id }).then((response) => response);
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
