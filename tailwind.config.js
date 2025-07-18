/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: ["important"],
      screens: {
        xs: "500px",
        xxl: "1440px",
      },
    },
  },
  plugins: [],
};
