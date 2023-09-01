/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      smTablet: "435px",
      tablet: "750px",

      desktop: "960px",
    },
  },
  plugins: [],
};
