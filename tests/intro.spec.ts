import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const introKey = "ridgewell:map-intro";

async function heroCopyOpacity(page: Page) {
  return page
    .locator(".hero-copy > *")
    .evaluateAll((elements) =>
      elements.map((el) => Number(getComputedStyle(el).opacity)),
    );
}

test.describe("desktop", () => {
  test.skip(({ isMobile }) => isMobile, "the intro is desktop only");

  test("a first visit plays the map intro, then the hero and backdrop settle", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-intro", "playing");
    expect(Math.max(...(await heroCopyOpacity(page)))).toBeLessThan(1);
    await expect(page.locator("html")).toHaveAttribute("data-intro", "done", {
      timeout: 8000,
    });
    expect(await heroCopyOpacity(page)).toEqual([1, 1, 1, 1]);
    await expect(page.locator(".site-header")).toHaveCSS("opacity", "1");
    const cards = page.locator(".hero-map-fan");
    expect(await cards.count()).toBeGreaterThan(5);
    for (const opacity of await cards.evaluateAll((els) =>
      els.map((el) => getComputedStyle(el).opacity),
    )) {
      expect(opacity).toBe("0.4");
    }
    expect(
      await page.evaluate((key) => localStorage.getItem(key), introKey),
    ).not.toBeNull();
    expect(errors).toEqual([]);
  });

  test("a second visit within two hours skips the intro", async ({ page }) => {
    await page.addInitScript(
      (key) => localStorage.setItem(key, String(Date.now())),
      introKey,
    );
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveAttribute("data-intro", /.+/);
    await expect(page.locator(".hero-map")).toBeVisible();
    await expect(page.locator("h1")).toHaveCSS("opacity", "1");
  });

  test("reduced motion shows the settled backdrop and never plays the intro", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator(".hero-map")).toBeVisible();
    await expect(page.locator(".hero-map-fan").first()).toHaveCSS(
      "opacity",
      "0.4",
    );
    await expect(page.locator("html")).not.toHaveAttribute("data-intro", /.+/);
    expect(await heroCopyOpacity(page)).toEqual([1, 1, 1, 1]);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.waitForTimeout(300);
    await expect(page.locator("html")).not.toHaveAttribute("data-intro", /.+/);
  });

  test("a click plays the rest of the intro quickly", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-intro", "playing");
    const clicked = Date.now();
    await page.mouse.click(20, 400);
    await expect(page.locator("html")).toHaveAttribute("data-intro", "done", {
      timeout: 3000,
    });
    expect(Date.now() - clicked).toBeLessThan(2000);
    expect(await heroCopyOpacity(page)).toEqual([1, 1, 1, 1]);
  });

  test("a deep link lands on its section without the intro", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/#contact");
    await expect(page.locator("#contact .contact-panel")).toBeInViewport();
    await expect(page.locator("html")).not.toHaveAttribute("data-intro", /.+/);
  });

  test("the backdrop is decoration only", async ({ page }) => {
    const map = page.locator(".hero-map");
    await expect(map).toHaveAttribute("aria-hidden", "true");
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
      "Websites and bespoke systems, built to be used every day.",
    );
    expect(
      await page.locator("#home").evaluate((el) => {
        const map = el.querySelector(".hero-map");
        return map ? getComputedStyle(map).pointerEvents : "missing";
      }),
    ).toBe("none");
  });
});

test("mobile shows no backdrop and no intro", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".hero-map")).toBeHidden();
  await expect(page.locator("html")).not.toHaveAttribute("data-intro", /.+/);
  await expect(page.locator("h1")).toHaveCSS("opacity", "1");
});
