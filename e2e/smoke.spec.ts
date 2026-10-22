import { expect, test } from "@playwright/test";

test("home page links to the course", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("English");
  await page.getByRole("link", { name: /start learning/i }).click();
  await expect(page).toHaveURL(/\/learn\/$/);
  await expect(page.getByRole("link", { name: /Verb in position 2/ })).toBeVisible();
});

test("a lesson renders and checks an answer", async ({ page }) => {
  await page.goto("/learn/modal-verbs/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Modalverben");
  await expect(page.getByRole("heading", { name: "In English" })).toBeVisible();

  const translate = page
    .locator('[data-exercise-type="translate"]')
    .filter({ hasText: "I want to learn German." });
  const box = translate.getByRole("textbox");

  // Lowercase noun: the checker should say exactly what is wrong.
  await box.fill("ich will deutsch lernen");
  await translate.getByRole("button", { name: "Check" }).click();
  await expect(translate.getByText("Capitalize nouns: Deutsch.")).toBeVisible();

  // ae/oe/ue spelling is accepted.
  await box.fill("Ich moechte Deutsch lernen");
  await translate.getByRole("button", { name: "Check" }).click();
  await expect(translate.getByText("Correct.")).toBeVisible();
});

test("no page scrolls sideways at 375px", async ({ page }) => {
  for (const path of [
    "/",
    "/learn/",
    "/learn/verb-position-2/",
    "/learn/nicht-kein/",
    "/learn/perfekt/",
  ]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
