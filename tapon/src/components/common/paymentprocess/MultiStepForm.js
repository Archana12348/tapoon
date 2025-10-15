// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import Stepper from "./Stepper";
// import CartStep from "./CartStep";
// import ReviewStep from "./ReviewStep";
// import StepNavigation from "./StepNavigation";
// import { fetchUserCart } from "../../../services/Auth/cart";

// export default function MultiStepForm() {
//   const [step, setStep] = useState(1);
//   const { items: cart } = useSelector((state) => state.cart);
//   const cartItems = useSelector((s) => s.cart.items || []); // adapt to your store
//   const [loading, setLoading] = useState(false);
//   const handleNext = () => {
//     if (step === 1 && cart.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }
//     setStep(step + 1);
//   };

//   const handlePrev = () => setStep(Math.max(1, step - 1));

// ✅ Unified total calculation (same logic as CartStep)
// const calculateTotal = () => {
//   return cart.reduce((acc, item) => {
//     const regularPrice = Number(item.regular_price) || 0;
//     const salePrice = Number(item.sale_price) || 0;
//     const finalPrice = salePrice < regularPrice ? salePrice : regularPrice;
//     return acc + finalPrice * (item.quantity ?? 1);
//   }, 0);
// };

//   const totalAmount = calculateTotal();

//   const API_CREATE_SESSION_URL =
//     "https://nfc.premierwebtechservices.com/api/checkout";

//   const buildPayload = () => ({
//     nfc_cards: cartItems.map((it) => ({
//       nfc_card_id: it.id, // or it.nfc_card_id depending on your store
//       quantity: it.quantity || 1,
//     })),
//   });

//   const handleCheckout = async () => {
//     if (cartItems.length === 0) return alert("Cart is empty");

//     setLoading(true);
//     try {
//       const payload = buildPayload();
//       const token = localStorage.getItem("auth_token"); // adjust key

//       const res = await fetch(API_CREATE_SESSION_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify(payload),
//       });

//       // ✅ Read response as plain text (not JSON)
//       const text = await res.text();

//       if (!res.ok) {
//         console.error("Create session failed:", text);
//         throw new Error(text || "Failed to create session");
//       }

//       // ✅ If server returns URL as plain text, redirect
//       const sessionUrl = text.trim();
//       if (!sessionUrl.startsWith("http")) {
//         throw new Error("Invalid session URL from server");
//       }

//       window.location.href = sessionUrl;
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to start checkout");
//       setLoading(false);
//     }
//   };

// const formatCurrency = (num) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     minimumFractionDigits: 2,
//   }).format(Number(num ?? 0));

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 md:py-20 bg-gradient-to-b from-sky-400 via-white/70 to-sky-200 text-slate-800 p-6">
//       <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6">
//         <Stepper step={step} />

//         <div className="my-6">
//           {step === 1 && <CartStep />}
//           {step === 2 && <ReviewStep cart={cart} />}
//         </div>

//         <div className="flex justify-between pt-4 border-t">
//           {step === 2 ? (
//             <>
//               <button
//                 onClick={handlePrev}
//                 className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handleCheckout}
//                 disabled={loading}
//                 className="bg-sky-600 text-white px-4 py-2 rounded"
//               >
//                 {loading ? "Redirecting to payment..." : "Pay Now"}
//               </button>
//             </>
//           ) : (
//             <StepNavigation
//               step={step}
//               onPrev={handlePrev}
//               onNext={handleNext}
//             />
//           )}
//         </div>

//         {/* ✅ Total Summary (Same logic as CartStep) */}
//         {cart.length > 0 && (
//           <div className="mt-6 text-right border-t pt-3">
//             <span className="text-gray-600 text-sm mr-2">
//               {cart.reduce((sum, i) => sum + Number(i.quantity ?? 1), 0)} items
//             </span>
//             <span className="font-semibold text-lg text-blue-600">
//               {formatCurrency(totalAmount)}
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Stepper from "./Stepper";
import CartStep from "./CartStep";
import ReviewStep from "./ReviewStep";
import StepNavigation from "./StepNavigation";
import { fetchUserCart } from "../../../services/Auth/cart";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { items: cart, totalPrice } = useSelector((state) => state.cart);

  // ✅ Go to next step
  const handleNext = () => {
    if (step === 1 && cart.length === 0) {
      alert("Your cart is empty!");
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
        alert("Your cart is empty!");
        return;
      }

      setLoading(true);

<<<<<<< HEAD
      const payload = {
        amount: Number(totalPrice ?? 0),
        currency: "aed", // 🇦🇪 Dubai Dirham
=======
      // Build payload in the exact format you want
      const payload = {
>>>>>>> f23eb9ebcbd63cf391f575662a86f46ffeaa0246
        nfc_cards: cart.map((item) => ({
          nfc_card_id: item.id,
          quantity: Number(item.quantity ?? 1),
          color: item.color || "", // use empty string if no value
          type: item.type || "",
          pack: item.pack || "",
          material: item.material || "",
          smart_card: item.smart_card ?? false, // boolean
        })),
      };

<<<<<<< HEAD
      console.log("Checkout payload:", payload);
=======
      console.log("Checkout payload JSON:", JSON.stringify(payload, null, 2));
      debugger;
>>>>>>> f23eb9ebcbd63cf391f575662a86f46ffeaa0246

      const data = await fetchUserCart(payload);

      if (data?.session_url) {
        window.location.href = data.session_url;
      } else {
        alert("⚠️ Could not start Stripe checkout session.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
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
>>>>>>> f23eb9ebcbd63cf391f575662a86f46ffeaa0246
  // ✅ Currency Formatter for AED
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

        {/* Step Navigation */}
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
                    ? "bg-blue-600 hover:bg-blue-700"
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

<<<<<<< HEAD
        {/* Total Summary */}
=======
        {/* ✅ Total Summary (Same logic as CartStep) */}
>>>>>>> f23eb9ebcbd63cf391f575662a86f46ffeaa0246
        {cart.length > 0 && (
          <div className="mt-6 text-right border-t pt-3">
            <span className="text-gray-600 text-sm mr-2">
              {cart.reduce((sum, i) => sum + Number(i.quantity ?? 1), 0)} items
            </span>
            <span className="font-semibold text-lg text-blue-600">
<<<<<<< HEAD
              {formatCurrency(totalPrice)}
=======
              {formatCurrency(totalAmount)}
>>>>>>> f23eb9ebcbd63cf391f575662a86f46ffeaa0246
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
