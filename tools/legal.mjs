// Content of the legal pages (EN + ES). Rendered by tools/build.mjs using the data in tools/company.mjs.
// Each page: { slug: {en, es}, title, desc, h1, lead, sections: [{ id, h, html }] }

const fmtDate = (iso, l) => new Date(iso + "T12:00:00Z").toLocaleDateString(l === "es" ? "es-US" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

function who(C, l) {
  let s = `<strong>${C.legalName}</strong>`;
  if (C.formationState) s += l === "es" ? `, una sociedad de responsabilidad limitada registrada en ${C.formationState}` : `, a ${C.formationState} limited liability company`;
  if (C.entityId) s += l === "es" ? ` (número de registro ${C.entityId})` : ` (entity ID ${C.entityId})`;
  return s;
}

function contact(C, l, email = C.email) {
  const label = C.mailingOnly ? (l === "es" ? "Dirección postal" : "Mailing address") : (l === "es" ? "Dirección" : "Address");
  return `<address class="legal-contact">${C.legalName}<br>${label}: ${C.street}, ${C.city}, ${C.region} ${C.postalCode}<br>Email: <a href="mailto:${email}">${email}</a><br>${l === "es" ? "Teléfono y WhatsApp" : "Phone and WhatsApp"}: <a href="tel:${C.phone.replace(/-/g, "")}">${C.phoneDisplay}</a></address>`;
}

const ul = items => `<ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>`;

/* ---------------------------------------------------------------- privacy */

const privacy = {
  slug: { en: "/privacy", es: "/es/privacidad" },
  en: C => ({
    title: "Privacy Policy | Elite Solution Pro",
    desc: "How Elite Solution Pro LLC collects, uses and protects personal information on elitesolutionpro.com, and the privacy rights available to you.",
    h1: "Privacy Policy",
    lead: `This Privacy Policy explains how ${who(C, "en")} ("Elite Solution Pro", "we", "us") handles personal information when you visit www.elitesolutionpro.com (the "Website") or contact us. We collect as little information as possible, and we do not sell it.`,
    sections: [
      { id: "summary", h: "Summary", html: ul([
        "The Website has <strong>no analytics, no advertising pixels and no tracking cookies</strong>.",
        "The contact form does <strong>not</strong> send your data to our servers. It prepares a WhatsApp message on your device, and you decide whether to send it.",
        "We use the information you send us only to answer you and to provide the services you ask for.",
        "We do <strong>not sell</strong> personal information and do not use it for targeted advertising.",
        "You can ask us to access, correct or delete your information at any time.",
      ]) },
      { id: "collect", h: "1. Information we collect", html: `
        <h3>Information you give us</h3>
        <p>When you contact us by WhatsApp, phone, email or Instagram, or when you send the message prepared by our contact form, we receive the information you choose to share, such as your name, phone number, email address, the service you are interested in, the stage of your business and the content of your message.</p>
        <p>Please do not send Social Security numbers, bank or card numbers, passwords or other sensitive information through the Website, WhatsApp or email. If a service requires documents, we will tell you how to share them securely.</p>
        <h3>Information collected automatically</h3>
        <p>Like any website, our hosting provider automatically processes technical data needed to deliver and protect the Website, such as your IP address, browser type, device type, the pages requested, the referring page and the date and time of the request. We use this data only for security, troubleshooting and keeping the Website running.</p>
        <h3>Information stored on your device</h3>
        <p>If you switch languages, the Website saves your choice (English or Spanish) in your browser's local storage under the name <code>esp-lang</code>. It contains no personal information, is not sent to us and you can delete it by clearing your browser data. We do not use cookies.</p>
        <h3>Interactive tools</h3>
        <p>The self-check, the example diagnostic and the savings calculator run entirely in your browser. What you enter in them is not sent to us or stored.</p>` },
      { id: "use", h: "2. How we use information", html: ul([
        "To answer your questions and schedule and hold your consultation.",
        "To provide, manage and follow up on the services you request.",
        "To keep records of our communications and our work.",
        "To protect the Website and our business, prevent fraud and abuse, and fix errors.",
        "To comply with the law, respond to lawful requests and enforce our agreements.",
      ]) + "<p>We do not make decisions about you based solely on automated processing that produce legal or similarly significant effects.</p>" },
      { id: "share", h: "3. How we share information", html: `<p>We share personal information only as needed for the purposes above:</p>` + ul([
        "<strong>Service providers</strong> that help us run the Website and our business, such as website hosting, email and messaging (including WhatsApp, operated by Meta), and business software. They may use the information only to provide their services to us.",
        "<strong>Third parties you ask us to work with</strong>, such as a government agency, bank or other provider, only with your direction or permission.",
        "<strong>Legal reasons</strong>: when required by law, subpoena or court order, or to protect the rights, safety and property of our clients, our business or others.",
        "<strong>Business transfers</strong>: in connection with a merger, sale or reorganization of our business, subject to this Policy.",
      ]) + `<p>We do <strong>not sell</strong> personal information, we do not <strong>share</strong> it for cross-context behavioral advertising, and we do not use it for <strong>targeted advertising</strong> or for profiling.</p>` },
      { id: "third", h: "4. Third-party services", html: `<p>The Website contains links to WhatsApp, Instagram and email. When you use them, the information you share is also handled by those companies under their own privacy policies (for example, <a href="https://www.whatsapp.com/legal/privacy-policy" rel="noopener" target="_blank">WhatsApp</a> and <a href="https://privacycenter.instagram.com/policy" rel="noopener" target="_blank">Instagram</a>). We are not responsible for their practices.</p><p>Our fonts and images are served from our own domain, so loading the Website does not send your information to font or image providers.</p>` },
      { id: "sms", h: "5. Phone calls, text and WhatsApp messages", html: `<p>We contact you only to answer requests you start. We do not send marketing text messages or make marketing calls using automated technology or prerecorded voices without your prior express written consent.</p><p>If we ever offer promotional messages, we will ask for your consent separately. Giving consent will never be a condition of buying any service, message and data rates may apply, and you can opt out at any time by replying <strong>STOP</strong> or by telling us. We do not share your mobile number or messaging consent with third parties for their own marketing.</p>` },
      { id: "retention", h: "6. How long we keep information", html: `<p>We keep personal information only as long as needed for the purposes described in this Policy: to answer you, to provide our services, and to meet legal, tax, accounting and recordkeeping obligations. When it is no longer needed, we delete it or make it anonymous. Technical logs are kept by our hosting provider for a limited time.</p>` },
      { id: "security", h: "7. Security", html: `<p>We use reasonable administrative, technical and physical safeguards to protect personal information, including encrypted connections (HTTPS) on the entire Website. No method of transmission or storage is completely secure, so we cannot guarantee absolute security. If a security breach affects your personal information, we will notify you and the authorities as required by law.</p>` },
      { id: "rights", h: "8. Your privacy rights", html: `<p>Depending on the state where you live (for example, California, New Jersey and other states with consumer privacy laws), you may have the right to:</p>` + ul([
        "Know whether we process your personal information and get a copy of it.",
        "Correct inaccurate personal information.",
        "Delete personal information you provided or that we hold about you.",
        "Opt out of the sale of personal information, targeted advertising and profiling (we do not do any of these).",
        "Not be discriminated against for exercising your rights.",
      ]) + `<p><strong>We offer these rights to every visitor in the United States</strong>, wherever you live. To make a request, email <a href="mailto:${C.privacyEmail}">${C.privacyEmail}</a> or message us at ${C.phoneDisplay}. We will verify your request using information we already have, and we will respond within 45 days (we may extend this once by another 45 days if necessary, and we will tell you why). You may use an authorized agent; we may ask for proof that the agent is authorized.</p><p>If we decline your request, you may appeal by replying with the word "Appeal". We will answer your appeal within 45 days. If you are not satisfied, you may contact your state Attorney General.</p>` },
      { id: "dnt", h: "9. Do Not Track and Global Privacy Control", html: `<p>We do not track visitors across websites, so the Website works the same way whether or not your browser sends a "Do Not Track" signal. If your browser sends a Global Privacy Control (GPC) signal, we treat it as a request to opt out of the sale or sharing of your personal information.</p>` },
      { id: "children", h: "10. Children", html: `<p>The Website and our services are intended for adults and businesses. They are not directed to children, and we do not knowingly collect personal information from anyone under 18. If you believe a minor has sent us personal information, contact us and we will delete it.</p>` },
      { id: "california", h: "11. Notice to California residents", html: `<p>In the last 12 months we have collected the categories of personal information described in Section 1 (identifiers and contact details, the content of your messages, and internet activity such as technical log data), from you and from your device, for the purposes described in Section 2. We disclosed them for business purposes only to the recipients described in Section 3. We have not sold or shared personal information, and we do not use or disclose sensitive personal information for purposes that would require offering a right to limit. Under California Civil Code Section 1798.83, California residents may also ask us about disclosures for direct marketing; we make none.</p>` },
      { id: "changes", h: "12. Changes to this Policy", html: `<p>We may update this Policy. The "Last updated" date at the top shows when it last changed. If the changes are significant, we will post a clear notice on the Website before they take effect.</p>` },
      { id: "contact", h: "13. Contact us", html: `<p>For questions or requests about this Policy or your personal information:</p>` + contact(C, "en", C.privacyEmail) },
    ],
  }),
  es: C => ({
    title: "Política de privacidad | Elite Solution Pro",
    desc: "Cómo Elite Solution Pro LLC recoge, usa y protege la información personal en elitesolutionpro.com, y los derechos de privacidad que tienes.",
    h1: "Política de privacidad",
    lead: `Esta Política de privacidad explica cómo ${who(C, "es")} ("Elite Solution Pro", "nosotros") trata la información personal cuando visitas www.elitesolutionpro.com (el "Sitio web") o te pones en contacto con nosotros. Recogemos la menor información posible y no la vendemos.`,
    sections: [
      { id: "resumen", h: "Resumen", html: ul([
        "El Sitio web <strong>no tiene analítica, ni píxeles publicitarios, ni cookies de seguimiento</strong>.",
        "El formulario de contacto <strong>no</strong> envía tus datos a nuestros servidores. Prepara un mensaje de WhatsApp en tu dispositivo y tú decides si lo envías.",
        "Usamos la información que nos envías solo para responderte y prestarte los servicios que pidas.",
        "<strong>No vendemos</strong> información personal ni la usamos para publicidad dirigida.",
        "Puedes pedirnos en cualquier momento acceder a tu información, corregirla o borrarla.",
      ]) },
      { id: "recogemos", h: "1. Información que recogemos", html: `
        <h3>Información que nos das</h3>
        <p>Cuando nos contactas por WhatsApp, teléfono, email o Instagram, o cuando envías el mensaje que prepara nuestro formulario, recibimos la información que decides compartir: por ejemplo tu nombre, teléfono, email, el servicio que te interesa, la etapa de tu negocio y el contenido de tu mensaje.</p>
        <p>No envíes números de Seguro Social, números de cuentas bancarias o tarjetas, contraseñas ni otra información sensible a través del Sitio web, WhatsApp o email. Si un servicio necesita documentos, te diremos cómo compartirlos de forma segura.</p>
        <h3>Información que se recoge automáticamente</h3>
        <p>Como en cualquier sitio web, nuestro proveedor de alojamiento procesa automáticamente datos técnicos necesarios para mostrar y proteger el Sitio web: tu dirección IP, tipo de navegador y dispositivo, las páginas solicitadas, la página de procedencia y la fecha y hora. Solo usamos estos datos para seguridad, resolver errores y mantener el Sitio web funcionando.</p>
        <h3>Información guardada en tu dispositivo</h3>
        <p>Si cambias de idioma, el Sitio web guarda tu elección (inglés o español) en el almacenamiento local de tu navegador con el nombre <code>esp-lang</code>. No contiene información personal, no se nos envía y puedes borrarla limpiando los datos de tu navegador. No usamos cookies.</p>
        <h3>Herramientas interactivas</h3>
        <p>El autodiagnóstico, el ejemplo de diagnóstico y la calculadora de ahorro funcionan solo en tu navegador. Lo que escribes en ellos no se nos envía ni se guarda.</p>` },
      { id: "uso", h: "2. Cómo usamos la información", html: ul([
        "Para responder tus preguntas y programar y realizar tu consulta.",
        "Para prestar, gestionar y dar seguimiento a los servicios que solicites.",
        "Para llevar un registro de nuestras comunicaciones y de nuestro trabajo.",
        "Para proteger el Sitio web y nuestro negocio, prevenir fraudes y abusos, y corregir errores.",
        "Para cumplir la ley, atender solicitudes legales y hacer cumplir nuestros acuerdos.",
      ]) + "<p>No tomamos decisiones sobre ti basadas únicamente en procesos automatizados que produzcan efectos legales o igualmente importantes.</p>" },
      { id: "compartimos", h: "3. Con quién compartimos la información", html: `<p>Solo compartimos información personal cuando es necesario para los fines anteriores:</p>` + ul([
        "<strong>Proveedores de servicios</strong> que nos ayudan a operar el Sitio web y el negocio, como alojamiento web, email y mensajería (incluido WhatsApp, operado por Meta) y programas de gestión. Solo pueden usar la información para prestarnos sus servicios.",
        "<strong>Terceros con los que nos pidas trabajar</strong>, como una agencia del gobierno, un banco u otro proveedor, solo siguiendo tus instrucciones o con tu permiso.",
        "<strong>Motivos legales</strong>: cuando lo exija la ley, una citación u orden judicial, o para proteger los derechos, la seguridad y la propiedad de nuestros clientes, de nuestro negocio o de otras personas.",
        "<strong>Transmisiones del negocio</strong>: en caso de fusión, venta o reorganización de nuestro negocio, siempre sujeto a esta Política.",
      ]) + `<p><strong>No vendemos</strong> información personal, no la <strong>compartimos</strong> para publicidad basada en tu actividad en otros sitios y no la usamos para <strong>publicidad dirigida</strong> ni para crear perfiles.</p>` },
      { id: "terceros", h: "4. Servicios de terceros", html: `<p>El Sitio web tiene enlaces a WhatsApp, Instagram y email. Cuando los usas, la información que compartes también la tratan esas empresas según sus propias políticas de privacidad (por ejemplo, <a href="https://www.whatsapp.com/legal/privacy-policy" rel="noopener" target="_blank">WhatsApp</a> e <a href="https://privacycenter.instagram.com/policy" rel="noopener" target="_blank">Instagram</a>). No somos responsables de sus prácticas.</p><p>Nuestras fuentes e imágenes se sirven desde nuestro propio dominio, así que cargar el Sitio web no envía tu información a proveedores de fuentes o imágenes.</p>` },
      { id: "mensajes", h: "5. Llamadas, SMS y mensajes de WhatsApp", html: `<p>Solo te contactamos para responder solicitudes que tú inicias. No enviamos SMS de marketing ni hacemos llamadas de marketing con sistemas automáticos o voces pregrabadas sin tu consentimiento previo, expreso y por escrito.</p><p>Si alguna vez ofrecemos mensajes promocionales, te pediremos el consentimiento por separado. Dar tu consentimiento nunca será una condición para contratar ningún servicio, pueden aplicarse tarifas de mensajes y datos, y puedes darte de baja cuando quieras respondiendo <strong>STOP</strong> o diciéndonoslo. No compartimos tu número de móvil ni tu consentimiento con terceros para su propio marketing.</p>` },
      { id: "conservacion", h: "6. Cuánto tiempo guardamos la información", html: `<p>Guardamos la información personal solo el tiempo necesario para los fines de esta Política: responderte, prestarte nuestros servicios y cumplir obligaciones legales, fiscales, contables y de registro. Cuando ya no es necesaria, la borramos o la hacemos anónima. Los registros técnicos los guarda nuestro proveedor de alojamiento durante un tiempo limitado.</p>` },
      { id: "seguridad", h: "7. Seguridad", html: `<p>Usamos medidas administrativas, técnicas y físicas razonables para proteger la información personal, incluida la conexión cifrada (HTTPS) en todo el Sitio web. Ningún método de transmisión o almacenamiento es completamente seguro, así que no podemos garantizar una seguridad absoluta. Si una brecha de seguridad afecta a tu información personal, te lo notificaremos a ti y a las autoridades según exija la ley.</p>` },
      { id: "derechos", h: "8. Tus derechos de privacidad", html: `<p>Según el estado donde vivas (por ejemplo California, New Jersey y otros estados con leyes de privacidad), puedes tener derecho a:</p>` + ul([
        "Saber si tratamos tu información personal y obtener una copia.",
        "Corregir información personal incorrecta.",
        "Borrar la información personal que nos diste o que tenemos sobre ti.",
        "Oponerte a la venta de información personal, a la publicidad dirigida y a la creación de perfiles (no hacemos nada de esto).",
        "No ser discriminado por ejercer tus derechos.",
      ]) + `<p><strong>Ofrecemos estos derechos a todos los visitantes de Estados Unidos</strong>, vivas donde vivas. Para hacer una solicitud, escribe a <a href="mailto:${C.privacyEmail}">${C.privacyEmail}</a> o envíanos un mensaje al ${C.phoneDisplay}. Verificaremos tu solicitud con información que ya tengamos y responderemos en un plazo de 45 días (podemos ampliarlo una vez otros 45 días si es necesario, explicándote el motivo). Puedes usar un agente autorizado; podemos pedir prueba de esa autorización.</p><p>Si rechazamos tu solicitud, puedes apelar respondiendo con la palabra "Apelación". Contestaremos tu apelación en un plazo de 45 días. Si no estás conforme, puedes contactar con el Fiscal General (Attorney General) de tu estado.</p>` },
      { id: "dnt", h: "9. Do Not Track y Global Privacy Control", html: `<p>No rastreamos a los visitantes entre sitios web, así que el Sitio web funciona igual aunque tu navegador envíe la señal "Do Not Track". Si tu navegador envía la señal Global Privacy Control (GPC), la tratamos como una solicitud para no vender ni compartir tu información personal.</p>` },
      { id: "menores", h: "10. Menores", html: `<p>El Sitio web y nuestros servicios están dirigidos a adultos y empresas. No están dirigidos a menores y no recogemos a sabiendas información personal de menores de 18 años. Si crees que un menor nos ha enviado información personal, contáctanos y la borraremos.</p>` },
      { id: "california", h: "11. Aviso para residentes de California", html: `<p>En los últimos 12 meses hemos recogido las categorías de información personal descritas en la Sección 1 (identificadores y datos de contacto, el contenido de tus mensajes y actividad en internet como los registros técnicos), de ti y de tu dispositivo, para los fines descritos en la Sección 2. Solo las hemos comunicado con fines empresariales a los destinatarios descritos en la Sección 3. No hemos vendido ni compartido información personal, y no usamos ni comunicamos información personal sensible para fines que obliguen a ofrecer el derecho a limitar su uso. Según la Sección 1798.83 del Código Civil de California, los residentes de California también pueden preguntarnos sobre comunicaciones para marketing directo; no hacemos ninguna.</p>` },
      { id: "cambios", h: "12. Cambios en esta Política", html: `<p>Podemos actualizar esta Política. La fecha de "Última actualización" al principio indica cuándo cambió por última vez. Si los cambios son importantes, publicaremos un aviso claro en el Sitio web antes de que entren en vigor.</p>` },
      { id: "contacto", h: "13. Contacto", html: `<p>Para preguntas o solicitudes sobre esta Política o tu información personal:</p>` + contact(C, "es", C.privacyEmail) + `<p>Esta traducción al español se ofrece para tu comodidad. Las versiones en inglés y en español tienen el mismo contenido; si hubiera alguna diferencia, prevalece la versión en inglés.</p>` },
    ],
  }),
};

/* ---------------------------------------------------------------- terms */

const terms = {
  slug: { en: "/terms", es: "/es/terminos" },
  en: C => ({
    title: "Terms and Conditions | Elite Solution Pro",
    desc: "Terms and conditions for using elitesolutionpro.com and the free consultation offered by Elite Solution Pro LLC, a business consulting firm.",
    h1: "Terms and Conditions",
    lead: `These Terms and Conditions ("Terms") govern your use of www.elitesolutionpro.com (the "Website") and our free consultation. The Website is operated by ${who(C, "en")} ("Elite Solution Pro", "we", "us"). By using the Website you agree to these Terms. If you do not agree, please do not use the Website.`,
    sections: [
      { id: "services", h: "1. Who we are and what we do", html: `<p>We are a business consulting firm. We help entrepreneurs and small businesses organize their structure, finances and processes, prepare for funding, and use automation and AI tools. Depending on the engagement, we may help you prepare and submit business filings with government agencies using the information and decisions you provide.</p>` },
      { id: "no-advice", h: "2. No legal, tax, accounting or investment advice", html: `<div class="legal-box"><p><strong>We are not a law firm, an accounting firm or a registered investment adviser.</strong> Our consultants are not acting as your attorneys, certified public accountants or financial advisers, and nothing on the Website or in our consultations is legal, tax, accounting or investment advice. Information on the Website is general and educational and may not fit your situation. For legal, tax or accounting decisions, consult a licensed professional.</p></div>` },
      { id: "no-lender", h: "3. We are not a lender, broker or credit repair company", html: `<p>We do not lend money, we are not a bank, a loan broker or a credit repair organization, and we do not promise to improve anyone's credit report or credit score. Funding decisions are made only by lenders and other third parties. <strong>No one can guarantee that you will be approved for financing</strong>, and we do not.</p>` },
      { id: "referrals", h: "4. Third-party providers and referrals", html: `<p>We may suggest banks, lenders, software or other providers. You decide whether to work with them, and your relationship with them is governed by their own terms. We are not responsible for their products, services, decisions or fees. If we ever receive any compensation from a third party in connection with a referral, we will tell you before you decide to work with that third party.</p>` },
      { id: "consultation", h: "5. Free consultation", html: `<p>The first consultation is free and carries no obligation to buy anything. In it we review your situation and explain your options. Scheduling depends on availability. A free consultation does not create a client relationship or an agreement to provide paid services.</p>` },
      { id: "paid", h: "6. Paid services", html: `<p>Paid services are provided only under a separate written proposal or agreement that describes the scope of work, fees, payment terms, timing and cancellation and refund terms. If that agreement conflicts with these Terms, that agreement controls for those services. Government filing fees and third-party costs are separate unless the agreement says otherwise.</p>` },
      { id: "tools", h: "7. Website tools and examples", html: `<p>The self-check, the example diagnostic, the readiness gauges and the savings calculator are <strong>illustrative only</strong>. Their percentages and amounts are not an evaluation of your business, a promise of results or a professional opinion. Actual results depend on many factors and vary by business.</p>` },
      { id: "testimonials", h: "8. Testimonials", html: `<p>Testimonials on the Website reflect the individual experiences of clients. They are not a guarantee or prediction of the results you will get, and results vary by business.${C.testimonialsVerified ? " We do not pay for testimonials, and we publish them with the client's permission." : ""}</p>` },
      { id: "use", h: "9. Acceptable use", html: `<p>You agree to use the Website lawfully and to give us truthful information. You may not:</p>` + ul([
        "Use the Website to break any law or to infringe anyone's rights.",
        "Try to gain unauthorized access to the Website or its systems, or disrupt them.",
        "Copy, scrape or reuse the content of the Website for commercial purposes without our written permission.",
        "Send spam, malware or misleading information through our contact channels.",
      ]) },
      { id: "ip", h: "10. Intellectual property", html: `<p>The Website's text, design, logo, graphics and code belong to Elite Solution Pro or its licensors and are protected by U.S. copyright and trademark laws. Photographs are used under license. You may view and print pages for your personal, non-commercial use. All other uses require our written permission. "Elite Solution Pro" and our logo are our trademarks.</p>` },
      { id: "links", h: "11. Links and third-party services", html: `<p>The Website links to services we do not control, such as WhatsApp and Instagram. Your use of them is governed by their own terms and privacy policies, and we are not responsible for their content or practices.</p>` },
      { id: "warranty", h: "12. Disclaimer of warranties", html: `<p class="caps">The Website and its content are provided "as is" and "as available". To the extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose and non-infringement. We do not warrant that the Website will be uninterrupted, error-free or free of harmful components, or that its information is complete or current.</p>` },
      { id: "liability", h: "13. Limitation of liability", html: `<p class="caps">To the extent permitted by law, Elite Solution Pro and its members, employees and contractors will not be liable for any indirect, incidental, special, consequential or punitive damages, or for lost profits, revenue or data, arising from your use of the Website or the free consultation. Our total liability for any claim relating to the Website or the free consultation will not exceed one hundred U.S. dollars ($100).</p><p>These limitations do not apply to liability for our fraud, gross negligence or willful misconduct, and they do not apply to paid services, which are governed by their own written agreement.</p>` },
      { id: "indemnity", h: "14. Indemnification", html: `<p>If you misuse the Website or violate these Terms, and that causes a claim against us by a third party, you agree to cover the reasonable losses and costs (including reasonable attorneys' fees) that result from your misuse or violation.</p>` },
      { id: "nj", h: "15. Notice to New Jersey residents and consumer rights", html: `<p>Nothing in these Terms limits any right you have under the New Jersey Consumer Fraud Act, the New Jersey Truth-in-Consumer Contract, Warranty and Notice Act, or any other consumer protection law that cannot be waived. If you are a New Jersey resident, Sections 12, 13 and 14 apply only to the extent New Jersey law allows; in particular, they do not limit our liability for our own negligence where New Jersey law does not allow that limitation, and they do not limit any recovery of punitive damages, attorneys' fees or costs that New Jersey law gives you.</p>` },
      { id: "law", h: "16. Governing law and disputes", html: `<p>These Terms are governed by the laws of the State of New Jersey, without regard to its conflict-of-laws rules. If a dispute arises, please contact us first so we can try to solve it informally. If it is not resolved, it will be decided by the state courts located in Passaic County, New Jersey, or the United States District Court for the District of New Jersey, unless the law of your state of residence gives you the right to bring the claim where you live.</p>` },
      { id: "changes", h: "17. Changes to these Terms", html: `<p>We may update these Terms. The "Last updated" date at the top shows when they last changed. Changes apply from the moment they are posted and do not affect disputes that arose before the change.</p>` },
      { id: "general", h: "18. General", html: `<p>If any part of these Terms is found unenforceable, the rest remains in effect. Our failure to enforce a provision is not a waiver. These Terms, together with our <a href="/privacy">Privacy Policy</a>, are the entire agreement between you and us about the Website. A Spanish translation is provided for convenience; both versions are intended to say the same thing.</p>` },
      { id: "contact", h: "19. Contact", html: contact(C, "en") },
    ],
  }),
  es: C => ({
    title: "Términos y condiciones | Elite Solution Pro",
    desc: "Términos y condiciones de uso de elitesolutionpro.com y de la consulta gratis de Elite Solution Pro LLC, firma de consultoría empresarial.",
    h1: "Términos y condiciones",
    lead: `Estos Términos y condiciones ("Términos") regulan el uso de www.elitesolutionpro.com (el "Sitio web") y de nuestra consulta gratis. El Sitio web lo opera ${who(C, "es")} ("Elite Solution Pro", "nosotros"). Al usar el Sitio web aceptas estos Términos. Si no estás de acuerdo, no uses el Sitio web.`,
    sections: [
      { id: "servicios", h: "1. Quiénes somos y qué hacemos", html: `<p>Somos una firma de consultoría empresarial. Ayudamos a emprendedores y pequeños negocios a organizar su estructura, sus finanzas y sus procesos, a prepararse para conseguir financiamiento y a usar herramientas de automatización e IA. Según el servicio contratado, podemos ayudarte a preparar y presentar trámites de tu empresa ante agencias del gobierno con la información y las decisiones que tú nos des.</p>` },
      { id: "sin-asesoria", h: "2. No damos asesoría legal, fiscal, contable ni de inversión", html: `<div class="legal-box"><p><strong>No somos un despacho de abogados, ni una firma de contadores, ni asesores de inversión registrados.</strong> Nuestros consultores no actúan como tus abogados, contadores públicos (CPA) ni asesores financieros, y nada en el Sitio web ni en nuestras consultas es asesoría legal, fiscal, contable ni de inversión. La información del Sitio web es general y educativa y puede no ajustarse a tu situación. Para decisiones legales, fiscales o contables, consulta a un profesional con licencia.</p></div>` },
      { id: "no-prestamos", h: "3. No somos prestamistas, brókers ni reparadores de crédito", html: `<p>No prestamos dinero, no somos un banco, ni un bróker de préstamos, ni una empresa de reparación de crédito, y no prometemos mejorar el reporte ni la puntuación de crédito de nadie. Las decisiones de financiamiento las toman únicamente los prestamistas y otros terceros. <strong>Nadie puede garantizar que te aprueben un financiamiento</strong>, y nosotros tampoco.</p>` },
      { id: "referencias", h: "4. Proveedores externos y recomendaciones", html: `<p>Podemos sugerirte bancos, prestamistas, programas u otros proveedores. Tú decides si trabajas con ellos, y tu relación con ellos se rige por sus propios términos. No somos responsables de sus productos, servicios, decisiones ni tarifas. Si alguna vez recibimos una compensación de un tercero relacionada con una recomendación, te lo diremos antes de que decidas trabajar con ese tercero.</p>` },
      { id: "consulta", h: "5. Consulta gratis", html: `<p>La primera consulta es gratis y no te obliga a comprar nada. En ella revisamos tu situación y te explicamos tus opciones. La fecha depende de la disponibilidad. Una consulta gratis no crea una relación de cliente ni un acuerdo para prestar servicios de pago.</p>` },
      { id: "pago", h: "6. Servicios de pago", html: `<p>Los servicios de pago solo se prestan con una propuesta o un acuerdo por escrito aparte que describa el trabajo, las tarifas, la forma de pago, los plazos y las condiciones de cancelación y reembolso. Si ese acuerdo contradice estos Términos, para esos servicios manda el acuerdo. Las tasas del gobierno y los costos de terceros se pagan aparte salvo que el acuerdo diga otra cosa.</p>` },
      { id: "herramientas", h: "7. Herramientas y ejemplos del Sitio web", html: `<p>El autodiagnóstico, el ejemplo de diagnóstico, los indicadores de preparación y la calculadora de ahorro son <strong>solo ilustrativos</strong>. Sus porcentajes y cantidades no son una evaluación de tu negocio, ni una promesa de resultados, ni una opinión profesional. Los resultados reales dependen de muchos factores y varían según cada negocio.</p>` },
      { id: "testimonios", h: "8. Testimonios", html: `<p>Los testimonios del Sitio web reflejan experiencias individuales de clientes. No son una garantía ni una predicción de los resultados que obtendrás, y los resultados varían según cada negocio.${C.testimonialsVerified ? " No pagamos por testimonios y los publicamos con el permiso del cliente." : ""}</p>` },
      { id: "uso", h: "9. Uso aceptable", html: `<p>Te comprometes a usar el Sitio web de forma legal y a darnos información verdadera. No puedes:</p>` + ul([
        "Usar el Sitio web para incumplir la ley o los derechos de otras personas.",
        "Intentar acceder sin autorización al Sitio web o a sus sistemas, o interrumpirlos.",
        "Copiar, extraer o reutilizar el contenido del Sitio web con fines comerciales sin nuestro permiso por escrito.",
        "Enviar spam, software malicioso o información engañosa por nuestros canales de contacto.",
      ]) },
      { id: "propiedad", h: "10. Propiedad intelectual", html: `<p>Los textos, el diseño, el logo, los gráficos y el código del Sitio web pertenecen a Elite Solution Pro o a sus licenciantes y están protegidos por las leyes de derechos de autor y marcas de Estados Unidos. Las fotografías se usan con licencia. Puedes ver e imprimir páginas para tu uso personal y no comercial. Cualquier otro uso necesita nuestro permiso por escrito. "Elite Solution Pro" y nuestro logo son marcas nuestras.</p>` },
      { id: "enlaces", h: "11. Enlaces y servicios de terceros", html: `<p>El Sitio web enlaza a servicios que no controlamos, como WhatsApp e Instagram. Su uso se rige por sus propios términos y políticas de privacidad, y no somos responsables de su contenido ni de sus prácticas.</p>` },
      { id: "garantias", h: "12. Exclusión de garantías", html: `<p class="caps">El Sitio web y su contenido se ofrecen "tal cual" y "según disponibilidad". En la medida que permita la ley, excluimos toda garantía, expresa o implícita, incluidas las de comerciabilidad, idoneidad para un fin concreto y no infracción. No garantizamos que el Sitio web funcione sin interrupciones, sin errores o sin componentes dañinos, ni que su información esté completa o actualizada.</p>` },
      { id: "responsabilidad", h: "13. Limitación de responsabilidad", html: `<p class="caps">En la medida que permita la ley, Elite Solution Pro y sus miembros, empleados y colaboradores no serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de pérdida de beneficios, ingresos o datos, derivados del uso del Sitio web o de la consulta gratis. Nuestra responsabilidad total por cualquier reclamación relacionada con el Sitio web o la consulta gratis no superará cien dólares estadounidenses (100 $).</p><p>Estas limitaciones no se aplican a la responsabilidad por fraude, negligencia grave o conducta intencionada por nuestra parte, ni a los servicios de pago, que se rigen por su propio acuerdo por escrito.</p>` },
      { id: "indemnizacion", h: "14. Indemnización", html: `<p>Si haces un mal uso del Sitio web o incumples estos Términos y eso provoca una reclamación de un tercero contra nosotros, te comprometes a cubrir las pérdidas y los costos razonables (incluidos honorarios razonables de abogados) que resulten de ese mal uso o incumplimiento.</p>` },
      { id: "nj", h: "15. Aviso para residentes de New Jersey y derechos del consumidor", html: `<p>Nada en estos Términos limita los derechos que tengas según la Ley de Fraude al Consumidor de New Jersey (New Jersey Consumer Fraud Act), la ley New Jersey Truth-in-Consumer Contract, Warranty and Notice Act o cualquier otra ley de protección del consumidor que no se pueda renunciar. Si resides en New Jersey, las Secciones 12, 13 y 14 solo se aplican en la medida que lo permita la ley de New Jersey; en particular, no limitan nuestra responsabilidad por nuestra propia negligencia cuando la ley de New Jersey no permita esa limitación, ni limitan la indemnización por daños punitivos, honorarios de abogados o costos que te conceda la ley de New Jersey.</p>` },
      { id: "ley", h: "16. Ley aplicable y disputas", html: `<p>Estos Términos se rigen por las leyes del Estado de New Jersey, sin aplicar sus normas sobre conflicto de leyes. Si surge una disputa, contáctanos primero para intentar resolverla de forma amistosa. Si no se resuelve, la decidirán los tribunales estatales del condado de Passaic, New Jersey, o el Tribunal de Distrito de Estados Unidos para el Distrito de New Jersey, salvo que la ley de tu estado de residencia te dé derecho a presentar la reclamación donde vives.</p>` },
      { id: "cambios", h: "17. Cambios en estos Términos", html: `<p>Podemos actualizar estos Términos. La fecha de "Última actualización" al principio indica cuándo cambiaron por última vez. Los cambios se aplican desde que se publican y no afectan a disputas surgidas antes del cambio.</p>` },
      { id: "general", h: "18. Disposiciones generales", html: `<p>Si alguna parte de estos Términos no fuera aplicable, el resto sigue vigente. Que no exijamos el cumplimiento de una cláusula no significa que renunciemos a ella. Estos Términos, junto con nuestra <a href="/es/privacidad">Política de privacidad</a>, son el acuerdo completo entre tú y nosotros sobre el Sitio web. Esta traducción al español se ofrece para tu comodidad; las dos versiones tienen el mismo contenido.</p>` },
      { id: "contacto", h: "19. Contacto", html: contact(C, "es") },
    ],
  }),
};

/* ---------------------------------------------------------------- accessibility */

const accessibility = {
  slug: { en: "/accessibility", es: "/es/accesibilidad" },
  en: C => ({
    title: "Accessibility Statement | Elite Solution Pro",
    desc: "Elite Solution Pro's commitment to an accessible website for everyone, the measures we take and how to report a barrier or ask for help.",
    h1: "Accessibility Statement",
    lead: `${C.brand} wants everyone, including people with disabilities, to be able to use our website and contact us easily.`,
    sections: [
      { id: "standard", h: "Our goal", html: `<p>We aim to conform to the <a href="https://www.w3.org/TR/WCAG22/" rel="noopener" target="_blank">Web Content Accessibility Guidelines (WCAG) 2.2, level AA</a>, published by the World Wide Web Consortium. These guidelines explain how to make web content more accessible to people with visual, hearing, motor and cognitive disabilities.</p>` },
      { id: "measures", h: "What we do", html: ul([
        "Clear page structure with headings, landmarks and a \"Skip to content\" link.",
        "The whole website can be used with a keyboard, with a visible focus indicator.",
        "Text and controls with sufficient color contrast.",
        "Form fields with visible labels and error messages announced to screen readers.",
        "Animations are turned off when your device asks for reduced motion.",
        "The full website is available in English and Spanish.",
        "No time limits, and no content that flashes.",
        "We review the website when we make changes and test it with automated tools and by hand.",
      ]) },
      { id: "limits", h: "Known limitations", html: `<p>Some parts of the experience depend on third-party services, such as WhatsApp and Instagram, whose accessibility we do not control. If any part of our website does not work for you, we will give you the same information or service in another way, for example by phone or email.</p>` },
      { id: "feedback", h: "Feedback and help", html: `<p>If you find a barrier on our website or need information in a different format, please tell us. Include the page and a short description of the problem, and we will do our best to fix it and respond within 5 business days.</p>` + contact(C, "en") },
      { id: "date", h: "About this statement", html: `<p>This statement was last reviewed on ${fmtDate(C.legalUpdated, "en")}. We will keep improving the accessibility of our website.</p>` },
    ],
  }),
  es: C => ({
    title: "Declaración de accesibilidad | Elite Solution Pro",
    desc: "El compromiso de Elite Solution Pro con un sitio web accesible para todos, las medidas que tomamos y cómo avisarnos de una barrera o pedir ayuda.",
    h1: "Declaración de accesibilidad",
    lead: `En ${C.brand} queremos que todas las personas, incluidas las personas con discapacidad, puedan usar nuestro sitio web y contactarnos fácilmente.`,
    sections: [
      { id: "estandar", h: "Nuestro objetivo", html: `<p>Buscamos cumplir las <a href="https://www.w3.org/TR/WCAG22/" rel="noopener" target="_blank">Pautas de Accesibilidad al Contenido Web (WCAG) 2.2, nivel AA</a>, publicadas por el World Wide Web Consortium. Estas pautas explican cómo hacer el contenido web más accesible para personas con discapacidad visual, auditiva, motora y cognitiva.</p>` },
      { id: "medidas", h: "Qué hacemos", html: ul([
        "Estructura clara con encabezados, regiones y un enlace \"Saltar al contenido\".",
        "Todo el sitio se puede usar con el teclado, con un indicador de foco visible.",
        "Textos y controles con suficiente contraste de color.",
        "Campos de formulario con etiquetas visibles y mensajes de error que leen los lectores de pantalla.",
        "Las animaciones se desactivan cuando tu dispositivo pide reducir el movimiento.",
        "Todo el sitio está disponible en español e inglés.",
        "Sin límites de tiempo y sin contenido que parpadee.",
        "Revisamos el sitio cuando hacemos cambios y lo probamos con herramientas automáticas y a mano.",
      ]) },
      { id: "limitaciones", h: "Limitaciones conocidas", html: `<p>Algunas partes de la experiencia dependen de servicios de terceros, como WhatsApp e Instagram, cuya accesibilidad no controlamos. Si alguna parte de nuestro sitio no te funciona, te daremos la misma información o el mismo servicio de otra forma, por ejemplo por teléfono o email.</p>` },
      { id: "ayuda", h: "Comentarios y ayuda", html: `<p>Si encuentras una barrera en nuestro sitio o necesitas la información en otro formato, avísanos. Indica la página y una breve descripción del problema; haremos lo posible por arreglarlo y responderte en un plazo de 5 días hábiles.</p>` + contact(C, "es") },
      { id: "fecha", h: "Sobre esta declaración", html: `<p>Esta declaración se revisó por última vez el ${fmtDate(C.legalUpdated, "es")}. Seguiremos mejorando la accesibilidad de nuestro sitio web.</p>` },
    ],
  }),
};

export const LEGAL_PAGES = [privacy, terms, accessibility];
export { fmtDate };
