/**
 * Prints every German sentence in the core curriculum so a human can review it.
 *
 *   pnpm german                 # everything
 *   pnpm german modal-verbs     # one concept
 *   pnpm german --no-wrong      # hide the intentionally wrong "mistake" sentences
 *   pnpm german --dictionary    # dictionary examples, verb principal parts and plurals
 */
import { CONCEPTS } from "../src/content";
import { conjugationOf, comparisonOf, DICTIONARY, headword } from "../src/content/dictionary";
import { collectGerman } from "../src/content/german-sentences";

const args = process.argv.slice(2);
const hideWrong = args.includes("--no-wrong");
const only = args.filter((a) => !a.startsWith("--"));

if (args.includes("--dictionary")) {
  let n = 0;
  for (const e of DICTIONARY) {
    const c = conjugationOf(e);
    const comp = comparisonOf(e);
    const extra = c
      ? ` [${c.principalParts}]`
      : e.noun
        ? ` [pl. ${e.noun.pluralOnly ? "only plural" : (e.noun.plural ?? "none")}]`
        : comp
          ? ` [${comp.comparative}, ${comp.superlative}]`
          : "";
    console.log(`\n${headword(e)}${extra}`);
    for (const ex of e.examples) console.log(`    ${ex.de}`);
    n += e.examples.length;
  }
  console.log(`\n${DICTIONARY.length} entries, ${n} example sentences.`);
  process.exit(0);
}

let total = 0;
for (const c of CONCEPTS) {
  if (only.length && !only.includes(c.slug)) continue;
  const lines = collectGerman(c).filter((l) => !(hideWrong && l.intentionallyWrong));
  console.log(`\n=== ${c.titleDe} (${c.slug}) [${c.status}] ===`);
  for (const l of lines) {
    console.log(`${l.intentionallyWrong ? "✗" : " "} ${l.where.padEnd(34)} ${l.text}`);
  }
  total += lines.length;
}
console.log(`\n${total} lines. ✗ = deliberately wrong (mistake boxes and wrong quiz options).`);
