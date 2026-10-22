"use client";

import { useSetting } from "./use-setting";

export function useSpeechRate(): number {
  return useSetting("speechRate")[0];
}
