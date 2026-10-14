import { expect, test } from "@playwright/test";
import { findForbidden } from "../src/lib/forbidden.ts";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("seven case studies render with anchors, index numerals and accessible screens", async ({
  page,
}) => {
  const ids = [
    "work-portal",
    "work-staff",
    "work-registrar",
    "work-hr",
    "work-college",
    "work-leasetrack",
    "work-ledger",
  ];
  for (const id of ids) {
    const card = page.locator(`#${id}`);
    await expect(card).toHaveCount(1);
    await expect(card.getByRole("heading", { level: 3 })).toBeVisible();
    await expect(card.getByRole("img")).toHaveAccessibleName(/.{20,}/);
  }
  await expect(page.locator(".work-copy .changed strong")).toHaveCount(5);
  const screens = page.getByRole("img");
  const names = await screens.evaluateAll((els) =>
    els.map((el) => el.getAttribute("aria-label") ?? el.getAttribute("alt")),
  );
  expect(names.filter((name) => !name || name.length < 20)).toEqual([]);
});

test("the rendered page contains no technology, client, building or form-code names", async ({
  page,
}) => {
  const text = await page.evaluate(
    () => document.documentElement.innerText + " " + document.title,
  );
  expect(findForbidden(text)).toEqual([]);
  const attributes = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[aria-label], [alt], [title]"))
      .map(
        (el) =>
          `${el.getAttribute("aria-label") ?? ""} ${el.getAttribute("alt") ?? ""} ${el.getAttribute("title") ?? ""}`,
      )
      .join(" "),
  );
  expect(findForbidden(attributes)).toEqual([]);
  await expect(page.locator('a[href*="leasetrack.ridgewell" i]')).toHaveCount(
    0,
  );
});

test("footer links reach the work anchors", async ({ page }) => {
  for (const id of ["work-portal", "work-leasetrack", "work-ledger"]) {
    const link = page.locator(`.footer-links a[href="#${id}"]`);
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test("desktop composition: 2x2 grid, filled frames, phone clear of the expiring panel", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "desktop composition only");
  const boxes = await Promise.all(
    ["work-staff", "work-registrar", "work-hr", "work-college"].map((id) =>
      page.locator(`#${id}`).boundingBox(),
    ),
  );
  expect(boxes[0]!.y).toBeCloseTo(boxes[1]!.y, 0);
  expect(boxes[2]!.y).toBeCloseTo(boxes[3]!.y, 0);
  expect(boxes[2]!.y).toBeGreaterThan(boxes[0]!.y + 200);
  // Each drawn screen must reach (or overflow) the bottom of its 16:10 frame:
  // the distance from the last drawn element to the frame's bottom edge is
  // at most 48px. Overflow is clipped by the frame and is fine.
  const gaps = await page
    .locator(".work-card .frame-body-aspect")
    .evaluateAll((bodies) =>
      bodies.map((body) => {
        const screen = body.querySelector(".scr");
        const last = screen?.lastElementChild;
        if (!last) return Number.POSITIVE_INFINITY;
        return (
          body.getBoundingClientRect().bottom -
          last.getBoundingClientRect().bottom
        );
      }),
    );
  expect(gaps).toHaveLength(4);
  for (const gap of gaps) expect(gap).toBeLessThanOrEqual(48);
  const phone = await page.locator(".hero-phone").boundingBox();
  const panel = await page.locator(".units-expiring").boundingBox();
  expect(phone).not.toBeNull();
  expect(panel).not.toBeNull();
  const overlaps =
    phone!.x < panel!.x + panel!.width &&
    phone!.x + phone!.width > panel!.x &&
    phone!.y < panel!.y + panel!.height &&
    phone!.y + phone!.height > panel!.y;
  expect(overlaps).toBe(false);
});

test("mobile composition hides the phone and keeps the hero screen inside the viewport", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile composition only");
  await expect(page.locator(".hero-phone")).toBeHidden();
  const frame = await page.locator(".hero-frame").boundingBox();
  expect(frame!.x).toBeGreaterThanOrEqual(0);
  expect(frame!.x + frame!.width).toBeLessThanOrEqual(
    (await page.viewportSize())!.width + 1,
  );
});

test("drawn screens stay clipped at 200% text on narrow viewports", async ({
  page,
}) => {
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `no horizontal scroll at ${width}px with 200% text`,
    ).toBe(true);
    const overflowing = await page
      .locator(".frame-body-aspect")
      .evaluateAll(
        (bodies) =>
          bodies.filter((body) => getComputedStyle(body).overflow !== "hidden")
            .length,
      );
    expect(overflowing).toBe(0);
    // Card copy must start below its frame, never underneath it.
    const copyUnderFrame = await page
      .locator(".work-featured, .work-card")
      .evaluateAll((cards) =>
        cards
          .filter((card) => {
            const frame = card.querySelector(".work-screen");
            const copy = card.querySelector(".work-copy");
            if (!frame || !copy) return true;
            return (
              copy.getBoundingClientRect().top <
              frame.getBoundingClientRect().bottom - 1
            );
          })
          .map((card) => card.id),
      );
    expect(copyUnderFrame, `card copy under its frame at ${width}px`).toEqual(
      [],
    );
  }
});
