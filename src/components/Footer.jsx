import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <p className="font-mono text-xs tracking-widest uppercase text-smoke">
          © {new Date().getFullYear()} Sam Guivarch — {t.footer.tagline}
        </p>
        <Link to="/" className="font-mono text-xs tracking-widest uppercase text-smoke transition-colors hover:text-amber">
          {t.footer.home}
        </Link>
      </div>
    </footer>
  )
}
