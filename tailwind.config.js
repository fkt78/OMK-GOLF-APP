/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        golf: {
          green: '#1a5c38',
          lightGreen: '#2d8653',
          fairway: '#4caf78',
          sand: '#d4b483',
          sky: '#87ceeb',
          dark: '#0f3321',
        }
      }
    },
  },
  plugins: [],
}
