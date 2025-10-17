import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/cartSlice";

export default function SuccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const clearAllCarts = async () => {
      try {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartItems");
        dispatch(clearCart());
        console.log("✅ Cart cleared successfully after payment.");
      } catch (e) {
        console.error("Unexpected cart clear error:", e);
      }
    };

    clearAllCarts();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-sky-300 p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 sm:p-10 max-w-lg w-full text-center border border-sky-200">
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

        <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-700 mb-3 drop-shadow-sm">
          Payment Successful
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Thank you for your purchase! Your payment has been processed
          successfully.
        </p>

        {/* Responsive buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-4 md:gap-6 lg:gap-1">
          <Link
            to="/"
            className="w-full sm:w-auto bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition-all duration-300 shadow-md hover:shadow-lg text-center"
          >
            Back to Home
          </Link>

          <Link
            to="/orders"
            className="w-full sm:w-auto bg-white border border-sky-400 text-sky-700 px-6 py-3 rounded-xl hover:bg-sky-100 transition-all duration-300 shadow-sm hover:shadow-md text-center"
          >
            View Orders
          </Link>

          <Link
            to="/profile/create"
            className="w-full sm:w-auto bg-white border border-sky-400 text-sky-700 px-6 py-3 rounded-xl hover:bg-sky-100 transition-all duration-300 shadow-sm hover:shadow-md text-center"
          >
            Add Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
