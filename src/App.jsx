import { HashRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Offre from './pages/Offre.jsx'
import Histoire from './pages/Histoire.jsx'
import Materiel from './pages/Materiel.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Contact from './pages/Contact.jsx'

/**
 * Architecture multi-pages.
 * HashRouter est OBLIGATOIRE pour GitHub Pages : les URL prennent la forme
 *   https://pseudo.github.io/depot/#/offre
 * ce qui évite les erreurs 404 au rafraîchissement ou en lien direct
 * (GitHub Pages ne sait pas rediriger les routes côté serveur).
 */
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offre" element={<Offre />} />
          <Route path="/histoire" element={<Histoire />} />
          <Route path="/materiel" element={<Materiel />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
