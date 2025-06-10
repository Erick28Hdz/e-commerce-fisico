/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgLight: 'var(--color-bg-light)',
        bgSecondary: 'var(--color-bg-secondary)',
        accent: 'var(--color-accent)',
        principal: 'var(--color-principal)',
        textPrimary: 'var(--color-text-primary)',
        textSecondary: 'var(--color-text-secondary)',
      },
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
    },
    plugins: [],
  },
}