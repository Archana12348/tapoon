import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";

import Pr1 from "../../../assests/images/card/card1.webp";
import Pr2 from "../../../assests/images/card/card3.jpg";
import Pr3 from "../../../assests/images/card/card3.jpg";
import Pr4 from "../../../assests/images/card/card3.jpg";
import Pr5 from "../../../assests/images/card/card3.jpg";
import Button from "../../ui/Button";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      product: { name: "Business Card A", default_image: Pr1 },
      price: 200,
      quantity: 1,
      size: { name: "Small" },
      color: { name: "Red" },
    },
    {
      id: 2,
      product: { name: "Business Card B", default_image: Pr2 },
      price: 350,
      quantity: 2,
      size: { name: "Medium" },
      color: { name: "Blue" },
    },
    {
      id: 3,
      product: { name: "Business Card C", default_image: Pr3 },
      price: 500,
      quantity: 1,
      size: { name: "Large" },
      color: { name: "Green" },
    },
  ]);

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Fullscreen Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-auto"
          onClick={onClose}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-[80vh] w-[430px] bg-white z-50 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="font-bold text-sm uppercase">
              Shopping cart ({cartItems.length})
            </h2>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="p-4 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const productName = item.product?.name || "Unnamed Product";
                const productImage = item.product?.default_image || "#";

                return (
                  <div key={item.id} className="flex gap-4 border-b pb-3">
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-[80px] h-[100px] object-cover rounded"
                    />
                    <div className="flex-1 text-sm">
                      <h4 className="font-semibold">{productName}</h4>

                      {item.size && (
                        <p className="text-gray-500">Size: {item.size.name}</p>
                      )}
                      {item.color && (
                        <p className="text-gray-500">
                          Color: {item.color.name}
                        </p>
                      )}

                      <div className="flex justify-between items-center mt-2">
                        <span
                          className="font-semibold"
                          style={{ fontSize: "18.5px" }}
                        >
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <div
                          className="flex items-center gap-2 border rounded-2xl px-2 py-1 bg-gray-200"
                          style={{ marginRight: "-30px" }}
                        >
                          <button
                            className="text-lg px-2"
                            onClick={() => handleDecrease(item.id)}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="text-lg px-2"
                            onClick={() => handleIncrease(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      style={{ marginBottom: "90px" }}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrashAlt className="text-red-600 hover:text-red-800" />
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">Your cart is empty</p>
            )}
          </div>

          {/* Summary & Actions */}
          <div className="p-4 border-t text-sm pb-6 mt-auto">
            <div className="flex justify-between mb-4">
              <span>{cartItems.length} items</span>
              <span className="font-bold text-red-600">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                className="w-1/2  text-white py-2 rounded font-semibold "
                onClick={() => navigate("/cart")}
              >
                VIEW CART
              </Button>
              <button
                className="w-1/2 border border-black py-2 rounded font-semibold hover:bg-gray-100"
                onClick={() => navigate("/payment")}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
