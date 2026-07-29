## Bilan — ce que je réutiliserai

### Patterns à garder

- Lightbox zoom **par redimensionnement source** (fit × scale + translate), plafonné à `naturalWidth`
- Machine à états gestuelle simple : refs `pinch` / `pan` / `swipe` mutuellement exclusives
- Reveal au scroll via `IntersectionObserver` + classe CSS unique (`is-visible`)
- SVG décoratif + animations CSS + `prefers-reduced-motion`
- Données projets externalisées dans `src/assets/data/projects.json`
- Découpage UI one-page : Header / About / Projets / Contact

### À améliorer la prochaine fois

- Extraire `useLightboxZoom` hors de `Modal.tsx` (fichier devenu dense)
- Fallback sheen sans `mask-composite` pour Android
- Vérifier le build (`pnpm build` / `tsc`) avant chaque push feature tactile

### Transfert vers d’autres projets

Ces apprentissages se réutilisent dès qu’il y a une **galerie image mobile**, une **illustration SVG animée**, ou un **effet anneau / badge** — sans dépendre d’une lib lourde.
