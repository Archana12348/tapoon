import React, { useEffect } from "react";

export default function ReviewStep({ cart }) {
  // Log full cart data including color, pack, material, type, smart_card
  useEffect(() => {
    cart.forEach((item) => {
      console.log("Review Item:", {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        pack: item.pack,
        sale_price: item.sale_price,
        color: item.color ?? null,
        material: item.material ?? null,
        type: item.type ?? null,
        smart_card: item.smart_card ?? null,
      });
    });
  }, [cart]);

  // ✅ Subtotal calculation (using pack if present)
  const subtotal = cart.reduce((sum, item) => {
    const count = Number(item.pack) || Number(item.quantity) || 1;
    return sum + (Number(item.sale_price) || 0) * count;
  }, 0);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>

      <div className="space-y-2">
        {cart.map((item) => {
          const count = Number(item.pack) || Number(item.quantity) || 1;
          const itemTotal = (Number(item.sale_price) || 0) * count;

          return (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{item.name}</span>

                {/* ✅ Pack / Quantity display */}
                <span className="text-sm text-gray-500">
                  {item.pack
                    ? `Pack of ${item.pack}`
                    : `Quantity: ${item.quantity ?? 1}`}
                </span>

                {/* Optional attributes */}
                <div className="text-xs text-gray-400">
                  {item.color && <span>Color: {item.color} </span>}
                  {item.material && <span>| Material: {item.material} </span>}
                  {item.type && <span>| Type: {item.type} </span>}
                  {item.smart_card && <span>| Smart Card</span>}
                </div>
              </div>

              <div className="text-right">
                <span className="block font-medium text-gray-800">
                  AED {itemTotal.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-t pt-4 flex justify-between font-semibold text-gray-800">
        <span>Total:</span>
        <span>AED {subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
