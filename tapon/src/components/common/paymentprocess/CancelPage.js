import React from "react";
import { Link } from "react-router-dom";

export default function FailurePage() {
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-sky-700 mb-3 drop-shadow-sm">
          Payment Failed ❌
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Oops! Something went wrong while processing your payment. Please try
          again or contact support if the issue persists.
        </p>

        <div className="flex justify-center gap-5">
          <Link
            to="/"
            className="inline-block bg-sky-600 text-white px-6 py-2.5 rounded-xl hover:bg-sky-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>

          <Link
            to="/contactus"
            className="inline-block bg-white border border-sky-400 text-sky-700 px-6 py-2.5 rounded-xl hover:bg-sky-100 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
