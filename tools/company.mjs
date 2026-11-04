// Datos legales de la empresa. Las páginas legales, el JSON-LD y llms.txt salen de aquí.
// Cuando tengas un dato, rellénalo y ejecuta:  node tools/build.mjs
// Los campos vacíos ("") o null se omiten en las páginas sin dejar huecos.

export const COMPANY = {
  legalName: "Elite Solution Pro LLC",
  brand: "Elite Solution Pro",

  formationState: "",  // estado donde se registró la LLC
  entityId: "",        // número de registro de la LLC en ese estado

  street: "136 Kingsland Road #1065",
  city: "Clifton",
  region: "NJ",
  regionName: "New Jersey",
  postalCode: "07014",
  mailingOnly: null,   // true si la dirección es un buzón (solo correo), false si es una oficina

  email: "info@elitesolutionpro.com",
  privacyEmail: "info@elitesolutionpro.com",
  phone: "+1-848-900-9621",
  phoneDisplay: "848-900-9621",
  whatsapp: "https://wa.me/18489009621",

  testimonialsVerified: null, // true cuando los testimonios sean clientes reales con permiso y sin pago a cambio

  // fecha de la última revisión de las páginas legales (AAAA-MM-DD)
  legalUpdated: "2026-11-04",
};
