/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'DMenuBG' : "#35393F",
        'DHeaderBG' : '#2B2D31',
        'BGButton' : "#E46643",
        'BGButtonHover' : '#F39765'
      },
      fontFamily: {
        commissioner: ['Commissioner', 'sans-serif'],
        robotoSlab: ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
}