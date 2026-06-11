/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette "garage de nuit"
        carbon:   '#0A0A0B', // fond principal
        graphite: '#141417', // cartes / surfaces
        line:     '#26262B', // bordures fines
        chalk:    '#EDEDEF', // texte principal
        smoke:    '#9A9AA3', // texte secondaire
        amber:    '#E3A23C', // accent "phare halogène"
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],       // titres (graisse 900, capitales)
        body:    ['Manrope', 'sans-serif'],       // corps de texte
        mono:    ['Space Mono', 'monospace'],     // étiquettes "télémétrie"
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease-out both',
        pulseSoft: 'pulseSoft 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
