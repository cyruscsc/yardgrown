/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      snow: '#FDFAF6',
      linen: '#FAF1E6',
      champagne: '#F3DEBA',
      leaves: '#ABC4AA',
      grullo: '#A9907E',
      wenge: '#675D50',
    },
    fontFamily: {
      quicksand: ['Quicksand', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
