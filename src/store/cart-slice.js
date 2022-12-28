import { createSlice, current } from "@reduxjs/toolkit";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState: defaultCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      console.log("payload", newItem);
      state.totalAmount++;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          selectedAttributes: newItem.selectedAttributes,
          name: newItem.name,
          brand: newItem.brand,
          attributes: newItem.attributes,
          quantity: 1,
        });
      } else {
        console.log("existingItem", current(existingItem));
        existingItem.quantity++;
      }
      console.log("current-state,", current(state));
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
