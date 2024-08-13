/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media'
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Include paths to your files
    './components/**/*.{js,ts,jsx,tsx}', // Include paths to your components
    './app/**/*.{js,ts,jsx,tsx}', // Include paths to your app files
    './src/**/*.{js,ts,jsx,tsx}', // Include paths to your source files
  ],
  theme: {
    extend: {
      // Custom theme settings
    },
  },
  plugins: [
    // Add any Tailwind plugins you might be using
  ],
};
