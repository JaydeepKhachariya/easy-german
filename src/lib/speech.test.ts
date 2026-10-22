import { pickGermanVoice } from "./speech";

const v = (lang: string, name = lang, localService = true) =>
  ({ lang, name, localService }) as SpeechSynthesisVoice;

describe("pickGermanVoice", () => {
  it("prefers de-DE over other German voices", () => {
    expect(pickGermanVoice([v("en-US"), v("de-AT"), v("de-DE")])?.lang).toBe("de-DE");
  });

  it("falls back to any German voice", () => {
    expect(pickGermanVoice([v("en-GB"), v("de-CH")])?.lang).toBe("de-CH");
  });

  it("handles underscores and lowercase", () => {
    expect(pickGermanVoice([v("de_DE")])?.lang).toBe("de_DE");
  });

  it("returns null when there is no German voice", () => {
    expect(pickGermanVoice([v("en-US"), v("hi-IN")])).toBeNull();
  });
});
