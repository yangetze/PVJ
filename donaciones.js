// ============================================
// DONATIONS FAQ DATA
// ============================================
const donacionesFaqData = [
    {
        question: "¿Dónde va exactamente mi dinero?",
        answer: `
            <p>Tu donación cubre los costos reales de la beca del joven: desde la inscripción y el alojamiento en cabañas, hasta las comidas durante los 4 días, el transporte y todas las actividades del programa.</p>
            <p><strong>100% del dinero va a la experiencia del joven.</strong> No hay intermediarios ni comisiones administrativas. Total transparencia.</p>
        `
    },
    {
        question: "¿Sé quién es el joven al que ayudo?",
        answer: `
            <p>Comprendemos el deseo de conexión personal. Por confidencialidad, no compartimos nombres completos de menores de edad.</p>
            <p><strong>PERO recibirás:</strong></p>
            <ul>
                <li>Descripción anónima (ej: 'Juan, 17 años, participa en escuela dominical')</li>
                <li>Historias de impacto post-campamento</li>
                <li>Fotos del campamento (sin identificación)</li>
                <li>Testimonio breve (si la familia autoriza)</li>
            </ul>
            <p>Nuestro compromiso es con la dignidad y privacidad del joven, no con ocultarle el impacto de tu generosidad.</p>
        `
    },
    {
        question: "¿Puedo donar menos de €95?",
        answer: `
            <p><strong>¡Sí! Aclaración importante:</strong></p>
            <p>Una beca completa = €95, pero nada te obliga a darla entera.</p>
            <p><strong>Opciones reales:</strong></p>
            <ul>
                <li>Donar €10 = ya ayudas</li>
                <li>Donar €25 + otro donante + otro = beca completa</li>
                <li>Donar €95 = cambias una vida completa</li>
            </ul>
            <p>La belleza es que la comunidad se une. No es 'tu responsabilidad individual', es 'nuestro compromiso colectivo'.</p>
        `
    },
    {
        question: "¿Qué pasa si se juntan más fondos de los necesarios?",
        answer: `
            <p>Cada euro extra se invierte en lo mismo: llevar a más adolescentes y jóvenes al campamento. Si superamos la meta, ampliamos el número de becas.</p>
            <p><strong>Seremos transparentes al 100%</strong> sobre cómo se usa cada euro.</p>
        `
    },
    {
        question: "¿Qué si no llegamos a la meta de 10 becas?",
        answer: `
            <p><strong>Honestidad:</strong> Si faltamos fondos, priorizaremos los jóvenes con mayor necesidad económica y mayor compromiso ministerial.</p>
            <p>Pero queremos llegar a todos. Por eso estamos contigo. Cada donación nos acerca más a la meta.</p>
        `
    }
];

// ============================================
// FAQ RENDERING
// ============================================
function renderDonacionesFAQ() {
    const faqContainer = document.getElementById('donacionesFaqContainer');
    if (!faqContainer) return;

    donacionesFaqData.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question" data-index="${index}">
                <span class="faq-question-text">${faq.question}</span>
                <div class="faq-toggle"></div>
            </div>
            <div class="faq-answer">
                <div class="faq-answer-content">
                    ${faq.answer}
                </div>
            </div>
        `;
        faqContainer.appendChild(faqItem);
    });

    document.querySelectorAll('#donacionesFaqContainer .faq-question').forEach(question => {
        question.addEventListener('click', function () {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            document.querySelectorAll('#donacionesFaqContainer .faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
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
    renderDonacionesFAQ();

    function bindWhatsApp(id, url) {
        const btn = document.getElementById(id);
        if (!btn || typeof url === 'undefined') return;
        btn.addEventListener('click', () => window.open(url, '_blank', 'noopener,noreferrer'));
    }

    bindWhatsApp('whatsappDonacionesBtn',   WHATSAPP_DONACIONES_URL);
    bindWhatsApp('whatsappZelleBtn',        WHATSAPP_ZELLE_URL);
    bindWhatsApp('whatsappPagoMovilBtn',    WHATSAPP_PAGO_MOVIL_URL);
    bindWhatsApp('whatsappTransferenciaBtn', WHATSAPP_TRANSFERENCIA_URL);

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
