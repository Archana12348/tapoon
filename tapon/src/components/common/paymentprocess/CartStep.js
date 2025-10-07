// src/pages/CartStep.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../../redux/cartSlice";
import { Trash2 } from "lucide-react";

export default function CartStep() {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const handleDecrease = (item) => {
    const newQty = Math.max(item.quantity - 1, 0);
    dispatch(updateQuantity({ id: item.id, quantity: newQty }));
  };

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(num || 0);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              {/* Left side: Image + Info */}
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />

                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">
                    {formatCurrency(item.price)}
                  </p>
                </div>
              </div>

              {/* Right side: Actions */}
              <div className="flex items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Total & Clear Button */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="text-sm text-red-600 hover:underline"
            >
              Clear Cart
            </button>
            <div className="font-semibold text-right">
              Total: {formatCurrency(totalPrice)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
