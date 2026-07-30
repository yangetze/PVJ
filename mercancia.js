// ============================================
// MERCH CATALOG DATA
// ============================================
const merchModels = [
    {
        id: 'jesus-es-rey',
        name: 'Jesús es Rey',
        front: 'assets/merch/jesus-es-rey-front.png',
        back: 'assets/merch/jesus-es-rey-back.png',
        bestSeller: false
    },
    {
        id: 'se-la-luz',
        name: 'Sé la Luz',
        front: 'assets/merch/se-la-luz-front.png',
        back: 'assets/merch/se-la-luz-back.png',
        bestSeller: true
    },
    {
        id: 'me-hallaste',
        name: 'Me Hallaste',
        front: 'assets/merch/me-hallaste-front.png',
        back: 'assets/merch/me-hallaste-back.png',
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
                <img src="${model.front}" alt="Camisa ${model.name}" class="merch-card-image" data-main-image loading="lazy">
            </div>
            <div class="merch-card-thumbs">
                <button type="button" class="merch-card-thumb active" data-image="${model.front}" aria-label="Ver frente">
                    <img src="${model.front}" alt="Frente ${model.name}" loading="lazy">
                </button>
                <button type="button" class="merch-card-thumb" data-image="${model.back}" aria-label="Ver espalda">
                    <img src="${model.back}" alt="Espalda ${model.name}" loading="lazy">
                </button>
            </div>
            <div class="merch-card-body">
                <h3 class="merch-card-name">${model.name}</h3>
                <p class="merch-card-colors">${merchColors.join(' · ')}</p>
                <p class="merch-card-sizes">Tallas: ${merchSizes.join(' · ')}</p>
                <p class="merch-card-price">S–XL: $12 <span class="merch-card-price-sep">·</span> 2XL en adelante: $15</p>
                <button type="button" class="btn btn-primary btn-block merch-card-cta" data-model="${model.name}">
                    Hacer mi pedido
                </button>
            </div>
        `;

        const mainImage = card.querySelector('[data-main-image]');
        card.querySelectorAll('.merch-card-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.dataset.image;
                card.querySelectorAll('.merch-card-thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });

        card.querySelector('.merch-card-cta').addEventListener('click', () => {
            goToOrderForm(model.name);
        });

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

function addMerchOrderRow(presetModel) {
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

    if (presetModel) {
        row.querySelector('[data-field="modelo"]').value = presetModel;
    }

    const removeBtn = row.querySelector('.merch-order-remove');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => row.remove());
    }

    return row;
}

function goToOrderForm(presetModel) {
    const container = document.getElementById('merchOrderItems');
    if (container) {
        container.innerHTML = '';
        merchItemCount = 0;
    }
    addMerchOrderRow(presetModel);

    const target = document.getElementById('pedido');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
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
        addItemBtn.addEventListener('click', () => addMerchOrderRow());
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
