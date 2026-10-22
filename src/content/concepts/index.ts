import type { ConceptInput } from "@/content/schema";

import modalVerbs from "./grammar/modal-verbs/concept";
import nichtKein from "./grammar/nicht-kein/concept";
import perfekt from "./grammar/perfekt/concept";
import verbPosition2 from "./grammar/verb-position-2/concept";

/** Every core concept. Order on screen comes from each concept's `order` field. */
export const RAW_CONCEPTS: ConceptInput[] = [nichtKein, modalVerbs, perfekt, verbPosition2];
