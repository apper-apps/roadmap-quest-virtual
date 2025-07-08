/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B8A7E8",
        secondary: "#FFD4DB",
        accent: "#A8E6CF",
        surface: "#F7F3FF",
        background: "#FAFAFA",
        success: "#81C784",
        warning: "#FFD54F",
        error: "#FF8A80",
        info: "#81D4FA"
      },
      fontFamily: {
        display: ["Fredoka One", "cursive"],
        body: ["Inter", "sans-serif"]
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px'
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 6px 20px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(184, 167, 232, 0.3)'
      }
    },
  },
  plugins: [],
}