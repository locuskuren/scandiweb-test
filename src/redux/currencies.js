import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client, currenciesQuery } from '../graphql';

const initialState = {
  loading: false,
  currencies: [],
  selectedCurrency: null,
  error: '',
};

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies',
  () => {
    return client.request(currenciesQuery).then((response) => response);
  }
);

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    selectCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.loading = false;
      state.currencies = action.payload.currencies;
      state.selectedCurrency = state.selectedCurrency
        ? state.selectedCurrency
        : action.payload.currencies[0];
      state.error = '';
    });
    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.loading = false;
      state.currencies = [];
      state.error = action.error.message;
    });
  },
});

export const { selectCurrency } = currenciesSlice.actions;

export const currenciesReducer = currenciesSlice.reducer;
