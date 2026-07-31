# PVJ 2026 — In-Cómoda-Mente

Sitio web estático de marketing para el **Campamento Juvenil PVJ ("Plan Vacacional Juvenil") 2026 "In-Cómoda-Mente"**, organizado por el Ministerio Juvenil de la Iglesia Bautista Emanuel (IBE), La Castellana, Caracas, Venezuela.

## Sobre el evento

- **Nombre:** In-Cómoda-Mente
- **Fecha:** 24–28 de agosto de 2026
- **Lugar (edición 2026):** Campamento Nacional Bautista, Campo Carabobo, Valencia, Venezuela — la sede varía cada año, no asumir que se repite
- **Público:** Jóvenes de 14 a 25 años
- **Tema bíblico (edición 2026):** Romanos 12:2 (NVI) — *"No se amolden al mundo actual, sino sean transformados mediante la renovación de su mente. Así podrán comprobar cómo es la voluntad de Dios: buena, agradable y perfecta."* — tema específico de esta edición, puede cambiar en años futuros
- **Precio:** €95 por persona (todo incluido: comidas, transporte, alojamiento, actividades)

## Tecnología

Sitio 100% estático — sin frameworks, sin build tools, sin dependencias.

| Archivo | Función |
|---|---|
| `index.html` | Página principal |
| `pagos.html` | Calculadora BCV + reporte de pago |
| `donaciones.html` | Programa de becas y donaciones |
| `mercancia.html` | Venta de camisas pro-fondo (catálogo + pedido por WhatsApp) |
| `styles.css` | Sistema de diseño completo (variables CSS, layout, responsive) |
| `config.js` | Constantes globales del sitio (`SITE_URL`, `INSCRIPTION_URL`, etc.) |
| `components.js` | Header y footer compartidos — única fuente de verdad |
| `main.js` | Countdown, tasa BCV en vivo, calculadora €→Bs, FAQ |
| `donaciones.js` | FAQ de donaciones, animaciones de scroll |
| `mercancia.js` | Catálogo de camisas, formulario de pedido, mensaje de WhatsApp |
| `llms.txt` | Resumen del sitio para agentes de IA |
| `assets/` | Imágenes: favicon, logo de navegación, fotos de mercancía |

## Desarrollo local

No se requiere instalación. Abre `index.html` directamente en el navegador, o usa un servidor local para evitar restricciones CORS:

```bash
python3 -m http.server 8080
# Abre http://localhost:8080
```

## Características

- **Tasa BCV en tiempo real** — consulta la API de `dolarvzla.com` para mostrar el equivalente en bolívares
- **Calculadora €→Bs** — conversión instantánea según la tasa del día
- **Countdown** — cuenta regresiva al inicio del campamento
- **Diseño responsive** — adaptado para móvil, tablet y desktop
- **Tema oscuro** con acentos lima y azul neón
- **Sin JavaScript requerido para contenido estático** — el header/footer se inyecta en runtime vía `components.js`

## Despliegue

El repositorio se despliega automáticamente vía GitHub Actions (`.github/workflows/deploy.yml`) usando `rsync` al servidor de producción en cada push a `main`.
