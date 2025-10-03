/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "7.5xl": "88rem", // Custom size between 7xl and full
        ch: "26rem",
      },
    },
  },
  plugins: [],
};
