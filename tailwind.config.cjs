/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#13192A",
        secondary: "#192439",
        purple: "#353A8E",
        purpleHover: "#272c70",
        green: "#009F7D",
        greenHover: "#00755C",
      },
    },
  },
  plugins: [],
};
