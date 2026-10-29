import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import { useLang } from '../i18n.jsx'

/* Petites illustrations SVG (aucune librairie, pas d'emoji). */
function OfferIcon({ name }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'gift':
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="13" rx="1" />
          <path d="M3 12h18" />
          <path d="M12 8v13" />
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5C9.5 3 12 6 12 8" />
          <path d="M16.5 8a2.5 2.5 0 0 0 0-5C14.5 3 12 6 12 8" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M3 9h18M8 2v4M16 2v4" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
        </svg>
      )
    case 'share':
      return (
        <svg {...common}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
      )
    default:
      return null
  }
}

/* Les icônes des 6 cartes (fixes) ; les textes viennent des traductions. */
const ICONS = ['gift', 'clock', 'calendar', 'shield', 'globe', 'share']

export default function Offre() {
  const { t } = useLang()
  const body = useReveal()
  const cards = useReveal()
  const cta = useReveal()
  const note = useReveal()

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow={t.offre.eyebrow}
          title={<>{t.offre.title.a}<span className="text-amber">{t.offre.title.b}</span></>}
        />

        {/* Accroche mise en valeur + publicité croisée */}
        <div ref={body} className="reveal mt-12 max-w-3xl space-y-6">
          <p className="font-display text-2xl font-bold leading-snug text-chalk sm:text-3xl">
            {t.offre.lead.a}<span className="text-amber">{t.offre.lead.b}</span>.
          </p>
          <p className="text-lg leading-relaxed text-smoke">
            {t.offre.para1}
          </p>
          <p className="font-display text-xl font-bold text-chalk">
            {t.offre.punch}
          </p>
          <p className="text-lg leading-relaxed text-smoke">
            {t.offre.para2}
          </p>
        </div>

        {/* Cartes illustrées : les atouts de l'offre */}
        <div ref={cards} className="reveal mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {t.offre.cards.map((p, i) => (
            <div
              key={i}
              className="group bg-graphite p-8 transition-colors duration-300 hover:bg-carbon"
            >
              <span className="text-amber">
                <OfferIcon name={ICONS[i]} />
              </span>
              <p className="mt-4 font-mono text-xs tracking-[0.25em] uppercase text-amber">{p.tag}</p>
              <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-smoke">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Bloc CTA final → page Contact */}
        <div
          ref={cta}
          className="reveal mt-16 flex flex-col items-center gap-6 border border-amber/30 bg-graphite px-8 py-14 text-center"
        >
          <p className="eyebrow">{t.offre.ctaEyebrow}</p>
          <h3 className="font-display font-black uppercase text-2xl sm:text-3xl">
            {t.offre.ctaTitle}
          </h3>
          <Link to="/contact" className="btn-primary">
            {t.offre.ctaButton}
          </Link>
        </div>

        {/* Note de bas de page (astérisque déplacement) */}
        <p ref={note} className="reveal mt-10 max-w-3xl font-mono text-xs leading-relaxed text-smoke">
          {t.offre.note}
        </p>
      </div>
    </section>
  )
}
