import React from "react";
import Button from "../../ui/Button";

export default function StepNavigation({ step, onPrev, onNext }) {
  return (
    <div className="flex justify-between w-full">
      <Button
        onClick={onPrev}
        disabled={step === 1}
        className="px-4 py-2 rounded-lg border disabled:opacity-50"
      >
        Previous
      </Button>
      <Button onClick={onNext} className="px-4 py-2 rounded-lg">
        Next
      </Button>
    </div>
  );
}
