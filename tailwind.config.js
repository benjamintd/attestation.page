module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: { 700: "#0C2C95", 500: "#3754B2" },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
