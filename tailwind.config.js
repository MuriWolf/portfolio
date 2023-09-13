/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        colors: {
          'dark-main-blue': '#00162B',
          'main-blue': '#00213D',
          'light-main-blue': '#003666',
          'main-yellow': '#ECD444',
          'main-green': '#1B9AAA'
        },
        maxWidth: {
          '8xl': '1440px'
        }
      }
    },
    plugins: []
  };