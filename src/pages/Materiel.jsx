import PageHeader from '../components/PageHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import { useLang } from '../i18n.jsx'

/* ──────────────────────────────────────────────────────────────
   IMPORT AUTOMATIQUE DES PHOTOS PRODUIT
   Dépose les visuels dans  src/assets/materiel/  (jpg, jpeg, png, webp).
   Relie une photo à une carte via le champ "img" de chaque élément
   de t.materiel.gear (nom de fichier sans extension), dans i18n.jsx.
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

export default function Materiel() {
  const { t } = useLang()
  const grid = useReveal()

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow={t.materiel.eyebrow}
          title={<>{t.materiel.title.a}<span className="text-muted">{t.materiel.title.b}</span></>}
          intro={t.materiel.intro}
        />

        <div ref={grid} className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.materiel.gear.map((item) => {
            const image = imageFor(item.img)
            return (
              <article
                key={item.img}
                className="glass group flex flex-col overflow-hidden rounded-[1.75rem] p-3 transition-all duration-500 hover:-translate-y-1 hover:bg-white/75 hover:shadow-lift"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-white">
                  {image ? (
                    <img
                      src={image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-sm text-muted">{t.materiel.placeholder}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                  <h3 className="text-lg font-semibold tracking-tight">{item.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
