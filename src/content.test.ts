import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { findForbidden } from "./lib/forbidden.ts";
import {
  about,
  accounting,
  approach,
  caseStudies,
  clientWork,
  companyEmail,
  contact,
  footerLocation,
  hero,
  offer,
  productWork,
  proof,
  questions,
  serviceOptions,
  services,
} from "./content.ts";

const everything = JSON.stringify({
  hero,
  proof,
  services,
  accounting,
  offer,
  clientWork,
  productWork,
  caseStudies,
  approach,
  about,
  questions,
  contact,
});

test("forbidden words with regex metacharacters match only literally", () => {
  assert.deepEqual(findForbidden("runs on Node.js"), ["Node.js"]);
  assert.deepEqual(findForbidden("Nodexjs"), []);
});

test("page copy names no technology, client, building or form code", () => {
  assert.deepEqual(findForbidden(everything), []);
});

test("drawn screens name no technology, client, building or form code", () => {
  const dir = fileURLToPath(new URL("./components/screens/", import.meta.url));
  for (const file of readdirSync(dir)) {
    const source = readFileSync(new URL(file, `file://${dir}`), "utf8");
    assert.deepEqual(findForbidden(source), [], file);
  }
});

test("there are two services and seven case studies with unique anchors", () => {
  assert.equal(services.length, 2);
  assert.equal(caseStudies.length, 7);
  const ids = caseStudies.map((c) => c.id);
  assert.equal(new Set(ids).size, 7);
  assert.deepEqual(
    caseStudies.map((c) => c.index),
    ["01", "02", "03", "04", "05", "06", "07"],
  );
  assert.equal(caseStudies.filter((c) => c.group === "client").length, 5);
  assert.equal(caseStudies.filter((c) => c.group === "product").length, 2);
});

test("every service preselects a real interest option", () => {
  for (const service of services)
    assert.ok(serviceOptions.includes(service.interest), service.id);
  assert.deepEqual(
    [...serviceOptions],
    ["Website", "Bespoke system", "Accounting services", "Not sure yet"],
  );
});

test("the LeaseTrack live-demo link stays off until verified", () => {
  const leasetrack = caseStudies.find((c) => c.id === "leasetrack");
  assert.ok(leasetrack);
  assert.equal(leasetrack.link, undefined);
});

test("the contact address is info@ridgewell.com.ph", () => {
  assert.equal(companyEmail, "info@ridgewell.com.ph");
  assert.equal(hero.lead.length <= 220, true);
});

test("the offer has five ordered steps and three assessment tiers", () => {
  assert.ok(offer);
  assert.equal(offer.label, "Ways to work");
  assert.equal(offer.heading, "From a first call to a working system.");
  assert.equal(offer.steps.length, 5);
  assert.deepEqual(
    offer.steps.map((step) => step.index),
    ["01", "02", "03", "04", "05"],
  );
  assert.deepEqual(
    offer.steps.map((step) => step.title),
    [
      "Discovery call",
      "Assessment",
      "Adoption program",
      "Fixed-scope build and deployment",
      "Parallel Run",
    ],
  );
  const assessment = offer.steps.find((step) => step.title === "Assessment");
  assert.ok(assessment?.tiers);
  assert.equal(assessment.tiers.length, 3);
  assert.deepEqual(
    assessment.tiers.map((tier) => tier.title),
    [
      "Small school or office",
      "Mid-size school or business",
      "Multi-campus school or multi-branch group",
    ],
  );
});

test("discovery is free, about twenty minutes, and every offer CTA reaches contact", () => {
  assert.match(offer.steps[0].tag, /free, about 20 minutes/i);
  assert.ok(offer.steps[0].cta);
  const ctas = [
    offer.cta,
    ...offer.steps.flatMap((step) => (step.cta ? [step.cta] : [])),
  ];
  assert.equal(ctas.length, 2);
  for (const cta of ctas) {
    assert.equal(cta.label, "Request a discovery call");
    assert.equal(cta.href, "#contact");
    assert.equal(cta.interest, "Not sure yet");
  }
});

test("the separate privacy panel names the Data Privacy Act and its support boundary", () => {
  assert.equal(offer.privacy.label, "Across every step");
  assert.equal(offer.privacy.heading, "Privacy and security are built in.");
  assert.match(
    offer.privacy.text,
    /Data Privacy Act of 2012 \(Republic Act No\. 10173\)/,
  );
  assert.equal(offer.privacy.items.length, 4);
  assert.equal(
    offer.privacy.note,
    "We support your compliance work. We do not replace your Data Protection Officer or legal counsel.",
  );
});

