import React, { useEffect } from "react";

export default function ReviewStep({ cart }) {
  // Log full cart data including color, pack, material, type, smart_card
  useEffect(() => {
    cart.forEach((item) => {
      console.log("Review Item:", {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        sale_price: item.sale_price,
        color: item.color ?? null,
        pack: item.pack ?? null,
        material: item.material ?? null,
        type: item.type ?? null,
        smart_card: item.smart_card ?? null,
      });
    });
  }, [cart]);

  // Subtotal calculation
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.sale_price ?? 0) * (item.quantity ?? 1),
    0
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>

      <div className="space-y-2">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>
              AED{((item.sale_price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
        <span>Total:</span>
        <span>AED{subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
