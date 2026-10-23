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

test("sentence helper explains word order", async ({ page }) => {
  await page.goto("/dictionary/");
  await page.getByRole("link", { name: /Sentence helper/ }).click();
  await expect(page).toHaveURL(/\/dictionary\/sentence\/$/);
  await page.getByRole("button", { name: "Ich stehe jeden Tag um sieben Uhr auf." }).click();
  await expect(page.getByText('"auf" at the end belongs to the verb: aufstehen.')).toBeVisible();
  await expect(page.getByText("I get up every day at seven clock")).toBeVisible();
  await page.getByRole("link", { name: /^stehe/ }).click();
  await expect(page).toHaveURL(/\/dictionary\/aufstehen\/$/);
});

test("the word list loads in pages as you scroll", async ({ page, request }) => {
  // The first words are in the HTML itself, before any script runs.
  const html = await (await request.get("/dictionary/")).text();
  expect(html).toContain('href="/dictionary/ab/"');

  await page.goto("/dictionary/");
  await expect(page.getByText(/^\d+ words$/)).toBeVisible();
  const rows = page.getByRole("list").last().getByRole("listitem");
  await expect(rows).toHaveCount(40);
  await page.getByText("Loading more words...").scrollIntoViewIfNeeded();
  await expect(rows).toHaveCount(80);
});
