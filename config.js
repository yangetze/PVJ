// ============================================
// SITE CONFIGURATION — single source of truth
// Load this script before components.js and any page-specific script.
// ============================================

const SITE_URL        = 'https://pvjcampamento.com/';
const INSCRIPTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfiJoNvwPer5zCyQQHRjPz2hSFAqCRCx5FT6Ea9flY4GWRAHQ/viewform';

const WHATSAPP_NUMBER  = '584126152997'; // phone number in international format, no + or spaces
const WHATSAPP_MESSAGE = 'Hola estoy interesado para inscripción del campamento.';
const WHATSAPP_URL     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
