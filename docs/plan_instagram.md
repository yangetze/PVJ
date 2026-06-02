# Plan: Instagram Link

## Goal
Add the camp Instagram profile link to the site footer.

## Details
- **URL:** https://www.instagram.com/campamentobautistacc
- **Placement:** Footer, contact/social column
- **File to edit:** `components.js` — footer `innerHTML` template only

## Steps

1. Open `components.js` and locate the footer HTML template inside the IIFE.
2. Find the contact/social column (currently has WhatsApp or email links).
3. Add an Instagram `<a>` tag:
   ```html
   <a href="https://www.instagram.com/campamentobautistacc" target="_blank" rel="noopener noreferrer">
     Instagram — @campamentobautistacc
   </a>
   ```
4. Optionally add an SVG Instagram icon inline (no external dependency).
5. Verify the link appears on all three pages (index, calculadora, donaciones).

## Rules
- `target="_blank" rel="noopener noreferrer"` required (external link convention).
- No changes to any `.html` file.
- No new CSS needed unless adding an icon.
