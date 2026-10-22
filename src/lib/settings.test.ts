import { DEFAULT_SETTINGS, readSetting } from "./settings";

describe("readSetting", () => {
  it("returns valid stored values", () => {
    expect(readSetting("speechRate", 1.2)).toBe(1.2);
    expect(readSetting("reviewDirection", "en-de")).toBe("en-de");
  });

  it("falls back to the default for missing or bad values", () => {
    expect(readSetting("speechRate", undefined)).toBe(DEFAULT_SETTINGS.speechRate);
    expect(readSetting("speechRate", 9)).toBe(DEFAULT_SETTINGS.speechRate);
    expect(readSetting("reviewDirection", "sideways")).toBe("de-en");
  });
});
