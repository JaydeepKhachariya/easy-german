"use client";

import { useEffect } from "react";

import { getSetting, setSetting } from "@/lib/settings";
import { requestPersist } from "@/lib/storage";

/** On first visit, ask the browser to keep our data (navigator.storage.persist). */
export function StorageInit() {
  useEffect(() => {
    (async () => {
      try {
        if (await getSetting("persistRequested")) return;
        await requestPersist();
        await setSetting("persistRequested", true);
      } catch {
        // IndexedDB can be unavailable (private mode in some browsers). The app still works.
      }
    })();
  }, []);
  return null;
}
