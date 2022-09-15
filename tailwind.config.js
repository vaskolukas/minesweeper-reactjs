/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kdam': ['"Kdam Thmor Pro"','sans-serif']
      }
    },
  },
  plugins: [],
}
