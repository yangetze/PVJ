# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PVJ (Proyecto Vida Juvenil) is a static, single-file marketing website for a youth camp event called "In-Cómodamente", targeting attendees aged 14–25 in Venezuela (Carabobo, Valencia). The event runs August 24–28, 2026.

## Development

There are no build tools, package managers, or dependencies. Open `index.html` directly in a browser to preview the site. No server, compilation step, or installation is required.

To preview with a local dev server (optional):
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Architecture

The entire application lives in a single file: `index.html` (~1,267 lines). It contains:

- **Embedded CSS** (~1,000 lines inside `<style>`) — a custom design system using CSS variables, CSS Grid/Flexbox, and `@media` breakpoints at `768px` and `480px`.
- **Embedded JavaScript** (~150 lines inside `<script>`) — vanilla JS handling:
  - Mobile hamburger menu toggle
  - FAQ accordion (expand/collapse), rendered dynamically from a hardcoded `faqData` array
  - Scroll-triggered fade-in animations via `IntersectionObserver`

## Design System

Defined as CSS custom properties on `:root`:

| Variable | Value | Role |
|---|---|---|
| `--color-primary` | `#B2DF14` | Lime green accent |
| `--color-secondary` | `#0066FF` | Cyan blue accent |
| `--color-bg` | `#0A0E1A` | Main dark background |
| `--color-surface` | `#111827` | Card/surface background |
| `--color-text` | `#E5E7EB` | Body text |

The aesthetic is dark-themed, tech/neon, with gradient text, `backdrop-filter: blur`, and entrance animations.

## Key Conventions

- **No external dependencies** — do not introduce CDN links, npm packages, or build steps without explicit instruction.
- **FAQ data** is defined as a JavaScript array (`faqData`) near the bottom of the `<script>` block and rendered into the DOM at page load. To add/edit FAQ items, modify this array.
- **Sections** follow a consistent pattern: `<section class="section-name"><div class="container">…</div></section>`. The `.container` class constrains max-width and centers content.
- All styles use the CSS variable design tokens above — do not hardcode colors.
