import { useEffect, useState } from 'react'
import ColorThief from 'colorthief'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'
import PageHeader from '../components/PageHeader.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { useLang } from '../i18n.jsx'

/* ──────────────────────────────────────────────────────────────
   IMPORT AUTOMATIQUE DES PHOTOS
   Dépose tes fichiers dans  src/assets/photos/  (jpg, jpeg, png, webp).
   NOMMAGE attendu :  <shoot>-<numero>.jpg  ou  <numero>.jpg
   Le premier chiffre = le numéro de shooting (sert au tri).
   ────────────────────────────────────────────────────────────── */
const photoModules = import.meta.glob(
  '../assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' },
)

/** Numéro de shoot = chiffres au début du nom de fichier. */
function shootNumber(name) {
  const m = name.match(/^(\d+)/)
  return m ? parseInt(m[1], 10) : Infinity
}

const PHOTOS = Object.entries(photoModules).map(([path, url]) => {
  const name = path.split('/').pop()
  return { src: url, name, shoot: shootNumber(name), alt: 'Photographie automobile — Sam Guivarch' }
})

/* ── Couleur dominante (déco lightbox + tri interne) ───────────── */
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0))
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  return { h: h * 60, s, l }
}

function loadMeta(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    const fallback = { color: [20, 20, 23], width: 4, height: 3 }
    img.onload = () => {
      let color = [20, 20, 23]
      try { color = new ColorThief().getColor(img, 25) } catch { /* garde le gris */ }
      resolve({ color, width: img.naturalWidth || 4, height: img.naturalHeight || 3 })
    }
    img.onerror = () => resolve(fallback)
  })
}

/* TRI : par shoot (du plus grand au plus petit),
   puis dégradé de teinte à shoot égal. */
function arrange(photos) {
  return [...photos].sort((a, b) => {
    if (a.shoot !== b.shoot) return b.shoot - a.shoot
    const aGray = a.hsl.s < 0.12
    const bGray = b.hsl.s < 0.12
    if (aGray !== bGray) return aGray ? 1 : -1
    return a.hsl.h - b.hsl.h || a.hsl.l - b.hsl.l
  })
}

function Skeleton({ label }) {
  const widths = ['w-72', 'w-56', 'w-80', 'w-64', 'w-72', 'w-56', 'w-80']
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">
        {widths.map((w, i) => (
          <div key={i} className={`h-56 ${w} animate-pulseSoft rounded-2xl bg-white/60`} />
        ))}
      </div>
    </div>
  )
}

function rowHeight(containerWidth) {
  if (containerWidth < 640) return 220
  if (containerWidth < 1024) return 300
  return 360
}
function rowConstraints(containerWidth) {
  if (containerWidth < 640) return { maxPhotos: 2 }
  return { maxPhotos: 3 }
}

export default function Portfolio() {
  const { t, lang } = useLang()
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(PHOTOS.length > 0)
  const [selected, setSelected] = useState(null)

  /* CHARGEMENT PROGRESSIF :
     chaque photo s'ajoute dès qu'elle est prête (au lieu d'attendre
     que TOUTES soient chargées). La galerie apparaît donc tout de suite,
     et l'ordre par shoot est respecté en continu (le numéro est connu
     d'avance via le nom de fichier). */
  useEffect(() => {
    if (PHOTOS.length === 0) return
    let cancelled = false
    const collected = []
    let done = 0

    PHOTOS.forEach((p) => {
      loadMeta(p.src).then((meta) => {
        if (cancelled) return
        collected.push({ ...p, ...meta, hsl: rgbToHsl(meta.color) })
        done += 1
        setPhotos(arrange(collected.slice()))
        if (loading) setLoading(false) // dès la 1re photo, on retire le skeleton
        if (done === PHOTOS.length) setLoading(false)
      })
    })

    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadingLabel = lang === 'en'
    ? 'Loading the gallery…'
    : 'Chargement de la galerie…'

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow={t.portfolio.eyebrow}
          title={<>{t.portfolio.title.a}<span className="text-muted">{t.portfolio.title.b}</span></>}
          intro={t.portfolio.intro}
        />

        <div className="mt-12">
          {PHOTOS.length === 0 ? (
            <div className="glass rounded-3xl p-16 text-center">
              <p className="text-sm font-semibold text-ink">
                {t.portfolio.emptyTitle}
              </p>
              <p className="mt-3 text-muted">
                {t.portfolio.emptyTextA}<code className="text-accent">src/assets/photos/</code>{t.portfolio.emptyTextB}
              </p>
            </div>
          ) : loading ? (
            <Skeleton label={loadingLabel} />
          ) : (
            <RowsPhotoAlbum
              photos={photos}
              targetRowHeight={rowHeight}
              rowConstraints={rowConstraints}
              spacing={10}
              render={{
                image: (props) => (
                  <img {...props} loading="lazy" decoding="async" alt={props.alt || ''} />
                ),
              }}
              onClick={({ index }) => setSelected(photos[index])}
            />
          )}
        </div>
      </div>

      {selected && (
        <Lightbox photo={selected} photos={photos} onSelect={setSelected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
