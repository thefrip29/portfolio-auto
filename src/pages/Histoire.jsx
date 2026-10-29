import PageHeader from '../components/PageHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import { useLang } from '../i18n.jsx'

/* ──────────────────────────────────────────────────────────────
   PHOTOS DE LA PAGE — import automatique
   Dépose tes images dans  src/assets/histoire/  et nomme-les :
     aujourdhui.jpg  -> toi aujourd'hui (appareil en main)
     kart.jpg        -> toi enfant dans le kart
     photo.jpg       -> toi ado avec ton appareil
   ────────────────────────────────────────────────────────────── */
const histoireImages = import.meta.glob(
  '../assets/histoire/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' },
)
function storyImage(key) {
  const found = Object.entries(histoireImages).find(
    ([p]) => p.split('/').pop().split('.')[0] === key,
  )
  return found ? found[1] : null
}

/* Données fixes de chaque bloc (image + sens) ; les textes sont traduits. */
const META = [
  { imgKey: 'aujourdhui', alt: 'Samuel Guivarch, appareil photo en main', reverse: false },
  { imgKey: 'kart', alt: "Samuel enfant, au volant d'un kart", reverse: true },
  { imgKey: 'photo', alt: 'Samuel adolescent, son premier appareil en main', reverse: false },
]

/* Bloc éditorial : photo d'un côté, texte de l'autre.
   "reverse" inverse le sens sur grand écran pour rythmer la page.
   Le titre n'est affiché que s'il existe (le 1er bloc n'en a pas). */
function StoryBlock({ eyebrow, title, imgKey, alt, reverse, paras }) {
  const ref = useReveal()
  const src = storyImage(imgKey)
  return (
    <div
      ref={ref}
      className={`reveal flex flex-col gap-10 lg:flex-row lg:items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Photo */}
      <div className="lg:w-1/2">
        <div className="relative">
          {src ? (
            <img src={src} alt={alt} loading="lazy" className="w-full border border-line object-cover" />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-line bg-graphite">
              <span className="px-4 text-center font-mono text-xs tracking-widest uppercase text-smoke">
                Photo — src/assets/histoire/{imgKey}.jpg
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-amber/30" />
        </div>
      </div>

      {/* Texte */}
      <div className="lg:w-1/2">
        <p className="eyebrow mb-3">{eyebrow}</p>
        {title && (
          <h2 className="font-display font-black uppercase tracking-tight text-2xl sm:text-3xl">
            {title}
          </h2>
        )}
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-smoke">
          {paras.map((p, i) => (
            <p key={i} className={i === 0 && !title ? 'text-chalk' : ''}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Histoire() {
  const { t } = useLang()

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow={t.histoire.eyebrow}
          title={<>{t.histoire.title.a}<span className="text-amber">{t.histoire.title.b}</span></>}
        />

        <div className="mt-12 space-y-20 lg:space-y-28">
          {t.histoire.blocks.map((b, i) => (
            <StoryBlock
              key={i}
              eyebrow={b.eyebrow}
              title={b.title}
              paras={b.paras}
              imgKey={META[i].imgKey}
              alt={META[i].alt}
              reverse={META[i].reverse}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