test("offer copy has no forbidden names, prices, or unapproved numerals", () => {
  const copy = JSON.stringify(offer);
  assert.deepEqual(findForbidden(copy), []);
  assert.doesNotMatch(
    copy,
    /\p{Sc}|\b(?:PHP|USD|pesos?|per\s+month|per\s+year|discount\w*)\b|\d{1,3}(?:,\d{3})+/iu,
  );
  const allowed = new Set([
    "01",
    "02",
    "03",
    "04",
    "05",
    "20",
    "90",
    "10173",
    "2012",
  ]);
  assert.deepEqual(
    (copy.match(/\d+/g) ?? []).filter((number) => !allowed.has(number)),
    [],
  );
});

test("the accounting section has the approved label, heading, intro and seven ordered items", () => {
  assert.ok(accounting);
  assert.equal(accounting.id, "accounting");
  assert.equal(accounting.label, "Accounting services");
  assert.equal(
    accounting.heading,
    "Accounting is where Ridgewell started, and it is still core to our work.",
  );
  assert.equal(
    accounting.intro,
    "Ridgewell started in accounting in 2004 and is based in Obando, Bulacan. Alongside websites and systems, we handle the day-to-day accounting and compliance work for Philippine businesses, from registration to year-end.",
  );
  assert.deepEqual(
    accounting.items.map((item) => item.title),
    [
      "Business registration and permits",
      "Bookkeeping and books of accounts",
      "BIR tax compliance",
      "Payroll and government contributions",
      "Financial statements",
      "Year-end inventory list",
      "Retainer packages",
    ],
  );
  for (const item of accounting.items) assert.ok(item.text.length > 20, item.title);
  assert.match(accounting.items[0].text, /Form 2303/);
  assert.match(accounting.items[3].text, /SSS, PhilHealth and Pag-IBIG/);
});

test("the accounting year matches the 2004 already published in the about copy", () => {
  assert.match(about.paragraphs[0], /started in accounting in 2004/);
  assert.match(accounting.intro, /started in accounting in 2004/);
});

test("the accounting CTA reaches contact with the Accounting services interest", () => {
  assert.equal(accounting.cta.label, "Ask about accounting services");
  assert.equal(accounting.cta.href, "#contact");
  assert.equal(accounting.cta.interest, "Accounting services");
  assert.ok(serviceOptions.includes(accounting.cta.interest));
});

test("accounting copy has no forbidden names, prices, accreditation claims or unapproved numerals", () => {
  const copy = JSON.stringify(accounting);
  assert.deepEqual(findForbidden(copy), []);
  assert.doesNotMatch(
    copy,
    /\p{Sc}|\b(?:PHP|USD|pesos?|per\s+(?:month|year)|discount\w*|fees?|rates?|CPA|certified|accredited|licensed|guarantee\w*)\b|\d{1,3}(?:,\d{3})+/iu,
  );
  assert.deepEqual(
    (copy.match(/\d+/g) ?? []).filter((number) => !["2004", "2303"].includes(number)),
    [],
  );
});

const indexHtml = readFileSync(
  fileURLToPath(new URL("../index.html", import.meta.url)),
  "utf8",
);
const siteUrl = "https://www.ridgewell.com.ph/";
const imageUrl = "https://www.ridgewell.com.ph/brand/ridgewell-logo.jpg";
const expectedTitle = "Ridgewell RMSI | Accounting and IT Consulting in Obando";
const expectedDescription =
  "Accounting services in Obando, Bulacan from Ridgewell Management Services, Inc. (RMSI), plus IT consulting, AI agents, websites and bespoke systems.";

function metaContent(attribute: "name" | "property", key: string) {
  const tag = indexHtml
    .match(/<meta\b[^>]*>/gs)
    ?.find((candidate) =>
      new RegExp(`${attribute}\\s*=\\s*"${key.replace(/[.:]/g, "\\$&")}"`).test(candidate),
    );
  return tag?.match(/content\s*=\s*"([^"]*)"/s)?.[1];
}

function jsonLd() {
  const match = indexHtml.match(
    /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/,
  );
  assert.ok(match, "index.html has a JSON-LD script");
  return JSON.parse(match[1]);
}

test("the title and meta description carry the Obando keywords within search limits", () => {
  const title = indexHtml.match(/<title>([^<]*)<\/title>/)?.[1];
  assert.equal(title, expectedTitle);
  assert.ok(title.length <= 60, `title is ${title.length} characters`);
  const description = metaContent("name", "description");
  assert.equal(description, expectedDescription);
  assert.ok(description.length <= 160, `description is ${description.length}`);
  assert.deepEqual(findForbidden(`${title} ${description}`), []);
  for (const word of ["Obando", "RMSI", "IT Consulting", "Accounting"])
    assert.match(title, new RegExp(word, "i"));
  assert.ok(title.indexOf("Accounting") < title.indexOf("IT Consulting"));
  assert.match(description, /^Accounting services in Obando, Bulacan/);
  assert.ok(description.indexOf("IT consulting") > description.indexOf("Accounting"));
  assert.ok(description.indexOf("AI agents") > description.indexOf("IT consulting"));
});

