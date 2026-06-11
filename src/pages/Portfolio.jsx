import { useEffect, useState } from 'react'
import ColorThief from 'colorthief'
import PageHeader from '../components/PageHeader.jsx'
import Lightbox from '../components/Lightbox.jsx'

/* ──────────────────────────────────────────────────────────────
   IMPORT AUTOMATIQUE DES PHOTOS
   Dépose simplement tes fichiers dans  src/assets/photos/
   (jpg, jpeg, png ou webp) : ils sont détectés par Vite au build,
   aucun code à modifier.
   ────────────────────────────────────────────────────────────── */
const photoModules = import.meta.glob(
  '../assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' },
)
const PHOTO_URLS = Object.values(photoModules)

/* ── Utilitaires couleur ──────────────────────────────────────── */

/** Convertit un RGB [0-255] en HSL { h: 0-360, s: 0-1, l: 0-1 } */
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l } // gris pur
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0))
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  return { h: h * 60, s, l }
}

/**
 * Extrait la couleur dominante d'une image, 100 % côté navigateur
 * (ColorThief lit les pixels via un canvas — aucun appel réseau).
 */
function extractColor(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    const fallback = [20, 20, 23] // gris graphite si l'analyse échoue
    img.onload = () => {
      try {
        resolve(new ColorThief().getColor(img))
      } catch {
        resolve(fallback)
      }
    }
    img.onerror = () => resolve(fallback)
  })
}

/**
 * Tri par teinte (hue) pour créer un dégradé visuel harmonieux.
 * Les photos quasi monochromes (faible saturation) sont regroupées
 * en fin de galerie, triées par luminosité.
 */
function sortByHue(photos) {
  const SAT_MIN = 0.12
  const colored = photos.filter((p) => p.hsl.s >= SAT_MIN)
  const grays = photos.filter((p) => p.hsl.s < SAT_MIN)
  colored.sort((a, b) => a.hsl.h - b.hsl.h || a.hsl.l - b.hsl.l)
  grays.sort((a, b) => b.hsl.l - a.hsl.l)
  return [...colored, ...grays]
}

/* ── Vignette avec lazy loading + fondu d'apparition ──────────── */
function PhotoCard({ photo, onClick }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <button
      onClick={onClick}
      className="group relative mb-4 block w-full break-inside-avoid overflow-hidden border border-line bg-graphite
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
      aria-label="Agrandir la photo"
    >
      <img
        src={photo.src}
        alt=""
        loading="lazy" /* chargement progressif au scroll */
        onLoad={() => setLoaded(true)}
        className={`w-full transition-all duration-700
          ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}
          group-hover:scale-[1.03]`}
      />
      {/* Liseré de la couleur dominante au survol */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: `rgb(${photo.color.join(',')})` }}
      />
    </button>
  )
}

/* ── Squelette affiché pendant l'analyse des couleurs ─────────── */
function Skeleton() {
  const heights = ['h-64', 'h-80', 'h-52', 'h-72', 'h-60', 'h-80', 'h-56', 'h-72', 'h-64']
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`${h} mb-4 break-inside-avoid animate-pulseSoft border border-line bg-graphite`}
        />
      ))}
    </div>
  )
}

/* ── Page Portfolio ───────────────────────────────────────────── */
export default function Portfolio() {
  const [photos, setPhotos] = useState([])     // [{ src, color, hsl }]
  const [analyzing, setAnalyzing] = useState(PHOTO_URLS.length > 0)
  const [selected, setSelected] = useState(null) // photo ouverte en lightbox

  useEffect(() => {
    if (PHOTO_URLS.length === 0) return
    let cancelled = false

    // Analyse de toutes les photos en parallèle, puis tri par teinte
    Promise.all(
      PHOTO_URLS.map(async (src) => {
        const color = await extractColor(src)
        return { src, color, hsl: rgbToHsl(color) }
      }),
    ).then((result) => {
      if (cancelled) return
      setPhotos(sortByHue(result))
      setAnalyzing(false)
    })

    return () => { cancelled = true }
  }, [])

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow="04 / Mon portfolio"
          title={<>La galerie, triée par <span className="text-amber">couleur</span></>}
          intro="Les images sont analysées dans votre navigateur et ordonnées par teinte dominante pour former un dégradé continu."
        />

        {/* 3 états : dossier vide / analyse en cours / galerie prête */}
        <div className="mt-12">
          {PHOTO_URLS.length === 0 ? (
            <div className="border border-dashed border-line p-16 text-center">
              <p className="font-mono text-sm tracking-widest uppercase text-smoke">
                Aucune photo pour l'instant
              </p>
              <p className="mt-3 text-smoke">
                Ajoute tes images dans <code className="text-amber">src/assets/photos/</code> —
                elles apparaîtront ici automatiquement.
              </p>
            </div>
          ) : analyzing ? (
            <Skeleton />
          ) : (
            /* Disposition masonry via colonnes CSS : s'adapte à tout format */
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {photos.map((photo) => (
                <PhotoCard key={photo.src} photo={photo} onClick={() => setSelected(photo)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox plein écran, teintée par la couleur dominante */}
      {selected && (
        <Lightbox
          photo={selected}
          photos={photos}
          onSelect={setSelected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
