## Touch API — lightbox pinch / pan / swipe

### Pourquoi ce choix

Objectif : une lightbox mobile proche d’une galerie photo native (pincer pour zoomer, glisser pour explorer, swipe pour changer d’image), **sans librairie** (pas de PhotoSwipe / Swiper zoom).

Alternative envisagée : `transform: scale()` seul — rapide à coder, mais pixelise dès qu’on zoom une image déjà affichée en « contain ».

### Première mise en place

Fichiers principaux :

- `src/components/Modal/Modal.tsx` — état zoom, sessions pinch/pan, mesure du fit
- `src/components/Modal/Modal.css` — frame viewport, `touch-action: none`, styles lightbox

#### Matrice des gestes

| Doigts | État zoom | Action |
|--------|-----------|--------|
| 2 | n’importe | **Pinch** — change `scale` (plafonné à la résolution native) |
| 1 | zoomé (`scale > ~1.05`) | **Pan** — `translate` clampé dans le frame |
| 1 | non zoomé | **Swipe** horizontal — slide précédente / suivante |
| 1 (double-tap) | non zoomé | Zoom rapide (ex. ×2.4, plafonné au max natif) |
| 1 (double-tap) | zoomé | **Reset** zoom |
| — (clavier) | non zoomé | `Escape` ferme ; flèches changent de slide |
| — (clavier) | zoomé | Flèches ignorées (évite conflit avec l’exploration) |

Règle d’or : pinch/pan et swipe slides sont **mutuellement exclusifs** selon le niveau de zoom.

Listeners attachés en `addEventListener` sur le frame, avec `touchmove` en `{ passive: false }` pour pouvoir `preventDefault()` pendant pinch/pan.

### Usage dans ce projet

Mesure du cadre « contain » :

```ts
computeContainFit(naturalWidth, naturalHeight, frameWidth, frameHeight)
```

Affichage net : largeur / hauteur CSS = `fit * scale` (pas de `scale()` CSS sur une preview).

Plafond de zoom = résolution native :

```ts
nativeScale = naturalWidth / fitWidth
```

Le pan est clampé pour que l’image ne laisse pas de vide inutile dans le viewport (`clampZoomOffset`).

Un `ResizeObserver` recalcule le fit si le frame change (orientation, resize).

### Pièges rencontrés

- **Pixelisation** : `scale()` agrandit un bitmap déjà downscalé → corrigé en redimensionnant depuis la source.
- **Conflit swipe / pan** : le swipe slides est désactivé dès que `scale > seuil` (~1.05).
- **Types TypeScript** : `useRef(() => undefined)` inférait `() => undefined` ; les handlers renvoient `void` → build `tsc` cassé. Fix : `useRef<() => void>(() => undefined)`.
- **Image pas encore mesurée** : attendre `onLoad` + dimensions du frame avant d’appliquer width/height explicites.

### Ce que j'ai retenu

- Séparer clairement **viewport** (frame) et **contenu zoomé** (img sized).
- Garder l’état zoom en `ref` + state pour les handlers DOM hors React.
- Ne jamais dépasser la résolution source si on veut un rendu « net » (au-delà = soft, inévitable).

### Ressources

- [Touch events — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [HTMLImageElement.naturalWidth — MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth)
- [ResizeObserver — MDN](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
