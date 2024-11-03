

/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        customLightYellow: '#F9F1E7',
        customStrongYellow: '#B88E2F',
        customBlack: '#3A3A3A',
        customGrey: '#616161'
      },
      height: {
        'h-6/7': '90%'
      }
    },
  },
  plugins: [],
}