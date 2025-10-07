// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // each item: { id, name, price, image, quantity, ... }
  totalQuantity: 0,
  totalPrice: 0,
};

// 🔴 Replace existing calcTotals() with this:
const calcTotals = (items) => {
  const totalQuantity = items.length; // unique product count only
  const totalPrice = items.reduce(
    (s, i) => s + (i.quantity || 0) * (Number(i.price) || 0),
    0
  );
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload; // expect { id, name, price, ... , quantity? }
      const qtyToAdd = product.quantity ?? 1;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += qtyToAdd;
      } else {
        state.items.push({ ...product, quantity: qtyToAdd });
      }
      const totals = calcTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      const totals = calcTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      item.quantity = Math.max(0, Number(quantity) || 0);
      if (item.quantity === 0) {
        state.items = state.items.filter((i) => i.id !== id);
      }
      const totals = calcTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
