import { expect, test } from "@playwright/test";

test("icon files and the manifest are served without changing the social image", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page.locator('head link[rel="icon"][href="./favicon.svg"]')).toHaveCount(
    1,
  );
  await expect(page.locator('head link[rel="icon"][href="./favicon.ico"]')).toHaveCount(
    1,
  );
  await expect(
    page.locator('head link[rel="apple-touch-icon"]'),
  ).toHaveAttribute("href", "./apple-touch-icon.png");
  await expect(page.locator('head link[rel="manifest"]')).toHaveAttribute(
    "href",
    "./site.webmanifest",
  );
  await expect(page.locator('head meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://www.ridgewell.com.ph/brand/ridgewell-logo.jpg",
  );

  for (const path of [
    "/favicon.svg",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/icon-192.png",
    "/icon-512.png",
    "/site.webmanifest",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
  const manifest = await (await request.get("/site.webmanifest")).json();
  expect(manifest.name).toBe("Ridgewell RMSI");
  expect(manifest.background_color).toBe("#ffffff");
  expect(manifest.theme_color).toBe("#ffffff");
});
