"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqData } from "../../data/faq";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-10 md:py-16 bg-gradient-to-r from-sky-400 via-white/10 to-sky-200 text-slate-800"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sky-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sky-700/80">
            Everything you need to know about our NFC business cards.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-sky-300 bg-white/20 backdrop-blur-sm shadow-md hover:shadow-sky-500 transition-all"
            >
              <button
                className="w-full flex justify-between items-center text-left px-6 py-5"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg text-sky-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-6 w-6 text-sky-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 text-sky-700 transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100 pb-4"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
