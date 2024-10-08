/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#fe4a55",
      },
      backgroundColor: {
        "primary-color": "#fe4a55",
      },
    },
  },
  plugins: [],
});
