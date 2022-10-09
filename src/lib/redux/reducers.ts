import { combineReducers } from "@reduxjs/toolkit";

import cart from "./cart/cartSlice";

const rootReducers = combineReducers({
  cart,
});

export default rootReducers;
