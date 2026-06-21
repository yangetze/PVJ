// ============================================
// FAQ DATA
// ============================================
const faqData = [
    {
        question: "¿Qué debo llevar al campamento?",
        answer: "Debes traer: ropa cómoda para actividades al aire libre, traje de baño, toalla, aseo personal, sábanas y cobijas, medicamentos (si aplica) y documentos de identidad. Te recomendamos no traer objetos de valor como joyas o equipos electrónicos costosos — el equipo no se responsabiliza por pérdidas o daños de objetos personales."
    },
    {
        question: "¿Se incluye el transporte?",
        answer: "¡Sí, el transporte está incluido! Contarás con traslado desde la iglesia hasta Campo Carabobo en un transporte cómodo y seguro. No tienes que preocuparte por cómo llegar — nosotros te llevamos."
    },
    {
        question: "¿Cuáles son los métodos de pago aceptados?",
        answer: "Aceptamos Bs. por pago móvil o transferencia a la tasa euro del día BCV. También recibimos efectivo en dólares o euros. Si dispones de otro método de pago, consúltalo al equipo."
    },
    {
        question: "¿Puedo pagar en cuotas?",
        answer: "No somos el logo amarillo, pero definitivamente puedes pagar en cómodas cuotas."
    },
    {
        question: "¿Cómo puedo apartar mi cupo?",
        answer: "Debes realizar un abono de mínimo 10 € a la tasa del día. Si tienes dudas, puedes consultarlo los domingos al finalizar cada culto, o escribirnos por Instagram o WhatsApp, o consultarlo con el staff."
    },
    {
        question: "¿Cuál es la fecha límite para terminar de pagar?",
        answer: "5 días antes del comienzo del evento. Si tienes dudas, acércate a la mesa el día domingo."
    },
    {
        question: "¿Hay límite de participantes?",
        answer: "Sí, el campamento tiene un cupo máximo de 70 personas. Las inscripciones son por orden de llegada y los cupos se llenan rápido. Si estás leyendo esto, todavía hay campo — ¡no esperes más para asegurar tu lugar!"
    },
    {
        question: "¿Qué pasa si tengo alergias o restricciones alimentarias?",
        answer: "Es importante que nos cuentes si tienes alguna alergia, intolerancia o restricción alimentaria. Esa información es valiosa para que el equipo pueda ajustarse de la mejor manera posible y estar al tanto de tus necesidades."
    },
    {
        question: "¿Para qué edades es el campamento?",
        answer: "El campamento es para jóvenes de 14 a 25 años. Así logramos crear un espacio donde todos se sientan identificados y puedan conectar de verdad. Si tienes dudas, escríbenos."
    },
    {
        question: "¿Necesito ser cristiano o asistir a una iglesia para asistir al campamento?",
        answer: "Todos son bienvenidos."
    }
];

