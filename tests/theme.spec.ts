import { expect, test } from "@playwright/test";

test.use({ colorScheme: "dark" });

const white = "rgb(255, 255, 255)";
const ink = "rgb(23, 28, 34)";

test("the page stays on the white theme when the system prefers dark", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('head meta[name="color-scheme"]')).toHaveAttribute(
    "content",
    "light",
  );
  await expect(page.locator('head meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#ffffff",
  );
  await expect(page.locator("body")).toHaveCSS("background-color", white);
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
  await expect(page.locator("body")).toHaveCSS("color", ink);
  const field = page.locator(".field input").first();
  await expect(field).toHaveCSS("background-color", white);
  await expect(field).toHaveCSS("color", ink);
  await expect(field).toHaveCSS("color-scheme", "light");
  const select = page.locator(".field select");
  await expect(select).toHaveCSS("background-color", white);
  await expect(select).toHaveCSS("color", ink);
  const darkened = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);
    return {
      scheme: root.colorScheme,
      background: body.backgroundColor,
    };
  });
  expect(darkened).toEqual({ scheme: "light", background: white });
});
