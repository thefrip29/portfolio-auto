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

/* Une carte teaser en verre, entièrement cliquable */
function Teaser({ num, to, title, synopsis, cta }) {
  const ref = useReveal()

  return (
    <Link
      ref={ref}
      to={to}
      className="reveal glass group flex flex-col rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white/75 hover:shadow-lift sm:p-9"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-accent shadow-sm">
        {num}
      </span>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{synopsis}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        {cta}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  )
}

export default function Teasers() {
  const { t } = useLang()
  const head = useReveal()

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div ref={head} className="reveal mb-12">
          <p className="eyebrow mb-3">{t.teasers.eyebrow}</p>
          <h2 className="section-title">
            {t.teasers.title.a}<span className="text-muted">{t.teasers.title.b}</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {t.teasers.items.map((item, i) => (
            <Teaser
              key={META[i].to}
              num={META[i].num}
              to={META[i].to}
              title={item.title}
              synopsis={item.synopsis}
              cta={item.cta}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
