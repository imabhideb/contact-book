/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('./assets/background.jpg')",
      },
      fontFamily: {
        title: ["Work Sans", "sans-serif"],
      },
      colors: {
        bdr: "rgba(255, 255, 255, 0.5)",
        login: "#162938",
      },
    },
  },
  plugins: [],
};

