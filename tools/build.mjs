// Regenerates the JSON-LD in index.html, the Spanish page es/index.html, the legal pages and sitemap.xml.
// index.html (English) is the source. Translations come from the T table in assets/js/main.js.
// Company data comes from tools/company.mjs; legal page content from tools/legal.mjs.
// Run after editing any of them:  node tools/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { COMPANY as C } from "./company.mjs";
import { LEGAL_PAGES, fmtDate } from "./legal.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = p => readFileSync(join(root, p), "utf8");
const write = (p, s) => { mkdirSync(dirname(join(root, p)), { recursive: true }); writeFileSync(join(root, p), s); };

const SITE = "https://www.elitesolutionpro.com";
const OG_IMAGE = `${SITE}/og-image.jpg`;

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
        name: C.legalName,
        legalName: C.legalName,
        alternateName: C.brand,
        url: `${SITE}/`,
        logo: { "@type": "ImageObject", url: `${SITE}/logo.webp`, width: 128, height: 128 },
        image: OG_IMAGE,
        description: m.bizDesc,
        slogan: tr("ft.tag", l),
        telephone: C.phone,
        email: C.email,
        address: { "@type": "PostalAddress", streetAddress: C.street, addressLocality: C.city, addressRegion: C.region, postalCode: C.postalCode, addressCountry: "US" },
        areaServed: [{ "@type": "State", name: "New Jersey" }, { "@type": "Country", name: "United States" }],
        availableLanguage: ["English", "Spanish"],
        contactPoint: { "@type": "ContactPoint", telephone: C.phone, email: C.email, contactType: "customer service", areaServed: "US", availableLanguage: ["English", "Spanish"] },
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
out = out.replace(/href="[^"]*"( data-href-en="[^"]*" data-href-es="([^"]*)")/g, (all, rest, esHref) => `href="${esHref}"${rest}`);

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

// ---------------------------------------------------------------- legal pages
const UI = {
  en: { home: "/", tagline: tr("tagline", "en"), cta: tr("cta.free", "en"), skip: tr("skip", "en"), updated: "Last updated", toc: "Contents", contact: tr("ft.contact", "en"), locale: "en_US" },
  es: { home: "/es", tagline: tr("tagline", "es"), cta: tr("cta.free", "es"), skip: tr("skip", "es"), updated: "Última actualización", toc: "Contenido", contact: tr("ft.contact", "es"), locale: "es_US" },
};
const LEGAL_LINKS = l => LEGAL_PAGES.map((p, i) => ({ href: p.slug[l], label: tr(["ft.priv", "ft.terms", "ft.a11y"][i], l) }));
const year = new Date().getFullYear();

function legalHtml(page, l) {
  const d = page[l](C), u = UI[l], other = l === "en" ? "es" : "en";
  const path = page.slug[l], url = SITE + path;
  const ldJson = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#webpage`, url, name: d.title, description: d.desc, inLanguage: l,
    dateModified: C.legalUpdated, isPartOf: { "@id": `${SITE}/#website` }, publisher: { "@id": `${SITE}/#business` },
  };
  const toc = d.sections.filter(s => /^\d/.test(s.h));
  return `<!doctype html>
<html lang="${l}"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(d.title)}</title>
<meta name="description" content="${esc(d.desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${SITE}${page.slug.en}">
<link rel="alternate" hreflang="es" href="${SITE}${page.slug.es}">
<link rel="alternate" hreflang="x-default" href="${SITE}${page.slug.en}">
<meta name="theme-color" content="#000000">
<meta property="og:site_name" content="${C.brand}">
<meta property="og:title" content="${esc(d.title)}">
<meta property="og:description" content="${esc(d.desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${u.locale}">
<meta property="og:image" content="${OG_IMAGE}">
<link rel="icon" type="image/png" sizes="64x64" href="/favicon.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/manrope-latin.woff2" crossorigin="">
<link rel="stylesheet" href="/assets/css/styles.css?v=3">
<script type="application/ld+json">${JSON.stringify(ldJson).replace(/</g, "\u003c")}</script>
</head>
<body class="legal-page">
<a class="skip" href="#main">${esc(u.skip)}</a>
<header class="site-header scrolled">
  <div class="wrap header-inner">
    <a class="brand" href="${u.home}" aria-label="${C.brand}">
      <img src="/logo.webp" width="48" height="48" alt="">
      <span class="brand-text">${C.brand}<small>${esc(u.tagline)}</small></span>
    </a>
    <div class="header-actions">
      <div class="lang" role="group" aria-label="Idioma / Language">
        <a href="${page.slug.en}" hreflang="en" lang="en"${l === "en" ? ' aria-current="true"' : ""}>EN</a>
        <a href="${page.slug.es}" hreflang="es" lang="es"${l === "es" ? ' aria-current="true"' : ""}>ES</a>
      </div>
      <a class="btn btn-gold header-cta" href="${u.home}#contacto">${esc(u.cta)}</a>
    </div>
  </div>
</header>
<main id="main" class="legal">
  <article class="wrap legal-doc">
    <h1>${esc(d.h1)}</h1>
    <p class="legal-meta">${u.updated}: <time datetime="${C.legalUpdated}">${fmtDate(C.legalUpdated, l)}</time></p>
    <p class="lead">${d.lead}</p>
${toc.length > 3 ? `    <nav class="legal-toc" aria-labelledby="toc-h"><p id="toc-h">${u.toc}</p><ol>${toc.map(s => `<li><a href="#${s.id}">${esc(s.h.replace(/^\d+\.\s*/, ""))}</a></li>`).join("")}</ol></nav>\n` : ""}${d.sections.map(s => `    <section aria-labelledby="${s.id}"><h2 id="${s.id}">${esc(s.h)}</h2>${s.html}</section>`).join("\n")}
  </article>
</main>
<footer class="site-footer">
  <div class="wrap">
    <a class="footer-brand" href="${u.home}"><img src="/logo.webp" width="60" height="60" alt="" loading="lazy"><span><strong>${C.brand}</strong><span>${esc(tr("ft.sub", l))}</span></span></a>
    <p class="disclaimer">${esc(tr("ft.disc", l))}</p>
    <div class="footer-bottom"><span>© ${year} ${C.legalName} · ${C.street}, ${C.city}, ${C.region} ${C.postalCode}</span><nav class="legal-links" aria-label="Legal">${LEGAL_LINKS(l).map(a => `<a href="${a.href}"${a.href === path ? ' aria-current="page"' : ""}>${esc(a.label)}</a>`).join("")}</nav></div>
  </div>
</footer>
</body></html>
`;
}

for (const page of LEGAL_PAGES) for (const l of ["en", "es"]) {
  const p = page.slug[l].slice(1) + ".html";
  write(p, legalHtml(page, l));
}

// ---------------------------------------------------------------- sitemap
const today = new Date().toISOString().slice(0, 10);
const pairs = [{ en: "/", es: "/es", lastmod: today }, ...LEGAL_PAGES.map(p => ({ ...p.slug, lastmod: C.legalUpdated }))];
const loc = p => SITE + p;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pairs.flatMap(pr => ["en", "es"].map(l => `  <url>
    <loc>${loc(pr[l])}</loc>
    <lastmod>${pr.lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${loc(pr.en)}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${loc(pr.es)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(pr.en)}"/>
  </url>`)).join("\n")}
</urlset>
`;
write("sitemap.xml", sitemap);
console.log(`legal pages: ${LEGAL_PAGES.length * 2}; sitemap.xml: ${pairs.length * 2} urls`);
