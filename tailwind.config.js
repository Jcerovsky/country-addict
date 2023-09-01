/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      smTablet: "400px",
      tablet: "640px",

      desktop: "1280px",
    },
  },
  plugins: [],
};
