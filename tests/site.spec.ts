import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function prepareInquiry(page: Page) {
  await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("visitor@example.com");
  await page.getByLabel("Business or organization").fill("Example & Co");
  await page
    .getByLabel("What would you like to work better?")
    .fill("We need a clearer way to track recurring requests.");
  await page.getByRole("button", { name: "Prepare your inquiry" }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

test("every visible in-page link reaches its destination without runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Business,",
  );
  const links = page.locator('a[href^="#"]:visible');
  for (let i = 0; i < (await links.count()); i++) {
    const link = links.nth(i);
    const href = await link.getAttribute("href");
    if (href === "#main") continue;
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator(href!)).toBeVisible();
  }
  await expect(page.locator(".brand img").first()).toHaveJSProperty(
    "naturalWidth",
    1186,
  );
  expect(errors).toEqual([]);
});

test("each service changes its panel and preselects the corresponding inquiry", async ({
  page,
}) => {
  const tabs = page.getByRole("tab");
  const expected = [
    "Accounting support",
    "Workflow and administrative improvement",
    "Documentation",
    "Customized software development",
  ];
  for (let i = 0; i < 4; i++) {
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      `service-tab-${i}`,
    );
    await page.getByRole("link", { name: "Talk about this service" }).click();
    await expect(page.getByLabel("Where could we help?")).toHaveValue(
      expected[i],
    );
  }
  await tabs.nth(3).focus();
  await page.keyboard.press("Home");
  await expect(tabs.nth(0)).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("End");
  await expect(tabs.nth(3)).toBeFocused();
});

test("all question disclosures open and close with keyboard", async ({
  page,
}) => {
  for (const item of await page.locator("details").all()) {
    await item.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(item).toHaveAttribute("open", "");
    await expect(item.locator("p")).toBeVisible();
    await page.keyboard.press("Space");
    await expect(item).not.toHaveAttribute("open");
  }
});

test("inquiry validates, builds a truthful email draft, and preserves values on edit", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Prepare your inquiry" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByLabel("Your name", { exact: true })).toBeFocused();
  await prepareInquiry(page);
  await expect(
    page.getByText("Nothing has been sent yet.", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your conversation starts here." }),
  ).toBeFocused();
  const href = await page
    .getByRole("link", { name: "Open email app" })
    .getAttribute("href");
  expect(href).toMatch(
    /^mailto:ridgewell-management-services-inc@polsia.app\?/,
  );
  expect(new URL(href!).searchParams.get("body")).toContain("Example & Co");
  await page.getByRole("button", { name: "Edit your inquiry" }).click();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "Test Visitor",
  );
  await expect(
    page.getByLabel("What would you like to work better?"),
  ).toHaveValue("We need a clearer way to track recurring requests.");
});

test("copy draft succeeds and denied clipboard access leaves selectable content", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await prepareInquiry(page);
  await page.getByRole("button", { name: "Copy email draft" }).click();
  await expect(page.getByRole("status")).toContainText("Copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "visitor@example.com",
  );
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => Promise.reject(new Error("Permission denied")),
    });
  });
  await page.getByRole("button", { name: "Draft copied" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Automatic copying is unavailable",
  );
  await expect(page.getByLabel("Your email draft")).toBeFocused();
});

test("changing services after preparing a draft preserves inputs and updates the next draft", async ({
  page,
}) => {
  await prepareInquiry(page);
  await page.getByRole("tab", { name: /Tools & custom software/ }).click();
  await page.getByRole("link", { name: "Talk about this service" }).click();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "Test Visitor",
  );
  await expect(page.getByLabel("Where could we help?")).toHaveValue(
    "Customized software development",
  );
  await page.getByRole("button", { name: "Prepare your inquiry" }).click();
  expect(
    await page
      .getByRole("link", { name: "Open email app" })
      .getAttribute("href"),
  ).toContain("Customized%20software%20development");
});

test("mobile navigation opens, follows every link, and closes with Escape", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile);
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  for (const label of [
    "Services",
    "Our approach",
    "About Ridgewell",
    "Common questions",
    "Let’s talk",
  ]) {
    await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  }
});

