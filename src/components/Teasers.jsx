import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'
import { useLang } from '../i18n.jsx'

/* Les numéros et les liens sont fixes ; les textes viennent des traductions. */
const META = [
  { num: '01', to: '/portfolio' },
  { num: '02', to: '/offre' },
  { num: '03', to: '/histoire' },
  { num: '04', to: '/materiel' },
]

/* Un bloc teaser, alterné selon sa position (pair/impair) */
function Teaser({ num, to, title, synopsis, cta, flip }) {
  const ref = useReveal()

  return (
    <article
      ref={ref}
      className={`reveal group grid items-center gap-8 border-t border-line py-14
        md:grid-cols-[1fr_2fr] ${flip ? 'md:[direction:rtl]' : ''}`}
    >
      {/* Grand numéro "télémétrie" */}
      <div className="md:[direction:ltr]">
        <p className="font-mono text-6xl sm:text-7xl text-line transition-colors duration-500 group-hover:text-amber/40">
          {num}
        </p>
      </div>

      {/* Synopsis + bouton */}
      <div className="md:[direction:ltr]">
        <h2 className="font-display font-black uppercase tracking-tight text-3xl sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-smoke">
          {synopsis}
        </p>
        <Link to={to} className="btn-ghost mt-7">
          {cta} →
        </Link>
      </div>
    </article>
  )
}

export default function Teasers() {
  const { t } = useLang()
  const head = useReveal()

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div ref={head} className="reveal mb-14">
          <p className="eyebrow mb-3">{t.teasers.eyebrow}</p>
          <h2 className="section-title">
            {t.teasers.title.a}<span className="text-amber">{t.teasers.title.b}</span>
          </h2>
        </div>

        {t.teasers.items.map((item, i) => (
          <Teaser
            key={META[i].to}
            num={META[i].num}
            to={META[i].to}
            title={item.title}
            synopsis={item.synopsis}
            cta={item.cta}
            flip={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  )
}
