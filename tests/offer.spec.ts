import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { findForbidden } from "../src/lib/forbidden.ts";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(
    page.locator("#offer"),
    "Ways to work section exists",
  ).toHaveCount(1);
});

test("the offer follows Services with five ordered steps and three assessment tiers", async ({
  page,
}) => {
  const section = page.locator("#offer");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText(
    "From a first call to a working system.",
  );
  await expect(
    section.getByText("Ways to work", { exact: true }),
  ).toBeVisible();
  await expect(section).toContainText(
    "Every engagement starts with a conversation and is scoped before anything is built. Each step is scoped on its own, so you decide after each one whether to continue.",
  );
  await expect(page.locator("#services + #offer + #work")).toHaveCount(1);

  const ladder = section.locator("ol");
  await expect(ladder).toHaveCount(1);
  await expect(ladder).toHaveRole("list");
  const steps = ladder.locator(":scope > li");
  await expect(steps).toHaveCount(5);
  await expect(steps.locator(".index")).toHaveText([
    "01",
    "02",
    "03",
    "04",
    "05",
  ]);
  await expect(steps.getByRole("heading", { level: 3 })).toHaveText([
    "Discovery call",
    "Assessment",
    "Adoption program",
    "Fixed-scope build and deployment",
    "Parallel Run",
  ]);
  await expect(steps.first()).toContainText("Free, about 20 minutes");

  const tiers = steps
    .nth(1)
    .getByRole("list", { name: "Assessment", exact: true });
  await expect(tiers.locator(":scope > li")).toHaveCount(3);
  await expect(tiers.getByRole("heading", { level: 4 })).toHaveText([
    "Small school or office",
    "Mid-size school or business",
    "Multi-campus school or multi-branch group",
  ]);
  for (const tier of await tiers.locator(":scope > li").all()) {
    await expect(tier.getByRole("listitem")).toHaveCount(3);
  }
});

test("privacy is a separate panel below the ladder with the compliance limits", async ({
  page,
}) => {
  const section = page.locator("#offer");
  const privacy = section.getByRole("article").filter({
    has: page.getByRole("heading", {
      name: "Privacy and security are built in.",
    }),
  });
  await expect(privacy).toHaveCount(1);
  await expect(privacy.getByRole("heading", { level: 3 })).toBeVisible();
  await expect(privacy).toContainText("Across every step");
  await expect(privacy).toContainText(
    "Data Privacy Act of 2012 (Republic Act No. 10173)",
  );
  await expect(privacy.getByRole("listitem")).toHaveCount(4);
  await expect(privacy).toContainText(
    "We support your compliance work. We do not replace your Data Protection Officer or legal counsel.",
  );
  await expect(
    section.locator("ol").getByRole("heading", {
      name: "Privacy and security are built in.",
    }),
  ).toHaveCount(0);
  const ladderBox = await section.locator("ol").boundingBox();
  const privacyBox = await privacy.boundingBox();
  expect(privacyBox!.y).toBeGreaterThanOrEqual(
    ladderBox!.y + ladderBox!.height,
  );
});

test("both discovery links reset an existing inquiry interest by click and keyboard", async ({
  page,
}) => {
  const links = page.locator("#offer").getByRole("link", {
    name: "Request a discovery call",
    exact: true,
  });
  await expect(links).toHaveCount(2);
  const interest = page.getByLabel("Where could we help?");
  for (let index = 0; index < 2; index++) {
    await interest.selectOption(index === 0 ? "Website" : "Bespoke system");
    await expect(links.nth(index)).toHaveAttribute("href", "#contact");
    if (index === 0) {
      await links.nth(index).click();
    } else {
      await links.nth(index).focus();
      await page.keyboard.press("Enter");
    }
    await expect(page).toHaveURL(/#contact$/);
    await expect(interest).toHaveValue("Not sure yet");
    await expect(page.locator("#contact")).toBeInViewport();
  }
  await expect(links.last()).toHaveClass(/\bbutton\b/);
});

test("offer copy has no prices or forbidden names and passes accessibility checks", async ({
  page,
}) => {
  const section = page.locator("#offer");
  const text = await section.innerText();
  expect(text).not.toMatch(
    /\p{Sc}|\b(?:PHP|USD|pesos?|per\s+(?:month|year)|discounts?)\b|\b\d{1,3}(?:,\d{3})+\b/iu,
  );
  expect(findForbidden(text)).toEqual([]);
  const result = await new AxeBuilder({ page })
    .include("#offer")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});

test("Ways to work navigation reaches the offer section", async ({
  page,
  isMobile,
}) => {
  if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
  const navigation = page.getByRole("navigation", {
    name: isMobile ? "Mobile navigation" : "Main navigation",
  });
  const link = navigation.getByRole("link", {
    name: "Ways to work",
    exact: true,
  });
  await expect(link).toHaveAttribute("href", "#offer");
  await link.click();
  await expect(page).toHaveURL(/#offer$/);
  await expect(page.locator("#offer h2")).toBeInViewport();
});

test("offer reflows from 320px to 1920px and at doubled text with usable links", async ({
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
      for (const link of await page.locator("#offer a").all()) {
        const box = await link.boundingBox();
        expect(
          box!.height,
          `link height at ${width}px with ${textSize} text`,
        ).toBeGreaterThanOrEqual(44);
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      }
    }
  }
});

test("desktop navigation fits at 960px without overlapping the brand or contact button", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "desktop navigation layout");
  await page.setViewportSize({ width: 960, height: 900 });
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link")).toHaveText([
    "Services",
    "Ways to work",
    "Work",
    "Approach",
    "Contact",
  ]);
  const boxes = await page
    .locator(".site-header .brand, .desktop-nav a, .header-contact")
    .evaluateAll((elements) =>
      elements.map((element) => {
        const { x, right, height } = element.getBoundingClientRect();
        return { x, right, height };
      }),
    );
  for (let index = 0; index < boxes.length; index++) {
    expect(boxes[index].x).toBeGreaterThanOrEqual(0);
    expect(boxes[index].right).toBeLessThanOrEqual(960);
    expect(boxes[index].height).toBeGreaterThanOrEqual(44);
    if (index > 0)
      expect(boxes[index].x).toBeGreaterThanOrEqual(boxes[index - 1].right);
  }
});
