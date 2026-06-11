import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <p className="font-mono text-xs tracking-widest uppercase text-smoke">
          © {new Date().getFullYear()} VotreNom — Built to drive. Shot to last.
        </p>
        <Link to="/" className="font-mono text-xs tracking-widest uppercase text-smoke transition-colors hover:text-amber">
          ← Accueil
        </Link>
      </div>
    </footer>
  )
}
