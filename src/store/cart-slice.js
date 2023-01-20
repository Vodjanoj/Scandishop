import { createSlice, current } from "@reduxjs/toolkit";

const defaultCartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState: defaultCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      console.log("payload", newItem);
      state.totalQuantity++;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      if (!existingCartItem) {
        state.items = state.items.concat(newItem);
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };

        const updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        state.items = [...updatedItems];
      }
    },

    removeFromCart(state, action) {
      const itemId = action.payload;
      state.totalQuantity--;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === itemId
      );

      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== itemId);
        state.items = [...updatedItems];
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        state.items = [...updatedItems];
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;


 