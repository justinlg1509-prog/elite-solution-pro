// Regenerates the JSON-LD in index.html and the Spanish page es/index.html.
// index.html (English) is the source. Translations come from the T table in assets/js/main.js.
// Run after editing index.html or main.js:  node tools/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = p => readFileSync(join(root, p), "utf8");
const write = (p, s) => { mkdirSync(dirname(join(root, p)), { recursive: true }); writeFileSync(join(root, p), s); };

const SITE = "https://www.elitesolutionpro.com";
const OG_IMAGE = "https://images.unsplash.com/photo-1642447260162-8d52ac4348ad?auto=format&fit=crop&q=68&w=1200&h=630";

const js = read("assets/js/main.js");
const tSrc = js.match(/const T = (\{[\s\S]*?\n {2}\});/);
if (!tSrc) throw new Error("T table not found in main.js");
const T = Function(`return ${tSrc[1]}`)();
const tr = (k, l) => { if (!T[k]) throw new Error(`missing key ${k}`); return T[k][l]; };

const META = {
  en: {
    path: "/",
    title: "Business Consulting in Clifton, NJ | Elite Solution Pro",
    desc: "Business consulting for entrepreneurs and small businesses: structure, finances, funding readiness and AI automation. Free consultation in English or Spanish. Elite Solution Pro LLC, Clifton, NJ.",
    ogTitle: "Elite Solution Pro | Build your business the right way",
    ogDesc: "Business consulting: structure, finances, funding readiness and automation. Free consultation.",
    imgAlt: "Elite Solution Pro, business consulting in Clifton, NJ",
    locale: "en_US", altLocale: "es_US",
    bizDesc: "Business consulting: company formation and structure, financial organization, funding readiness and AI automation.",
    catalog: "Business consulting services",
    knowsAbout: ["Business consulting", "Small business consulting", "LLC formation", "EIN registration", "Business bank accounts", "Bookkeeping", "Cash flow management", "Funding readiness", "Business automation", "AI automation", "CRM"],
  },
  es: {
    path: "/es",
    title: "Consultoría empresarial en Clifton, NJ | Elite Solution Pro",
    desc: "Consultoría empresarial para emprendedores y pequeños negocios: estructura, finanzas, preparación para financiamiento y automatización con IA. Consulta gratis en español o inglés. Elite Solution Pro LLC, Clifton, NJ.",
    ogTitle: "Elite Solution Pro | Construye tu negocio de la forma correcta",
    ogDesc: "Consultoría empresarial: estructura, finanzas, preparación para financiamiento y automatización. Consulta gratis.",
    imgAlt: "Elite Solution Pro, consultoría empresarial en Clifton, NJ",
    locale: "es_US", altLocale: "en_US",
    bizDesc: "Consultoría empresarial: formación y estructura de empresas, organización financiera, preparación para financiamiento y automatización con IA.",
    catalog: "Servicios de consultoría empresarial",
    knowsAbout: ["Consultoría empresarial", "Consultoría para pequeños negocios", "Formación de LLC", "Registro de EIN", "Cuentas bancarias de empresa", "Contabilidad", "Flujo de caja", "Preparación para financiamiento", "Automatización de negocios", "Automatización con IA", "CRM"],
  },
};

