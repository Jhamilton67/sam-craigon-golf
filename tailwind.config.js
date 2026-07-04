/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0c1a0c',
          900: '#132013',
          800: '#1a2e1a',
          700: '#22401f',
          600: '#2d5529',
          500: '#3a6b34',
          400: '#4d8645',
          300: '#6aa361',
        },
        cream: {
          50:  '#fefdf8',
          100: '#faf7ed',
          200: '#f5f0de',
          300: '#ede4c7',
          400: '#dfd3a9',
        },
        gold: {
          300: '#e8c97a',
          400: '#d4a843',
          500: '#c9a030',
          600: '#a8832a',
        },
        charcoal: {
          900: '#111111',
          800: '#1c1c1c',
          700: '#242424',
          600: '#2f2f2f',
          500: '#3d3d3d',
          400: '#555555',
          300: '#888888',
          200: '#aaaaaa',
          100: '#cccccc',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [],
};
