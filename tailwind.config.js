/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#212124", // Dark gray/black
        "custom-forest": "#243325", // Dark forest green
        "custom-lime": "#E5FD72", // Bright lime
        "custom-black": "#161718", // Deep black
      },
    },
  },
  plugins: [],
};
