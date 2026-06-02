# Plan: Página "Nosotros" (About Us)

## Goal
Create a dedicated `nosotros.html` page that explains:
- What **PVJ** stands for (Plan Vacacional Juvenil)
- What the camp is and does
- How long it has been running
- The values and vision behind it
- The church/ministry context (IBE, Ministerio de Proclamación)

This page targets people who arrive with zero context — a friend shared a link, a parent wants to know more, etc.

## URL
`/nosotros.html` — accessible as a top-level nav link.

## Nav entry
Add to `NAV_ITEMS` in `components.js`:
```js
{ href: 'nosotros.html', label: 'Nosotros', activeFile: 'nosotros.html', isAnchor: false }
```

## Page sections (in order)

### 1. Hero / title block
- Heading: `¿Qué es el PVJ?`
- Subheading: `Plan Vacacional Juvenil` (spelled out in full, styled as a subtitle)
- Short hook sentence (1–2 lines): what makes PVJ unique

### 2. La historia
- Paragraph block: when it started, how it has grown, short narrative
- Optional: a timeline component (CSS only, no JS) if there are milestone years

### 3. ¿Qué hacemos?
- 3–4 icon+text cards (same `.feature-card` pattern as the "¿Qué incluye?" section)
- Topics: Comunidad, Formación, Aventura, Adoración — or whatever applies

### 4. Nuestros valores
- 3–5 value items with a bold keyword + 1-sentence description
- Example: **Autenticidad** — Creemos en espacios donde puedes ser tú mismo.

### 5. El contexto
- Brief paragraph about IBE (Iglesia Bautista Emanuel), the Ministerio de Proclamación, and how PVJ fits within the church's youth mission
- Link to church website if available

### 6. CTA block
- "¿Listo para vivir la experiencia?" → inscription button (same style as hero CTA)

## Files to create / change

| File | Change |
|---|---|
| `nosotros.html` | **New file** — full page following standard structure |
| `nosotros.js` | **New file** — scroll animations (IntersectionObserver, same pattern as `donaciones.js`) |
| `styles.css` | Add section-specific styles: `.nosotros-hero`, `.historia-section`, `.valores-section`, `.contexto-section` |
| `components.js` | Add "Nosotros" to `NAV_ITEMS` |

## `nosotros.html` structure

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nosotros — PVJ In-Cómoda-Mente</title>
  <link rel="icon" type="image/x-icon" href="assets/favicon.ico">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header></header>

  <section class="nosotros-hero">…</section>
  <section class="historia-section">…</section>
  <section class="que-hacemos-section">…</section>
  <section class="valores-section">…</section>
  <section class="contexto-section">…</section>
  <section class="cta-section">…</section>

  <footer></footer>

  <script src="config.js"></script>
  <script src="components.js"></script>
  <script src="nosotros.js"></script>
</body>
</html>
```

## Content to fill in (needs input from the team)
- [ ] Year PVJ started
- [ ] Number of editions held
- [ ] 3–5 values with short descriptions
- [ ] Paragraph about IBE / Ministerio de Proclamación
- [ ] Church website URL (if public)
- [ ] Any notable milestones or numbers (e.g. "más de 300 jóvenes han pasado por PVJ")

## Steps

1. Draft copy for all sections (coordinate with team for historical facts and values).
2. Create `nosotros.html` with all sections and drafted copy.
3. Create `nosotros.js` with scroll-reveal animations.
4. Add CSS to `styles.css` for new sections.
5. Add nav entry in `components.js`.
6. Test on mobile and desktop.
7. Verify nav "Nosotros" link is active when on the page.
