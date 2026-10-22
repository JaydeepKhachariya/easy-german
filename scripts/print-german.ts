/**
 * Prints every German sentence in the core curriculum so a human can review it.
 *
 *   pnpm german                 # everything
 *   pnpm german modal-verbs     # one concept
 *   pnpm german --no-wrong      # hide the intentionally wrong "mistake" sentences
 */
import { CONCEPTS } from "../src/content";
import { collectGerman } from "../src/content/german-sentences";

const args = process.argv.slice(2);
const hideWrong = args.includes("--no-wrong");
const only = args.filter((a) => !a.startsWith("--"));

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
