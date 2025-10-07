import React, { useState } from "react";
import Stepper from "./Stepper";
import CartStep from "./CartStep";
import DetailsStep from "./DetailsStep";
import ReviewStep from "./ReviewStep";
import StepNavigation from "./StepNavigation";
import { fetchUserCart } from "../../../services/Auth/cart";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const [cart, setCart] = useState([
    { id: 1, name: "React Handbook", price: 29.99, qty: 1 },
  ]);

  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    confirmEmail: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // cart helpers
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, Number(qty)) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  // details helpers
  const handleDetailsChange = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const copy = { ...errors };
      delete copy[field];
      setErrors(copy);
    }
  };

  const validateStep2 = () => {
    const e = {};
    if (!details.fullName.trim()) e.fullName = "Full name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))
      e.email = "Valid email required";
    if (details.email !== details.confirmEmail)
      e.confirmEmail = "Emails do not match";
    if (!details.address.trim()) e.address = "Address required";
    return e;
  };

  const handleNext = () => {
    if (step === 1) {
      if (cart.length === 0) {
        alert("Cart is empty!");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const e = validateStep2();
      if (Object.keys(e).length) {
        setErrors(e);
        return;
      }
      setStep(3);
    }
  };

  const handlePrev = () => setStep((s) => Math.max(1, s - 1));

  const handlePay = async () => {
    try {
      const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      const payload = {
        amount: subtotal,
        currency: "inr",
        nfc_cards: cart.map((item) => ({
          nfc_card_id: item.id,
          quantity: item.qty,
        })),
      };

      // Create Stripe session
      const data = await fetchUserCart(payload);
      console.log("Full API Response:", data);

      if (data?.session_url) {
        console.log("➡️ Redirecting to Stripe Checkout:", data.session_url);
        window.location.href = data.session_url; // user leaves your site
        return;
      }

      alert("⚠️ Could not start Stripe checkout session.");
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
          {step === 1 && (
            <CartStep
              cart={cart}
              updateQty={updateQty}
              removeItem={removeItem}
            />
          )}
          {step === 2 && (
            <DetailsStep
              details={details}
              onChange={handleDetailsChange}
              errors={errors}
            />
          )}
          {step === 3 && <ReviewStep cart={cart} details={details} />}
        </div>

        <div className="flex justify-between pt-4 border-t">
          {step === 3 ? (
            <>
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200"
              >
                Previous
              </button>
              <button
                onClick={handlePay}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
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
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import Stepper from "./Stepper";
// import CartStep from "./CartStep";
// import DetailsStep from "./DetailsStep";
// import ReviewStep from "./ReviewStep";
// import StepNavigation from "./StepNavigation";

// export default function MultiStepForm() {
//   const [step, setStep] = useState(1);

//   const [cart, setCart] = useState([
//     { id: 1, name: "React Handbook", price: 29.99, qty: 1 },
//     { id: 2, name: "Pro Subscription", price: 9.99, qty: 2 },
//   ]);

//   const [details, setDetails] = useState({
//     fullName: "",
//     email: "",
//     confirmEmail: "",
//     address: "",
//     phone: "",
//   });

//   const [errors, setErrors] = useState({});

//   // cart helpers
//   const updateQty = (id, qty) => {
//     setCart((prev) =>
//       prev
//         .map((i) => (i.id === id ? { ...i, qty: Math.max(0, Number(qty)) } : i))
//         .filter((i) => i.qty > 0)
//     );
//   };

//   const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

//   // details helpers
//   const handleDetailsChange = (field, value) => {
//     setDetails((prev) => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       const copy = { ...errors };
//       delete copy[field];
//       setErrors(copy);
//     }
//   };

//   const validateStep2 = () => {
//     const e = {};
//     if (!details.fullName.trim()) e.fullName = "Full name required";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))
//       e.email = "Valid email required";
//     if (details.email !== details.confirmEmail)
//       e.confirmEmail = "Emails do not match";
//     if (!details.address.trim()) e.address = "Address required";
//     return e;
//   };

//   const handleNext = () => {
//     if (step === 1) {
//       if (cart.length === 0) {
//         alert("Cart is empty!");
//         return;
//       }
//       setStep(2);
//     } else if (step === 2) {
//       const e = validateStep2();
//       if (Object.keys(e).length) {
//         setErrors(e);
//         return;
//       }
//       setStep(3);
//     }
//   };

//   const handlePrev = () => setStep((s) => Math.max(1, s - 1));

//   const handlePay = () => {
//     alert("Payment Successful (mock)");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center  p-6">
//       <div className="border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md rounded-xl w-full max-w-3xl p-6">
//         <Stepper step={step} />

//         <div className="my-6">
//           {step === 1 && (
//             <CartStep
//               cart={cart}
//               updateQty={updateQty}
//               removeItem={removeItem}
//             />
//           )}
//           {step === 2 && (
//             <DetailsStep
//               details={details}
//               onChange={handleDetailsChange}
//               errors={errors}
//             />
//           )}
//           {step === 3 && <ReviewStep cart={cart} details={details} />}
//         </div>

//         <div className="flex justify-between pt-4 border-t">
//           {step === 3 ? (
//             <>
//               <button
//                 onClick={handlePrev}
//                 className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={handlePay}
//                 className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//               >
//                 Pay Now
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
//       </div>
//     </div>
//   );
// }
