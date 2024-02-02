/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'c-primary': '#5B5F97',
        'c-secondary': '#E8AEB7',
        'c-tertiary': '#CCF5AC',
        'c-background': '#221627',
        'c-darker-background': '#080A0C',
        'c-body-text': '#FAFDF5'
      },
      fontFamily: {
        'title': ['sora', 'Arial', 'sans-serif']
      },
    },
  },
  plugins: [],
}

