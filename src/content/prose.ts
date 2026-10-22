import type { ComponentType } from "react";

import ModalVerbs from "./concepts/grammar/modal-verbs/more.mdx";
import NichtKein from "./concepts/grammar/nicht-kein/more.mdx";
import Perfekt from "./concepts/grammar/perfekt/more.mdx";
import VerbPosition2 from "./concepts/grammar/verb-position-2/more.mdx";

/**
 * Optional long-form MDX per core concept, keyed by slug. Imported only by the
 * server-rendered lesson page, so MDX never ends up in client bundles.
 */
export const PROSE: Record<string, ComponentType> = {
  "verb-position-2": VerbPosition2,
  "modal-verbs": ModalVerbs,
  perfekt: Perfekt,
  "nicht-kein": NichtKein,
};
