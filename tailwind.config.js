/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050b14',
        navy: '#07111f',
        panel: '#0b1728',
        line: '#1e344f',
        cyan: '#38bdf8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        forensic: '0 22px 70px rgba(2, 8, 23, 0.46)',
        glow: '0 0 36px rgba(56, 189, 248, 0.16)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 15%, rgba(56,189,248,.18), transparent 28%), radial-gradient(circle at 80% 10%, rgba(37,99,235,.14), transparent 24%), linear-gradient(135deg, #050b14 0%, #07111f 45%, #111827 100%)',
        grid: 'linear-gradient(rgba(148,163,184,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.055) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
