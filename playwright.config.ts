import fs from "node:fs";

import { defineConfig, devices } from "@playwright/test";

// Some CI/cloud images ship a pinned Chromium binary here. Use it instead of downloading one.
const preinstalled = "/opt/pw-browsers/chromium";
const executablePath = fs.existsSync(preinstalled) ? preinstalled : undefined;

export default defineConfig({
  testDir: "e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3100",
    ...devices["Pixel 7"],
    viewport: { width: 375, height: 800 },
    launchOptions: executablePath ? { executablePath } : {},
  },
  // Serves the static export. Run `pnpm build` first.
  webServer: {
    command: "pnpm exec serve out -l 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
  },
});
