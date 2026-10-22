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

test("progress, review deck and search use IndexedDB", async ({ page }) => {
  await page.goto("/learn/nicht-kein/");
  const mc = page.locator('[data-exercise-type="multipleChoice"]').first();
  await mc.getByLabel("keine").check();
  await mc.getByRole("button", { name: "Check" }).click();
  await expect(mc.getByText("Correct.")).toBeVisible();

  // Add the lesson's words to the deck and review one.
  await page.getByRole("button", { name: "Add words to my review deck" }).click();
  await expect(page.getByRole("button", { name: "In your review deck" })).toBeVisible();

  await page.goto("/dashboard/");
  await expect(page.getByRole("link", { name: /Continue: Saying no/ })).toBeVisible();

  await page.goto("/vocab/review/");
  await page.getByRole("button", { name: "Show answer" }).click();
  await page.getByRole("button", { name: /^Good/ }).click();
  await expect(page.getByText(/left$/)).toBeVisible();

  await page.getByRole("button", { name: /Search/ }).click();
  await page.getByPlaceholder("Search lessons and words...").fill("moechten");
  await page.getByRole("option", { name: /möchten/ }).first().click();
  await expect(page).toHaveURL(/\/learn\/modal-verbs\/#vocab$/);
});
