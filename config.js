// ============================================
// SITE CONFIGURATION — single source of truth
// Load this script before components.js and any page-specific script.
// ============================================

const SITE_URL        = 'https://pvjcampamento.com/';
const INSCRIPTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfiJoNvwPer5zCyQQHRjPz2hSFAqCRCx5FT6Ea9flY4GWRAHQ/viewform';

const WHATSAPP_NUMBER  = '584126152997'; // phone number in international format, no + or spaces
const WHATSAPP_MESSAGE = 'Hola estoy interesado para inscripción del campamento.';
const WHATSAPP_URL     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const WHATSAPP_DONACIONES_NUMBER  = '584242851050'; // donations contact
const WHATSAPP_DONACIONES_MESSAGE = 'Estoy interesado en DONAR para Plan Vacacional Juvenil.';
const WHATSAPP_DONACIONES_URL     = `https://wa.me/${WHATSAPP_DONACIONES_NUMBER}?text=${encodeURIComponent(WHATSAPP_DONACIONES_MESSAGE)}`;

const WHATSAPP_ZELLE_MESSAGE      = '¡Hola! Quiero ayudar a completar una beca por Zelle. ¿Me facilitan los datos?';
const WHATSAPP_ZELLE_URL          = `https://wa.me/${WHATSAPP_DONACIONES_NUMBER}?text=${encodeURIComponent(WHATSAPP_ZELLE_MESSAGE)}`;

const WHATSAPP_PAGO_MOVIL_MESSAGE = '¡Hola! Quiero ayudar a completar una beca por Pago Móvil. ¿Me facilitan los datos?';
const WHATSAPP_PAGO_MOVIL_URL     = `https://wa.me/${WHATSAPP_DONACIONES_NUMBER}?text=${encodeURIComponent(WHATSAPP_PAGO_MOVIL_MESSAGE)}`;

const WHATSAPP_TRANSFERENCIA_MESSAGE = '¡Hola! Quiero ayudar a completar una beca por Transferencia Bancaria. ¿Me facilitan los datos?';
const WHATSAPP_TRANSFERENCIA_URL     = `https://wa.me/${WHATSAPP_DONACIONES_NUMBER}?text=${encodeURIComponent(WHATSAPP_TRANSFERENCIA_MESSAGE)}`;
