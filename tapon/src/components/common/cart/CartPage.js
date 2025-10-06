import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

// ✅ Dummy Base64 Images
const jeansImg = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...";
const pantsImg = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IC4AA...";
const offerCard = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Slim Fit Jeans", price: 40, quantity: 2, image: jeansImg },
    { id: 2, name: "Formal Pants", price: 35, quantity: 1, image: pantsImg },
    { id: 3, name: "Casual Shirt", price: 25, quantity: 3, image: jeansImg },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [couponApplied, setCouponApplied] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  // ✅ Quantity update
  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  // ✅ Remove item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((i) => i !== id));
  };

  // ✅ Bulk delete
  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    setCartItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

  // ✅ Promo code apply
  const handlePromoApply = () => {
    if (promoCode === "SAVE50") {
      setPromoDiscount(50);
      setPromoMessage("Promo code SAVE50 applied. ₹50 off!");
    } else if (promoCode === "NEW20") {
      setPromoDiscount(20);
      setPromoMessage("Promo code NEW20 applied. ₹20 off!");
    } else {
      setPromoDiscount(0);
      setPromoMessage("Invalid promo code!");
    }
  };

  const handleCouponClick = () => setCouponApplied(true);

  // ✅ Totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = (couponApplied ? 100 : 0) + promoDiscount;
  const total = subtotal - discount;

  // ✅ Recommended items
  const recommendedItems = [
    { id: "r1", title: "Slim Fit Jeans", price: 40, image: jeansImg },
    { id: "r2", title: "Formal Pants", price: 35, image: pantsImg },
    { id: "r3", title: "₹100 Off Coupon Card", price: 0, image: offerCard },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Your Cart</h1>
        {selectedItems.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm sm:text-base"
          >
            Delete Selected ({selectedItems.length})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* Left */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[30px_80px_1fr_auto] sm:grid-cols-[40px_100px_1fr_auto] gap-4 items-start p-4 bg-white shadow rounded-lg"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelection(item.id)}
                className="mt-2"
              />
              <img
                src={item.image}
                alt={item.name}
                className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] object-cover rounded"
              />
              <div>
                <h2 className="text-sm sm:text-base font-semibold">
                  {item.name}
                </h2>
                <div className="mt-2 text-xs sm:text-sm flex items-center bg-gray-200 px-2 py-1 w-max rounded">
                  <strong>Qty:</strong>
                  <button
                    className="px-2 border rounded"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="px-2 border rounded"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="mt-2 text-xs sm:text-sm">
                  <span className="font-bold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 self-start"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-md mx-auto md:mx-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2 text-gray-600 text-sm sm:text-base">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          {couponApplied && (
            <div className="flex justify-between mb-2 text-green-600 text-sm sm:text-base">
              <span>Coupon Applied</span>
              <span>-₹100.00</span>
            </div>
          )}

          {promoDiscount > 0 && (
            <div className="flex justify-between mb-2 text-green-700 text-sm sm:text-base">
              <span>Promo Code</span>
              <span>-₹{promoDiscount.toFixed(2)}</span>
            </div>
          )}

          <hr className="mb-4 border-gray-300" />

          <div className="flex justify-between font-bold text-base sm:text-lg mb-4">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className="flex items-center mb-4 gap-2">
            <input
              type="text"
              placeholder="Add promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-grow bg-gray-100 border px-3 py-2 rounded-full outline-none text-sm"
            />
            <Button
              onClick={handlePromoApply}
              className=" text-white px-4 py-2  font-medium rounded-full text-sm"
            >
              Apply
            </Button>
          </div>

          {promoMessage && (
            <p className="text-xs sm:text-sm mb-2 text-gray-700">
              {promoMessage}
            </p>
          )}

          <Link to="/payment">
            <Button className="w-full  text-white py-3 rounded  font-bold mt-4 text-sm sm:text-base">
              🛍️ CHECKOUT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
