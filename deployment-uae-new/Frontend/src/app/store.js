// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import profileReducer from "../features/profile/profileSlice";

// Optional: load cart from localStorage
const loadCartState = () => {
  try {
    const serialized = localStorage.getItem("cart");
    if (!serialized) return undefined;
    return { cart: JSON.parse(serialized) };
  } catch (e) {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer, // ✅ add profile slice here
  },
  preloadedState: loadCartState(), // optional only for cart
  devTools: process.env.NODE_ENV !== "production",
});

// Optional: save cart to localStorage on every change
store.subscribe(() => {
  try {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  } catch (e) {}
});

export default store;
