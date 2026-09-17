import { expect, test } from "@playwright/test";

test("vector routes draw, settle, and survive rapid service changes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const route = page
    .locator(".operations-illustration [data-routes] > path")
    .first();
  await expect
    .poll(() =>
      route.evaluate((el) =>
        parseFloat((el as SVGElement).style.strokeDashoffset),
      ),
    )
    .toBeGreaterThan(0);
  await expect
    .poll(() =>
      route.evaluate((el) => (el as SVGElement).style.strokeDashoffset),
    )
    .toBe("");
  await page.locator(".foundation-illustration").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".foundation-illustration [data-route]")
        .evaluate((el) => (el as SVGElement).style.strokeDashoffset),
    )
    .toBe("");
  const tabs = page.getByRole("tab");
  for (const index of [1, 3, 2, 0, 3]) await tabs.nth(index).click();
  await page.locator(".service-illustration").scrollIntoViewIfNeeded();
  await expect(page.getByRole("tabpanel")).toHaveAttribute(
    "aria-labelledby",
    "service-tab-3",
  );
  await expect
    .poll(() =>
      page
        .locator(".service-illustration > g")
        .evaluate((el) => getComputedStyle(el).opacity),
    )
    .toBe("1");
  expect(errors).toEqual([]);
});

test("reduced motion restores static artwork, including a live preference change", async ({
  page,
}) => {
  await page.goto("/");
  const route = page
    .locator(".operations-illustration [data-routes] > path")
    .first();
  await expect
    .poll(() =>
      route.evaluate((el) => (el as SVGElement).style.strokeDashoffset),
    )
    .toBe("");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect
    .poll(() =>
      route.evaluate((el) =>
        parseFloat((el as SVGElement).style.strokeDashoffset),
      ),
    )
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      route.evaluate((el) => (el as SVGElement).style.strokeDashoffset),
    )
    .toBe("");
  await expect
    .poll(() => page.locator("h1").evaluate((el) => el.style.transform))
    .toBe("");
  await page.getByRole("tab").nth(2).click();
  await expect
    .poll(() =>
      page
        .locator(".service-illustration > g")
        .evaluate((el) => getComputedStyle(el).opacity),
    )
    .toBe("1");
});
