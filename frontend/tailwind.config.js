/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0f172a',     // deep slate/navy bg
        panel: '#1e2537',       // card bg
        border: '#2d3748',      // border lines
        textMain: '#f8fafc',    // near-white text
        textDim: '#94a3b8',     // muted gray
        accent: '#38bdf8'       // cyan accent
      },
      borderRadius: {
        card: '1rem'
      }
    }
  },
  plugins: []
}
