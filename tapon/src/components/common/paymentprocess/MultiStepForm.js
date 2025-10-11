import React, { useState } from "react";
import { useSelector } from "react-redux";
import Stepper from "./Stepper";
import CartStep from "./CartStep";
import ReviewStep from "./ReviewStep";
import StepNavigation from "./StepNavigation";
import { fetchUserCart } from "../../../services/Auth/cart";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { items: cart, totalPrice } = useSelector((state) => state.cart);

  const handleNext = () => {
    if (step === 1 && cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => setStep(Math.max(1, step - 1));

  const handlePay = async () => {
    try {
      const payload = {
        amount: Number(totalPrice ?? 0),
        currency: "inr",
        nfc_cards: cart.map((item) => ({
          nfc_card_id: item.id,
          quantity: Number(item.quantity ?? 1),
        })),
      };

      console.log("Checkout payload:", payload);
      debugger;

      const data = await fetchUserCart(payload);

      if (data?.session_url) {
        window.location.href = data.session_url;
      } else {
        alert("⚠️ Could not start Stripe checkout session.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error.message || "Payment failed.");
    }
  };

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
                onClick={handlePay}
                disabled={cart.length === 0}
                className={`px-4 py-2 rounded-lg text-white ${
                  cart.length
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Pay Now
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

        {/* Optional total summary */}
        {cart.length > 0 && (
          <div className="mt-6 text-right border-t pt-3">
            <span className="text-gray-600 text-sm mr-2">
              {cart.reduce((sum, i) => sum + Number(i.quantity ?? 1), 0)} items
            </span>
            <span className="font-semibold text-lg text-blue-600">
              ₹{Number(totalPrice ?? 0).toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
