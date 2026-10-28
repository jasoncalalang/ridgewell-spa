import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
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
    "Ridgewell started in accounting in 2004. Alongside websites and systems, we handle the day-to-day accounting and compliance work for Philippine businesses, from registration to year-end.",
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
