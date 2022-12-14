import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currency-slice";
import cartSlice from './cart-slice'

const store = configureStore({
  reducer: { currency: currencySlice.reducer, cart: cartSlice.reducer},
});

export default store;
