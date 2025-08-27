/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // You can add custom colors here if needed
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
      },
    },
  },
  plugins: [],
}