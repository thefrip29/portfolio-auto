import PageHeader from '../components/PageHeader.jsx'
import useReveal from '../hooks/useReveal.js'

/**
 * Page éditoriale : grande photo + texte.
 * Photo : place un fichier nommé src/assets/histoire.jpg
 * (ou .jpeg / .png / .webp) — détecté automatiquement.
 */
const photoModules = import.meta.glob('../assets/histoire.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const photoSrc = Object.values(photoModules)[0]

export default function Histoire() {
  const ref = useReveal()

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow="02 / Mon histoire"
          title={<>Derrière <span className="text-amber">l'objectif</span></>}
        />

        <div ref={ref} className="reveal mt-12 grid items-center gap-12 lg:grid-cols-2">
          {/* Photo (ou placeholder) */}
          <div className="relative aspect-[4/5] overflow-hidden border border-line">
            {photoSrc ? (
              <img
                src={photoSrc}
                alt="Portrait du photographe"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-graphite">
                <p className="font-mono text-xs tracking-widest uppercase text-smoke">
                  Photo à venir — src/assets/histoire.jpg
                </p>
              </div>
            )}
            {/* Cadre décoratif ambré décalé */}
            <div className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-amber/40" />
          </div>

          {/* Texte (placeholder à remplacer) */}
          <div className="space-y-5 text-lg leading-relaxed text-smoke">
            {/* ▼▼ REMPLACE CE TEXTE PAR TON HISTOIRE ▼▼ */}
            <p>
              [Texte placeholder] — Raconte ici d'où vient ta passion pour
              l'automobile et la photographie : ta première voiture, ton
              premier boîtier, le déclic.
            </p>
            <p>
              [Texte placeholder] — Décris ton approche : ce que tu cherches
              dans une image, ta sensibilité à la lumière, au mouvement, aux
              détails mécaniques.
            </p>
            <p>
              [Texte placeholder] — Termine par ta vision et ce que tu veux
              construire avec tes clients et partenaires.
            </p>
            {/* ▲▲ FIN DU PLACEHOLDER ▲▲ */}
          </div>
        </div>
      </div>
    </section>
  )
}
