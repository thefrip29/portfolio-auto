import { useLang } from '../i18n.jsx'

/**
 * Petit sélecteur de langue discret : FR | EN.
 * La langue active est en ambre, l'autre en gris (passe en ambre au survol).
 * Le choix est mémorisé (voir LanguageProvider dans i18n.jsx).
 */
export default function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()
  const base = 'font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => setLang('fr')}
        aria-label="Français"
        aria-pressed={lang === 'fr'}
        className={`${base} ${lang === 'fr' ? 'text-amber' : 'text-smoke hover:text-amber'}`}
      >
        FR
      </button>
      <span className="text-line">|</span>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-label="English"
        aria-pressed={lang === 'en'}
        className={`${base} ${lang === 'en' ? 'text-amber' : 'text-smoke hover:text-amber'}`}
      >
        EN
      </button>
    </div>
  )
}
