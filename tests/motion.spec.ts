import { expect, test } from "@playwright/test";

test("hero stage and cards settle once, with no runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const stage = page.locator(".hero-stage");
  await expect
    .poll(() => stage.evaluate((el) => (el as HTMLElement).style.transform))
    .not.toBe("");
  await expect
    .poll(() => stage.evaluate((el) => (el as HTMLElement).style.transform))
    .toBe("");
  const card = page.locator("#work-registrar");
  await card.scrollIntoViewIfNeeded();
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).opacity))
    .toBe("1");
  await expect
    .poll(() => card.evaluate((el) => (el as HTMLElement).style.transform))
    .toBe("");
  expect(errors).toEqual([]);
});

test("reduced motion renders the final state, including a live preference change", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const states = await page
    .locator("[data-reveal], h1, h2")
    .evaluateAll((elements) =>
      elements.map((el) => [
        (el as HTMLElement).style.transform,
        (el as HTMLElement).style.opacity,
        getComputedStyle(el).opacity,
      ]),
    );
  expect(states.length).toBeGreaterThan(10);
  for (const [transform, inlineOpacity, opacity] of states) {
    expect(transform).toBe("");
    expect(inlineOpacity).toBe("");
    expect(opacity).toBe("1");
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const stage = page.locator(".hero-stage");
  await expect
    .poll(() => stage.evaluate((el) => (el as HTMLElement).style.transform))
    .not.toBe("");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() => stage.evaluate((el) => (el as HTMLElement).style.transform))
    .toBe("");
  await expect
    .poll(() =>
      page.locator("h1").evaluate((el) => (el as HTMLElement).style.transform),
    )
    .toBe("");
});

test("deep link under reduced motion shows every card fully", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#contact");
  await page.evaluate(() => document.fonts.ready);
  const hidden = await page
    .locator("[data-reveal]")
    .evaluateAll((elements) =>
      elements
        .filter((el) => getComputedStyle(el).opacity !== "1")
        .map((el) => el.id || el.className),
    );
  expect(hidden).toEqual([]);
  await expect(page.locator("#contact .contact-panel")).toBeInViewport();
});

test("a deep link jumps straight to its section instead of animating from the top", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const log: number[] = [];
    (window as Window & { scrollLog?: number[] }).scrollLog = log;
    addEventListener("scroll", () => log.push(scrollY), { passive: true });
  });
  await page.goto("/#approach");
  await expect(page.locator("#approach")).toBeInViewport();
  const log = await page.evaluate(
    () => (window as Window & { scrollLog?: number[] }).scrollLog ?? [],
  );
  const landed = await page.evaluate(() => scrollY);
  expect(landed).toBeGreaterThan(1000);
  // A smooth scroll reports many small steps up from the top; an instant
  // jump reports the destination in its first scroll event.
  expect(log[0], JSON.stringify(log)).toBeGreaterThan(landed - 100);
});
