import { expect, test } from "@playwright/test";

test("search an inflected form and open the conjugation table", async ({ page }) => {
  await page.goto("/dictionary/");
  await page.getByLabel("Search the dictionary").fill("konnte");
  const result = page.getByRole("link", { name: /können/ });
  await expect(result).toContainText("konnte → Präteritum");
  await result.click();
  await expect(page).toHaveURL(/\/dictionary\/koennen\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("können");
  await expect(page.getByText("kann · konnte · hat gekonnt")).toBeVisible();
  await expect(page.getByRole("cell", { name: "konntest" })).toBeVisible();

  await page.getByRole("button", { name: "Add to my review deck" }).click();
  await expect(page.getByRole("button", { name: "In your review deck" })).toBeVisible();
});

test("?q= in the URL runs the search", async ({ page }) => {
  await page.goto("/dictionary/?q=weiss");
  await expect(page.getByRole("link", { name: /wissen/ })).toBeVisible();
});
