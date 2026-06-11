import PageHeader from '../components/PageHeader.jsx'
import useReveal from '../hooks/useReveal.js'

/**
 * ▼ Remplace les entrées ci-dessous par ton vrai matériel :
 *   - image : mets tes visuels dans src/assets/ puis importe-les,
 *     ou laisse null pour afficher le placeholder.
 *   - link  : ton lien Amazon (idéalement un lien affilié).
 */
const GEAR = [
  {
    name: 'Boîtier — [Modèle]',
    desc: 'Plein format, rafale rapide, idéal pour le sport automobile.',
    image: null,
    link: 'https://www.amazon.fr/',
  },
  {
    name: 'Objectif 70-200 mm f/2.8',
    desc: 'Le téléobjectif de référence pour les filés en bord de piste.',
    image: null,
    link: 'https://www.amazon.fr/',
  },
  {
    name: 'Objectif 24-70 mm f/2.8',
    desc: 'Polyvalent : statiques, détails, ambiance concession.',
    image: null,
    link: 'https://www.amazon.fr/',
  },
  {
    name: 'Filtre polarisant',
    desc: 'Supprime les reflets sur les carrosseries et les vitres.',
    image: null,
    link: 'https://www.amazon.fr/',
  },
  {
    name: 'Trépied — [Modèle]',
    desc: 'Poses longues de nuit et compositions millimétrées.',
    image: null,
    link: 'https://www.amazon.fr/',
  },
]

export default function Materiel() {
  const grid = useReveal()

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow="03 / Mon matériel"
          title={<>Dans le <span className="text-amber">sac</span></>}
          intro="Du matériel de pointe, choisi pour chaque situation : concession, circuit, nuit."
        />

        <div ref={grid} className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GEAR.map((item) => (
            <article
              key={item.name}
              className="group flex flex-col border border-line bg-graphite transition-all duration-300 hover:-translate-y-1 hover:border-amber/50"
            >
              {/* Image du produit (ou placeholder) */}
              <div className="aspect-[4/3] overflow-hidden bg-carbon">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-mono text-xs tracking-widest uppercase text-smoke">
                      Image produit
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display font-bold text-lg">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm text-smoke">{item.desc}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost mt-5 self-start text-xs"
                >
                  Voir sur Amazon →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
