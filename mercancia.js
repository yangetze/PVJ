// ============================================
// MERCH CATALOG DATA
// ============================================
const merchModels = [
    {
        id: 'jesus-es-rey',
        name: 'Jesús es Rey',
        image: 'assets/merch/jesus-es-rey.png',
        bestSeller: false
    },
    {
        id: 'se-la-luz',
        name: 'Sé la Luz',
        image: 'assets/merch/se-la-luz.png',
        bestSeller: true
    },
    {
        id: 'me-hallaste',
        name: 'Me Hallaste',
        image: 'assets/merch/me-hallaste.png',
        bestSeller: false
    }
];

const merchColors = ['Blanco', 'Negro', 'Gris', 'Beige/Crema'];
const merchSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

// ============================================
// GALLERY RENDERING
// ============================================
function renderMerchGallery() {
    const grid = document.getElementById('merchGrid');
    if (!grid) return;

    merchModels.forEach(model => {
        const card = document.createElement('div');
        card.className = 'merch-card';
        card.innerHTML = `
            ${model.bestSeller ? '<span class="merch-card-badge">🔥 Más Vendido</span>' : ''}
            <div class="merch-card-image-wrap">
                <img src="${model.image}" alt="Camisa ${model.name}" class="merch-card-image" loading="lazy">
            </div>
            <div class="merch-card-body">
                <h3 class="merch-card-name">${model.name}</h3>
                <p class="merch-card-colors">${merchColors.join(' · ')}</p>
                <p class="merch-card-sizes">Tallas: ${merchSizes.join(' · ')}</p>
                <p class="merch-card-price">$12 <span class="merch-card-price-note">(hasta XL) · $15 (2XL+)</span></p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ============================================
// ORDER FORM
// ============================================
let merchItemCount = 0;

function merchOptions(list) {
    return list.map(v => `<option value="${v}">${v}</option>`).join('');
}

function addMerchOrderRow() {
    merchItemCount++;
    const container = document.getElementById('merchOrderItems');
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'merch-order-row';
    row.dataset.itemId = merchItemCount;
    row.innerHTML = `
        <select class="merch-order-select" data-field="modelo" aria-label="Modelo">
            ${merchOptions(merchModels.map(m => m.name))}
        </select>
        <select class="merch-order-select" data-field="color" aria-label="Color">
            ${merchOptions(merchColors)}
        </select>
        <select class="merch-order-select" data-field="talla" aria-label="Talla">
            ${merchOptions(merchSizes)}
        </select>
        <input type="number" class="merch-order-qty" data-field="cantidad" min="1" value="1" aria-label="Cantidad">
        ${merchItemCount > 1 ? '<button type="button" class="merch-order-remove" aria-label="Quitar">&times;</button>' : ''}
    `;
    container.appendChild(row);

    const removeBtn = row.querySelector('.merch-order-remove');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => row.remove());
    }
}

function buildMerchWhatsAppMessage(discountRequested) {
    const rows = document.querySelectorAll('#merchOrderItems .merch-order-row');
    const lines = Array.from(rows).map((row, index) => {
        const modelo = row.querySelector('[data-field="modelo"]').value;
        const color = row.querySelector('[data-field="color"]').value;
        const talla = row.querySelector('[data-field="talla"]').value;
        const cantidad = row.querySelector('[data-field="cantidad"]').value;
        return `${index + 1}. Modelo ${modelo} | Color ${color} | Talla ${talla} | Cantidad: ${cantidad}`;
    });

    let message = `¡Hola! 👋 Quiero hacer un pedido de camisas de In-Cómoda-Mente:\n\n${lines.join('\n')}`;

    if (discountRequested) {
        message += '\n\nTambién me gustaría saber sobre el descuento pagando en divisas (efectivo o Binance).';
    }

    message += '\n\n¿Me confirman disponibilidad y el total? ¡Gracias!';
    return message;
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderMerchGallery();
    addMerchOrderRow();

    const addItemBtn = document.getElementById('merchAddItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addMerchOrderRow);
    }

    const form = document.getElementById('merchOrderForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const discountRequested = document.getElementById('merchDiscountCheck').checked;
            const message = buildMerchWhatsAppMessage(discountRequested);
            const url = `https://wa.me/${WHATSAPP_DONACIONES_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    }

    // Smooth scroll for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
