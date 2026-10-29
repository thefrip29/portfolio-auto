/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette claire et sobre, inspirée d'iOS
        canvas: '#F2F2F5', // fond principal
        ink:    '#1D1D1F', // texte principal / bouton principal
        muted:  '#6E6E73', // texte secondaire
        line:   '#E3E3E8', // bordures fines
        accent: '#3A63A8', // bleu acier discret
      },
      fontFamily: {
        // Inter, au plus proche de la police système d'Apple (SF Pro)
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(30, 40, 70, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        lift:  '0 20px 50px rgba(30, 40, 70, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
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
