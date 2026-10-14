import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { findForbidden } from "./lib/forbidden.ts";
import {
  about,
  approach,
  caseStudies,
  clientWork,
  companyEmail,
  contact,
  hero,
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
    ["Website", "Bespoke system", "Not sure yet"],
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
