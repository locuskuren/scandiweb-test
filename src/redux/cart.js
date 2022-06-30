import { createSlice } from '@reduxjs/toolkit';
import objectEqualityCheck from '../util/objectEqualityCheck';

const initialState = {
  items: [],
  itemsQuantity: 0,
  totalPrice: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) =>
        item.id === action.payload.id &&
        (!item.selectedAttributes ||
          objectEqualityCheck(
            item.selectedAttributes,
            action.payload.selectedAttributes
          ))
          ? true
          : false
      );

      if (existingItem) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id &&
          (!item.selectedAttributes ||
            objectEqualityCheck(
              item.selectedAttributes,
              action.payload.selectedAttributes
            ))
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        state.items.push(action.payload);
      }

      state.itemsQuantity = state.items.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
      );

      const allPrices = state.items
        .map((item) =>
          item.prices.map((price) => ({
            totalPrice: item.quantity * price.amount,
            label: price.currency.label,
          }))
        )
        .flat();

      const prices = {};
      allPrices.forEach((price) =>
        prices[price.label]
          ? (prices[price.label] += price.totalPrice)
          : (prices[price.label] = price.totalPrice)
      );

      state.totalPrice = prices;
    },

    increaseQuantity: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id &&
        (!item.selectedAttributes ||
          objectEqualityCheck(
            item.selectedAttributes,
            action.payload.selectedAttributes
          ))
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      state.itemsQuantity = state.items.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
      );

      const allPrices = state.items
        .map((item) =>
          item.prices.map((price) => ({
            totalPrice: item.quantity * price.amount,
            label: price.currency.label,
          }))
        )
        .flat();

      const prices = {};
      allPrices.forEach((price) =>
        prices[price.label]
          ? (prices[price.label] += price.totalPrice)
          : (prices[price.label] = price.totalPrice)
      );

      state.totalPrice = prices;
    },

    decreaseQuantity: (state, action) => {
      state.items = state.items
        .map((item) => {
          if (
            item.id === action.payload.id &&
            (!item.selectedAttributes ||
              objectEqualityCheck(
                item.selectedAttributes,
                action.payload.selectedAttributes
              ))
          ) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        })
        .filter((item) => item.quantity > 0);

      state.itemsQuantity = state.items.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
      );

      const allPrices = state.items
        .map((item) =>
          item.prices.map((price) => ({
            totalPrice: item.quantity * price.amount,
            label: price.currency.label,
          }))
        )
        .flat();

      const prices = {};
      allPrices.forEach((price) =>
        prices[price.label]
          ? (prices[price.label] += price.totalPrice)
          : (prices[price.label] = price.totalPrice)
      );

      state.totalPrice = prices;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export const cartreducer = cartSlice.reducer;
