/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './docs/**/*.{md,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        darker: 'rgb(var(--bg-darker) / <alpha-value>)',
        dark: 'rgb(var(--bg-dark) / <alpha-value>)',
        card: 'rgb(var(--bg-card) / <alpha-value>)',
        'card-hover': 'rgb(var(--bg-card-hover) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        'border-light': 'rgb(var(--border-light) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
