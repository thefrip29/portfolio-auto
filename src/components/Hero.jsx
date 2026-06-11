import { Link } from 'react-router-dom'

/**
 * Hero plein écran de la landing page.
 * Pour la photo de fond : place un fichier nommé
 *   src/assets/hero.jpg (ou .jpeg / .png / .webp)
 * Sans fichier, un dégradé sombre s'affiche.
 */
const heroModules = import.meta.glob('../assets/hero.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const heroSrc = Object.values(heroModules)[0]

export default function Hero() {
  return (
    <section className="relative flex h-screen items-end overflow-hidden">
      {/* Fond */}
      {heroSrc ? (
        <img src={heroSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-graphite via-carbon to-black" />
      )}
      {/* Voile sombre + halo ambré */}
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />
      <div className="absolute -bottom-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-full bg-amber/10 blur-3xl" />

      {/* Contenu : la devise en très grand */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 animate-fadeUp">
        <p className="eyebrow mb-4">Photographie automobile</p>
        <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight text-5xl sm:text-7xl lg:text-8xl">
          Built to drive.
          <br />
          <span className="text-amber">Shot to last.</span>
        </h1>
        <p className="mt-6 max-w-xl text-smoke text-lg">
          Concessions, propriétaires, pilotes et écuries — des images prêtes à
          publier, livrées en 72&nbsp;heures.
        </p>
        <Link to="/portfolio" className="btn-primary mt-10">
          Découvrir mon travail
        </Link>
      </div>
    </section>
  )
}
