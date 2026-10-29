import { useEffect } from 'react'
import { useLang } from '../i18n.jsx'

/**
 * Lightbox plein écran, teintée par la couleur dominante de la photo.
 * Navigation : clic hors image ou Échap pour fermer, ←/→ pour naviguer.
 */
export default function Lightbox({ photo, photos, onSelect, onClose }) {
  const { t } = useLang()
  const [r, g, b] = photo.color
  const index = photos.indexOf(photo)

  const prev = () => onSelect(photos[(index - 1 + photos.length) % photos.length])
  const next = () => onSelect(photos[(index + 1) % photos.length])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  })

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10 animate-fadeUp"
      style={{
        background: `radial-gradient(ellipse at center,
          rgba(${r}, ${g}, ${b}, 0.35) 0%,
          rgba(10, 10, 11, 0.96) 70%)`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <img
        src={photo.src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full object-contain shadow-2xl"
        style={{ boxShadow: `0 0 120px rgba(${r}, ${g}, ${b}, 0.35)` }}
      />

      <button
        onClick={onClose}
        aria-label={t.lightbox.close}
        className="absolute right-5 top-5 font-mono text-sm tracking-widest uppercase text-chalk/70 transition-colors hover:text-amber"
      >
        {t.lightbox.close} ✕
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        aria-label={t.lightbox.prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-3xl text-chalk/60 transition-colors hover:text-amber"
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        aria-label={t.lightbox.next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-3xl text-chalk/60 transition-colors hover:text-amber"
      >
        →
      </button>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-chalk/60">
        {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
      </p>
    </div>
  )
}
