import React from "react";

export default function ReviewStep({ cart }) {
  console.log("ReviewStep cart:", cart);

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(Number(num ?? 0));

  // ✅ Same logic as CartStep
  const subtotal = cart.reduce((acc, item) => {
    const regularPrice = Number(item.regular_price) || 0;
    const salePrice = Number(item.sale_price) || 0;
    const finalPrice = salePrice < regularPrice ? salePrice : regularPrice;
    return acc + finalPrice * (item.quantity ?? 1);
  }, 0);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>

      <div className="space-y-3">
        {cart.map((item) => {
          const regularPrice = Number(item.regular_price) || 0;
          const salePrice = Number(item.sale_price) || 0;
          const quantity = Number(item.quantity ?? 1);
          const hasDiscount = salePrice < regularPrice;

          const itemTotal = (hasDiscount ? salePrice : regularPrice) * quantity;

          return (
            <div
              key={item.id}
              className="flex justify-between items-start  pb-2"
            >
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500 text-sm ml-1">× {quantity}</span>
              </div>

              {/* ✅ Item Total */}
              <span className="font-semibold text-gray-800">
                {formatCurrency(itemTotal)}
              </span>
            </div>
          );
        })}
      </div>

      {/* ✅ Grand Total */}
      <div className="mt-4 border-t pt-4 flex justify-between font-semibold text-sky-600 text-lg">
        <span>Total:</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
    </div>
  );
}
