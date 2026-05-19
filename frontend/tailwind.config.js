/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-yellow': '#f5c842',
        'warm-yellow-dark': '#d4a017',
        'cream': '#f9f5f0',
        'cream-light': '#fef9ec',
        'matte-black': '#1a1a1a',
        'soft-gray': '#f3f4f6',
        'soft-green': '#e8f5e9', // For subtle nature/freshness accents
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}