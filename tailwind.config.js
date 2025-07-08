/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#EC4899",
        accent: "#10B981",
        surface: "#F8FAFC",
        background: "#FFFFFF",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6"
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