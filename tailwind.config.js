/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        forensic: {
          950: '#050b14',
          900: '#07111f',
          850: '#0b1728',
          800: '#102033',
          700: '#1d334d',
          cyan: '#38bdf8',
          blue: '#2563eb',
          steel: '#94a3b8',
        },
      },
      boxShadow: {
        forensic: '0 24px 80px rgba(2, 8, 23, 0.45)',
        glow: '0 0 40px rgba(56, 189, 248, 0.12)',
      },
      backgroundImage: {
        'forensic-grid': 'linear-gradient(rgba(56,189,248,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
