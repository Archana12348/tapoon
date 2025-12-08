import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import img from "../../assests/images/card/card4.png";

// ForgotPasswordPage.jsx
// Single-file responsive React component using Tailwind CSS
// Usage: place this component in your React app (e.g. src/pages/ForgotPasswordPage.jsx)
// Make sure Tailwind CSS is configured in your project.

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const validateEmail = (value) => {
    // basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://nfc.premierwebtechservices.com/api/password/email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      console.log("response", res);
      debugger;

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to request password reset.");
      }

      setMessage(
        data.message ||
          "If this email is registered, we've sent password reset instructions. Check your inbox."
      );
      setEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-3xl w-full grid grid-cols-1  md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left visual column */}
        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-sky-400 via-white/70 to-sky-200 text-black">
          <h2 className="text-2xl font-semibold mb-2">Forgot your password?</h2>
          <p className="text-sm opacity-90 text-center">Enter your email</p>

          <div className="mt-6 w-full">
            <img
              src={img}
              alt="reset password illustration"
              className="w-full rounded-xl opacity-95 shadow-inner"
            />
          </div>
        </div>

        {/* Right form column */}
        <div className="p-8 md:p-10">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Reset password
            </h1>
            <p className="text-sm text-sky-800 mb-6">
              Enter the email associated with your account
            </p>

            {message && (
              <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200 text-green-800">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-sky-800">
                  Email address
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="mt-2 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                />
              </label>

              <Button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-semibold shadow-sm
                  ${
                    loading
                      ? "bg-sky-300 cursor-wait"
                      : "bg-sky-600 hover:bg-sky-700"
                  }`}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : null}

                <span>{loading ? "Sending..." : "Send reset link"}</span>
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
              <Link
                to="/sign-in"
                className="block text-sky-600 font-semibold hover:underline"
              >
                Back to Login
              </Link>
            </div>

            <div className="mt-8 text-xs text-gray-400 text-center">
              Tip: If you don't see the email, check your Spam folder or try
              again.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
