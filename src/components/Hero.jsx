import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'

/**
 * Hero de la landing page : la photo dans un grand cadre arrondi,
 * la devise posée sur une carte en verre.
 * Photo de fond : place un fichier  src/assets/hero.jpg (ou .jpeg/.png/.webp).
 */
const heroModules = import.meta.glob('../assets/hero.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const heroSrc = Object.values(heroModules)[0]

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="relative mx-auto flex h-[calc(100svh-1.5rem)] min-h-[560px] items-end overflow-hidden rounded-[2rem] sm:h-[calc(100svh-2rem)] sm:rounded-[2.5rem]">
        {heroSrc ? (
          <img src={heroSrc} alt="" fetchpriority="high" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-500" />
        )}
        {/* Léger voile en bas pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

        <div className="relative z-10 w-full p-4 sm:p-8 lg:p-10">
          <div className="glass-dark max-w-2xl animate-fadeUp rounded-[1.75rem] p-6 sm:p-9">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              {t.hero.l1}
              <br />
              <span className="text-white/70">{t.hero.l2}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-white/85 sm:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/portfolio"
                className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
              >
                {t.hero.cta}
              </Link>
              <Link
                to="/offre"
                className="inline-flex items-center rounded-full border border-white/40 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/15"
              >
                {t.teasers.items[1].cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
