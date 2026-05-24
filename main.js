// ============================================
// NAVIGATION HANDLING
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');

        navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
    });
});

// ============================================
// FAQ DATA
// ============================================
const faqData = [
    {
        question: "¿Qué debo llevar al campamento?",
        answer: "Debes traer: ropa cómoda para actividades al aire libre, traje de baño, toalla, aseo personal, medicamentos (si aplica), documentos de identidad, dinero para gastos adicionales y objetos de valor guardados. NO se recomiendan artículos electrónicos excepto cámara fotográfica. El kit de bienvenida incluye la mayoría de lo esencial."
    },
    {
        question: "¿Se incluye transporte desde Caracas?",
        answer: "El transporte desde Caracas a Campo Carabobo NO está incluido en la tarifa base. Sin embargo, estamos organizando opciones de transporte grupal a precio especial. Consulta con el equipo de registro para coordinar opciones de viaje desde tu localidad."
    },
    {
        question: "¿Cuáles son los métodos de pago aceptados?",
        answer: "Aceptamos: transferencias bancarias nacionales, pagos móviles (Banesco, Mercantil, BOD), pago en efectivo en nuestras oficinas, y planes de pago en 3 cuotas sin interés. También aceptamos criptomonedas para participantes internacionales. Consulta con nuestro equipo de finanzas para más detalles."
    },
    {
        question: "¿Hay límite de participantes?",
        answer: "Sí, tenemos capacidad limitada a 300 participantes para garantizar una experiencia de calidad. Las inscripciones son por orden de llegada. Te recomendamos registrarte lo antes posible para asegurar tu lugar en esta edición de In-Cómodamente 2026."
    },
    {
        question: "¿Qué pasa si tengo alergias o restricciones alimentarias?",
        answer: "Es muy importante que reportes cualquier alergia, intolerancia o restricción alimentaria durante el proceso de registro. Nuestro equipo de catering está preparado para manejar dietas vegetarianas, veganas, sin gluten y otras restricciones especiales. Haremos todo lo posible para garantizar una experiencia segura y cómoda."
    },
    {
        question: "¿Hay límite de edad para asistir?",
        answer: "El campamento está diseñado para jóvenes de 14 a 25 años. Esta rango etario permite crear un ambiente cohesivo donde todos puedan conectar y crecer juntos. Si tienes preguntas sobre edad, contacta directamente al equipo organizador."
    }
];

// ============================================
// FAQ RENDERING
// ============================================
function renderFAQ() {
    const faqContainer = document.getElementById('faqContainer');

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
});
