/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0a0f',
          darker: '#050508',
          primary: '#00ff41',
          secondary: '#00cc33',
          accent: '#39ff14',
          glow: 'rgba(0, 255, 65, 0.3)',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}
