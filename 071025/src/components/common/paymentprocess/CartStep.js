import React from "react";
import { Trash2 } from "lucide-react"; // trash icon

export default function CartStep({ cart, updateQty, removeItem }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              {/* Left side: Image + Info */}
              <div className="flex items-center gap-3">
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />

                {/* Product Info */}
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Right side: Actions */}
              <div className="flex items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() =>
                      updateQty(item.id, Math.max(item.qty - 1, 0))
                    }
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-semibold">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
