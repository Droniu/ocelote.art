const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-brutel)", ...defaultTheme.fontFamily.sans],
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        accent: "#1D032D",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "purple-gradient":
          "radial-gradient(at center bottom, #1D032D, #010101);",
      },
      spacing: {
        "screen-2/3": "66vh",
      },
      aspectRatio: {
        photoVertical: "2 / 3",
        photoHorizontal: "3 / 2",
      },
    },
  },
  plugins: [require("tailwindcss-safe-area")],
};
