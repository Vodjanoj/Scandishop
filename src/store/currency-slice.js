import { createSlice } from "@reduxjs/toolkit";

const defaultCurrencyState = {
  setCurrency: { label: "USD", symbol: "$" },
};

const currencySlice = createSlice({
  name: "Currency",
  initialState: defaultCurrencyState,
  reducers: {
    something(state, action) {
      state.setCurrency = action.payload.something;
    }
  }
})

export const currencyActions = currencySlice.actions;
export default currencySlice;