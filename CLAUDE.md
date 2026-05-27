# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PVJ (Proyecto Vida Juvenil) is a static marketing website for a youth camp event called **"In-Cómodamente"**, targeting attendees aged 14–25 in Venezuela (Carabobo, Valencia). The event runs **August 24–28, 2026**, organized under the Ministerio de Proclamación of Iglesia Bautista Emanuel (IBE).

Biblical theme: Romanos 12:2 — "No se amolden al mundo actual, sino sean transformados."

## Development

There are no build tools, package managers, or dependencies. Open `index.html` directly in a browser to preview the site. No server, compilation step, or installation is required.

To preview with a local dev server (required when loading external JS/CSS files via `file://` in some browsers):
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## File Structure

```
PVJ/
├── index.html      # HTML structure and content only
├── styles.css      # All CSS: design system, layout, components, responsive
├── main.js         # All JavaScript: nav, FAQ, countdown, BCV rate, calculator
├── docs/
│   └── brand.md    # Brand guidelines: colors, tone of voice, copy examples
└── CLAUDE.md       # This file
```

The project follows strict separation of concerns across three source files:

| File | Responsibility |
|---|---|
| `index.html` | HTML structure and content only — no inline styles or scripts |
| `styles.css` | All CSS: design system variables, layout, components, responsive breakpoints |
| `main.js` | All JavaScript: navigation, FAQ data + rendering, countdown, BCV rate, calculator |

`index.html` links these with `<link rel="stylesheet" href="styles.css">` in `<head>` and `<script src="main.js"></script>` just before `</body>`.

## HTML Sections Inventory

Sections appear in this order in `index.html`:

| Section | Element / ID | Notes |
|---|---|---|
| Header & nav | `<header>` | Fixed, hamburger for mobile |
| Hero | `<section class="hero" id="home">` | Title, subtitle, pulse divider, scripture, countdown |
| Event details card | `.event-details-card` | Dates, ages, location; CTA buttons |
| What's included | `.included-section` | 4 feature cards (food, transport, lodging, activities) |
| Pricing & payment | `<section class="pricing-section" id="payment">` | Price card (€95), BCV rate badge, payment methods |
| Euro calculator | `.calculator-section` | Live €→Bs conversion using BCV rate |
| FAQ | `<section class="faq-section" id="faqContainer">` | Dynamically rendered from `faqData` array |
| Footer | `<footer>` | 4 columns: about, links, contact, other links |

### Placeholder / WIP areas

The nav and footer link to `#interested-form` and `#registration` — these anchor targets do **not** yet exist as sections. The CTA buttons in the event-details card still use `onclick="alert(...)"` stubs. These are known gaps to be implemented later.

## Architecture

### `styles.css`

Custom design system using CSS variables (on `:root`), CSS Grid/Flexbox layouts, and `@media` breakpoints. Organized into labeled sections with comment banners (e.g. `/* HERO SECTION */`).

**Responsive breakpoints:**
- `768px` — switches nav to hamburger, stacks pricing layout vertically, stacks footer columns
- `600px` — adjusts countdown and calculator to stack vertically
- `480px` — reduces spacing variables globally, shrinks fonts

**Special CSS features used:**
- `backdrop-filter: blur(...)` on the fixed header and countdown card
- `clamp(...)` for fluid responsive typography (h1, h2, hero title)
- CSS `animation` with `forwards` fill + staggered `animation-delay` for entrance effects
- `IntersectionObserver`-driven reveal: elements set `opacity: 0` by default, JS sets `opacity: 1` on intersect
- Gradient text via `background-clip: text` + `-webkit-text-fill-color: transparent`
- Print styles (`@media print`) that hide nav/footer and expand all FAQ answers
- Accessibility focus styles (`:focus`, `:focus-visible`) using `--accent-lime` outline

### `main.js`

Vanilla JS with five responsibilities, all initialized inside `DOMContentLoaded`:

1. **Mobile hamburger menu** — toggles `.active` on `#navLinks`; clicking any nav link also closes the menu and updates the `.active` link state
2. **FAQ accordion** — `faqData` array is defined at the top of the file and rendered dynamically into `#faqContainer`; only one item can be open at a time
3. **Hero countdown** (`initCountdown()`) — live countdown to event start (Aug 24, 2026 00:00 VET = `2026-08-24T04:00:00Z`); shows a "¡Estamos de campamento!" message Aug 24–28; hides silently after Aug 29; ticks every second via `setInterval`
4. **Live BCV euro rate** (`fetchEuroRate()`) — fetches `https://rates.dolarvzla.com/bcv/current.json` and reads the euro rate from multiple possible response shapes (`data.current.eur`, `data.eur`, `data.EUR`, `data.rates.eur`, etc.); populates `#eurRateBadge` and `#calculatorNote`; stores rate in module-level `currentEuroRate`
5. **Euro→Bs calculator** (`updateCalculation()`) — multiplies the `#euroInput` value by `currentEuroRate` and renders the result in `#bsResultValue`; wired to the `input` event of `#euroInput`

