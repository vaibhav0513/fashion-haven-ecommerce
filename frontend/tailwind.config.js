/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0891b2", // Cyan 600
        secondary: "#ec4899", // Pink 500
        ctaHover: "#155e75", // Cyan 800
        background: "#f9fafb", // Gray 50
        card: "#ffffff", // White
        heading: "#111827", // Gray 900
        body: "#4b5563", // Gray 600
      },
      animation: {
      fadeIn: "fadeIn 0.2s ease-out forwards",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0, transform: "translateY(-10%)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
    },
    },
  },
  plugins: [],
};
