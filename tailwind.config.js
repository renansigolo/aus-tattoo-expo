const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-open-sans)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: colors.pink["500"],
          ...colors.pink,
        },
        secondary: {
          // abffc7
          DEFAULT: colors.emerald["500"],
          ...colors.emerald,
        },
        ate: {
          DEFAULT: "#554D35",
          50: "#B7AC8B",
          100: "#AFA37E",
          200: "#9F9165",
          300: "#877B54",
          400: "#6E6445",
          500: "#554D35",
          600: "#4C442F",
          700: "#423C29",
          800: "#393323",
          900: "#2F2B1D",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
