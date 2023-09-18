/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        xs: '575px',
      },
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
        dark: {
          1: '#1c3b5a',
          2: '#17304c',
          3: '#172738',
        },
      },
    },
  },
  plugins: [],
};
