import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../../redux/cartSlice";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function CartStep() {
  const dispatch = useDispatch();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const handleDecrease = (item) => {
    const newQty = Math.max(Number(item.quantity ?? 1) - 1, 0);
    dispatch(updateQuantity({ id: item.id, quantity: newQty }));
  };

  const handleIncrease = (item) => {
    dispatch(
      updateQuantity({ id: item.id, quantity: Number(item.quantity ?? 1) + 1 })
    );
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
        Swal.fire({
          title: "Removed!",
          text: "The item has been removed from your cart.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all items from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire("Cleared!", "Your cart has been emptied.", "success");
      }
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
                  onClick={() => handleRemove(item.id)}
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
              onClick={handleClearCart}
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
