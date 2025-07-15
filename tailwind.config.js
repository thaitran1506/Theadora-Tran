/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baby-pink': '#FFB6C1',
        'lavender': '#E6E6FA',
        'mint': '#F0FFF0',
        'off-white': '#FDFDFD',
        'soft-blue': '#E0F2FE',
        'peach': '#FFE4E1',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} 