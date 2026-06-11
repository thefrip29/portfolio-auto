import useReveal from '../hooks/useReveal.js'

/**
 * En-tête commun à toutes les pages intérieures :
 * étiquette "télémétrie" + grand titre, avec apparition animée.
 *
 * Usage :
 *   <PageHeader eyebrow="01 / L'offre" title={<>Une offre <span className="text-amber">gratuite</span></>} />
 */
export default function PageHeader({ eyebrow, title, intro }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="reveal pt-32 pb-4">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="section-title">{title}</h1>
      {intro && <p className="mt-4 max-w-xl text-smoke text-lg">{intro}</p>}
    </div>
  )
}
