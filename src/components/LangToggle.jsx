import { useLang } from '../i18n.jsx'

/**
 * Sélecteur de langue en "segmented control" façon iOS : FR | EN.
 * Le choix est mémorisé (voir LanguageProvider dans i18n.jsx).
 */
export default function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()
  const base = 'rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300'
  const active = 'bg-white text-ink shadow-sm'
  const idle = 'text-muted hover:text-ink'

  return (
    <div className={`inline-flex items-center rounded-full bg-black/5 p-0.5 ${className}`}>
      <button
        type="button"
        onClick={() => setLang('fr')}
        aria-label="Français"
        aria-pressed={lang === 'fr'}
        className={`${base} ${lang === 'fr' ? active : idle}`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-label="English"
        aria-pressed={lang === 'en'}
        className={`${base} ${lang === 'en' ? active : idle}`}
      >
        EN
      </button>
    </div>
  )
}
