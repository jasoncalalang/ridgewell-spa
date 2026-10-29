import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { findForbidden } from "../src/lib/forbidden.ts";

const titles = [
  "Business registration and permits",
  "Bookkeeping and books of accounts",
  "BIR tax compliance",
  "Payroll and government contributions",
  "Financial statements",
  "Year-end inventory list",
  "Retainer packages",
];

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(
    page.locator("#accounting"),
    "Accounting section exists",
  ).toHaveCount(1);
});

test("accounting sits between What we do and Ways to work with label, heading, intro and seven items in order", async ({
  page,
}) => {
  const section = page.locator("#accounting");
  await expect(page.locator("#services + #accounting + #offer")).toHaveCount(1);
  await expect(
    section.getByText("Accounting services", { exact: true }).first(),
  ).toBeVisible();
  await expect(section.getByRole("heading", { level: 2 })).toHaveText(
    "Accounting is where Ridgewell started, and it is still core to our work.",
  );
  await expect(section).toContainText(
    "Ridgewell started in accounting in 2004 and is based in Obando, Bulacan. Alongside websites and systems, we handle the day-to-day accounting and compliance work for Philippine businesses, from registration to year-end.",
  );
  const items = section.locator("ul.accounting-items > li");
  await expect(items).toHaveCount(7);
  await expect(items.getByRole("heading", { level: 3 })).toHaveText(titles);
  for (const item of await items.all())
    expect((await item.locator("p").innerText()).trim().length).toBeGreaterThan(
      20,
    );
  await expect(items.nth(0)).toContainText("Form 2303");
  await expect(items.nth(3)).toContainText("SSS, PhilHealth and Pag-IBIG");
});

test("the CTA goes to contact and preselects Accounting services, by click and keyboard", async ({
  page,
}) => {
  const cta = page
    .locator("#accounting")
    .getByRole("link", { name: "Ask about accounting services", exact: true });
  await expect(cta).toHaveCount(1);
  await expect(cta).toHaveAttribute("href", "#contact");
  const interest = page.getByLabel("Where could we help?");
  await expect(
    interest.getByRole("option", { name: "Accounting services" }),
  ).toHaveCount(1);
  await cta.click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(interest).toHaveValue("Accounting services");
  await expect(page.locator("#contact")).toBeInViewport();

  await page.goto("/");
  await interest.selectOption("Website");
  await cta.focus();
  await page.keyboard.press("Enter");
  await expect(interest).toHaveValue("Accounting services");
});

test("the Accounting nav link reaches the section on desktop and mobile", async ({
  page,
  isMobile,
}) => {
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  const navigation = page.getByRole("navigation", {
    name: isMobile ? "Mobile navigation" : "Main navigation",
  });
  const link = navigation.getByRole("link", {
    name: "Accounting",
    exact: true,
  });
  await expect(link).toHaveAttribute("href", "#accounting");
  await link.click();
  await expect(page).toHaveURL(/#accounting$/);
  await expect(page.locator("#accounting h2")).toBeInViewport();
});

test("accounting copy has no prices, forbidden names or accreditation claims and passes axe", async ({
  page,
}) => {
  const section = page.locator("#accounting");
  const text = await section.innerText();
  expect(text).not.toMatch(
    /\p{Sc}|\b(?:PHP|USD|pesos?|per\s+(?:month|year)|discounts?|CPA|certified|accredited)\b|\b\d{1,3}(?:,\d{3})+\b/iu,
  );
  expect(findForbidden(text)).toEqual([]);
  const result = await new AxeBuilder({ page })
    .include("#accounting")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});

test("accounting reflows from 320px to 1920px and at doubled text with usable links", async ({
  page,
}) => {
  for (const textSize of ["100%", "200%"]) {
    await page.evaluate((size) => {
      document.documentElement.style.fontSize = size;
    }, textSize);
    for (const width of [320, 390, 640, 960, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `no horizontal overflow at ${width}px with ${textSize} text`,
      ).toBe(true);
      for (const link of await page.locator("#accounting a").all()) {
        const box = await link.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(44);
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      }
    }
  }
});
