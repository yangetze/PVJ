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
        answer: "Debes traer: ropa cómoda para actividades al aire libre, traje de baño, toalla, aseo personal, sábanas y cobijas, medicamentos (si aplica) y documentos de identidad. Te recomendamos no traer objetos de valor como joyas o equipos electrónicos costosos — el equipo no se responsabiliza por pérdidas o daños de objetos personales."
    },
    {
        question: "¿Se incluye el transporte?",
        answer: "¡Sí, el transporte está incluido! Contarás con traslado desde la iglesia hasta Campo Carabobo en un transporte cómodo y seguro. No tienes que preocuparte por cómo llegar — nosotros te llevamos."
    },
    {
        question: "¿Cuáles son los métodos de pago aceptados?",
        answer: "Aceptamos: pago móvil (Banesco, Mercantil, BOD), USD en efectivo, EUR en efectivo y bolívares a la tasa euro del día del pago. Si necesitas otro método de pago, comunícate con el equipo y buscamos una solución juntos."
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
