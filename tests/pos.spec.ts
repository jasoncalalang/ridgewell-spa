import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { findForbidden } from "../src/lib/forbidden.ts";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("the POS section sits after IT services and describes the counter", async ({
  page,
}) => {
  await expect(page.locator("#services + #pos + #accounting")).toHaveCount(1);
  const section = page.locator("#pos");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText(
    "Ring the sale, and the books move with it.",
  );
  await expect(section).toContainText("in Obando");
  await expect(section).toContainText("VAT split");
  await expect(section).toContainText("written into the books");
  await expect(section).toContainText("Z-reading");
  await expect(section).toContainText("percentage tax");
  await expect(section).toContainText("Bottled water");
  await expect(section).toContainText("₱170.00");
  await expect(section.getByRole("img")).toHaveAttribute(
    "aria-label",
    /fictional/i,
  );
  const text = await section.innerText();
  expect(text).not.toMatch(/accredited|certified|testimonial/i);
  expect(findForbidden(text)).toEqual([]);
});

test("asking about the POS system selects that inquiry", async ({ page }) => {
  await page.goto("/#pos");
  await expect(page.locator("#pos h2")).toBeInViewport();
  const cta = page
    .locator("#pos")
    .getByRole("link", { name: "Ask about the POS system", exact: true });
  await expect(cta).toHaveAttribute("href", "#contact");
  await cta.click();
  await expect(page.getByLabel("Where could we help?")).toHaveValue("POS system");
});

test("the POS section passes axe and does not overflow", async ({ page }) => {
  const result = await new AxeBuilder({ page })
    .include("#pos")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  for (const width of [320, 390, 960, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});
