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
    (s, i) => s + (i.quantity || 0) * (Number(i.sale_price) || 0),
    0
  );
  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload; // expected: { id, name, price, ..., quantity? }

      console.log("--- ADD TO CART ---");
      console.log("Incoming product:", product);
      console.log("Cart before:", JSON.stringify(state.items));

      debugger; // Open browser dev tools to pause execution here

      const qtyToAdd = product.quantity ?? 1;

      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        console.log(`Product exists. Increasing quantity by ${qtyToAdd}`);
        existing.quantity += qtyToAdd;
        existing.pack = product.pack || existing.pack;
        existing.color = product.color || existing.color;
        existing.material = product.material || existing.material;
        existing.type = product.type || existing.type;
        existing.smart_card = product.smart_card || existing.smart_card;
      } else {
        console.log("New product. Adding to cart.");
        state.items.push({ ...product, quantity: qtyToAdd });
      }

      // Recalculate totals from all items
      const totals = calcTotals(state.items);

      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      console.log("Cart after:", JSON.stringify(state.items));
      console.log("Total Quantity:", state.totalQuantity);
      console.log("Total Price:", state.totalPrice);
      console.log("Total Price:", totals);
      console.log("-------------------");
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
