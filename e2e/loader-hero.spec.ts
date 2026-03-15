import { test, expect } from "@playwright/test";

test.describe("Loader and Hero Video", () => {
  test("loader appears then disappears smoothly", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Loader should be visible initially
    const loader = page.locator(".spray-loader");
    await expect(loader).toBeVisible({ timeout: 5000 });

    // Loader should disappear within ~5s (min 900ms + video load + buffer)
    await expect(loader).not.toBeVisible({ timeout: 8000 });
  });

  test("loader animation runs smoothly without console errors", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");

    // Wait for loader to finish
    await page.waitForSelector(".spray-loader", { state: "hidden", timeout: 5000 });

    expect(errors).toHaveLength(0);
  });
});
