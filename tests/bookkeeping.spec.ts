import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { findForbidden } from "../src/lib/forbidden.ts";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(
    page.locator("#bookkeeping"),
    "Bookkeeping section exists",
  ).toHaveCount(1);
});

test("bookkeeping sits after accounting and tells the receipt story", async ({
  page,
}) => {
  const section = page.locator("#bookkeeping");
  await expect(
    page.locator("#services + #accounting + #bookkeeping + #offer"),
  ).toHaveCount(1);
  await expect(section.getByText("AI bookkeeping", { exact: true })).toBeVisible();
  await expect(section.getByRole("heading", { level: 2 })).toHaveText(
    "A stack of receipts, sorted into sheets the accountant reviews.",
  );
  await expect(section).toContainText(
    "The client or the accountant sends them in a chat.",
  );
  await expect(section).toContainText("one sheet for VAT, one sheet for non-VAT");
  await expect(section).toContainText("firm's OneDrive");
  await expect(section).toContainText("asks instead of guessing");
  await expect(section).toContainText(
    "A human accountant reviews the sheets and stays in control of the books.",
  );
  await expect(section.getByRole("img")).toHaveCount(2);
  const names = await section.getByRole("img").evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("aria-label") ?? ""),
  );
  for (const name of names) expect(name.trim().length).toBeGreaterThan(19);
  await expect(section).toContainText("Harborline Trading");
  await expect(section).toContainText("000-000-000-000");
  await expect(section).toContainText("₱2,240.00");
  await expect(section).toContainText("North Pier Courier");
  await expect(section).toContainText(
    "The next photo is cut off at the total. What amount should I enter?",
  );
  await expect(section.locator("img")).toHaveCount(0);
});

test("bookkeeping links reach accounting, the agent setup step, and a preselected inquiry", async ({
  page,
}) => {
  const section = page.locator("#bookkeeping");
  const accounting = section.getByRole("link", {
    name: "Accounting services",
    exact: true,
  });
  await expect(accounting).toHaveAttribute("href", "#accounting");
  await accounting.click();
  await expect(page).toHaveURL(/#accounting$/);
  await expect(page.locator("#accounting")).toBeInViewport();

  const agent = section.getByRole("link", {
    name: "How an AI agent is set up",
    exact: true,
  });
  await expect(agent).toHaveAttribute("href", "#offer-step-04");
  await agent.click();
  await expect(page).toHaveURL(/#offer-step-04$/);
  await expect(page.locator("#offer-step-04")).toBeInViewport();

  const cta = section.getByRole("link", {
    name: "Ask about bookkeeping",
    exact: true,
  });
  await expect(cta).toHaveAttribute("href", "#contact");
  const interest = page.getByLabel("Where could we help?");
  await cta.click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(interest).toHaveValue("Accounting services");

  await page.goto("/");
  await interest.selectOption("Website");
  await cta.focus();
  await page.keyboard.press("Enter");
  await expect(interest).toHaveValue("Accounting services");
});

test("bookkeeping copy has no invented claims or forbidden names and passes axe", async ({
  page,
}) => {
  const section = page.locator("#bookkeeping");
  const text = await section.innerText();
  expect(text).not.toMatch(
    /\d+\s*%|testimonial|certified|accredited|\bCPA\b|accuracy|hours saved/i,
  );
  expect(findForbidden(text)).toEqual([]);
  const result = await new AxeBuilder({ page })
    .include("#bookkeeping")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});

test("bookkeeping reflows from 320px to 1920px and at doubled text with usable links", async ({
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
      for (const link of await page.locator("#bookkeeping a").all()) {
        const box = await link.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(44);
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      }
    }
  }
});
