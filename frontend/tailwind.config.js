/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        darkPrimary: "#374e73",
        secondary: "#37394f",
        darkBackground: "#2b2b2b",
      },
      maxWidth: {
        page: "1120px",
      },
      spacing: {
        header: "64px",
        footer: "110px",
      },
    },
  },
  plugins: [],
};
