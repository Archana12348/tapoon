import React from "react";

const Step = ({ num, label, active, done }) => (
  <div className="flex flex-col items-center flex-1">
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
        done
          ? "bg-sky-700 border-sky-700 text-white"
          : active
          ? "border-sky-600 text-blue-600"
          : "border-gray-300 text-gray-400"
      }`}
    >
      {done ? "✓" : num}
    </div>
    <span className="mt-2 text-sm text-sky-900">{label}</span>
  </div>
);

export default function Stepper({ step }) {
  return (
    <div className="flex items-center relative">
      <Step num={1} label="Cart" active={step === 1} done={step > 1} />
      <div
        className={`flex-1 h-1 mx-2 ${step > 1 ? "bg-sky-600" : "bg-gray-300"}`}
      />
      <Step num={2} label="Details" active={step === 2} done={step > 2} />
      <div
        className={`flex-1 h-1 mx-2 ${step > 2 ? "bg-sky-600" : "bg-gray-300"}`}
      />
      <Step num={3} label="Review" active={step === 3} done={false} />
    </div>
  );
}
