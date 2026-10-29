import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const title = "Ridgewell RMSI | IT Consulting, AI and Accounting in Obando";
const description =
  "Ridgewell Management Services, Inc. (RMSI) in Obando, Bulacan. IT consulting, AI agents, accounting, websites and bespoke systems for Philippine businesses.";

const meta = (page: import("@playwright/test").Page, selector: string) =>
  page.locator(`head meta[${selector}]`).getAttribute("content");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("title and meta description are the approved Obando copy within limits", async ({
  page,
}) => {
  await expect(page).toHaveTitle(title);
  expect(title.length).toBeLessThanOrEqual(60);
  expect(await meta(page, 'name="description"')).toBe(description);
  expect(description.length).toBeLessThanOrEqual(160);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("Open Graph, Twitter and geo tags are present", async ({ page }) => {
  expect(await meta(page, 'property="og:type"')).toBe("website");
  expect(await meta(page, 'property="og:title"')).toBe(title);
  expect(await meta(page, 'property="og:description"')).toBe(description);
  expect(await meta(page, 'property="og:site_name"')).toBe(
    "Ridgewell Management Services, Inc.",
  );
  expect(await meta(page, 'property="og:locale"')).toBe("en_PH");
  expect(await meta(page, 'name="twitter:card"')).toBe("summary");
  expect(await meta(page, 'name="twitter:title"')).toBe(title);
  expect(await meta(page, 'name="twitter:description"')).toBe(description);
  expect(await meta(page, 'name="geo.region"')).toBe("PH-BUL");
  expect(await meta(page, 'name="geo.placename"')).toBe("Obando, Bulacan");
  // No production domain is configured, so no relative canonical, url or image.
  const urls = await page
    .locator(
      'head link[rel="canonical"], head meta[property="og:url"], head meta[property="og:image"]',
    )
    .evaluateAll((elements) =>
      elements.map(
        (el) => el.getAttribute("href") ?? el.getAttribute("content") ?? "",
      ),
    );
  for (const url of urls) expect(url).toMatch(/^https:\/\//);
});

test("JSON-LD parses and describes the business", async ({ page }) => {
  const raw = await page
    .locator('head script[type="application/ld+json"]')
    .textContent();
  const data = JSON.parse(raw!);
  expect([data["@type"]].flat()).toEqual(
    expect.arrayContaining(["ProfessionalService", "AccountingService"]),
  );
  expect(data.name).toBe("Ridgewell Management Services, Inc.");
  expect(data.alternateName).toEqual(["RMSI", "Ridgewell"]);
  expect(data.areaServed[0].name).toBe("Obando, Bulacan, Philippines");
  expect(data.address.addressLocality).toBe("Obando");
  expect(data.serviceType).toContain("IT consulting");
  expect(data.serviceType).toContain("Accounting services");
  expect(data.telephone).toBeUndefined();
});

test("robots.txt is served and allows crawling", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toMatch(/User-agent: \*/);
  expect(body).toMatch(/Allow: \//);
  expect(body).not.toMatch(/Disallow: \/\s*$/m);
});

test("Obando, Bulacan is visible in the hero, accounting intro and footer", async ({
  page,
}) => {
  await expect(page.locator("#home .lead")).toContainText("Obando, Bulacan");
  await expect(page.locator("#accounting .section-intro")).toContainText(
    "based in Obando, Bulacan",
  );
  await expect(page.locator(".site-footer")).toContainText(
    "Based in Obando, Bulacan, Philippines",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Websites and bespoke systems, built to be used every day.",
  );
});

test("every image has meaningful alt text and no image is left without a name", async ({
  page,
}) => {
  await page.evaluate(() =>
    document.querySelectorAll("img[loading=lazy]").forEach((img) => {
      (img as HTMLImageElement).loading = "eager";
    }),
  );
  const images = await page.locator("img").evaluateAll((elements) =>
    elements.map((el) => ({
      alt: el.getAttribute("alt"),
      decorative:
        el.getAttribute("role") === "presentation" ||
        el.getAttribute("aria-hidden") === "true",
    })),
  );
  expect(images.length).toBeGreaterThan(0);
  for (const image of images) {
    expect(image.alt).not.toBeNull();
    if (!image.decorative) expect(image.alt!.trim().length).toBeGreaterThan(5);
  }
  const roleImages = await page
    .locator('[role="img"]')
    .evaluateAll((elements) =>
      elements.map((el) => el.getAttribute("aria-label") ?? ""),
    );
  for (const name of roleImages) expect(name.trim().length).toBeGreaterThan(19);
});

test("the page still passes axe and has no horizontal overflow from 320px", async ({
  page,
}) => {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  for (const width of [320, 390, 960, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `no overflow at ${width}px`,
    ).toBe(true);
  }
});
