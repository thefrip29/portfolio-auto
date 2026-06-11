import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ── GITHUB PAGES ────────────────────────────────────────────────
  // Remplace "portfolio-auto" par le NOM EXACT de ton dépôt GitHub.
  // Si tu déploies sur https://tonpseudo.github.io (dépôt racine),
  // mets base: '/'
  base: '/portfolio-auto/',
})
