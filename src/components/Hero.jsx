import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'

/**
 * Hero plein écran de la landing page.
 * Photo de fond : place un fichier  src/assets/hero.jpg (ou .jpeg/.png/.webp).
 * Sans fichier, un dégradé sombre s'affiche.
 */
const heroModules = import.meta.glob('../assets/hero.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const heroSrc = Object.values(heroModules)[0]

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative flex h-screen items-end overflow-hidden">
      {/* Fond */}
      {heroSrc ? (
        <img src={heroSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-graphite via-carbon to-black" />
      )}
      {/* Voile sombre général : lisibilité du texte sur la photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent" />
      {/* Fondu vers le noir sur le bas : transition avec la section suivante */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-carbon to-transparent" />
      {/* Halo ambré subtil */}
      <div className="absolute -bottom- left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-full bg-amber/10 blur-3xl" />

      {/* Contenu : la devise en très grand */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 animate-fadeUp">
        <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight text-5xl sm:text-7xl lg:text-7xl">
          {t.hero.l1}
          <br />
          <span className="text-amber">{t.hero.l2}</span>
        </h1>
        <p className="mt-6 max-w-xl text-white text-lg">
          {t.hero.subtitle}
        </p>
        <Link to="/portfolio" className="btn-primary mt-10">
          {t.hero.cta}
        </Link>
      </div>
    </section>
  )
}
