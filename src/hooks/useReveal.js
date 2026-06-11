import { useEffect, useRef } from 'react'

/**
 * Hook d'apparition au scroll.
 * Attache la classe .is-visible quand l'élément entre dans le viewport.
 *
 * Usage :
 *   const ref = useReveal()
 *   <div ref={ref} className="reveal">...</div>
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el) // on ne joue l'animation qu'une fois
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
