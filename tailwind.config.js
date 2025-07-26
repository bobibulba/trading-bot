/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#10F2B0',
        'accent-dark': '#0DD49A',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-lg': '12px 12px 0px 0px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}
