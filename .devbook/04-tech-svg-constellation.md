## SVG + CSS — constellation About

### Pourquoi ce choix

La section « À propos » avait besoin d’un ancrage visuel vivant (pas une illustration statique ni une vidéo). Un **SVG inline** animé en CSS permet :

- netteté à toutes les tailles (`viewBox`)
- contrôle précis des calques (halo, anneaux, mesh, nodes, sparkles)
- respect de `prefers-reduced-motion` sans JS

Alternative écartée : Lottie / canvas — plus lourds pour un motif décoratif `aria-hidden`.

### Première mise en place

Fichiers :

- `src/components/AboutConstellation/AboutConstellation.tsx` — markup SVG
- `src/components/AboutConstellation/AboutConstellation.css` — animations + responsive

Structure des calques (du fond au premier plan) :

1. Halo (gradient radial)
2. Anneaux (plein + pointillé + cœur)
3. Axe vertical tireté
4. Mesh (polygone + lignes vers le centre)
5. Nodes / bloom / sparkles / marks

Le SVG est décoratif : `aria-hidden="true"` et `focusable="false"`.

### Usage dans ce projet

Animations CSS découplées par classe, avec des durées différentes pour éviter un effet « tout tourne au même rythme » :

- `about_halo_breathe`, `about_ring_spin`, `about_dash_drift`
- `about_core_pulse`, `about_mesh_breathe`, `about_line_shimmer`
- pulses décalés sur les nodes (`animation-delay`)

Responsive : largeur en `clamp` / `min(100%, …)` selon breakpoints.

Accessibilité motion :

```css
@media (prefers-reduced-motion: reduce) {
  /* animations coupées / figées sur les calques animés */
}
```

Point technique clé pour pivoter un élément SVG correctement : `transform-box: fill-box` + `transform-origin: center` (ou le centre du `viewBox` pour les groupes orbitaux).

### Pièges rencontrés

- Sans `transform-box: fill-box`, certains nodes « orbitent » autour du mauvais point.
- Trop d’animations synchronisées → bruit visuel ; mieux vaut des périodes longues et des délais échelonnés.
- Sur très petit mobile, réduire la largeur du SVG évite qu’il écrase le texte intro.

### Ce que j'ai retenu

- Séparer **géométrie** (TSX) et **mouvement** (CSS) facilite itérer sur le design.
- `aria-hidden` dès qu’un SVG est purement atmosphérique.
- Toujours prévoir `prefers-reduced-motion` quand on empile plusieurs loops.

### Ressources

- [SVG — MDN](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [transform-box — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box)
- [prefers-reduced-motion — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
