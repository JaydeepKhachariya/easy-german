/**
 * Browser SpeechSynthesis with a German voice. Everything is lazy and browser-only.
 */

export type VoiceStatus = "unsupported" | "loading" | "ready" | "no-voice";

let voicePromise: Promise<SpeechSynthesisVoice | null> | null = null;

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Prefer an exact de-DE voice, then any German voice. */
export function pickGermanVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const german = voices.filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith("de"));
  if (german.length === 0) return null;
  const deDE = german.filter((v) => v.lang.toLowerCase().replace("_", "-") === "de-de");
  const pool = deDE.length ? deDE : german;
  return pool.find((v) => v.localService) ?? pool[0]!;
}

/** Resolves once voices have loaded (browsers load them asynchronously). */
export function loadGermanVoice(): Promise<SpeechSynthesisVoice | null> {
  if (!isSpeechSupported()) return Promise.resolve(null);
  if (voicePromise) return voicePromise;

  voicePromise = new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const tryNow = () => {
      const voices = synth.getVoices();
      if (voices.length) {
        resolve(pickGermanVoice(voices));
        return true;
      }
      return false;
    };
    if (tryNow()) return;
    const onChange = () => {
      if (tryNow()) synth.removeEventListener("voiceschanged", onChange);
    };
    synth.addEventListener("voiceschanged", onChange);
    // Some browsers never fire the event when there are no voices at all.
    setTimeout(() => {
      synth.removeEventListener("voiceschanged", onChange);
      resolve(pickGermanVoice(synth.getVoices()));
    }, 2000);
  });
  return voicePromise;
}

export async function speakGerman(text: string, rate = 0.9): Promise<VoiceStatus> {
  if (!isSpeechSupported()) return "unsupported";
  const voice = await loadGermanVoice();
  if (!voice) return "no-voice";
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice;
  u.lang = voice.lang;
  u.rate = rate;
  synth.speak(u);
  return "ready";
}

export const NO_VOICE_HELP =
  "No German voice is installed on this device. On Windows: Settings > Time & language > Speech > Add voices > Deutsch. On macOS: System Settings > Accessibility > Spoken Content > System voice > Manage voices. On Android: Settings > Text-to-speech > install German. Then reload the page.";
