import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import useReveal from '../hooks/useReveal.js'
import { useLang } from '../i18n.jsx'

/* ──────────────────────────────────────────────────────────────
   RÉCEPTION DES MESSAGES — FORMSPREE
   FORMSPREE_ID = ton identifiant de formulaire (formspree.io).
   Les noms des champs (name="...") restent FIXES pour que Formspree
   fonctionne, peu importe la langue affichée.
   ────────────────────────────────────────────────────────────── */
const FORMSPREE_ID = 'xqeogyan'
const FALLBACK_EMAIL = 'samgvrch.raw@gmail.com'

// Réseaux sociaux (ordre = ordre d'affichage)
const SOCIALS = [
  { label: 'Instagram', handle: '@samgvrch.raw', href: 'https://www.instagram.com/samgvrch.raw/', icon: 'instagram' },
  { label: 'TikTok', handle: '@samgvrch.raw', href: 'https://www.tiktok.com/@samgvrch.raw', icon: 'tiktok' },
]

/* Icônes des réseaux (SVG en ligne). */
function SocialIcon({ name }) {
  if (name === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M16.5 3c.36 2.02 1.62 3.6 3.5 4.02V9.4c-1.3 0-2.56-.42-3.6-1.16v6.36a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6.02.9.08v2.42a3.2 3.2 0 1 0 2.3 3.07V3h2.5z" />
    </svg>
  )
}

export default function Contact() {
  const { t } = useLang()
  const ref = useReveal()
  const [status, setStatus] = useState('idle') // 'idle' → 'sending' → 'sent' | 'error'

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    // Repli sans Formspree : ouvre le client mail (pas de confirmation possible)
    if (FORMSPREE_ID === 'VOTRE_ID_FORMSPREE') {
      const subject = encodeURIComponent('Nouveau message — Portfolio')
      const body = encodeURIComponent(
        `Nom : ${data.get('Nom')}\n` +
        `Email : ${data.get('email')}\n` +
        `Téléphone : ${data.get('Téléphone')}\n` +
        `Organisation : ${data.get('Organisation')}\n` +
        `Projet : ${data.get('Projet')}\n` +
        `Description : ${data.get('Description')}`,
      )
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`
      return
    }

    // Envoi automatique via Formspree -> mail reçu + confirmation affichée
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

  const labelClass =
    'mb-2 block font-mono text-xs tracking-widest uppercase text-smoke'

  const c = t.contact

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <PageHeader
          eyebrow={c.eyebrow}
          title={<>{c.title.a}<span className="text-amber">{c.title.b}</span></>}
        />

        <div ref={ref} className="reveal mt-12 grid gap-14 lg:grid-cols-[2fr_1fr]">
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Sujet du mail reçu (champ caché lu par Formspree) */}
            <input type="hidden" name="_subject" value="Nouveau message — Portfolio" />

            {/* Nom + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nom" className={labelClass}>{c.labels.nom}</label>
                <input id="nom" name="Nom" type="text" required placeholder={c.placeholders.nom} className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>{c.labels.email}</label>
                <input id="email" name="email" type="email" required placeholder={c.placeholders.email} className={inputClass} />
              </div>
            </div>

            {/* Téléphone + Organisation */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="telephone" className={labelClass}>{c.labels.tel}</label>
                <input id="telephone" name="Téléphone" type="tel" placeholder={c.placeholders.tel} className={inputClass} />
              </div>
              <div>
                <label htmlFor="organisation" className={labelClass}>{c.labels.org}</label>
                <input id="organisation" name="Organisation" type="text" placeholder={c.placeholders.org} className={inputClass} />
              </div>
            </div>

            {/* Projet */}
            <div>
              <label htmlFor="projet" className={labelClass}>{c.labels.projet}</label>
              <select id="projet" name="Projet" required className={inputClass} defaultValue="">
                <option value="" disabled>{c.choose}</option>
                {c.types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelClass}>{c.labels.desc}</label>
              <textarea
                id="description"
                name="Description"
                required
                rows="6"
                placeholder={c.placeholders.desc}
                className={inputClass}
              />
            </div>

            {/* Bouton d'envoi animé selon l'état */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`btn-primary relative ${status === 'sending' ? 'animate-pulseSoft cursor-wait' : ''}`}
            >
              {status === 'idle' && c.btn.idle}
              {status === 'sending' && c.btn.sending}
              {status === 'sent' && c.btn.sent}
              {status === 'error' && c.btn.error}
            </button>

            {status === 'sent' && (
              <p className="text-sm text-amber">{c.sentMsg}</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-smoke">{c.errorMsg}</p>
            )}
          </form>

          {/* Réseaux sociaux : cartes cliquables */}
          <aside>
            <h3 className="font-display font-bold text-lg">{c.findMe}</h3>
            <div className="mt-6 space-y-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-line bg-graphite p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/60"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-line text-chalk transition-colors group-hover:border-amber group-hover:text-amber">
                    <SocialIcon name={s.icon} />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display font-bold">{s.label}</span>
                    <span className="font-mono text-xs text-smoke transition-colors group-hover:text-amber">
                      {s.handle}
                    </span>
                  </span>
                  <span className="ml-auto font-mono text-smoke transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber">
                    →
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
