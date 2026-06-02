# Plan: Camp / Cabin Photos Section

## Goal
Add an "El Lugar" section to `index.html` showcasing the camp facilities (cabins, grounds, etc.) using a responsive photo grid. Photos are optional at first — placeholder slots are shown until real images are provided.

## Placement in page order
After the "¿Qué incluye?" section and before the Pricing section.

## Data structure
Photos are defined as a JS array at the top of `main.js` (same pattern as `faqData`):

```js
const lugarPhotos = [
  { src: 'assets/lugar/cabanas.jpg',   alt: 'Cabañas del campamento',  caption: 'Cabañas' },
  { src: 'assets/lugar/comedor.jpg',   alt: 'Comedor principal',        caption: 'Comedor' },
  { src: 'assets/lugar/cancha.jpg',    alt: 'Cancha deportiva',         caption: 'Actividades' },
  { src: 'assets/lugar/piscina.jpg',   alt: 'Área de piscina',          caption: 'Piscina' },
  { src: 'assets/lugar/fogata.jpg',    alt: 'Área de fogata',           caption: 'Fogata' },
  { src: 'assets/lugar/capilla.jpg',   alt: 'Capilla',                  caption: 'Capilla' },
];
```

If `src` image fails to load (or is missing), a CSS placeholder with an icon is shown automatically via the `onerror` attribute or a CSS `background` fallback.

## Files to change

| File | Change |
|---|---|
| `index.html` | Add `<section class="lugar-section" id="lugar">` with `<div id="lugarGrid"></div>` |
| `main.js` | Add `lugarPhotos` array + `renderLugar()` function; call it inside `DOMContentLoaded` |
| `styles.css` | Add `.lugar-section`, `.lugar-grid`, `.lugar-card`, `.lugar-card img`, `.lugar-caption`, and placeholder styles |
| `components.js` | Add "El Lugar" to `NAV_ITEMS` as an anchor link (`href: '#lugar'`) |

## Layout
- CSS Grid: `repeat(auto-fill, minmax(280px, 1fr))`
- Each card: image (fixed `aspect-ratio: 4/3`, `object-fit: cover`) + caption overlay on hover
- Placeholder: dark card with a mountain/photo icon SVG centered, same dimensions
- Mobile: single column below 480px

## Steps

1. Add `lugarPhotos` array to `main.js`.
2. Write `renderLugar()` — builds grid cards and injects into `#lugarGrid`.
3. Add section HTML to `index.html`.
4. Add CSS to `styles.css` (use existing design-system variables only).
5. Add nav anchor to `components.js`.
6. Create `assets/lugar/` directory (empty — user drops photos in later).
7. Test with no images (placeholders must show), then with at least one real image.

## Adding real photos later
Drop image files into `assets/lugar/` with the filenames defined in `lugarPhotos`. No code change needed.
