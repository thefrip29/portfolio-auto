import { useEffect } from 'react'

/**
 * Lightbox plein écran.
 * L'arrière-plan est subtilement teinté par la couleur dominante
 * de la photo (halo radial + voile coloré sur fond noir).
 * Navigation : clic hors image ou Échap pour fermer, ←/→ pour naviguer.
 */
export default function Lightbox({ photo, photos, onSelect, onClose }) {
  const [r, g, b] = photo.color
  const index = photos.indexOf(photo)

  const prev = () => onSelect(photos[(index - 1 + photos.length) % photos.length])
  const next = () => onSelect(photos[(index + 1) % photos.length])

  // Raccourcis clavier + blocage du scroll de la page
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
        // Teinte subtile : halo radial de la couleur dominante sur fond quasi noir
        background: `radial-gradient(ellipse at center,
          rgba(${r}, ${g}, ${b}, 0.35) 0%,
          rgba(10, 10, 11, 0.96) 70%)`,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Photo (le clic sur l'image ne ferme pas) */}
      <img
        src={photo.src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full object-contain shadow-2xl"
        style={{ boxShadow: `0 0 120px rgba(${r}, ${g}, ${b}, 0.35)` }}
      />

      {/* Fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 top-5 font-mono text-sm tracking-widest uppercase text-chalk/70 transition-colors hover:text-amber"
      >
        Fermer ✕
      </button>

      {/* Précédente / suivante */}
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        aria-label="Photo précédente"
        className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-3xl text-chalk/60 transition-colors hover:text-amber"
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        aria-label="Photo suivante"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-3xl text-chalk/60 transition-colors hover:text-amber"
      >
        →
      </button>

      {/* Compteur */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-chalk/60">
        {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
      </p>
    </div>
  )
}
