/**
 * Server and build-script only. The dictionary index is published under a name that includes
 * a hash of its contents (dictionary-index.<hash>.json). A new build with changed words gets a
 * new name, so browsers and CDNs can cache each file forever (see vercel.json).
 */
import { createHash } from "node:crypto";

import { DICTIONARY } from "@/content/dictionary";

import { buildDictionaryIndex } from "./dictionary-index";
import { BASE_PATH } from "./base-path";

export const DICTIONARY_INDEX = buildDictionaryIndex(DICTIONARY);
export const DICTIONARY_INDEX_JSON = JSON.stringify(DICTIONARY_INDEX);

const hash = createHash("sha256").update(DICTIONARY_INDEX_JSON).digest("hex").slice(0, 10);
export const DICTIONARY_INDEX_FILE = `dictionary-index.${hash}.json`;
export const DICTIONARY_INDEX_URL = `${BASE_PATH}/${DICTIONARY_INDEX_FILE}`;
