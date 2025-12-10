// SectionIntro.jsx
import React from "react";

const SectionIntro = ({ label, title, subtitle }) => {
  return (
    <div className="mb-12 text-center">
      {label && (
        <p className="mb-1 text-md uppercase tracking-wider text-cyan-400">
          {label}
        </p>
      )}
      <h2 className="mb-4 text-xl font-bold text-black sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <p className="mx-auto max-w-2xl text-lg text-sky-900">{subtitle}</p>
    </div>
  );
};

export default SectionIntro;
