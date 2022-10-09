import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface CartState {
  items: string[];
}
const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload;
    },
    // Store actions
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeOneFromCart: (state, action) => {
      const index = state.items.findIndex((cartItem) => cartItem === action.payload);
      let newCart = [...state.items];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else console.warn(`Can't remove product {code: ${action.payload}} as its not in the cart}`);
      state.items = newCart;
    },
    removeGroupedFromBasket: (state, action) => {
      let newCart = state.items.filter((item) => item !== action.payload);
      state.items = newCart;
    },
  },
});

export const { addToCart, removeOneFromCart, hydrate } = cartSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectCartItems = (state: AppState) => state.cart.items;

export default cartSlice.reducer;
