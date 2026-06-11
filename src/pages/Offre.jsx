import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import useReveal from '../hooks/useReveal.js'

// Les 3 points clés de l'offre
const POINTS = [
  {
    tag: 'Livraison',
    title: 'Photos retouchées sous 72 h',
    text: 'Des fichiers prêts à publier, livrés rapidement après la séance.',
  },
  {
    tag: 'Inclus',
    title: 'Planning éditorial offert',
    text: 'Vous savez exactement quoi publier, quand, et avec quelle accroche.',
  },
  {
    tag: 'Contrepartie',
    title: 'Visibilité croisée',
    text: 'Vos véhicules et événements mis en avant sur mes réseaux sociaux.',
  },
]

export default function Offre() {
  const body = useReveal()
  const cards = useReveal()
  const cta = useReveal()

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow="01 / L'offre"
          title={<>Une offre de lancement <span className="text-amber">gratuite</span></>}
        />

        {/* Texte principal, hiérarchisé */}
        <div ref={body} className="reveal mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6 text-lg leading-relaxed text-smoke">
            <p className="text-chalk text-xl leading-relaxed">
              Je propose une offre de lancement gratuite en photographie
              automobile, ouverte aux concessionnaires, propriétaires
              individuels, pilotes et écuries.
            </p>
            <p>
              L'idée est simple&nbsp;: je viens photographier votre véhicule,
              votre concession, votre journée de course ou votre événement, et
              je vous livre des photos retouchées, prêtes à publier, dans un
              délai de 72&nbsp;h. En plus des fichiers, je vous remets un
              planning éditorial adapté à la matière que j'ai en mains — vous
              savez exactement quoi publier, quand, et avec quelle accroche.
              Pas besoin de vous demander comment exploiter vos photos&nbsp;:
              c'est inclus.
            </p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-smoke">
            <p>
              En contrepartie, vos véhicules et événements seront mis en avant
              sur mes réseaux sociaux. Vous bénéficiez d'une visibilité
              supplémentaire sans effort de votre côté, et je construis mon
              portfolio avec du contenu réel et varié.
            </p>
            <p>
              Cette offre de lancement est entièrement gratuite. Elle me permet
              de développer mon travail dans l'univers automobile tout en vous
              apportant une valeur concrète dès maintenant.
            </p>
            <p className="text-chalk">
              Si vous êtes intéressé, contactez-moi directement — on échange
              quelques minutes pour voir si la collaboration fait sens.
            </p>
          </div>
        </div>

        {/* Points clés */}
        <div ref={cards} className="reveal mt-16 grid gap-px bg-line sm:grid-cols-3 border border-line">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="group bg-graphite p-8 transition-colors duration-300 hover:bg-carbon"
            >
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-amber">{p.tag}</p>
              <h3 className="mt-3 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-smoke">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Bloc CTA final → page Contact */}
        <div
          ref={cta}
          className="reveal mt-16 flex flex-col items-center gap-6 border border-amber/30 bg-graphite px-8 py-14 text-center"
        >
          <p className="eyebrow">Intéressé&nbsp;?</p>
          <h3 className="font-display font-black uppercase text-2xl sm:text-3xl">
            Parlons de votre projet
          </h3>
          <Link to="/contact" className="btn-primary">
            Me contacter
          </Link>
        </div>
      </div>
    </section>
  )
}
