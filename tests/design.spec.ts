import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const white = "rgb(255, 255, 255)";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("the page and its main and nested surfaces have white backgrounds", async ({
  page,
}) => {
  for (const selector of [
    "body",
    ".site-header",
    "main > section",
    ".site-footer",
    ".card",
    ".frame",
    ".frame-chrome",
    ".frame-address",
    ".phone-screen",
    ".scr-sidebar .is-active",
    ".is-vacant",
    ".scr-wire i",
    ".field input, .field select, .field textarea",
  ]) {
    const surfaces = page.locator(selector);
    expect(await surfaces.count(), `${selector} exists`).toBeGreaterThan(0);
    const nonWhite = await surfaces.evaluateAll(
      (elements, expected) =>
        elements
          .map((element) => ({
            element: element.id || element.className || element.tagName,
            background: getComputedStyle(element).backgroundColor,
          }))
          .filter(({ background }) => background !== expected),
      white,
    );
    expect.soft(nonWhite, `${selector} backgrounds`).toEqual([]);
  }
});

async function expectNoCreamSurfaces(page: Page) {
  const creamSurfaces = await page.evaluate(() => {
    const oldColors = [
      "rgb(246, 244, 239)", // page
      "rgb(239, 236, 229)", // products band
      "rgb(241, 239, 233)", // browser chrome and wireframe
      "rgb(227, 223, 214)", // outer rules
      "rgb(232, 229, 223)", // receipt and wireframe fills
      "rgb(213, 208, 198)", // browser dots
      "rgb(163, 157, 146)", // scrollbar thumb
    ];
    return Array.from(document.querySelectorAll("*")).flatMap((element) =>
      [null, "::before", "::after"].flatMap((pseudo) => {
        const style = getComputedStyle(element, pseudo);
        const colors = [
          style.backgroundColor,
          style.backgroundImage,
          style.scrollbarColor,
          style.borderTopColor,
          style.borderRightColor,
          style.borderBottomColor,
          style.borderLeftColor,
        ].join(" ");
        return oldColors.some((color) => colors.includes(color))
          ? [
              {
                element: element.id || element.className || element.tagName,
                pseudo,
                colors,
              },
            ]
          : [];
      }),
    );
  });
  expect
    .soft(creamSurfaces, "no element or pseudo-element uses a warm surface")
    .toEqual([]);
}

test("cream surfaces do not return in the page, navigation or inquiry draft", async ({
  page,
  isMobile,
}) => {
  await expectNoCreamSurfaces(page);
  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.locator(".mobile-nav")).toHaveCSS(
      "background-color",
      white,
    );
    await expectNoCreamSurfaces(page);
    await page.keyboard.press("Escape");
  }
  await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("visitor@example.com");
  await page
    .getByLabel("What would you like to work better?")
    .fill("We need a clearer way to track requests.");
  await page.getByRole("button", { name: "Prepare your inquiry" }).click();
  await expect(page.locator(".draft-preview")).toHaveCSS(
    "background-color",
    white,
  );
  await expectNoCreamSurfaces(page);
});

test("secondary controls and vacant-unit markers retain visible edges on white", async ({
  page,
}) => {
  const edges = await page
    .locator(".button-outline, .is-vacant")
    .evaluateAll((elements) =>
      elements.map((element) => ({
        element: element.className,
        border: getComputedStyle(element).borderTopColor,
        width: getComputedStyle(element).borderTopWidth,
        style: getComputedStyle(element).borderTopStyle,
      })),
    );
  expect(edges.length).toBeGreaterThan(0);
  for (const edge of edges) {
    const channels = edge.border.match(/[\d.]+/g)!.map(Number);
    const alpha = channels[3] ?? 1;
    const [r, g, b] = channels.slice(0, 3).map((value) => {
      const channel = (value * alpha + 255 * (1 - alpha)) / 255;
      return channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4;
    });
    const contrast = 1.05 / (0.2126 * r + 0.7152 * g + 0.0722 * b + 0.05);
    expect
      .soft(contrast, `${edge.element} border contrast on white`)
      .toBeGreaterThanOrEqual(3);
    expect.soft(parseFloat(edge.width)).toBeGreaterThanOrEqual(1);
    expect.soft(edge.style).not.toBe("none");
  }
});
