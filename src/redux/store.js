import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartreducer } from './cart';

import { categoryReducer } from './category';
import { currenciesReducer } from './currencies';
import { productReducer } from './product';
import { categoriesReducer } from './categories';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currencies', 'cart'],
};

const reducers = combineReducers({
  currencies: currenciesReducer,
  category: categoryReducer,
  categories: categoriesReducer,
  product: productReducer,
  cart: cartreducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
