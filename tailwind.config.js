/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        iranSans: 'IranSans',
      },
      colors: {
        primary: {
          1: '#007bff',
          2: '#036af5',
        },
        secondary: {
          1: '#ffaf20',
          2: '#ffd843',
        },
      },
    },
  },
  plugins: [],
};
