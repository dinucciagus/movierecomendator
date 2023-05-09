/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://drive.google.com/uc?export=download&id=1BvBWtyAhqAKEnQBjdKAwMDYYQae0XYte')",
      },
      animation: {
        // Bounces 5 times 1s equals 2 seconds
        "pulse-short": "pulse 1s ease-in-out 2",
      },
      colors: {
        richblack: "#071e22",
        blue: "#1d7874",
        grayblue: "#679289",
        light: "#f6f6f3",
        lightred: "#f4c095",
        red: "#ee2e31",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
