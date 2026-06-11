import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal.js'

/**
 * Blocs "teaser" de la landing page : un synopsis court par sujet,
 * avec un bouton vers la page dédiée. Mise en page alternée
 * (étiquette à gauche / contenu à droite, puis inversé) pour donner
 * du rythme — pas une pile de cartes identiques.
 */
const TEASERS = [
  {
    num: '01',
    title: "L'offre",
    synopsis:
      "Une offre de lancement gratuite : je photographie votre véhicule, votre concession ou votre événement, et je livre des photos retouchées en 72 h — planning éditorial inclus.",
    cta: "Découvrir l'offre",
    to: '/offre',
  },
  {
    num: '02',
    title: 'Mon histoire',
    synopsis:
      "De la passion mécanique au viseur : le parcours qui m'a mené à photographier l'automobile, et la façon dont je regarde une machine.",
    cta: 'Découvrir mon histoire',
    to: '/histoire',
  },
  {
    num: '03',
    title: 'Mon matériel',
    synopsis:
      "Du matériel de pointe pour répondre à tous vos besoins : statiques en concession, filés en bord de piste, détails et ambiances de nuit.",
    cta: 'Voir mon matériel',
    to: '/materiel',
  },
  {
    num: '04',
    title: 'Mon portfolio',
    synopsis:
      "Une galerie vivante, triée par couleur dominante pour former un dégradé continu. Le meilleur aperçu de ce que je peux faire pour vous.",
    cta: 'Voir le portfolio',
    to: '/portfolio',
  },
]

/* Un bloc teaser, alterné selon sa position (pair/impair) */
function Teaser({ item, flip }) {
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
          {item.num}
        </p>
      </div>

      {/* Synopsis + bouton */}
      <div className="md:[direction:ltr]">
        <h2 className="font-display font-black uppercase tracking-tight text-3xl sm:text-4xl">
          {item.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-smoke">
          {item.synopsis}
        </p>
        <Link to={item.to} className="btn-ghost mt-7">
          {item.cta} →
        </Link>
      </div>
    </article>
  )
}

export default function Teasers() {
  const head = useReveal()

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div ref={head} className="reveal mb-14">
          <p className="eyebrow mb-3">Au programme</p>
          <h2 className="section-title">
            Explorez le <span className="text-amber">site</span>
          </h2>
        </div>

        {TEASERS.map((t, i) => (
          <Teaser key={t.to} item={t} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
