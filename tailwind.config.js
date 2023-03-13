/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
    mode: 'jit',
    content: [
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './composables/**/*.{js,ts}',
      './plugins/**/*.{js,ts}',
      './app.{js,ts,vue}'
    ],// remove unused style 原本的 purge option
    theme: {
      extend: {
        colors: {
          primary: '#FFB9A5',
          secondary: '#F88F6D',
          tertiary: '#E9FFDD'
        },
      },
      fontFamily: {
        sans: ['Karla', 'Helvetica', 'Arial', 'sans-serif']
      }
      
    },
    plugins: []
  }