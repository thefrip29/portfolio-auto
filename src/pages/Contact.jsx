import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import useReveal from '../hooks/useReveal.js'

/* ──────────────────────────────────────────────────────────────
   CONFIGURATION FORMSPREE (envoi sans backend)
   1. Crée un compte gratuit sur https://formspree.io
   2. Crée un formulaire → tu obtiens un ID du type "xqkrabcd"
   3. Remplace la valeur ci-dessous par ton ID.
   En attendant, le bouton bascule sur un lien mailto.
   ────────────────────────────────────────────────────────────── */
const FORMSPREE_ID = 'VOTRE_ID_FORMSPREE'
const FALLBACK_EMAIL = 'votre.email@exemple.com'

// ▼ Remplace par tes vrais profils
const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/votrecompte' },
  { label: 'TikTok',    href: 'https://tiktok.com/@votrecompte' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/votreprofil' },
]

const PROJECT_TYPES = [
  'Concession',
  'Propriétaire individuel',
  'Pilote / Écurie',
  'Événement',
  'Autre',
]

export default function Contact() {
  const ref = useReveal()
  // status : 'idle' → 'sending' → 'sent' | 'error'
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    // Pas d'ID Formspree configuré → on ouvre le client mail (mailto)
    if (FORMSPREE_ID === 'VOTRE_ID_FORMSPREE') {
      const subject = encodeURIComponent(`Projet photo — ${data.get('type')}`)
      const body = encodeURIComponent(
        `Nom : ${data.get('nom')}\nEmail : ${data.get('email')}\n\n${data.get('message')}`,
      )
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full border border-line bg-graphite px-4 py-3 text-chalk placeholder-smoke/60 ' +
    'transition-colors duration-300 focus:border-amber focus:outline-none'

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow="05 / Contact"
          title={<>On en <span className="text-amber">parle&nbsp;?</span></>}
        />

        <div ref={ref} className="reveal mt-12 grid gap-14 lg:grid-cols-[2fr_1fr]">
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nom" className="mb-2 block font-mono text-xs tracking-widest uppercase text-smoke">
                  Nom
                </label>
                <input id="nom" name="nom" type="text" required placeholder="Votre nom" className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs tracking-widest uppercase text-smoke">
                  Email
                </label>
                <input id="email" name="email" type="email" required placeholder="vous@exemple.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="mb-2 block font-mono text-xs tracking-widest uppercase text-smoke">
                Type de projet
              </label>
              <select id="type" name="type" required className={inputClass} defaultValue="">
                <option value="" disabled>Choisir…</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-mono text-xs tracking-widest uppercase text-smoke">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="6"
                placeholder="Parlez-moi de votre véhicule, votre concession ou votre événement…"
                className={inputClass}
              />
            </div>

            {/* Bouton d'envoi animé selon l'état */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`btn-primary relative ${status === 'sending' ? 'animate-pulseSoft cursor-wait' : ''}`}
            >
              {status === 'idle' && 'Envoyer le message'}
              {status === 'sending' && 'Envoi en cours…'}
              {status === 'sent' && 'Message envoyé ✓'}
              {status === 'error' && 'Erreur — réessayer'}
            </button>

            {status === 'sent' && (
              <p className="text-sm text-amber">Merci ! Je reviens vers vous rapidement.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-smoke">
                L'envoi a échoué. Vérifiez votre connexion ou écrivez-moi directement par email.
              </p>
            )}
          </form>

          {/* Réseaux sociaux */}
          <aside>
            <h3 className="font-display font-bold text-lg">Retrouvez-moi</h3>
            <ul className="mt-6 space-y-4">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 font-mono text-sm tracking-widest uppercase text-smoke transition-colors hover:text-amber"
                  >
                    <span className="h-px w-8 bg-line transition-colors group-hover:bg-amber" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
