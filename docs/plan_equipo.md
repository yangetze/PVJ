# Plan: Staff / Team Section

## Goal
Add an "El Equipo" section displaying staff cards with photo, name, role, and short bio. Data lives in a dedicated `equipo.js` config file so the team can be updated incrementally without touching layout code.

## Placement in page order
After the "El Lugar" photos section and before Pricing — or as a standalone section near the bottom of `index.html` (above FAQ).

## Data file: `equipo.js`

New file. Each person is an object in the `EQUIPO` array:

```js
const EQUIPO = [
  {
    nombre:  'Ana Rodríguez',
    rol:     'Directora del campamento',
    bio:     'Lleva 10 años sirviendo en PVJ y es el alma detrás de cada edición.',
    foto:    'assets/equipo/ana.jpg',   // leave null if no photo yet
  },
  {
    nombre:  'Carlos Pérez',
    rol:     'Líder de adoración',
    bio:     'Músico y pastor juvenil de IBE Valencia.',
    foto:    null,
  },
  // … add more gradually
];
```

`foto: null` → renders a styled avatar placeholder (initials on colored background, derived from the name).

## Files to change

| File | Change |
|---|---|
| `equipo.js` | **New file** — `EQUIPO` array constant (populated incrementally) |
| `index.html` | Add `<section class="equipo-section" id="equipo">` with `<div id="equipoGrid"></div>` |
| `index.html` `<head>` | Add `<script src="equipo.js"></script>` before `main.js` |
| `main.js` | Add `renderEquipo()` function; call inside `DOMContentLoaded` |
| `styles.css` | Add `.equipo-section`, `.equipo-grid`, `.equipo-card`, `.equipo-foto`, `.equipo-avatar-placeholder`, `.equipo-nombre`, `.equipo-rol`, `.equipo-bio` |
| `components.js` | Add "El Equipo" to `NAV_ITEMS` as anchor `href: '#equipo'` |

## Card UI

```
┌─────────────────────────┐
│   [ photo / avatar ]    │  ← 120×120 circle, centered
│                         │
│   Nombre Apellido       │  ← bold, white
│   Rol / cargo           │  ← lime accent, small caps
│                         │
│   Bio text here...      │  ← secondary text, 3-4 lines max
└─────────────────────────┘
```

- Photo: `border-radius: 50%`, `object-fit: cover`, `width/height: 120px`
- Avatar placeholder: circle with initials, background color derived from name hash → always same color per person
- Card: `background: var(--bg-secondary)`, subtle border, hover lift (`transform: translateY(-4px)`)
- Grid: `repeat(auto-fill, minmax(220px, 1fr))` — 3–4 columns on desktop, 2 on tablet, 1 on mobile

## Avatar placeholder logic (in `main.js`)

```js
function getInitials(nombre) {
  return nombre.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
function getAvatarColor(nombre) {
  const colors = ['#0066FF', '#B2DF14', '#00E5FF', '#7B61FF', '#FF6B35'];
  const idx = [...nombre].reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  return colors[idx];
}
```

## Steps

1. Create `equipo.js` with the `EQUIPO` array (add placeholder entries for known members, `foto: null` for those without photos).
2. Write `renderEquipo()` in `main.js`.
3. Add CSS to `styles.css`.
4. Add section to `index.html` and load `equipo.js` script.
5. Add nav anchor in `components.js`.
6. Create `assets/equipo/` directory.
7. Test with all `foto: null`, then with one real photo.

## Adding a new member later
Add one object to `EQUIPO` in `equipo.js`. Drop photo in `assets/equipo/`. No other change needed.
