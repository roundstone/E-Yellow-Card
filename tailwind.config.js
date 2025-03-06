/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B9649',
        secondary: '#1E7E34',
        background: '#F8F9FA',
        text: '#343A40',
        warning: '#FFC107',
        danger: '#DC3545',
        info: '#17A2B8',
      },
      fontFamily: {
        'andale-mono': ['Andale Mono', 'monospace'], // Add Andale Mono
      },
    },
  },
  plugins: [],
}

