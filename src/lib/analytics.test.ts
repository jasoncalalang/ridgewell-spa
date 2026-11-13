import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  isProductionAnalyticsHost,
  measurementId,
  productionHosts,
  track,
} from "./analytics.ts";

const indexHtml = readFileSync(
  fileURLToPath(new URL("../../index.html", import.meta.url)),
  "utf8",
);

test("analytics loads only on the public production hostnames", () => {
  assert.equal(measurementId, "G-2HL3GMPLYM");
  assert.deepEqual([...productionHosts], [
    "www.ridgewell.com.ph",
    "ridgewell.com.ph",
  ]);
  for (const host of productionHosts) assert.equal(isProductionAnalyticsHost(host), true);
  for (const host of [
    "localhost",
    "127.0.0.1",
    "preview.ridgewell-spa.pages.dev",
    "www.ridgewell.com.ph.evil.example",
    "",
  ]) {
    assert.equal(isProductionAnalyticsHost(host), false, host);
  }
});

test("the head snippet is the async gtag loader and does not send page or scroll events", () => {
  assert.match(indexHtml, new RegExp(measurementId));
  for (const host of productionHosts) {
    assert.match(indexHtml, new RegExp(host.replace(/\./g, "\\.")));
  }
  assert.match(indexHtml, /script\.async\s*=\s*true/);
  assert.match(indexHtml, /googletagmanager\.com\/gtag\/js/);
  assert.doesNotMatch(
    indexHtml,
    /<script[^>]+src=["']https:\/\/www\.googletagmanager\.com\/gtag\/js/,
  );
  assert.doesNotMatch(indexHtml, /gtag\(\s*["']event["']\s*,\s*["']page_view["']/);
  assert.doesNotMatch(indexHtml, /gtag\(\s*["']event["']\s*,\s*["']scroll["']/);
});

test("custom events go to gtag without personal data and are ignored when gtag is absent", () => {
  const calls: unknown[][] = [];
  const previous = globalThis.window;
  Object.assign(globalThis, {
    window: {
      gtag: (...args: unknown[]) => {
        calls.push(args);
      },
    },
  });
  try {
    track("contact_email_click");
    track("contact_phone_click");
    track("generate_lead", { method: "inquiry" });
    track("generate_lead", { email: "visitor@example.com" });
    track("contact_email_click", { href: "mailto:visitor@example.com?body=Hello" });
    assert.deepEqual(calls, [
      ["event", "contact_email_click", undefined],
      ["event", "contact_phone_click", undefined],
      ["event", "generate_lead", { method: "inquiry" }],
    ]);
  } finally {
    if (previous === undefined) {
      delete (globalThis as { window?: unknown }).window;
    } else {
      Object.assign(globalThis, { window: previous });
    }
  }

  assert.doesNotThrow(() => track("generate_lead", { method: "inquiry" }));
});
