import { expect, test } from "@playwright/test";

test("home page loads and links to the course", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("English");
  await page.getByRole("link", { name: /start learning/i }).click();
  await expect(page).toHaveURL(/\/learn\/$/);
});
