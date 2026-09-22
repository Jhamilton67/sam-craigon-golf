/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '390px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Fairway green — primary dark surfaces
        fairway: {
          DEFAULT: '#16352A',
          deep: '#0E241C',   // deepest — footer / contrast
          light: '#1D4436',  // hairline borders / raised cards
          soft: '#234E3D',
        },
        // Ivory — light section background
        ivory: {
          DEFAULT: '#F6F3EC',
          dark: '#EBE6D9',   // subtle cards on ivory
        },
        // Brass / gold — accent, used sparingly
        brass: {
          DEFAULT: '#B68A4E',
          light: '#C9A066',
          dark: '#835F35',   // WCAG AA (4.5:1) on ivory — was #8F6C3A at 4.33:1
        },
        // Off-white text on dark
        bone: {
          DEFAULT: '#F3F0E8',
          soft: '#C9C6BB',   // muted body on dark
          mute: '#AEABA0',   // captions on dark — WCAG AA (4.5:1+) on fairway tones, was #928F84 at 3.58:1
        },
        // Charcoal text on light
        ink: {
          DEFAULT: '#1C231F',
          soft: '#40483F',   // body on ivory
          mute: '#6E756A',   // captions on ivory
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest: '0.22em',
        mega: '0.3em',
      },
      maxWidth: {
        content: '76rem',
      },
    },
  },
  plugins: [],
};
