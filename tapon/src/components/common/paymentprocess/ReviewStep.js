import React from "react";

export default function ReviewStep({ cart }) {
  console.log("ReviewStep cart:", cart[0].sale_price, cart[0].quantity);
  debugger;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.sale_price * item.quantity,
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
            <span>₹{(item.sale_price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
        <span>Total:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
