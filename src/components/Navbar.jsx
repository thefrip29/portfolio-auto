import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import LangToggle from './LangToggle.jsx'

export default function Navbar() {
  const { t } = useLang()
  const [open, setOpen] = useState(false) // menu mobile

  // Les onglets. Les libellés viennent des traductions.
  const LINKS = [
    { to: '/portfolio', label: t.nav.portfolio },
    { to: '/offre',     label: t.nav.offre },
    { to: '/histoire',  label: t.nav.histoire },
    { to: '/materiel',  label: t.nav.materiel },
  ]

  /* Lien actif : petite pilule blanche, comme un onglet iOS. */
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
      isActive ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* Barre flottante en verre */}
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2">
        <Link to="/" onClick={() => setOpen(false)} className="text-[15px] font-semibold tracking-tight">
          Sam Guivarch
        </Link>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkClass}>{l.label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LangToggle />
          <Link to="/contact" className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-black">
            {t.nav.contact}
          </Link>
        </div>

        {/* Bouton burger (mobile) */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
          aria-label={t.nav.menu}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-[1.5px] w-5 rounded bg-ink transition-transform duration-300 ${open ? 'translate-y-[3.75px] rotate-45' : ''}`} />
          <span className={`block h-[1.5px] w-5 rounded bg-ink transition-transform duration-300 ${open ? '-translate-y-[3.75px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Menu mobile : carte en verre qui se déplie */}
      <div
        className={`glass-strong mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl transition-all duration-500 md:hidden
          ${open ? 'max-h-[30rem] opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}
      >
        <ul className="flex flex-col gap-1 p-3">
          {[...LINKS, { to: '/contact', label: t.nav.contact }].map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive ? 'bg-white text-ink shadow-sm' : 'text-ink/80 hover:bg-white/60'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="px-4 pb-1 pt-3">
            <LangToggle />
          </li>
        </ul>
      </div>
    </header>
  )
}
