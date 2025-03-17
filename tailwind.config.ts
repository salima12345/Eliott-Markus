import purgeCSSPlugin from '@fullhuman/postcss-purgecss';
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: { max: "480px" }, // Extra-small devices
      sm: { min: "481px" }, // Small mobile
      md: { min: "601px" }, // Tablets
      lg: { min: "769px"}, // Large tablets / small laptops
      xl: { min: "1025px" }, // Small desktops
      "2xl": { min: "1281px" }, // Large desktops
      "3xl": { min: "1441px" }, // Extra-large screens
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grayDark: "#222222",
        grayLight: "#454545",
      },
      backgroundColor: {
        'dark-primary': '#000000',
        'light-primary': '#f2f1ef'
      },
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
      },
    },
  },
  plugins: [
    require('cssnano')({
      preset: 'default',
    }),
    purgeCSSPlugin({
      content: ['./**/*.html']
    }),
   
  ],
};
