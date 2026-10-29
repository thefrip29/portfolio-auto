import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="px-3 pb-6 sm:px-5">
      <div className="glass mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 rounded-3xl px-6 py-5 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Sam Guivarch — {t.footer.tagline}
        </p>
        <Link to="/" className="text-sm font-medium text-muted transition-colors hover:text-ink">
          {t.footer.home}
        </Link>
      </div>
    </footer>
  )
}
