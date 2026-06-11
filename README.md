# Portfolio — Photographie automobile

"Built to drive. Shot to last."
Site multi-pages React + Vite + Tailwind CSS + React Router (HashRouter),
prêt pour GitHub Pages.

## Installation

```bash
npm install
npm run dev        # serveur local → http://localhost:5173
```

## Architecture

- `/`            Landing page : hero + teasers synthétiques
- `/#/offre`     L'offre complète
- `/#/histoire`  Mon histoire
- `/#/materiel`  Mon matériel
- `/#/portfolio` Galerie masonry triée par couleur (ColorThief)
- `/#/contact`   Formulaire + réseaux sociaux

Le HashRouter (URLs avec #) est volontaire : c'est ce qui rend les liens
directs et le rafraîchissement compatibles avec GitHub Pages.

## Ajouter des photos

| Quoi                | Où                                            |
|---------------------|-----------------------------------------------|
| Photos du portfolio | `src/assets/photos/` (jpg, jpeg, png, webp)   |
| Photo du hero       | `src/assets/hero.jpg`                         |
| Photo "Mon histoire"| `src/assets/histoire.jpg`                     |

Import automatique (`import.meta.glob`) : aucun code à modifier.

## Formulaire de contact (Formspree)

1. Compte gratuit sur https://formspree.io → "New form"
2. Copie l'ID du formulaire (ex. `xqkrabcd`)
3. Dans `src/pages/Contact.jsx`, remplace `VOTRE_ID_FORMSPREE` par cet ID
4. (Optionnel) Remplace aussi `FALLBACK_EMAIL`

## Déploiement GitHub Pages

1. Dans `vite.config.js`, mets `base: '/NOM_DE_TON_DEPOT/'`
2. `git add . && git commit -m "..." && git push`
3. `npm run deploy`
