import { expect, test, type Page } from "@playwright/test";

const KEY = "gsk_testtesttesttesttesttest1234";
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, content-type",
  "access-control-allow-methods": "GET, POST, OPTIONS",
};

/** Stands in for api.groq.com: a model list and a streamed answer. */
async function mockGroq(page: Page, requests: unknown[] = []) {
  await page.route("https://api.groq.com/**", async (route) => {
    const req = route.request();
    if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: CORS });
    if (req.headers().authorization !== `Bearer ${KEY}`) {
      return route.fulfill({
        status: 401,
        headers: CORS,
        json: { error: { message: "Invalid API Key" } },
      });
    }
    if (req.url().endsWith("/models")) {
      return route.fulfill({
        headers: CORS,
        json: {
          data: [
            { id: "llama-3.1-8b-instant" },
            { id: "openai/gpt-oss-120b" },
            { id: "whisper-large-v3" },
          ],
        },
      });
    }
    requests.push(req.postDataJSON());
    const pieces = ["**können** ", "means *can*.\n\n", "- Ich kann schwimmen."];
    const body =
      pieces
        .map((p) => `data: ${JSON.stringify({ choices: [{ delta: { content: p } }] })}\n\n`)
        .join("") + "data: [DONE]\n\n";
    return route.fulfill({ headers: { ...CORS, "content-type": "text/event-stream" }, body });
  });
}

test("set up a key, then ask about a lesson", async ({ page }) => {
  const requests: { model: string; messages: { role: string; content: string }[] }[] = [];
  await mockGroq(page, requests);

  // Without a key, the tutor points to Settings.
  await page.goto("/tutor/");
  await page.getByRole("link", { name: "Set up the AI tutor" }).click();
  await expect(page).toHaveURL(/\/settings\/#ai$/);

  await page.getByLabel("Groq API key").fill("gsk_wrongwrongwrongwrongwrong");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Groq didn't accept your API key")).toBeVisible();

  await page.getByLabel("Groq API key").fill(KEY);
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Connected with key")).toBeVisible();
  await expect(page.getByLabel("Model")).toContainText("openai/gpt-oss-120b");
  await expect(page.getByLabel("Model")).not.toContainText("whisper");

  // The key isn't in the Dexie database, so it can't end up in a backup.
  const inDb = await page.evaluate(async () => {
    const dbs = await indexedDB.databases();
    return JSON.stringify(dbs).includes("gsk_");
  });
  expect(inDb).toBe(false);

  await page.goto("/learn/modal-verbs/");
  await page.getByRole("button", { name: "Ask AI" }).click();
  const panel = page.getByRole("dialog");
  await expect(panel).toContainText("Lesson: Modal verbs");
  await panel.getByRole("button", { name: "Explain this more simply" }).click();

  const answer = panel.getByTestId("ai-answer");
  await expect(answer.locator("strong")).toHaveText("können");
  await expect(answer.locator("li")).toHaveText("Ich kann schwimmen.");

  // The lesson went along in the system prompt, and the best model was picked.
  expect(requests[0]!.model).toBe("openai/gpt-oss-120b");
  expect(requests[0]!.messages[0]!.content).toContain("Lesson:");
  expect(requests[0]!.messages.at(-1)).toEqual({
    role: "user",
    content: "Explain this more simply",
  });

  // Closing and reopening keeps the conversation.
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Ask AI" }).click();
  await expect(page.getByRole("dialog").getByTestId("ai-answer")).toBeVisible();
});

test("a rate limit shows when to try again", async ({ page }) => {
  await page.route("https://api.groq.com/**", (route) =>
    route.request().method() === "OPTIONS"
      ? route.fulfill({ status: 204, headers: CORS })
      : route.fulfill({
          status: 429,
          headers: { ...CORS, "retry-after": "20", "access-control-expose-headers": "retry-after" },
          json: { error: { message: "Rate limit reached" } },
        }),
  );
  await page.goto("/tutor/");
  await page.evaluate(
    (key) =>
      localStorage.setItem(
        "deutsch-bridge:ai",
        JSON.stringify({ apiKey: key, model: "llama-3.1-8b-instant" }),
      ),
    KEY,
  );
  await page.reload();
  await page.getByLabel("Your question").fill("Hallo");
  await page.getByLabel("Your question").press("Enter");
  await expect(page.getByText(/free limit for now. Try again in 20 seconds/)).toBeVisible();
});
