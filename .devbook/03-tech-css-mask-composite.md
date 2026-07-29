## CSS mask-composite — sheen des orbes contact

### Pourquoi ce choix

Les orbes contact (Profil / Code / Courriel / Parcours) avaient besoin d’un **reflet métallique** qui tourne sur l’anneau, sans image supplémentaire ni canvas.

Choix : un `::before` en `conic-gradient` masqué en anneau via double mask + `mask-composite`.

### Première mise en place

Implémenté dans `src/pages/Home.css` sur `.contact_orb_ring::before` :

- `conic-gradient` pour le faisceau lumineux
- double `mask` / `-webkit-mask` (content-box + full) pour ne garder que la bordure
- `-webkit-mask-composite: xor` et `mask-composite: exclude`
- animation `contact-sheen-spin` + délais décalés par orbe

Le reveal des orbes utilise aussi un `IntersectionObserver` dans `src/pages/Home.tsx` (classe `is-visible` une fois le seuil atteint).

### Usage dans ce projet

Effet visuel uniquement CSS : pas de JS pour le sheen. Le JS ne gère que l’apparition au scroll et les liens.

Complété par des détails d’identité visuelle (pulse, labels uppercase, icônes filtrées en argenté).

### Pièges rencontrés

- **Préfixes navigateur** : WebKit (`xor`) vs standard (`exclude`) — les deux sont nécessaires.
- **Android / cache** : après un déploiement, un bug peut sembler « toujours là » tant que le cache CSS n’est pas vidé.
- Propriétés mask + filtres + SVG sont plus fragiles sur certains navigateurs mobiles qu’un simple `box-shadow`.

### Ce que j'ai retenu

- Documenter clairement les paires WebKit / standard dès qu’on touche aux masks.
- Prévoir un fallback plus simple (bordure + glow) si on cible un support Android maximal.
- Séparer « effet décoratif » (CSS) et « révélation » (IntersectionObserver) facilite le debug.

### Ressources

- [mask-composite — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite)
- [Intersection Observer — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
