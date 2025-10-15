import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/cartSlice";
import { fetchUserCart } from "../../../services/Auth/cart";

export default function SuccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const clearAllCarts = async () => {
      try {
        // ✅ Clear localStorage
        localStorage.removeItem("cart");
        localStorage.removeItem("cartItems");

        // ✅ Clear Redux cart
        dispatch(clearCart());

        debugger;
        console.log("✅ Cart cleared successfully after payment.");
        debugger;
      } catch (e) {
        console.error("Unexpected cart clear error:", e);
      }
    };

    clearAllCarts();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-sky-300 p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 max-w-lg w-full text-center border border-sky-200">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-sky-100 border-4 border-sky-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-sky-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-sky-700 mb-3 drop-shadow-sm">
          Payment Successful
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Thank you for your purchase! Your payment has been processed
          successfully.
        </p>

        <div className="flex justify-center gap-5">
          <Link
            to="/"
            className="inline-block bg-sky-600 text-white px-6 py-2.5 rounded-xl hover:bg-sky-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>

          <Link
            to="/orders"
            className="inline-block bg-white border border-sky-400 text-sky-700 px-6 py-2.5 rounded-xl hover:bg-sky-100 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
