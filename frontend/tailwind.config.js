/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
      colors: {
        blue:"#3b82f6",
        white:"#ffffff",
        zinc400:"#a1a1aa",
        pink:"#B757DA",
        black:"#000000"
      },
      fontFamily: {
        'mont': ['"Montserrat", sans-serif'],
      }
    },
    plugins: [],
  }
