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
