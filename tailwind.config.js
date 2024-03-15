/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        blue: {
          nba: "#17408B",
        },
        red: {
          nba: "#C9072A",
        },
      },
    },
    container: {
      screens: {
        md: "768px",
        lg: "1024px",
      },
      center: true,
      padding: "15px",
    },
  },
  plugins: [],
};
