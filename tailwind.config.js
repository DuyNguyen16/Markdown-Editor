/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'DMenuBG' : "#35393F",
        'DHeaderBG' : '#2B2D31',
        'DContainerBG' : '#1D1F22',
        'DBG' : '#151619',
        'BGButton' : "#E46643",
        'BGButtonHover' : '#F39765',

        'WBG' : "#FFFFFF",
        'WContainerBG' : "#F5F5F5"
      },
      fontFamily: {
        commissioner: ['Commissioner', 'sans-serif'],
        robotoSlab: ['Roboto Slab', 'serif'],
      },
      textColor: {
        'colour-gray' : '#c1c4cb',
        'myOrange' : "#E46643",
      }
    },
  },
  plugins: [],
}