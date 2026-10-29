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

/* Bloc éditorial : photo d'un côté, carte de texte en verre de l'autre.
   "reverse" inverse le sens sur grand écran pour rythmer la page.
   Le titre n'est affiché que s'il existe (le 1er bloc n'en a pas). */
function StoryBlock({ eyebrow, title, imgKey, alt, reverse, paras }) {
  const ref = useReveal()
  const src = storyImage(imgKey)
  return (
    <div
      ref={ref}
      className={`reveal flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Photo */}
      <div className="lg:w-1/2">
        {src ? (
          <img src={src} alt={alt} loading="lazy" className="w-full rounded-[1.75rem] object-cover shadow-lift" />
        ) : (
          <div className="glass flex aspect-[4/3] items-center justify-center rounded-[1.75rem]">
            <span className="px-4 text-center text-sm text-muted">
              Photo — src/assets/histoire/{imgKey}.jpg
            </span>
          </div>
        )}
      </div>

      {/* Texte */}
      <div className="glass rounded-[1.75rem] p-7 sm:p-9 lg:w-1/2">
        <p className="eyebrow mb-3">{eyebrow}</p>
        {title && (
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
        )}
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
          {paras.map((p, i) => (
            <p key={i} className={i === 0 && !title ? 'text-ink' : ''}>{p}</p>
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
          title={<>{t.histoire.title.a}<span className="text-muted">{t.histoire.title.b}</span></>}
        />

        <div className="mt-12 space-y-16 lg:space-y-24">
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
