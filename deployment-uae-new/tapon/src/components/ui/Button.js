// src/components/ui/Button.js
import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "px-4 py-2 rounded-2xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 dark:bg-sky-500 dark:hover:bg-sky-600",
    secondary:
      "bg-black text-white hover:bg-gray-800 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600",
    outline:
      "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-black",
    ghost:
      "text-gray-800 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700",
  };

  let buttonClasses = `${baseStyles} ${variants[variant]} ${className}`;
  if (disabled) {
    buttonClasses += " opacity-50 cursor-not-allowed";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
