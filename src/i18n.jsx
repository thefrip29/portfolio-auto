import { createContext, useContext, useEffect, useState } from 'react'

/* ──────────────────────────────────────────────────────────────
   TRADUCTIONS DU SITE (FR / EN)
   Tout le texte visible du site vit ici. Pour modifier un mot,
   change-le dans fr (français) et en (anglais).
   Les titres en deux tons sont découpés en { a, b } :
   a = texte normal, b = mot affiché en ambre.
   ────────────────────────────────────────────────────────────── */
export const T = {
  fr: {
    nav: {
      portfolio: `Portfolio`,
      offre: `Mon Offre`,
      histoire: `Mon histoire`,
      materiel: `Matériel`,
      contact: `Contact`,
      menu: `Ouvrir le menu`,
    },
    hero: {
      l1: `Built to drive`,
      l2: `Shot to last.`,
      subtitle: `Concessions, propriétaires, pilotes ou écuries : des images prêtes à publier, livrées en 72 heures.`,
      cta: `Découvrir mon travail`,
    },
    teasers: {
      eyebrow: `Au programme`,
      title: { a: `Explorez le `, b: `site` },
      items: [
        {
          title: `Portfolio`,
          synopsis: `Une galerie vivante, le meilleur aperçu de ce que je peux faire pour vous.`,
          cta: `Voir le portfolio`,
        },
        {
          title: `L'offre`,
          synopsis: `Une offre de lancement gratuite : je photographie votre véhicule, votre concession ou votre événement, et je livre des photos retouchées en 72 h, planning éditorial inclus.`,
          cta: `Découvrir l'offre`,
        },
        {
          title: `Mon histoire`,
          synopsis: `De la passion automobile à l'appareil photo : le parcours qui m'a mené à la photographie automobile.`,
          cta: `Découvrir mon histoire`,
        },
        {
          title: `Mon matériel`,
          synopsis: `Du matériel de pointe pour répondre à tous vos besoins : statiques en concession, filés en bord de piste, détails et ambiances de nuit.`,
          cta: `Voir mon matériel`,
        },
      ],
    },
    footer: {
      tagline: `Built to drive, Shot to last.`,
      home: `← Accueil`,
    },
    portfolio: {
      eyebrow: `01 / Mon portfolio`,
      title: { a: `Une galerie, `, b: `une vision.` },
      intro: `Mon travail, photo après photo.`,
      emptyTitle: `Aucune photo pour l'instant`,
      emptyTextA: `Ajoute tes images dans `,
      emptyTextB: ` — elles apparaîtront ici automatiquement.`,
      loading: `Le portfolio peut prendre quelques secondes à charger`,
    },
    offre: {
      eyebrow: `02 / L'offre`,
      title: { a: `Une offre de lancement `, b: `gratuite` },
      lead: { a: `Vos photos, `, b: `prêtes à publier` },
      para1: `Concessionnaires, propriétaires passionnés, pilotes ou écuries : je viens capturer votre véhicule, votre concession ou votre événement, puis je vous livre des images retouchées, accompagnées d'un plan clair pour les diffuser. Vous n'avez plus qu'à publier.`,
      punch: `Zéro friction entre la prise et la publication.`,
      para2: `En échange, vos véhicules gagnent en visibilité sur mes réseaux, et je nourris mon portfolio avec du contenu réel.`,
      cards: [
        { tag: `Offre de lancement`, title: `100 % gratuit`, text: `Aucun coût : je développe mon portfolio, vous repartez avec des images pro.` },
        { tag: `Livraison`, title: `Photos sous 72 h`, text: `Fichiers retouchés et prêts à publier, quelques jours après la séance.` },
        { tag: `Inclus`, title: `Planning éditorial`, text: `Quoi publier, quand et avec quelle accroche. Pensé pour vous.` },
        { tag: `Cadre pro`, title: `Déclaré & assuré`, text: `Auto-entreprise officielle, assurances mobilisables selon votre projet.` },
        { tag: `Mobilité`, title: `Partout en Europe *`, text: `Je me déplace sur vos lieux : concessions, circuits et événements.` },
        { tag: `En échange`, title: `Publicité croisée`, text: `Vos véhicules et événements mis en avant sur mes réseaux sociaux.` },
      ],
      ctaEyebrow: `Intéressé ?`,
      ctaTitle: `Parlons de votre projet`,
      ctaButton: `Me contacter`,
      note: `* Selon la localisation du projet, si les frais de déplacement engagés sont trop importants, une participation pourra être demandée afin de les couvrir.`,
    },
    histoire: {
      eyebrow: `03 / Mon histoire`,
      title: { a: `Derrière `, b: `l'objectif` },
      blocks: [
        {
          eyebrow: `Aujourd'hui`,
          title: ``,
          paras: [
            `Je m'appelle Samuel Guivarch, j'ai 22 ans et je suis étudiant ingénieur aux Arts et Métiers. Mais avant tout, je suis un passionné de photographie et d'automobile.`,
            `Le sport auto, je le vis intensément : de nombreuses 24 Heures du Mans à mon actif, un Grand Prix de Formule 1 à Spa-Francorchamps, et cette envie constante d'être au plus près des machines qui me fascinent.`,
            `Aujourd'hui, je réunis ces deux passions pour mettre mon objectif au service des voitures et de ceux qui les font vivre.`,
          ],
        },
        {
          eyebrow: `Comment tout a commencé`,
          title: `L'automobile, d'abord`,
          paras: [
            `Tout a commencé enfant. Chaque mois, je dévorais les magazines de sport auto, fasciné par les dernières voitures du moment, le nez collé aux pages comme on regarde un rêve.`,
            `Une passion que je n'ai jamais lâchée : je l'ai d'abord développée à travers l'ingénierie, et aujourd'hui je la prolonge derrière l'objectif.`,
          ],
        },
        {
          eyebrow: `Le déclic`,
          title: `Et puis la photo`,
          paras: [
            `La photographie est arrivée presque en même temps : j'ai eu mon premier appareil à 10 ans. Depuis, je n'ai jamais arrêté de photographier ma vie et, dès que je le pouvais, des voitures.`,
            `Au fil des années et des courses auxquelles j'ai assisté, j'ai affiné ma technique, appris à saisir la vitesse, la lumière et l'instant juste.`,
          ],
        },
      ],
    },
    materiel: {
      eyebrow: `04 / Mon matériel`,
      title: { a: `Dans le `, b: `sac` },
      intro: `Du matériel de pointe, choisi pour chaque situation : concession, circuit, nuit.`,
      placeholder: `Image produit`,
      gear: [
        { img: 'boitier', name: `Boîtier - Sony a6500`, desc: `Compact et réactif : 24 Mpx, stabilisation 5 axes, parfait en bord de piste.` },
        { img: '100-400', name: `Objectif - Sigma 100-400mm f/5-6.3`, desc: `Le téléobjectif de référence pour les filés en bord de piste.` },
        { img: '18-50', name: `Objectif - Sigma 18-50mm f/2.8`, desc: `Compact et lumineux, parfait du grand-angle au portrait de carrosserie.` },
        { img: 'ronin', name: `Stabilisateur - DJI Ronin-SC`, desc: `Stabilise la caméra pour des mouvements fluides.` },
        { img: '3in1', name: `Filtre - K&F Concept 3 en 1`, desc: `Supprime les reflets sur les carrosseries et les vitres.` },
      ],
    },
    contact: {
      eyebrow: `05 / Contact`,
      title: { a: `On en `, b: `parle ?` },
      labels: { nom: `Nom`, email: `Email`, tel: `Téléphone`, org: `Organisation`, projet: `Projet`, desc: `Description` },
      placeholders: {
        nom: `Votre nom`,
        email: `vous@exemple.com`,
        tel: `06 12 34 56 78`,
        org: `Concession, écurie, marque…`,
        desc: `Parlez-moi de votre véhicule, votre concession ou votre événement…`,
      },
      choose: `Choisir…`,
      types: [`Concession`, `Propriétaire individuel`, `Pilote / Écurie`, `Événement`, `Autre`],
      btn: { idle: `Envoyer le message`, sending: `Envoi en cours…`, sent: `Message envoyé !`, error: `Erreur — réessayer` },
      sentMsg: `Message envoyé ! Je reviens vers vous rapidement.`,
      errorMsg: `L'envoi a échoué. Vérifiez votre connexion ou écrivez-moi directement par email.`,
      findMe: `Retrouvez-moi`,
    },
    lightbox: { close: `Fermer`, prev: `Photo précédente`, next: `Photo suivante` },
  },

  en: {
    nav: {
      portfolio: `Portfolio`,
      offre: `My Offer`,
      histoire: `My Story`,
      materiel: `Gear`,
      contact: `Contact`,
      menu: `Open menu`,
    },
    hero: {
      l1: `Built to drive`,
      l2: `Shot to last.`,
      subtitle: `Dealerships, owners, drivers or racing teams: ready-to-publish images, delivered within 72 hours.`,
      cta: `Discover my work`,
    },
    teasers: {
      eyebrow: `What's inside`,
      title: { a: `Explore the `, b: `site` },
      items: [
        {
          title: `Portfolio`,
          synopsis: `A living gallery. The best overview of what I can do for you.`,
          cta: `View the portfolio`,
        },
        {
          title: `The offer`,
          synopsis: `A free launch offer: I photograph your vehicle, your dealership or your event, and deliver retouched photos within 72h, editorial plan included.`,
          cta: `Discover the offer`,
        },
        {
          title: `My story`,
          synopsis: `From a passion for cars to the camera: the path that led me to automotive photography.`,
          cta: `Discover my story`,
        },
        {
          title: `My gear`,
          synopsis: `High-end equipment for every need: static shots at the dealership, rolling shots trackside, details and night moods.`,
          cta: `See my gear`,
        },
      ],
    },
    footer: {
      tagline: `Built to drive, Shot to last.`,
      home: `← Home`,
    },
    portfolio: {
      eyebrow: `01 / Portfolio`,
      title: { a: `One gallery, `, b: `one vision.` },
      intro: `My work, picture after picture.`,
      emptyTitle: `No photos yet`,
      emptyTextA: `Add your images to `,
      emptyTextB: ` — they'll appear here automatically.`,
      loading: `The portfolio may take a few seconds to load`,
    },
    offre: {
      eyebrow: `02 / The offer`,
      title: { a: `A free launch `, b: `offer` },
      lead: { a: `Your pictures, `, b: `ready to publish` },
      para1: `Dealerships, passionate owners, drivers or racing teams: I come to capture your vehicle, your dealership or your event, then deliver edited images along with a clear plan to share them. All you have to do is publish.`,
      punch: `Zero friction between the shot and the post.`,
      para2: `In return, your vehicles gain visibility on my social media, and I build my portfolio with real content.`,
      cards: [
        { tag: `Launch offer`, title: `100% free`, text: `No cost: I build my portfolio, you walk away with pro images.` },
        { tag: `Delivery`, title: `Photos within 72h`, text: `Edited, ready-to-publish files a few days after the shoot.` },
        { tag: `Included`, title: `Editorial plan`, text: `What to post, when and with which hook. Designed for you.` },
        { tag: `Pro setup`, title: `Registered & insured`, text: `Official sole proprietorship, insurance available depending on your project.` },
        { tag: `Mobility`, title: `Across Europe *`, text: `I travel to your locations: dealerships, circuits and events.` },
        { tag: `In return`, title: `Cross-promotion`, text: `Your vehicles and events featured on my social media.` },
      ],
      ctaEyebrow: `Interested?`,
      ctaTitle: `Let's talk about your project`,
      ctaButton: `Contact me`,
      note: `* Depending on the project's location, if the travel costs incurred are too high, a contribution may be requested to cover them.`,
    },
    histoire: {
      eyebrow: `03 / My story`,
      title: { a: `Behind the `, b: `lens` },
      blocks: [
        {
          eyebrow: `Today`,
          title: ``,
          paras: [
            `My name is Samuel Guivarch, I'm 22 and I'm an engineering student at Arts et Métiers. But above all, I'm passionate about photography and cars.`,
            `I live motorsport intensely: many 24 Hours of Le Mans under my belt, a Formula 1 Grand Prix at Spa-Francorchamps, and a constant urge to be as close as possible to the machines that fascinate me.`,
            `Today, I bring these two passions together to put my lens at the service of cars and the people who keep them alive.`,
          ],
        },
        {
          eyebrow: `How it all began`,
          title: `Cars, first`,
          paras: [
            `It all started as a child. Every month, I devoured motorsport magazines, fascinated by the latest cars, my nose glued to the pages like watching a dream.`,
            `A passion I never let go of: I first developed it through engineering, and today I extend it behind the lens.`,
          ],
        },
        {
          eyebrow: `The spark`,
          title: `Then photography`,
          paras: [
            `Photography came almost at the same time: I got my first camera at 10. Since then, I've never stopped photographing my life and, whenever I could, cars.`,
            `Over the years and the races I attended, I refined my technique, learning to capture speed, light and the right moment.`,
          ],
        },
      ],
    },
    materiel: {
      eyebrow: `04 / My gear`,
      title: { a: `In the `, b: `bag` },
      intro: `High-end equipment, chosen for every situation: dealership, circuit, night.`,
      placeholder: `Product image`,
      gear: [
        { img: 'boitier', name: `Body - Sony a6500`, desc: `Compact and responsive: 24 MP, 5-axis stabilization, perfect trackside.` },
        { img: '100-400', name: `Lens - Sigma 100-400mm f/5-6.3`, desc: `The go-to telephoto for rolling shots trackside.` },
        { img: '18-50', name: `Lens - Sigma 18-50mm f/2.8`, desc: `Compact and bright, perfect from wide angle to bodywork portrait.` },
        { img: 'ronin', name: `Gimbal - DJI Ronin-SC`, desc: `Stabilizes the camera for smooth, fluid motion.` },
        { img: '3in1', name: `Filter - K&F Concept 3-in-1`, desc: `Removes reflections on bodywork and glass.` },
      ],
    },
    contact: {
      eyebrow: `05 / Contact`,
      title: { a: `Let's `, b: `talk?` },
      labels: { nom: `Name`, email: `Email`, tel: `Phone`, org: `Organization`, projet: `Project`, desc: `Description` },
      placeholders: {
        nom: `Your name`,
        email: `you@example.com`,
        tel: `+33 6 12 34 56 78`,
        org: `Dealership, team, brand…`,
        desc: `Tell me about your vehicle, your dealership or your event…`,
      },
      choose: `Choose…`,
      types: [`Dealership`, `Individual owner`, `Driver / Team`, `Event`, `Other`],
      btn: { idle: `Send message`, sending: `Sending…`, sent: `Message sent!`, error: `Error — try again` },
      sentMsg: `Message sent! I'll get back to you shortly.`,
      errorMsg: `Sending failed. Check your connection or email me directly.`,
      findMe: `Find me`,
    },
    lightbox: { close: `Close`, prev: `Previous photo`, next: `Next photo` },
  },
}

const LangContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'fr' || saved === 'en') return saved
    } catch { /* localStorage indisponible */ }
    return 'fr'
  })

  useEffect(() => {
    try { localStorage.setItem('lang', lang) } catch { /* ignore */ }
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: T[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang doit être utilisé dans <LanguageProvider>')
  return ctx
}
