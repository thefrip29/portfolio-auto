import Hero from '../components/Hero.jsx'
import Teasers from '../components/Teasers.jsx'

/**
 * Landing page : vitrine synthétique.
 * Le détail de chaque sujet vit sur sa propre page —
 * ici, uniquement le hero et les teasers.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Teasers />
    </>
  )
}
