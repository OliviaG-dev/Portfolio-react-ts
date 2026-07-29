---
id: portfolio-react-ts
name: Portfolio
description: Portfolio one-page React/TypeScript — apprentissage du pinch-zoom net, SVG animé et effets CSS avancés (mask-composite) sans librairie.
technologies: [React, TypeScript, Vite, CSS, React Router, SVG]
newTechnologies: [Touch API / gestes lightbox, CSS mask-composite, SVG + CSS animations]
githubUrl: https://github.com/OliviaG-dev/Portfolio-react-ts
demoUrl: https://portfolio-react-ts-two.vercel.app/
---

## Contexte

Ce portfolio présente mon parcours et mes projets dans une expérience one-page immersive (header Creator, constellation « À propos », galerie filtrable, lightbox, orbes de contact).

La stack de base (React, TypeScript, Vite, CSS) était déjà maîtrisée. Les vrais apprentissages récents portent sur des **interactions tactiles natives**, une **illustration SVG animée**, et des **effets CSS fragiles cross-browser**, sans ajouter de dépendance.

## Nouvelles technologies — vue d'ensemble

| Techno | Déjà connue ? | Rôle dans le projet |
|--------|---------------|---------------------|
| React / TypeScript / Vite | Oui | UI, typage, build |
| React Router | Oui | Navigation |
| Touch API (pinch / pan / swipe) | Non (en profondeur) | Lightbox mobile : zoom net + navigation slides |
| CSS `mask-composite` / sheen | Partiel | Anneau brillant des orbes contact |
| SVG + CSS animations | Partiel | Constellation About, étoiles header |
| IntersectionObserver | Partiel | Reveal des orbes au scroll |

## Architecture UI

One-page découpée en blocs, chacun avec une responsabilité claire :

| Zone | Fichiers | Rôle |
|------|----------|------|
| Header Creator | `Header/` | Identité (avatar, tagline, étoiles SVG) |
| About | `Home.tsx` + `AboutConstellation/` + cartes | Intro lotus, constellation animée, Presentation / Quest |
| Projets | `Home.tsx` + `Modal/` | Galerie filtrable, flip cards, détail + lightbox |
| Contact | `Home.tsx` / `Home.css` | Orbes argentées + liens (email, GitHub, LinkedIn, CV) |
| Données | `assets/data/projects.json` + `services/` | Contenu projets découplé de l’UI |

Points d’attention UX :

- **Modal projet** = fiche (texte, tags, liens) + carrousel ; **lightbox** = plein écran gestuel au-dessus.
- Flip des cartes : hover desktop / tap mobile (détection `(hover: hover) and (pointer: fine)`).
- Filtres par tags + aperçu (6 projets) puis « voir tout ».

## Données

Les projets ne sont **pas** hardcodés dans les composants. Tout le contenu catalogue vit dans :

- `src/assets/data/projects.json` — liste des projets
- `src/services/data.tsx` — chargement
- `src/services/inteface.tsx` — types (`DataProjects`, slides, tags…)

Chaque entrée typique contient : `id`, `title`, `describe`, `text`, `tags[]`, `imagePortrait`, `imagesSlide[]` (`src` + `alt`), `link`, `linkGit`.

Pourquoi externaliser :

- Ajouter un projet / des slides sans toucher au JSX
- Garder des textes longs hors des composants
- Aligner README / Dev Book sur une seule source de vérité contenu

Les assets images restent sous `public/assets/images/` (portraits + slides), référencés par chemin dans le JSON.

## Difficultés liées aux nouvelles technos

- Un zoom via `transform: scale()` sur une image déjà contrainte par `max-width` / `max-height` donnait un rendu **pixelisé** : le navigateur agrandissait un bitmap déjà réduit.
- Sur mobile, il fallait séparer **pinch/pan** (quand zoomé) et **swipe** (changement de slide) sans conflit de gestes ni scroll parasite (`touch-action`, listeners non-passive).
- Le sheen des orbes (`mask-composite` / `-webkit-mask-composite`) est sensible selon navigateurs ; un cache Android peut aussi masquer un correctif CSS déjà déployé.
- Sur la constellation, animer des groupes SVG demande `transform-origin` + souvent `transform-box: fill-box` pour que le pivot soit correct.

## Leçons apprises

- Pour un zoom net : dimensionner l’image depuis la **résolution native** (`naturalWidth` / fit contain × scale) et plafonner au 1:1 source, plutôt que scaler une preview CSS.
- Les refs typées (`useRef<() => void>`) doivent coller au retour réel des handlers — sinon `tsc` casse le build Vercel.
- Sur mobile, tester réellement les gestes ; le desktop ne suffit pas pour valider pinch / swipe / cache.
- Une architecture one-page claire (Header / About / Projets / Contact / data) évite de mélanger contenu et présentation.

## Prochaines explorations

- Variante Android-safe du sheen contact (sans `mask-composite` fragile)
- Extraire la logique lightbox zoom dans un hook `useLightboxZoom`
- Accessibilité clavier / reduced-motion plus poussée sur la constellation
