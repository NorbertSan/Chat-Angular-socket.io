const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.ts",
    "./projects/**/*.html",
    "./projects/**/*.ts",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        bgColor: "#ececec",
        black: {
          light: "#292929",
          dark: "#222222",
        },
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
      },
    },
  },
  variants: {},
  plugins: [],
};
