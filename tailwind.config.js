/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Enable dark mode using the 'class' strategy
  darkMode: 'class',
  theme: {
    extend: {
      // Custom colors for light and dark modes
      colors: {
        // Light mode colors (default)
        primary: '#ffffff',  // Background
        secondary: '#000000', // Text
        accent: '#007BFF',    // Original accent (example: blue button color)

        // Dark mode colors
        darkPrimary: '#000000',  // Background
        darkSecondary: '#ffffff',  // Text
        darkAccent: '#8B0000',   // Dark red/maroon accent for dark mode
      }
    },
  },
  plugins: [],
}