// ============================================
// FAQ RENDERING
// ============================================
function renderFAQ() {
    const faqContainer = document.getElementById('faqContainer');
    if (!faqContainer) return;

    faqData.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question" data-index="${index}">
                <span class="faq-question-text">${faq.question}</span>
                <div class="faq-toggle"></div>
            </div>
            <div class="faq-answer">
                <div class="faq-answer-content">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `;

        faqContainer.appendChild(faqItem);
    });

    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function () {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ============================================
// EURO RATE BADGE & CALCULATOR
// ============================================

let currentEuroRate = null;

function formatBs(amount) {
    return amount.toLocaleString('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function updateCalculation() {
    const input = document.getElementById('euroInput');
    const resultEl = document.getElementById('bsResultValue');
    const resultWrapper = resultEl ? resultEl.closest('.calculator-result') : null;
    const arrow = document.querySelector('.calculator-arrow');

    if (!input || !resultEl) return;

    const euros = parseFloat(input.value) || 0;

    if (arrow) arrow.classList.add('calculating');

    if (currentEuroRate && euros >= 0) {
        const bs = euros * currentEuroRate;
        resultEl.textContent = euros === 0 ? '0,00' : formatBs(bs);
        if (resultWrapper) resultWrapper.classList.toggle('has-value', euros > 0);
    } else {
        resultEl.textContent = '—';
        if (resultWrapper) resultWrapper.classList.remove('has-value');
    }

    // Small delay to animate the arrow back
    setTimeout(() => { if (arrow) arrow.classList.remove('calculating'); }, 150);
}

async function fetchEuroRate() {
    const badge = document.getElementById('eurRateBadge');
    const calcNote = document.getElementById('calculatorNote');

    try {
        const response = await fetch('https://rates.dolarvzla.com/bcv/current.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        // Handle multiple possible response shapes
        const rate =
            (data.current && (data.current.eur ?? data.current.EUR)) ??
            data.eur ??
            data.EUR ??
            data.euro ??
            (data.rates && (data.rates.eur ?? data.rates.EUR)) ??
            null;

        if (!rate || isNaN(parseFloat(rate))) throw new Error('Euro rate not found in response');

        currentEuroRate = parseFloat(rate);

        // Update badge
        if (badge) {
            badge.innerHTML = `
                <span class="euro-rate-dot"></span>
                <span class="euro-rate-label">Tasa BCV hoy</span>
                <span class="euro-rate-value">€1&nbsp;=&nbsp;<strong>Bs.&nbsp;${formatBs(currentEuroRate)}</strong></span>
            `;
            badge.classList.add('loaded');
        }

        // Update calculator note
        if (calcNote) {
            calcNote.innerHTML = `
                <span class="calculator-note-icon">✅</span>
                <span>Tasa BCV del día: <strong>€1 = Bs. ${formatBs(currentEuroRate)}</strong> · El monto puede variar al momento del pago según la tasa vigente.</span>
            `;
        }

        // Trigger initial calculation
        updateCalculation();

    } catch (error) {
        console.error('Error fetching euro rate:', error);

        if (badge) {
            badge.innerHTML = `
                <span class="euro-rate-dot"></span>
                <span class="euro-rate-loading">⚠️ Tasa no disponible — consultar en el momento del pago</span>
            `;
        }

        if (calcNote) {
            calcNote.innerHTML = `
                <span class="calculator-note-icon">⚠️</span>
                <span>No se pudo cargar la tasa BCV en este momento. El monto en bolívares se calcula a la tasa vigente al día del pago.</span>
            `;
        }
    }
}

// ============================================
// HERO COUNTDOWN
// ============================================

function initCountdown() {
    const countdownEl = document.getElementById('heroCountdown');
    if (!countdownEl) return;

    // Venezuela is UTC−4 year-round (no DST)
    // Event starts: Aug 24, 2026 00:00 VET  →  2026-08-24T04:00:00Z
    // Event ends:   Aug 28, 2026 23:59 VET  →  hide on Aug 29 00:00 VET = 2026-08-29T04:00:00Z
    const eventStart = new Date('2026-08-24T04:00:00Z');
    const eventEnd   = new Date('2026-08-29T04:00:00Z');

    let intervalId = null;
    let renderedMode = null; // 'countdown' | 'camping' | 'hidden'

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    // Build the countdown skeleton once — subsequent ticks only update the text nodes
    function buildCountdown() {
        countdownEl.innerHTML = `
            <div class="countdown-wrapper">
                <p class="countdown-label">Faltan para el campamento</p>
                <div class="countdown-grid">
                    <div class="countdown-unit">
                        <span class="countdown-value" id="cd-days">00</span>
                        <span class="countdown-unit-label">días</span>
                    </div>
                    <span class="countdown-sep">:</span>
                    <div class="countdown-unit">
                        <span class="countdown-value" id="cd-hours">00</span>
                        <span class="countdown-unit-label">horas</span>
                    </div>
                    <span class="countdown-sep">:</span>
                    <div class="countdown-unit">
                        <span class="countdown-value" id="cd-minutes">00</span>
                        <span class="countdown-unit-label">minutos</span>
                    </div>
                    <span class="countdown-sep">:</span>
                    <div class="countdown-unit">
                        <span class="countdown-value" id="cd-seconds">00</span>
                        <span class="countdown-unit-label">segundos</span>
                    </div>
                </div>
            </div>
        `;
        renderedMode = 'countdown';
    }

    // Only touch the four number nodes — no DOM structure changes, no animation replay
    function updateCountdown(ms) {
        const totalSec = Math.max(0, Math.floor(ms / 1000));
        const days    = Math.floor(totalSec / 86400);
        const hours   = Math.floor((totalSec % 86400) / 3600);
        const minutes = Math.floor((totalSec % 3600) / 60);
        const seconds = totalSec % 60;

        document.getElementById('cd-days').textContent    = pad(days);
        document.getElementById('cd-hours').textContent   = pad(hours);
        document.getElementById('cd-minutes').textContent = pad(minutes);
        document.getElementById('cd-seconds').textContent = pad(seconds);
    }

    function renderCamping() {
        countdownEl.innerHTML = `
            <div class="countdown-camping">
                <span class="countdown-camping-icon">⛺</span>
                <p class="countdown-camping-text">¡Estamos de campamento!</p>
            </div>
        `;
        renderedMode = 'camping';
    }

    function tick() {
        const now = new Date();

        if (now >= eventEnd) {
            // Camp is over — hide silently
            countdownEl.style.display = 'none';
            if (intervalId) clearInterval(intervalId);
            return;
        }

        if (now >= eventStart) {
            // Aug 24–28: show camping message once, then stop ticking
            if (renderedMode !== 'camping') renderCamping();
            if (intervalId) clearInterval(intervalId);
            return;
        }

        // Before Aug 24: live countdown — build structure once, then just update numbers
        if (renderedMode !== 'countdown') buildCountdown();
        updateCountdown(eventStart - now);
    }

    tick();
    intervalId = setInterval(tick, 1000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderFAQ();
    initCountdown();

    // Wire inscription URL to "Registrarme Ahora" CTA
    const registrarmeBtn = document.getElementById('registrarmeBtn');
    if (registrarmeBtn) {
        registrarmeBtn.href = INSCRIPTION_URL;
    }

    // Wire WhatsApp URL to "Estoy interesado" and "Apartar mi cupo" CTAs
    const interestedBtn = document.getElementById('interestedBtn');
    if (interestedBtn) {
        interestedBtn.href = WHATSAPP_URL;
    }

    const apartarCupoBtn = document.getElementById('apartarCupoBtn');
    if (apartarCupoBtn) {
        apartarCupoBtn.href = WHATSAPP_URL;
    }

    // Fetch live euro rate and populate badge + calculator
    fetchEuroRate();

    // Wire up calculator input
    const euroInput = document.getElementById('euroInput');
    if (euroInput) {
        euroInput.addEventListener('input', updateCalculation);
    }

    // Copy buttons in the payment data section
    function flashCopied(btn) {
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 2000);
    }

    function copyText(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        }
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        return Promise.resolve();
    }

    document.querySelectorAll('.pagos-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            copyText(btn.dataset.copy).then(() => flashCopied(btn)).catch(() => {});
        });
    });

    document.querySelectorAll('.pagos-copy-all-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.pagos-datos-card');
            const lines = [...card.querySelectorAll('.pagos-dato-item')].map(item => {
                const label = item.querySelector('.pagos-dato-label').textContent.trim();
                const value = item.querySelector('.pagos-dato-value').textContent.trim();
                return `${label}: ${value}`;
            });
            copyText(lines.join('\n')).then(() => flashCopied(btn)).catch(() => {});
        });
    });
});
