import React, { useState } from "react";
import { useSelector } from "react-redux";
import Stepper from "./Stepper";
import CartStep from "./CartStep";
import ReviewStep from "./ReviewStep";
import StepNavigation from "./StepNavigation";
import { fetchUserCart } from "../../../services/Auth/cart";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { items: cart } = useSelector((state) => state.cart);

  // ✅ Helper for custom Tailwind-styled SweetAlert
  const customSwal = (title, text, iconUrl, confirmText = "OK") => {
    Swal.fire({
      html: `
        <div class="flex flex-col items-center text-slate-700">
          <img src="${iconUrl}" alt="icon" class="w-16 h-16 mb-3" />
          <h2 class="text-xl font-semibold text-sky-700 mb-1">${title}</h2>
          <p class="text-slate-600 text-base">${text}</p>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: confirmText,
      customClass: {
        popup:
          "rounded-2xl shadow-xl border border-sky-100 bg-white p-6 animate__animated animate__fadeInDown",
        confirmButton:
          "bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-medium px-5 py-2 rounded-lg",
      },
      buttonsStyling: false,
    });
  };

  // ✅ Go to next step
  const handleNext = () => {
    if (step === 1 && cart.length === 0) {
      customSwal(
        "Your Cart is Empty 🛒",
        "Please add some items before proceeding.",
        "https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
      );
      return;
    }
    setStep(step + 1);
  };

  // ✅ Go to previous step
  const handlePrev = () => setStep(Math.max(1, step - 1));

  // ✅ Handle Stripe payment checkout
  const handlePay = async () => {
    try {
      if (cart.length === 0) {
        customSwal(
          "Cart Required 🛒",
          "Please add items to your cart before checkout.",
          "https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        );
        return;
      }

      // Confirmation popup before payment
      const result = await Swal.fire({
        html: `
        <div class="flex flex-col items-center text-slate-700">
          <img src="https://cdn-icons-png.flaticon.com/512/891/891462.png" alt="payment" class="w-16 h-16 mb-3" />
          <h2 class="text-xl font-semibold text-sky-700 mb-1">Proceed to Payment?</h2>
          <p class="text-slate-600 text-base">You’ll be redirected to our secure Stripe checkout page.</p>
        </div>
      `,
        showCancelButton: true,
        confirmButtonText: "Yes, Pay Now",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        customClass: {
          popup:
            "rounded-2xl shadow-xl border border-sky-100 bg-white p-6 animate__animated animate__fadeInDown",
          confirmButton:
            "bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-medium px-5 py-2 rounded-lg mx-2",
          cancelButton:
            "bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-5 py-2 rounded-lg mx-2",
        },
        buttonsStyling: false,
      });

      if (!result.isConfirmed) return;

      setLoading(true);
      console.log("Initiating checkout with cart items:", cart);

      // ✅ Use pack if available, otherwise quantity
      const payload = {
        nfc_cards: cart.map((item) => ({
          nfc_card_id: item.id,
          quantity: String(item.pack || item.quantity || " "),
          color: item.color || "",
          type: item.type || "",
          pack: String(item.pack || item.quantity || " "),
          material: item.material || "",
          smart_card: item.smart_card ?? false,
        })),
      };

      console.log("Checkout payload JSON:", JSON.stringify(payload, null, 2));

      const data = await fetchUserCart(payload);

      if (data?.session_url) {
        Swal.fire({
          html: `
          <div class="flex flex-col items-center text-slate-700">
            <img src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png" alt="success" class="w-16 h-16 mb-3" />
            <h2 class="text-xl font-semibold text-green-600 mb-1">Redirecting...</h2>
            <p class="text-slate-600 text-base">Please wait while we take you to the payment page.</p>
          </div>
        `,
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup:
              "rounded-2xl shadow-xl border border-green-100 bg-white p-6 animate__animated animate__fadeInDown",
          },
          buttonsStyling: false,
          didClose: () => {
            window.location.href = data.session_url;
          },
        });
      } else {
        customSwal(
          "Checkout Failed ⚠️",
          "Could not start Stripe checkout session. Please try again.",
          "https://cdn-icons-png.flaticon.com/512/463/463612.png",
          "Try Again"
        );
      }
    } catch (error) {
      console.error("Checkout error:", error);
      customSwal(
        "Payment Error 💳",
        error.message || "Payment failed. Please try again later.",
        "https://cdn-icons-png.flaticon.com/512/463/463612.png",
        "Close"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Total Calculation (with pack logic)
  const calculateTotal = () =>
    cart.reduce((acc, item) => {
      const regularPrice = Number(item.regular_price) || 0;
      const salePrice = Number(item.sale_price) || 0;
      const finalPrice = salePrice < regularPrice ? salePrice : regularPrice;

      // use pack if available, else quantity (default 1)
      const multiplier = Number(item.pack) || Number(item.quantity) || 1;

      return acc + finalPrice * multiplier;
    }, 0);

  const totalAmount = calculateTotal();
  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 2,
    }).format(Number(num ?? 0));

  return (
    <div className="min-h-screen flex items-center justify-center py-12 md:py-20 bg-gradient-to-b from-sky-400 via-white/70 to-sky-200 text-slate-800 p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">
        {/* Stepper Header */}
        <Stepper step={step} />

        {/* Step Content */}
        <div className="my-6">
          {step === 1 && <CartStep />}
          {step === 2 && <ReviewStep cart={cart} />}
        </div>

        {/* Navigation */}
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
                disabled={cart.length === 0 || loading}
                className={`px-4 py-2 rounded-lg text-white ${
                  cart.length && !loading
                    ? "bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Redirecting..." : "Pay Now"}
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

        {/* ✅ Total Summary */}
        {cart.length > 0 && (
          <div className="mt-6 text-right border-t pt-3">
            <span className="text-gray-600 text-sm mr-2">
              {cart
                .map((i) =>
                  i.pack ? `${i.pack} Pack` : `${i.quantity ?? 1} Qty`
                )
                .join(" + ")}
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
