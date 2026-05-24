# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PVJ (Proyecto Vida Juvenil) is a static marketing website for a youth camp event called "In-Cómodamente", targeting attendees aged 14–25 in Venezuela (Carabobo, Valencia). The event runs August 24–28, 2026.

## Development

There are no build tools, package managers, or dependencies. Open `index.html` directly in a browser to preview the site. No server, compilation step, or installation is required.

To preview with a local dev server (required when loading external JS/CSS files via `file://` in some browsers):
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## File Structure

The project follows a clean separation of concerns across three files:

| File | Responsibility |
|---|---|
| `index.html` | HTML structure and content only — no inline styles or scripts |
| `styles.css` | All CSS: design system variables, layout, components, responsive breakpoints |
| `main.js` | All JavaScript: navigation, FAQ data + rendering, scroll animations |

`index.html` links these with `<link rel="stylesheet" href="styles.css">` in `<head>` and `<script src="main.js"></script>` just before `</body>`.

## Architecture

**`styles.css`** — custom design system using CSS variables (on `:root`), CSS Grid/Flexbox, and `@media` breakpoints at `768px` and `480px`.

**`main.js`** — vanilla JS with three responsibilities:
- Mobile hamburger menu toggle
- FAQ accordion: data is defined in a `faqData` array and rendered dynamically into `#faqContainer` on `DOMContentLoaded`
- Scroll-triggered fade-in animations via `IntersectionObserver`

**`index.html`** — sections follow a consistent pattern:
```html
<section class="section-name">
  <div class="container">…</div>
</section>
```
The `.container` class constrains max-width and centers content.

## Design System

CSS custom properties defined on `:root` in `styles.css`:

| Variable | Value | Role |
|---|---|---|
| `--bg-primary` | `#030E25` | Main dark background |
| `--bg-secondary` | `#0a1a3a` | Card/surface background |
| `--bg-tertiary` | `#132545` | Hover/active surface |
| `--text-primary` | `#FFFFFF` | Headings and primary text |
| `--text-secondary` | `#A0AEC0` | Body and descriptive text |
| `--accent-lime` | `#B2DF14` | Primary lime green accent |
| `--accent-blue` | `#0066FF` | Secondary cyan blue accent |

The aesthetic is dark-themed and tech/neon, with gradient text, `backdrop-filter: blur`, and CSS animation entrance effects.

## Key Conventions

- **No external dependencies** — do not introduce CDN links, npm packages, or build steps without explicit instruction.
- **No inline styles or scripts** — all styles belong in `styles.css`, all logic in `main.js`. The one exception is `style="..."` attributes for one-off layout overrides already present in the hero section.
- **FAQ data** lives in the `faqData` array at the top of `main.js`. To add or edit FAQ items, modify only that array.
- **Colors must use CSS variables** — never hardcode hex values in new rules; always reference a `--variable` from the design system.