test("Open Graph, Twitter and geo tags are present and consistent", () => {
  assert.match(indexHtml, /<html lang="en"/);
  assert.equal(metaContent("property", "og:type"), "website");
  assert.equal(metaContent("property", "og:title"), expectedTitle);
  assert.equal(metaContent("property", "og:description"), expectedDescription);
  assert.equal(
    metaContent("property", "og:site_name"),
    "Ridgewell Management Services, Inc.",
  );
  assert.equal(metaContent("property", "og:locale"), "en_PH");
  assert.equal(metaContent("name", "twitter:card"), "summary");
  assert.equal(metaContent("name", "twitter:title"), expectedTitle);
  assert.equal(metaContent("name", "twitter:description"), expectedDescription);
  assert.equal(metaContent("name", "geo.region"), "PH-BUL");
  assert.equal(metaContent("name", "geo.placename"), "Obando, Bulacan");
});

test("canonical, og:url and og:image use the confirmed www domain", () => {
  const canonicals = [
    ...indexHtml.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/g),
  ].map((match) => match[1]);
  assert.deepEqual(canonicals, [siteUrl]);
  assert.equal(metaContent("property", "og:url"), siteUrl);
  assert.equal(metaContent("property", "og:image"), imageUrl);
  assert.equal(metaContent("name", "twitter:image"), imageUrl);
  assert.equal(metaContent("property", "og:image:width"), "1186");
  assert.equal(metaContent("property", "og:image:height"), "280");
  assert.equal(
    metaContent("property", "og:image:alt"),
    "Ridgewell Management Services, Inc. logo",
  );
  // The image is an existing repo asset, not a new file.
  assert.ok(
    existsSync(fileURLToPath(new URL("../public/brand/ridgewell-logo.jpg", import.meta.url))),
  );
});

test("sitemap.xml lists only the www URL and robots.txt points to it", () => {
  const sitemap = readFileSync(
    fileURLToPath(new URL("../public/sitemap.xml", import.meta.url)),
    "utf8",
  );
  assert.match(sitemap, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.deepEqual([...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]), [siteUrl]);
  const robots = readFileSync(
    fileURLToPath(new URL("../public/robots.txt", import.meta.url)),
    "utf8",
  );
  assert.match(robots, /^Sitemap: https:\/\/www\.ridgewell\.com\.ph\/sitemap\.xml$/m);
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
});

test("JSON-LD describes the business with sourced facts only", () => {
  const data = jsonLd();
  assert.equal(data["@context"], "https://schema.org");
  const types = [data["@type"]].flat();
  assert.deepEqual(types, ["AccountingService", "ProfessionalService"]);
  assert.equal(data.url, siteUrl);
  assert.equal(data.description, expectedDescription);
  assert.equal(data.name, "Ridgewell Management Services, Inc.");
  assert.deepEqual(data.alternateName, ["RMSI", "Ridgewell"]);
  assert.deepEqual(data.address, {
    "@type": "PostalAddress",
    addressLocality: "Obando",
    addressRegion: "Bulacan",
    addressCountry: "PH",
  });
  const areas = [data.areaServed].flat();
  assert.equal(areas[0]["@type"], "AdministrativeArea");
  assert.equal(areas[0].name, "Obando, Bulacan, Philippines");
  assert.deepEqual(data.serviceType, [
    "Accounting services",
    "IT consulting",
    "AI agent setup",
    "Website design",
    "Bespoke system development",
  ]);
  assert.deepEqual(
    data.makesOffer.map((offer: any) => offer.itemOffered.serviceType),
    data.serviceType,
  );
  // Sourced from the repo: the published email and the Contact hours.
  assert.equal(data.email, companyEmail);
  assert.deepEqual(data.openingHoursSpecification, [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ]);
  assert.equal(contact.hours, "Mon to Fri, 9am to 6pm Manila");
  // Not in the repo, so never present.
  for (const key of ["telephone", "faxNumber", "image", "logo", "sameAs", "foundingDate", "priceRange", "aggregateRating", "review"])
    assert.equal(key in data, false, `${key} must not be invented`);
  const text = JSON.stringify(data);
  assert.deepEqual(findForbidden(text), []);
  assert.doesNotMatch(text, /\p{Sc}|\bCPA\b|certified|accredited|licensed|\+63/iu);
  assert.equal(JSON.stringify(data).includes('"price"'), false);
});

test("visible copy mentions Obando, Bulacan in the hero lead and accounting intro", () => {
  assert.equal(
    hero.lead,
    "Based in Obando, Bulacan, Ridgewell designs websites and builds internal systems for Philippine schools, property managers and small businesses. We started in accounting, so the books and the workflow come first.",
  );
  assert.match(accounting.intro, /based in Obando, Bulacan/);
  assert.equal(footerLocation, "Based in Obando, Bulacan, Philippines");
});
