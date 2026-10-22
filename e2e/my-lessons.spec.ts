import fs from "node:fs";

import { expect, test } from "@playwright/test";

test("create, preview, save, export, delete and re-import a lesson", async ({ page }, info) => {
  await page.goto("/my-lessons/new/");

  // Saving an empty lesson lists what is missing.
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "to fix" })).toContainText("German title");

  await page.getByLabel("German title").fill("Die Uhrzeit");
  await page.getByLabel("English title").fill("Telling the time");
  await page.getByLabel("Explanation").fill("English says: it is three o'clock.");
  await page.getByLabel("The rule").fill("German says: Es ist drei Uhr.");

  // Umlaut bar inserts into the last focused field.
  const summary = page.getByLabel("One-line summary");
  await summary.fill("Uhrzeit f");
  await page.getByRole("button", { name: "Insert ü" }).click();
  await summary.press("End");
  await summary.pressSequentially("r Anfänger");
  await expect(summary).toHaveValue("Uhrzeit für Anfänger");

  await page.getByRole("button", { name: "Add example" }).click();
  await page.locator("#examples-0-de").fill("Es ist drei Uhr.");
  await page.locator("#examples-0-en").fill("It is three o'clock.");

  await page.getByLabel("New exercise type").selectOption("translate");
  await page.getByRole("button", { name: "Add exercise" }).click();
  await page.locator("#ex-0-en").fill("It is three o'clock.");
  await page.locator("#ex-0-a").fill("Es ist drei Uhr.");

  // Live preview uses the real renderer (Preview tab on phones).
  await page.getByRole("tab", { name: "Preview" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Die Uhrzeit" })).toBeVisible();
  await page.getByRole("tab", { name: "Edit" }).click();

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page).toHaveURL(/\/my-lessons\/view\/\?id=user-/);
  await expect(page.getByText("My lesson", { exact: true })).toBeVisible();

  // Answer the exercise in the saved lesson.
  const ex = page.locator('[data-exercise-type="translate"]');
  await ex.getByRole("textbox").fill("es ist drei uhr");
  await ex.getByRole("button", { name: "Check" }).click();
  await expect(ex.getByText("Capitalize nouns: Uhr.")).toBeVisible();

  // Export it.
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export" }).click();
  const file = info.outputPath("lesson.json");
  await (await download).saveAs(file);
  const json = JSON.parse(fs.readFileSync(file, "utf8"));
  expect(json).toMatchObject({ app: "deutsch-bridge", kind: "lessons", formatVersion: 1 });
  expect(json.lessons[0].titleDe).toBe("Die Uhrzeit");

  // Import the same file: the id conflicts, so choose "keep both".
  await page.goto("/my-lessons/");
  await page.getByRole("button", { name: "Import JSON" }).click();
  await page.getByLabel("Lesson file").setInputFiles(file);
  await expect(page.getByText("Same id as yours")).toBeVisible();
  await page.getByLabel("What to do with Telling the time").selectOption("keepBoth");
  await page.getByRole("button", { name: "Import", exact: true }).click();
  await expect(page.getByText("Telling the time (copy)")).toBeVisible();

  // Delete the copy.
  await page.getByRole("button", { name: "More actions for Telling the time (copy)" }).click();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete", exact: true }).click();
  await expect(page.getByText("Telling the time (copy)")).toHaveCount(0);
  await expect(page.getByText("Telling the time", { exact: true })).toBeVisible();
});

test("an invalid file shows clear errors", async ({ page }, info) => {
  const file = info.outputPath("bad.json");
  fs.writeFileSync(file, "{ not json");
  await page.goto("/my-lessons/");
  await page.getByRole("button", { name: "Import JSON" }).click();
  await page.getByLabel("Lesson file").setInputFiles(file);
  await expect(page.getByRole("alert")).toContainText("not valid JSON");
});

test("backup export from settings", async ({ page }, info) => {
  await page.goto("/settings/");
  await expect(page.getByText("Your data lives only in this browser")).toBeVisible();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export all my data" }).click();
  const file = info.outputPath("backup.json");
  await (await download).saveAs(file);
  expect(JSON.parse(fs.readFileSync(file, "utf8"))).toMatchObject({
    kind: "backup",
    data: { lessons: [] },
  });

  await page.getByRole("button", { name: "Import backup" }).click();
  await page.getByLabel("Backup file").setInputFiles(file);
  await expect(page.getByText("0 lessons", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Merge into my data" }).click();
  await expect(page.getByText("Backup merged.")).toBeVisible();
});
