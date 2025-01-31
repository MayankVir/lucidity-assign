/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#212124",
        "custom-forest": "#243325",
        "custom-lime": "#E5FD72",
        "custom-black": "#161718",
      },
    },
  },
  plugins: [],
};
