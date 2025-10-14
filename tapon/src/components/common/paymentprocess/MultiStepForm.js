import React, { useState } from "react";
import { useSelector } from "react-redux";
import Stepper from "./Stepper";
import CartStep from "./CartStep";
import ReviewStep from "./ReviewStep";
import StepNavigation from "./StepNavigation";
import { fetchUserCart } from "../../../services/Auth/cart";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { items: cart } = useSelector((state) => state.cart);
  const cartItems = useSelector((s) => s.cart.items || []); // adapt to your store
  const [loading, setLoading] = useState(false);
  const handleNext = () => {
    if (step === 1 && cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => setStep(Math.max(1, step - 1));

  // ✅ Unified total calculation (same logic as CartStep)
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const regularPrice = Number(item.regular_price) || 0;
      const salePrice = Number(item.sale_price) || 0;
      const finalPrice = salePrice < regularPrice ? salePrice : regularPrice;
      return acc + finalPrice * (item.quantity ?? 1);
    }, 0);
  };

  const totalAmount = calculateTotal();

  const API_CREATE_SESSION_URL =
    "https://nfc.premierwebtechservices.com/api/checkout";

  const buildPayload = () => ({
    nfc_cards: cartItems.map((it) => ({
      nfc_card_id: it.id, // or it.nfc_card_id depending on your store
      quantity: it.quantity || 1,
    })),
  });

  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Cart is empty");

    setLoading(true);
    try {
      const payload = buildPayload();

      // If you use token-based auth:
      const token = localStorage.getItem("auth_token"); // adjust key

      const res = await fetch(API_CREATE_SESSION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // If your backend uses cookie-based auth (Laravel Sanctum), use:
        // credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Create session failed:", data);
        throw new Error(data.message || JSON.stringify(data));
      }

      // server returns session_url per your backend code
      const sessionUrl = data.session_url || data.url || data.session?.url;
      if (!sessionUrl) throw new Error("No session_url returned from server");

      // redirect to Stripe Checkout (same tab)
      window.location.href = sessionUrl;
      // OR open in new tab: window.open(sessionUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to start checkout");
      setLoading(false);
    }
  };

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(Number(num ?? 0));

  return (
    <div className="min-h-screen flex items-center justify-center py-12 md:py-20 bg-gradient-to-b from-sky-400 via-white/70 to-sky-200 text-slate-800 p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">
        <Stepper step={step} />

        <div className="my-6">
          {step === 1 && <CartStep />}
          {step === 2 && <ReviewStep cart={cart} />}
        </div>

        <div className="flex justify-between pt-4 border-t">
          {step === 2 ? (
            <>
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200"
              >
                Previous
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="bg-sky-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Redirecting to payment..." : "Pay Now"}
              </button>
            </>
          ) : (
            <StepNavigation
              step={step}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}
        </div>

        {/* ✅ Total Summary (Same logic as CartStep) */}
        {cart.length > 0 && (
          <div className="mt-6 text-right border-t pt-3">
            <span className="text-gray-600 text-sm mr-2">
              {cart.reduce((sum, i) => sum + Number(i.quantity ?? 1), 0)} items
            </span>
            <span className="font-semibold text-lg text-blue-600">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
