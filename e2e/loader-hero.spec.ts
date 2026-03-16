import { test, expect } from "@playwright/test";

test.describe("Loader and Hero Video", () => {
  test("loader appears then disappears smoothly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Loader should be visible initially
    const loader = page.locator(".spray-loader");
    await expect(loader).toBeVisible({ timeout: 5000 });

    // Loader disappears when media is ready (min 900ms) or max 6s fallback
    await expect(loader).not.toBeVisible({ timeout: 10000 });
  });

  test("hero video or poster is visible after loader dismisses", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    await page.waitForSelector(".spray-loader", { state: "hidden", timeout: 10000 });

    const heroVideo = page.locator(".hero-video-bg");
    await expect(heroVideo).toBeVisible({ timeout: 3000 });

    const video = page.locator("video.hero-video-bg");
    await expect(video).toHaveCount(1);
    await expect(video).toHaveAttribute("src", /hero\.mp4|46422-720\.mp4/);
  });

  test("loader animation runs smoothly without console errors", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");

    // Wait for loader to finish (max 6s when fallback is forced)
    await page.waitForSelector(".spray-loader", { state: "hidden", timeout: 10000 });

    expect(errors).toHaveLength(0);
  });
});
