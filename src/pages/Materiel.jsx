import PageHeader from '../components/PageHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import { useLang } from '../i18n.jsx'

/* ──────────────────────────────────────────────────────────────
   IMPORT AUTOMATIQUE DES PHOTOS PRODUIT
   Dépose les visuels dans  src/assets/materiel/  (jpg, jpeg, png, webp).
   Relie une photo à une carte via le champ "img" (nom de fichier sans extension).
   ────────────────────────────────────────────────────────────── */
const gearImages = import.meta.glob(
  '../assets/materiel/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' },
)

function imageFor(key) {
  if (!key) return null
  const found = Object.entries(gearImages).find(
    ([path]) => path.split('/').pop().split('.')[0] === key,
  )
  return found ? found[1] : null
}

/* Prix et image sont fixes ; nom et description viennent des traductions. */
const META = [
  {img: 'boitier' },
  {img: '100-400' },
  {img: '18-50' },
  {img: '3in1' },
  {img: 'ronin' },
]

export default function Materiel() {
  const { t } = useLang()
  const grid = useReveal()

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow={t.materiel.eyebrow}
          title={<>{t.materiel.title.a}<span className="text-amber">{t.materiel.title.b}</span></>}
          intro={t.materiel.intro}
        />

        <div ref={grid} className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.materiel.gear.map((item, i) => {
            const image = imageFor(META[i].img)
            return (
              <article
                key={META[i].img}
                className="group flex flex-col border border-line bg-graphite transition-all duration-300 hover:-translate-y-1 hover:border-amber/50"
              >
                <div className="aspect-[4/3] overflow-hidden bg-carbon">
                  {image ? (
                    <img
                      src={image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-mono text-xs tracking-widest uppercase text-smoke">
                        {t.materiel.placeholder}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display font-bold text-lg">{item.name}</h3>
                    <span className="shrink-0 font-mono text-sm font-bold text-amber">
                      {META[i].price}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-sm text-smoke">{item.desc}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
