import useReveal from '../hooks/useReveal.js'

/**
 * En-tête commun à toutes les pages intérieures :
 * petite étiquette + grand titre, avec apparition animée.
 *
 * Usage :
 *   <PageHeader eyebrow="01 / L'offre" title={<>Une offre <span className="text-muted">gratuite</span></>} />
 */
export default function PageHeader({ eyebrow, title, intro }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="reveal pb-4 pt-32 sm:pt-36">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="section-title">{title}</h1>
      {intro && <p className="mt-5 max-w-xl text-lg text-muted">{intro}</p>}
    </div>
  )
}
