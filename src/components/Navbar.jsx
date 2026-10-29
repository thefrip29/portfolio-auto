import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import LangToggle from './LangToggle.jsx'

export default function Navbar() {
  const { t } = useLang()
  const [open, setOpen] = useState(false) // menu mobile

  // Les 5 onglets. Les libellés viennent des traductions.
  const LINKS = [
    { to: '/portfolio', label: t.nav.portfolio },
    { to: '/offre',     label: t.nav.offre },
    { to: '/histoire',  label: t.nav.histoire },
    { to: '/materiel',  label: t.nav.materiel },
    { to: '/contact',   label: t.nav.contact, highlight: true },
  ]

  /**
   * Style d'un lien : gris au repos, ambre au survol, souligné ambre si actif.
   * Le lien "highlight" (Contact) est ambre en permanence.
   */
  const linkClass = (highlight) => ({ isActive }) => {
    const base =
      'font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300 border-b pb-1'

    if (highlight) return `${base} text-amber font-bold border-transparent`
    if (isActive) return `${base} text-amber border-amber`
    return `${base} text-smoke border-transparent hover:text-amber`
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-carbon/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        {/* Logo / marque → retour à l'accuei */}
        <Link to="/" className="font-display font-black uppercase tracking-tight text-lg">
          Sam Guivarch<span className="text-amber"></span>
        </Link>

        {/* Liens desktop + sélecteur de langue */}
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkClass(l.highlight)}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <LangToggle />
          </li>
        </ul>

        {/* Bouton burger (mobile) */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={t.nav.menu}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-px w-6 bg-chalk transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-chalk transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-chalk transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      <div
        className={`md:hidden overflow-hidden bg-carbon/95 backdrop-blur transition-[max-height] duration-500
          ${open ? 'max-h-96 border-b border-line' : 'max-h-0'}`}
      >
        <ul className="flex flex-col px-5 py-4 gap-4">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} onClick={() => setOpen(false)} className={linkClass(l.highlight)}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-2">
            <LangToggle />
          </li>
        </ul>
      </div>
    </header>
  )
}
