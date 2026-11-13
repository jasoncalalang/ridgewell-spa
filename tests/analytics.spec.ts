import { expect, test } from "@playwright/test";

const measurementId = "G-2HL3GMPLYM";
const notice =
  "This site uses Google Analytics to understand visits, as described in Google's partner-sites policy.";

async function recordedEvents(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const events = (window as unknown as { __events?: unknown[][] }).__events ?? [];
    return events.map((entry) => JSON.stringify(entry));
  });
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const target = window as unknown as {
      __events: unknown[][];
      gtag: (...args: unknown[]) => void;
    };
    target.__events = [];
    target.gtag = (...args: unknown[]) => {
      target.__events.push(args);
    };
  });
});

test("gtag.js is not requested on localhost", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (/google(tagmanager|-analytics)\.com/i.test(request.url()))
      requests.push(request.url());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('script[src*="googletagmanager.com"]')).toHaveCount(0);
  expect(requests).toEqual([]);
});

test("gtag.js loads on the production host and stays off preview hosts", async ({
  page,
}) => {
  const gtagRequests: string[] = [];
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === "www.googletagmanager.com") {
      gtagRequests.push(url.toString());
      await route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: "/* gtag stub */",
      });
      return;
    }
    if (
      url.hostname === "www.ridgewell.com.ph" ||
      url.hostname === "ridgewell.com.ph" ||
      url.hostname.endsWith(".pages.dev")
    ) {
      const response = await route.fetch({
        url: `http://127.0.0.1:4173${url.pathname}${url.search}`,
      });
      await route.fulfill({ response });
      return;
    }
    await route.continue();
  });

  await page.goto("https://preview.ridgewell-spa.pages.dev/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(gtagRequests).toEqual([]);

  await page.goto("https://www.ridgewell.com.ph/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(gtagRequests).toEqual([
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`,
  ]);
});

test("the footer states the analytics use and links to Google's policy", async ({
  page,
}) => {
  await page.goto("/");
  const note = page.locator(".footer-analytics");
  await expect(note).toHaveText(notice);
  await expect(note.getByRole("link")).toHaveAttribute(
    "href",
    "https://policies.google.com/technologies/partner-sites",
  );
});

test("mailto, tel, and a completed inquiry record lead events without personal data", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    const link = document.createElement("a");
    link.id = "tel-probe";
    link.href = "tel:+6320000000";
    link.textContent = "Call the office";
    document.body.appendChild(link);
  });

  await page.getByRole("link", { name: "Email Ridgewell directly" }).click();
  await page.locator("#tel-probe").click();
  await page.getByRole("link", { name: "Start a project" }).first().click();
  await page.getByRole("button", { name: "Prepare your inquiry" }).click();
  expect(await recordedEvents(page)).toEqual([
    JSON.stringify(["event", "contact_email_click", null]),
    JSON.stringify(["event", "contact_phone_click", null]),
  ]);

  await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
  await page.getByLabel("Email address", { exact: true }).fill("visitor@example.com");
  await page.getByLabel("Business or organization").fill("Example & Co");
  await page
    .getByLabel("What would you like to work better?")
    .fill("We need a clearer way to track recurring requests.");
  await page.getByRole("button", { name: "Prepare your inquiry" }).click();
  await expect(page.getByRole("heading", { name: "Your conversation starts here." })).toBeVisible();

  const events = await recordedEvents(page);
  expect(events.at(-1)).toBe(
    JSON.stringify(["event", "generate_lead", { method: "inquiry" }]),
  );
  const serialized = events.join("\n");
  expect(serialized).not.toContain("visitor@example.com");
  expect(serialized).not.toContain("Test Visitor");
  expect(serialized).not.toContain("tel:+6320000000");
  expect(serialized).not.toContain("page_view");
  expect(serialized).not.toContain("scroll");
});