test("no accessibility violations in default, validation, or draft states", async ({
  page,
}) => {
  async function audit() {
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  await audit();
  await page.getByRole("button", { name: "Prepare your inquiry" }).click();
  await audit();
  await prepareInquiry(page);
  await audit();
});

test("layouts reflow from 320px through desktop with usable touch targets", async ({
  page,
}) => {
  for (const width of [320, 390, 600, 768, 960, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const undersized = await page
      .locator(
        "button:visible, select:visible, input:visible, summary:visible, a:visible",
      )
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            if (element.classList.contains("skip-link")) return false;
            return element.getBoundingClientRect().height < 43;
          })
          .map((element) => element.textContent),
      );
    expect(undersized).toEqual([]);
  }
  await page.setViewportSize({ width: 640, height: 900 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("all inquiry choices and email handoff are usable without submitting data", async ({
  page,
}) => {
  const select = page.getByLabel("Where could we help?");
  const options = await select.locator("option").allTextContents();
  for (const option of options) {
    await select.selectOption({ label: option });
    await expect(select).toHaveValue(option);
  }
  await prepareInquiry(page);
  const email = page.getByRole("link", { name: "Open email app" });
  await email.evaluate((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      element.setAttribute("data-handoff-tested", "true");
    });
  });
  await email.click();
  await expect(email).toHaveAttribute("data-handoff-tested", "true");
  expect(
    new URL((await email.getAttribute("href"))!).searchParams.get("subject"),
  ).toContain("Customized software development");
  const direct = page.getByRole("link", { name: "Email Ridgewell directly" });
  await direct.evaluate((element) =>
    element.addEventListener("click", (event) => event.preventDefault()),
  );
  await direct.click();
  await expect(direct).toHaveAttribute(
    "href",
    "mailto:ridgewell-management-services-inc@polsia.app",
  );
});

test("clipboard work has a busy state and missing images leave accessible identity", async ({
  page,
}) => {
  await prepareInquiry(page);
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => new Promise<void>((resolve) => setTimeout(resolve, 1000)),
    });
  });
  await page.getByRole("button", { name: "Copy email draft" }).click();
  await expect(page.getByRole("button", { name: "Copying…" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Copying…" })).toHaveAttribute(
    "aria-busy",
    "true",
  );
  await expect(
    page.getByRole("button", { name: "Draft copied" }),
  ).toBeEnabled();
  await page.route("**/brand/ridgewell-logo.jpg", (route) => route.abort());
  await page.reload();
  await expect(
    page.getByRole("link", { name: "Ridgewell home" }).first(),
  ).toBeVisible();
  await expect(
    page.getByAltText("Ridgewell Management Services, Inc.").first(),
  ).toHaveJSProperty("naturalWidth", 0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("landscape mobile navigation fits the screen and scrolls to its final action", async ({
  page,
}) => {
  await page.setViewportSize({ width: 568, height: 320 });
  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  const box = await menu.boundingBox();
  expect(box!.y + box!.height).toBeLessThanOrEqual(321);
  await menu.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await menu.getByRole("link", { name: "Let’s talk", exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
});

test("an old clipboard completion cannot mark a revised draft as copied", async ({
  page,
}) => {
  await prepareInquiry(page);
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () =>
        new Promise<void>((resolve) => {
          (window as Window & { finishCopy?: () => void }).finishCopy = resolve;
        }),
    });
  });
  await page.getByRole("button", { name: "Copy email draft" }).click();
  await page.getByRole("button", { name: "Edit your inquiry" }).click();
  await page
    .getByLabel("What would you like to work better?")
    .fill("A revised question about software.");
  await page.getByRole("button", { name: "Prepare your inquiry" }).click();
  await page.evaluate(() =>
    (window as Window & { finishCopy?: () => void }).finishCopy?.(),
  );
  await expect(
    page.getByRole("button", { name: "Copy email draft" }),
  ).toBeVisible();
  await expect(page.getByRole("status")).not.toContainText("Copied.");
});
