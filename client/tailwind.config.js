/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow:{
        magentaGlow: '0 6px 20px rgba(153, 0, 51, 1.3)',
      },
    },
  },
  plugins: [],
};