import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../../redux/cartSlice";
import { Trash2 } from "lucide-react";

export default function CartStep() {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );

  // Log cart data whenever it changes
  useEffect(() => {
    console.log("Cart Data:", { items, totalPrice, totalQuantity });
  }, [items, totalPrice, totalQuantity]);

  const handleDecrease = (item) => {
    const newQty = Math.max(Number(item.quantity ?? 1) - 1, 0);
    dispatch(updateQuantity({ ...item, quantity: newQty }));
    console.log("Decreased Item:", { ...item, quantity: newQty });
  };

  const handleIncrease = (item) => {
    const newQty = Number(item.quantity ?? 1) + 1;
    dispatch(updateQuantity({ ...item, quantity: newQty }));
    console.log("Increased Item:", { ...item, quantity: newQty });
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
    console.log("Removed Item:", {
      id: item.id,
      color: item.color ?? null,
      pack: item.pack ?? null,
      material: item.material ?? null,
      type: item.type ?? null,
      smart_card: item.smart_card ?? null,
    });
  };

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(Number(num ?? 0));

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
              {/* Product Info */}
              <div className="flex items-center gap-3">
                <img
                  src={item.card_image ?? "/placeholder.png"}
                  alt={item.name ?? "Product"}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div>
                  <p className="font-medium">
                    {item.name ?? "Unnamed Product"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {formatCurrency(item.sale_price ?? item.price ?? 0)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                  >
                    −
                  </button>
                  <span className="px-3 py-1">{item.quantity ?? 1}</span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="flex justify-between items-center mt-4 border-t pt-3">
            <button
              onClick={() => dispatch(clearCart())}
              className="text-sm text-red-600 hover:underline"
            >
              Clear Cart
            </button>
            <div className="text-right">
              <div className="text-sm text-gray-500">{totalQuantity} items</div>
              <div className="font-semibold text-lg text-blue-600">
                Total: {formatCurrency(totalPrice)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
