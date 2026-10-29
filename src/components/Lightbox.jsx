import { useEffect } from 'react'
import { useLang } from '../i18n.jsx'

/**
 * Lightbox plein écran sur fond de verre clair,
 * légèrement teinté par la couleur dominante de la photo.
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

  const roundBtn =
    'glass-strong flex h-11 w-11 items-center justify-center rounded-full text-lg text-ink transition-transform duration-300 hover:scale-105'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex animate-fadeUp items-center justify-center p-4 sm:p-14"
      style={{
        background: `radial-gradient(ellipse at center,
          rgba(${r}, ${g}, ${b}, 0.22) 0%,
          rgba(242, 242, 245, 0.88) 70%)`,
        backdropFilter: 'blur(28px) saturate(150%)',
        WebkitBackdropFilter: 'blur(28px) saturate(150%)',
      }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-2xl object-contain"
        style={{ boxShadow: `0 30px 80px rgba(${r}, ${g}, ${b}, 0.35)` }}
      />

      <button
        onClick={onClose}
        aria-label={t.lightbox.close}
        className="glass-strong absolute right-4 top-4 rounded-full px-4 py-2 text-sm font-medium text-ink transition-transform duration-300 hover:scale-105"
      >
        {t.lightbox.close} ✕
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        aria-label={t.lightbox.prev}
        className={`${roundBtn} absolute left-3 top-1/2 -translate-y-1/2`}
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        aria-label={t.lightbox.next}
        className={`${roundBtn} absolute right-3 top-1/2 -translate-y-1/2`}
      >
        →
      </button>

      <p className="glass-strong absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-medium tabular-nums text-muted">
        {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
      </p>
    </div>
  )
}
