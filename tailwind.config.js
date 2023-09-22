/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
        colors: {
          'dark-main-blue': '#00162B',
          'main-blue': '#00213D',
          'light-main-blue': '#003666',
          'ligher-main-blue': '#0062B8',
          'l-dark-main-blue': '#85C4FF',
          'l-main-blue': '#ADD8FF',
          'l-light-main-blue': '#D6EBFF',
          'l-lighter-main-blue': '#e3f1ff',
          'main-yellow': '#ECD444',
          'dark-main-yellow': '#CCB114',
          'l-main-yellow': '#E5D352',
          'l-dark-main-yellow': '#A09018',
          'main-green': '#1B9AAA'
        },
        maxWidth: {
          '8xl': '1440px'
        },
        'fontFamily': {
          'merriweather': ['Merriweather', 'serif']
        }
      }
    },
    plugins: []
  };