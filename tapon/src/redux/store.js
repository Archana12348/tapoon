// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// लोडिंग / persist (localStorage) — optional पर बहुत handy
const loadState = () => {
  try {
    const serialized = localStorage.getItem("cart");
    if (!serialized) return undefined;
    return { cart: JSON.parse(serialized) };
  } catch (e) {
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadState(),
  devTools: process.env.NODE_ENV !== "production",
});

// हर बार state बदलने पर cart को localStorage में save करें
store.subscribe(() => {
  try {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  } catch (e) {
    // ignore
  }
});

export default store;
