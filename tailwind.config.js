/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f9ff',
          100: '#e0efff',
          200: '#b9dcff',
          300: '#82c2ff',
          400: '#3d9eff',
          500: '#0d7eea',
          600: '#0062c4',
          700: '#004d99',
          800: '#003d78',
          900: '#033563'
        }
      }
    }
  },
  plugins: []
};