**Initialization order inside `DOMContentLoaded`:**
```js
renderFAQ();
initCountdown();
fetchEuroRate();         // async; resolves later and calls updateCalculation()
euroInput.addEventListener('input', updateCalculation);
```

`IntersectionObserver` for `.fade-in` elements is set up at module level (before `DOMContentLoaded`).

### `index.html`

Sections follow a consistent pattern:
```html
<section class="section-name">
  <div class="container">…</div>
</section>
```
The `.container` class constrains `max-width: 1400px` and centers content. Some sections use `.container` directly on the `<section>` element (hero, FAQ).

## Design System

All CSS custom properties are defined on `:root` in `styles.css`. Always reference these variables — never hardcode hex values in new CSS rules.

### Colors

| Variable | Value | Role |
|---|---|---|
| `--bg-primary` | `#030E25` | Main dark background (deep night blue) |
| `--bg-secondary` | `#0a1a3a` | Card/surface background |
| `--bg-tertiary` | `#132545` | Hover/active surface |
| `--text-primary` | `#FFFFFF` | Headings and primary text |
| `--text-secondary` | `#A0AEC0` | Body and descriptive text |
| `--accent-lime` | `#B2DF14` | Primary lime green accent (CTAs, active states) |
| `--accent-lime-bright` | `#C4F01A` | Lime hover state |
| `--accent-blue` | `#0066FF` | Secondary blue accent (data, details) |
| `--accent-blue-bright` | `#00E5FF` | Bright cyan — glow effects, emphasis |
| `--accent-blue-subtle` | `#0066FF4d` | Semi-transparent blue for hero glow |
| `--border-subtle` | `#1a2a45` | Default border color |
| `--border-active` | `#B2DF14` | Active/focused border (same as `--accent-lime`) |

The aesthetic is **dark-themed and tech/neon**, with gradient text, `backdrop-filter: blur`, and CSS animation entrance effects. See `docs/brand.md` for tone-of-voice and copy guidelines.

### Typography

| Variable | Value |
|---|---|
| `--font-family` | System UI stack (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, etc.) |
| `--font-mono` | `Monaco`, `Menlo`, `Ubuntu Mono` — used in countdown values and calculator |
| `--line-height-tight` | `1.2` |
| `--line-height-normal` | `1.5` |
| `--line-height-relaxed` | `1.75` |

### Spacing

| Variable | Default | 480px override |
|---|---|---|
| `--spacing-xs` | `0.5rem` | — |
| `--spacing-sm` | `1rem` | — |
| `--spacing-md` | `1.5rem` | — |
| `--spacing-lg` | `2rem` | `1.5rem` |
| `--spacing-xl` | `3rem` | `2rem` |
| `--spacing-2xl` | `4rem` | `2.5rem` |

### Transitions

| Variable | Value |
|---|---|
| `--transition-fast` | `200ms ease-out` |
| `--transition-normal` | `300ms ease-out` |
| `--transition-slow` | `500ms ease-out` |

## Key Conventions

- **No external dependencies** — do not introduce CDN links, npm packages, or build steps without explicit instruction.
- **No inline styles or scripts** — all styles belong in `styles.css`, all logic in `main.js`. The only exceptions are the existing `style="..."` attributes in the hero section and the price card CTA button, which are accepted one-off layout overrides.
- **FAQ data** lives in the `faqData` array at the top of `main.js`. To add or edit FAQ items, modify only that array — the renderer builds the DOM automatically.
- **Colors must use CSS variables** — never hardcode hex values in new rules; always reference a `--variable` from the design system.
- **Content language is Spanish (es-VE)** — the `<html lang="es">` attribute is set and all user-visible copy is in Venezuelan Spanish. Number formatting uses `toLocaleString('es-VE')`.
- **Event timestamps use VET (UTC−4)** — Venezuela does not observe DST. Timestamps in `main.js` are expressed as UTC equivalents (e.g. `2026-08-24T04:00:00Z` = Aug 24 midnight VET).
- **The BCV API response shape is unreliable** — `fetchEuroRate()` probes multiple keys (`data.current.eur`, `data.eur`, `data.EUR`, `data.rates.eur`, etc.) because the third-party endpoint occasionally changes structure. Maintain this defensive pattern if the API call is ever modified.

## Brand & Copy Guidelines

See `docs/brand.md` for the full brand guide. Key points:

- **Tone:** close and warm (like a trusted older friend), not corporate or institutional
- **Person:** always second-person singular (*tú*) — speak to the reader directly
- **Avoid:** bureaucratic language, third-person references to attendees, excessive exclamation marks, corporate filler
- Copy examples and "instead of X / we say Y" tables are in `docs/brand.md`
