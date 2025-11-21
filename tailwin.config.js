/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#050a0e',
          dark: '#0a1116',
          green: '#00ff41',
          pink: '#ff00ff',
          blue: '#00d9f7',
          yellow: '#fdfd00',
        }
      },
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 1s linear infinite',
        'holo': 'holo 3s ease infinite',
      },
      keyframes: {
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
        holo: {
          '0%, 100%': { opacity: '0.5', backgroundPosition: '50% 50%', filter: 'brightness(1)' },
          '50%': { opacity: '0.3', backgroundPosition: '100% 50%', filter: 'brightness(1.2)' },
        }
      }
    },
  },
  plugins: [],
}