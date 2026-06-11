import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Remonte la page en haut à chaque changement de route.
 * Sans ce composant, on arrive sur une nouvelle page
 * à la position de scroll de la précédente.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
