/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "darkness",
  purge: ["./src/**/*.html", "./src/**/*.vue"],
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        "social-btn-hover": "#f7f7f7",
      },
    },
  },
  plugins: [],
};
