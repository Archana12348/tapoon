import React from "react";

export default function ReviewStep({ cart, details }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Review & Confirm</h2>
      <div className="grid md:grid-cols-2 gap-4 ">
        <div className="border rounded p-3 bg-sky-200">
          <h3 className="font-semibold mb-2">Cart Summary</h3>
          {cart.map((i) => (
            <div key={i.id} className="flex justify-between text-sm mb-1">
              <span>
                {i.name} x {i.qty}
              </span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="text-right font-bold">Total: ${total.toFixed(2)}</div>
        </div>

        <div className="border rounded p-3 bg-sky-200">
          <h3 className="font-semibold mb-2">Your Details</h3>
          <p>
            <strong>Name:</strong> {details.fullName}
          </p>
          <p>
            <strong>Email:</strong> {details.email}
          </p>
          <p>
            <strong>Address:</strong> {details.address}
          </p>
          <p>
            <strong>Phone:</strong> {details.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
