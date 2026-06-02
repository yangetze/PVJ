// ============================================
// SHARED SITE COMPONENTS
// Renders <header> (nav) and <footer> into every page.
// Load this script BEFORE any page-specific script.
// ============================================

(function () {
    // ── Page detection ────────────────────────────────────────────────────────
    // Works regardless of whether the URL ends in a filename or is a bare dir.
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const isIndex = currentFile === '' || currentFile === 'index.html';

    // Same-page anchors on index.html; cross-page links everywhere else.
    const idxPrefix = isIndex ? '' : 'index.html';

    // ── Navigation items ──────────────────────────────────────────────────────
    // To add a new nav entry, append one object here — no HTML to touch.
    const NAV_ITEMS = [
        { href: `${idxPrefix}#home`,            label: 'Inicio',      activeFile: 'index.html',       isAnchor: true },
        { href: `${idxPrefix}#registration`,    label: 'Inscribirme', activeFile: 'index.html',       isAnchor: true },
        { href: `${idxPrefix}#payment`,         label: 'Inversión',   activeFile: 'index.html',       isAnchor: true },
        { href: 'pagos.html',                   label: 'Reportar Pago', activeFile: 'pagos.html',     isAnchor: false },
        { href: 'donaciones.html',              label: 'Donaciones',  activeFile: 'donaciones.html',  isAnchor: false },
    ];

    function getActiveAttr(item) {
        if (!item.isAnchor) {
            // Page-level links: mark active when this is the current page.
            return currentFile === item.activeFile ? ' class="active"' : '';
        }
        // Anchor links into index.html: mark "Inicio" active by default on index.
        return (isIndex && item.label === 'Inicio') ? ' class="active"' : '';
    }

    // ── Render <header> ───────────────────────────────────────────────────────
    const headerEl = document.querySelector('header');
    if (headerEl) {
        const liItems = NAV_ITEMS
            .map(item => `<li><a href="${item.href}"${getActiveAttr(item)}>${item.label}</a></li>`)
            .join('\n                ');

        headerEl.innerHTML = `
        <nav class="container">
            <div class="logo">PVJ 2026</div>
            <ul class="nav-links" id="navLinks">
                ${liItems}
            </ul>
            <button class="hamburger" id="hamburger" aria-label="Menú" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>`;

        // ── Hamburger / mobile menu ───────────────────────────────────────────
        const hamburger   = document.getElementById('hamburger');
        const navLinksEl  = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            const isOpen = navLinksEl.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        navLinksEl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksEl.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                navLinksEl.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // ── Render <footer> ───────────────────────────────────────────────────────
    const footerEl = document.querySelector('footer');
    if (footerEl) {
        // Footer anchor links must also adapt to the current page.
        footerEl.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>PVJ 2026</h3>
                    <p>Plan Vacacional Juvenil 2026: In-Cómoda-Mente. Gestionado bajo la coordinación de jóvenes, y Ministerio de Proclamación de la Iglesia Bautista Emanuel. Campamento con propósito de crecimiento espiritual en los jóvenes.</p>
                </div>
                <div class="footer-section">
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><a href="${idxPrefix}#home">Inicio</a></li>
                        <li><a href="${idxPrefix}#registration">Inscribirme</a></li>
                        <li><a href="${idxPrefix}#payment">Información de Pago</a></li>
                        <li><a href="pagos.html">Reportar Pago</a></li>
                        <li><a href="donaciones.html">Donaciones</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Contacto</h3>
                    <p>Email: <a href="mailto:contacto@pvjcampamento.com">contacto@pvjcampamento.com</a></p>
                    <p>Teléfono: <a href="tel:+58000000000">+58 (0) 000-0000</a></p>
                    <p>Ubicación: <a href="https://maps.app.goo.gl/31Uu8S2GkfhWCuca9" target="_blank" rel="noopener noreferrer">Calle Urdaneta con Av. Eugenio Mendoza, Condominio Renaissance La Castellana.</a></p>
                </div>
                <div class="footer-section">
                    <h3>Otros Enlaces de Interés</h3>
                    <div class="other-links">
                        <a href="https://www.instagram.com/ministeriojuvenilibe?igsh=dWtmNGF1eGZvOHNp" target="_blank" rel="noopener noreferrer" class="other-link">
                            <span class="other-link-icon">📱</span>
                            <span class="other-link-text">Ministerio Juvenil IBE</span>
                        </a>
                        <a href="https://www.instagram.com/ibemanuel_ve?igsh=NWl3dzd6cDNwajc4" target="_blank" rel="noopener noreferrer" class="other-link">
                            <span class="other-link-icon">📱</span>
                            <span class="other-link-text">Iglesia Bautista Emanuel (IBE)</span>
                        </a>
                        <a href="https://ibe.org.ve/" target="_blank" rel="noopener noreferrer" class="other-link">
                            <span class="other-link-icon">🌐</span>
                            <span class="other-link-text">Sitio Web IBE</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>Plan Vacacional Juvenil de la Iglesia Bautista Emanuel.<br>
                Caracas, Venezuela.<br>
                2026</p>
            </div>
        </div>`;
    }
})();
