import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

// Les 5 onglets : chacun pointe désormais vers sa propre page (route)
const LINKS = [
  { to: '/offre',     label: "L'offre" },
  { to: '/histoire',  label: 'Mon histoire' },
  { to: '/materiel',  label: 'Mon matériel' },
  { to: '/portfolio', label: 'Mon portfolio' },
  { to: '/contact',   label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false) // menu mobile

  // Style des liens : l'onglet actif est souligné d'ambre
  const linkClass = ({ isActive }) =>
    `font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300
     border-b pb-1
     ${isActive
       ? 'text-amber border-amber'
       : 'text-smoke border-transparent hover:text-amber'}`

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-carbon/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        {/* Logo / marque → retour à l'accueil */}
        <Link to="/" className="font-display font-black uppercase tracking-tight text-lg">
          <span className="text-amber">●</span> VotreNom<span className="text-amber">.</span>
        </Link>

        {/* Liens desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Bouton burger (mobile) */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Ouvrir le menu"
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
              <NavLink to={l.to} onClick={() => setOpen(false)} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