function schema(l) {
  const m = META[l], url = SITE + m.path;
  const biz = `${SITE}/#business`, site = `${SITE}/#website`, page = `${url}#webpage`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": biz,
        name: "Elite Solution Pro LLC",
        alternateName: "Elite Solution Pro",
        url: `${SITE}/`,
        logo: { "@type": "ImageObject", url: `${SITE}/logo.webp`, width: 128, height: 128 },
        image: OG_IMAGE,
        description: m.bizDesc,
        slogan: tr("ft.tag", l),
        telephone: "+1-848-900-9621",
        email: "info@elitesolutionpro.com",
        address: { "@type": "PostalAddress", streetAddress: "136 Kingsland Road #1065", addressLocality: "Clifton", addressRegion: "NJ", postalCode: "07014", addressCountry: "US" },
        areaServed: [{ "@type": "State", name: "New Jersey" }, { "@type": "Country", name: "United States" }],
        availableLanguage: ["English", "Spanish"],
        contactPoint: { "@type": "ContactPoint", telephone: "+1-848-900-9621", email: "info@elitesolutionpro.com", contactType: "customer service", areaServed: "US", availableLanguage: ["English", "Spanish"] },
        sameAs: ["https://www.instagram.com/elitesolutioncredit/"],
        knowsAbout: m.knowsAbout,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: m.catalog,
          itemListElement: [1, 2, 3, 4].map(i => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: tr(`s${i}.h`, l),
              description: tr(`s${i}.p`, l),
              serviceType: [1, 2, 3].map(j => tr(`s${i}.l${j}`, l)).join(", "),
              provider: { "@id": biz },
              areaServed: { "@type": "Country", name: "United States" },
            },
          })),
        },
      },
      { "@type": "WebSite", "@id": site, url: `${SITE}/`, name: "Elite Solution Pro", inLanguage: ["en", "es"], publisher: { "@id": biz } },
      {
        "@type": "WebPage",
        "@id": page,
        url,
        name: m.title,
        description: m.desc,
        inLanguage: l,
        isPartOf: { "@id": site },
        about: { "@id": biz },
        primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE, width: 1200, height: 630 },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: l,
        isPartOf: { "@id": page },
        mainEntity: [1, 2, 3, 4, 5, 6].map(i => ({
          "@type": "Question",
          name: tr(`f${i}.q`, l),
          acceptedAnswer: { "@type": "Answer", text: tr(`f${i}.a`, l) },
        })),
      },
    ],
  };
}

const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ld = l => `<script type="application/ld+json" id="schema">${JSON.stringify(schema(l)).replace(/</g, "\\u003c")}</script>`;
const setLd = (html, l) => {
  const re = /<script type="application\/ld\+json" id="schema">[\s\S]*?<\/script>/;
  if (!re.test(html)) throw new Error("schema block not found");
  return html.replace(re, () => ld(l));
};

// English page: refresh JSON-LD only
let en = read("index.html");
en = setLd(en, "en");
write("index.html", en);

// Spanish page
const es = META.es, eng = META.en;
const swap = (html, from, to) => {
  if (!html.includes(from)) throw new Error(`not found: ${from}`);
  return html.split(from).join(to);
};
let out = en;
out = swap(out, `<html lang="en">`, `<html lang="es">`);
out = swap(out, `<title>${esc(eng.title)}</title>`, `<title>${esc(es.title)}</title>`);
out = swap(out, `<meta name="description" content="${esc(eng.desc)}">`, `<meta name="description" content="${esc(es.desc)}">`);
out = swap(out, `<link rel="canonical" href="${SITE}/">`, `<link rel="canonical" href="${SITE}/es">`);
out = swap(out, `<meta property="og:url" content="${SITE}/">`, `<meta property="og:url" content="${SITE}/es">`);
out = swap(out, `content="${esc(eng.ogTitle)}"`, `content="${esc(es.ogTitle)}"`);
out = swap(out, `content="${esc(eng.ogDesc)}"`, `content="${esc(es.ogDesc)}"`);
out = swap(out, `content="${esc(eng.imgAlt)}"`, `content="${esc(es.imgAlt)}"`);
out = swap(out, `<meta property="og:locale" content="en_US">`, `<meta property="og:locale" content="es_US">`);
out = swap(out, `<meta property="og:locale:alternate" content="es_US">`, `<meta property="og:locale:alternate" content="en_US">`);
out = swap(out, `<button type="button" data-lang="en" aria-pressed="true">`, `<button type="button" data-lang="en" aria-pressed="false">`);
out = swap(out, `<button type="button" data-lang="es" aria-pressed="false">`, `<button type="button" data-lang="es" aria-pressed="true">`);
out = setLd(out, "es");

// visible text: same keys the in-page language switch uses
let n = 0;
out = out.replace(/(<([a-z0-9]+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/g, (all, open, tag, key, text, close) => {
  if (!T[key]) throw new Error(`no translation for ${key}`);
  n++;
  return open + esc(T[key].es).replace(/&quot;/g, '"') + close;
});
const left = out.match(/data-i18n="[^"]+"[^>]*>[^<]*<(?!\/)/g);
if (left) throw new Error(`data-i18n elements with nested markup: ${left.join(" | ")}`);
write("es/index.html", out);
console.log(`index.html schema updated; es/index.html written (${n} strings translated)`);
