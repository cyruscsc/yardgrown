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
      stream: '#C4D5C3',
      leaves: '#ABC4AA',
      xanadu: '#778977',
      gray: '#C2BEB9',
      grullo: '#A9907E',
      wenge: '#675D50',
      pink: '#D57E7E',
    },
    fontFamily: {
      quicksand: ['Quicksand', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
