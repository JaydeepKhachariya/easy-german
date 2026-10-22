# Deutsch Bridge

German A1 lessons for English speakers, built around one idea: start from how English does it, then show what German keeps and what it changes. The course targets the Goethe Start Deutsch 1 exam.

There is also a German–English dictionary of about 730 A1 words. Each word has its own page with meanings, examples and, for verbs and nouns, full conjugation or declension tables. A sentence helper breaks a pasted German sentence into words and shows where the verb parts go.

It's a local-first web app. There is no backend, no login and no server database. Lessons are static pages. Progress, the vocab review deck and lessons you write yourself are stored in your browser (IndexedDB).

## Quick start

You need Node.js 20.9 or newer. pnpm is recommended, but npm works too.

```bash
# with pnpm (uses the committed lockfile)
corepack enable        # once, if pnpm isn't installed
pnpm install
pnpm dev               # http://localhost:3000

# or with npm
npm install            # .npmrc sets legacy-peer-deps, see below
npm run dev
```

Production build and local preview:

```bash
pnpm build             # or: npm run build   → static export into out/
pnpm start             # or: npm start       → serves out/ on http://localhost:3000
```

Before the first `test:e2e` run on your own machine, install a browser once: `npx playwright install chromium`.

Why `.npmrc` has `legacy-peer-deps=true`: `@hookform/resolvers` lists optional peer dependencies that conflict with each other (two major versions of `effect`). pnpm ignores optional peers you don't use; npm refuses to install unless told to do the same. Nothing in the app uses `effect`.

### Scripts

With npm, use `npm run <script>` (`npm start` and `npm test` work as is).

| Script                              | What it does                                                    |
| ----------------------------------- | --------------------------------------------------------------- |
| `pnpm dev`                          | Builds the search index, then starts the dev server             |
| `pnpm build`                        | Builds the search index, then writes the static site to `out/`  |
| `pnpm start`                        | Serves `out/` with `serve` (static export has no `next start`)  |
| `pnpm lint`                         | ESLint                                                          |
| `pnpm typecheck`                    | `tsc --noEmit`                                                  |
| `pnpm format` / `pnpm format:check` | Prettier (with the Tailwind class sorter)                       |
| `pnpm test`                         | Vitest unit tests                                               |
| `pnpm test:e2e`                     | Playwright tests against `out/` (run `pnpm build` first)        |
| `pnpm check`                        | lint, typecheck, format check, unit tests and build in one go   |
| `pnpm german`                       | Prints every German sentence in the course for review           |
| `pnpm search-index`                 | Rebuilds `public/search-index.json` and `dictionary-index.json` |

`pnpm german modal-verbs` prints one lesson. `pnpm german --dictionary` prints the dictionary examples, verb principal parts, plurals and comparisons instead. `pnpm german --no-wrong` hides the sentences that are wrong on purpose (mistake boxes and wrong quiz options).

## Hosting

`next.config.ts` sets `output: "export"` and `trailingSlash: true`, so every route becomes a folder with an `index.html`. Upload `out/` to any static host (Netlify, Cloudflare Pages, GitHub Pages, S3, nginx). Nothing else is needed.

To host under a sub-path, for example GitHub Pages at `/easy-german/`, build with:

```bash
NEXT_PUBLIC_BASE_PATH=/easy-german pnpm build
```

## Project structure

```
src/
  app/                      routes (all static)
    learn/[slug]/           core lessons, one page per concept (generateStaticParams)
    dictionary/             search, [id]/ (one page per word), sentence/ (sentence helper)
    my-lessons/             list, new, edit?id=..., view?id=... (client-rendered from IndexedDB)
    dashboard/ vocab/review/ exam/ settings/
  components/
    ui/                     shadcn/ui primitives
    lesson/                 ConceptView and its sections (shared by core and user lessons)
    exercise/               one component per exercise type, umlaut bar, feedback
    tables/                 conjugation, articles (colour-coded), generic tables
    dictionary/             entry page, verb and noun tables, search, sentence helper
    visualizers/            article colours, word-order diagram
    editor/                 lesson editor, import dialog
    my-lessons/ dashboard/ review/ settings/ layout/ audio/
  content/
    schema.ts               Zod schema for concepts, exercises, tables, diagrams
    index.ts                registry: validates every concept at import
    prose.ts                slug → MDX "More detail" component
    concepts/<unit>/<slug>/ concept.ts (+ optional more.mdx)
    dictionary/             schema.ts, builders.ts, index.ts, words/*.ts
  lib/
    check-answer.ts         answer checker
    srs.ts                  SM-2 scheduling
    db.ts, db-migrations.ts Dexie database and its version history
    progress.ts             attempts, completion, weak areas
    import-export.ts        lesson files, backups, migrations of file formats
    lesson-draft.ts         editor form model ↔ Concept
    search.ts               Fuse.js search over core content, user lessons and the deck
    conjugate.ts            verb tables from the infinitive plus the irregular parts
    decline.ts              noun declension and adjective comparison
    dictionary-index.ts     every inflected form → its entry, for "type any form" search
    dictionary-search.ts    dictionary search (forms first, then fuzzy German and English)
    sentence-helper.ts      word-by-word sentence analysis
scripts/                    print-german.ts, build-search-index.ts
e2e/                        Playwright tests
```

## Adding a core lesson

1. Create `src/content/concepts/<unit>/<slug>/concept.ts`. Copy an existing lesson as a starting point. `grammar/modal-verbs` is a complete one.

   ```ts
   import type { ConceptInput } from "@/content/schema";

   const concept = {
     id: "my-topic",
     slug: "my-topic",
     order: 345, // position in the track; leave gaps
     titleDe: "...",
     titleEn: "...",
     category: "grammar",
     unit: "Grammar",
     minutes: 15,
     status: "draft",
     // ...see the schema reference below
   } satisfies ConceptInput;

   export default concept;
   ```

2. Import it in `src/content/concepts/index.ts` and add it to `RAW_CONCEPTS`.
3. Optional: add `more.mdx` next to it for longer prose (shown as "More detail"), and register it in `src/content/prose.ts`.
4. Run `pnpm german my-topic` and read every sentence. Then run `pnpm test`. The content tests check that ids, slugs and order numbers are unique, that prerequisites exist and come earlier, that complete lessons have the full shape, and that each lesson's exercise answers pass its own checker.
5. Set `status: "complete"` once a native speaker or teacher has reviewed it.

A concept that doesn't match the schema fails the build with a readable error, for example `Invalid concept "my-topic": ✖ Required → at tables[0].headers[0]`.

### Writing style

Explanations are in plain, short English. Start with what English does. No filler, no hype words. All examples and exercises must be original.

Explanation fields use a small text format: a blank line starts a new paragraph, lines starting with `- ` or `1. ` make lists, and `**bold**` and `*italic*` work. Nothing else is interpreted, which keeps imported lessons from injecting markup.

## The dictionary

Entries live in `src/content/dictionary/words/`, one file per group (strong verbs, food nouns, function words and so on). Each entry stores only what can't be worked out from rules. Conjugation, declension and comparison are generated by `src/lib/conjugate.ts` and `src/lib/decline.ts`, so a regular verb needs nothing beyond its infinitive.

### Adding a word

Use the helpers in `src/content/dictionary/builders.ts`. `en` is one string; separate meanings with `;`. Examples are `[German, English]` pairs, at most four.

```ts
// Strong verb: changed present stem, Präteritum and Partizip II
v(
  "abfahren",
  "to leave, to depart",
  { separable: "ab", aux: "sein", presentStem: "fähr", past: "fuhr", participle: "abgefahren" },
  ["travel"],
  [["Der Zug fährt um acht Uhr ab.", "The train leaves at eight."]],
),

// Noun: article, word, plural (null if there is none)
n("die", "Wohnung", "Wohnungen", "flat, apartment", ["home"], [...]),

// Adjective: comparison only when it is irregular
a("gut", "good; well", ["basics"], [...], { comparative: "besser", superlative: "besten" }),

// Anything else
w("preposition", "mit", "with", ["grammar"], [...]),
```

What to store:

- Verbs. `separable` for the prefix, `aux: "sein"` for Perfekt with sein, `reflexive: true` for sich verbs (leave "sich" out of the word), `presentStem` when du and er/sie/es change the vowel, and `past` plus `participle` for strong and mixed verbs. Only verbs that fit no pattern (sein, haben, werden, wissen, the modals) store full tables in `presentForms`, `pastForms` and `subjunctiveForms`.
- Nouns. `nDeclension: "n"` or `"en"` for weak masculine nouns (der Student, den Studenten), `genitive` when the default ending is wrong, `pluralOnly` for words like Eltern, and `feminine` for the female form.
- Adjectives. `comparative` and `superlative` (without "am") when they are irregular, `noComparison` for words that don't compare.

The id is made from the word (ä → ae, ß → ss). Pass `id` yourself when two entries share a word, as with `sein` (to be) and `sein-possessive`. The full schema is in `src/content/dictionary/schema.ts`. An entry that doesn't match it fails the build.

After adding words, run `pnpm german --dictionary` and check the principal parts and plurals, then `pnpm test`. The tests check that ids are unique, that every verb conjugates, that linked lessons exist and that every entry has an example.

### Search and word pages

`scripts/build-search-index.ts` writes `public/dictionary-index.json`: a short summary of each entry plus every inflected form, labelled ("ging → Präteritum: ich, er/sie/es"). The search page loads it once, so you can type "ging", "Häusern" or "stehe auf" and land on the right word. Umlauts are optional. Each word also has a static page at `/dictionary/<id>/` with its tables, and a button that adds it to the review deck.

### Sentence helper

`/dictionary/sentence/` looks up each word of a sentence in the same index. It picks the most likely entry from context (a capital letter mid-sentence suggests a noun), finds the conjugated verb, and checks the end of the clause for a separable prefix, a Partizip II or an infinitive. It also explains contractions like `am` (an + dem) and lists words it doesn't know.

It doesn't translate. The English line under each sentence is a word-by-word gloss, and the page says so. Real translation needs a service like DeepL, which would mean an API key and sending text off the device. That doesn't fit a local-first app, so it was left out.

## Schema reference

The full definition is in `src/content/schema.ts`. Core lessons and user lessons use the same schema.

### Concept

| Field                                     | Type                                                           | Notes                                                       |
| ----------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------- |
| `id`, `slug`                              | string                                                         | slug: lowercase letters, digits and dashes                  |
| `order`                                   | integer                                                        | Position in the track                                       |
| `titleDe`, `titleEn`                      | string                                                         |                                                             |
| `category`                                | `grammar` \| `vocabulary` \| `writing` \| `speaking` \| `exam` |                                                             |
| `unit`                                    | string, optional                                               | Group on the Learn page (Basics, Grammar, Vocabulary, Exam) |
| `level`                                   | `A1`                                                           |                                                             |
| `minutes`                                 | 1–120                                                          |                                                             |
| `status`                                  | `draft` \| `complete`                                          |                                                             |
| `summary`                                 | string                                                         | One line for cards and search                               |
| `prerequisites`                           | string[]                                                       | Concept ids                                                 |
| `englishExplanation`, `germanExplanation` | text                                                           | Text format above                                           |
| `englishExamples`                         | string[]                                                       | Up to 6 English sentences                                   |
| `comparisonRows`                          | `{ english, german, note }[]`                                  | The English / German / What changes table                   |
| `helps`, `misleads`                       | string[]                                                       | "Where English helps / misleads"                            |
| `hindiHint`                               | string, optional                                               | Only when it really helps                                   |
| `tables`                                  | Table[]                                                        | See below                                                   |
| `diagrams`                                | WordOrder[]                                                    | See below                                                   |
| `examples`                                | `{ de, en, gloss? }[]`                                         | `gloss` is a word-by-word English version                   |
| `mistakes`                                | `{ wrong, right, why }[]`                                      |                                                             |
| `exercises`                               | Exercise[]                                                     | See below                                                   |
| `vocab`                                   | `{ de, en, article?, plural? }[]`                              | Nouns without the article in `de`, plural as the full word  |

### Tables

| `kind`                | Fields                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `conjugation`         | `title?`, `pronouns` (default ich…sie/Sie), `verbs: { infinitive, english?, forms[], highlight[] }[]` |
| `articles`            | `title?`, `rows: { label, cells: [der, die, das, plural] }[]` (colour-coded)                          |
| `generic` / `endings` | `title?`, `headers[]`, `rows[][]` (each row as long as `headers`)                                     |

### Word-order diagrams

```ts
{ kind: "wordOrder", caption?, english: Token[], german: Token[] }
// Token: { text, role }
// role: subject | verb | infinitive | participle | prefix | object | time | manner
//       | place | negation | question | conjunction | other
```

`verb` is highlighted as position 2. `infinitive`, `participle` and `prefix` are shown moving to the end.

### Exercises

Every exercise has `id`, `type`, `prompt`, `skill` (used for weak areas), and optional `hint` and `explanation`.

| `type`             | Fields                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------ |
| `multipleChoice`   | `question`, `options[]` (2–6), `answer` (index)                                            |
| `fillBlank`        | `sentence` with `___` per blank, `answers: string[][]` (accepted answers per blank), `en?` |
| `reorderWords`     | `words[]` in the correct order, `alsoAccept: string[][]` (same words), `en`                |
| `conjugationTable` | `verb`, `english?`, `pronouns`, `answers[]`, `given[]` (rows shown filled in)              |
| `translate`        | `en`, `answers[]` (accepted German)                                                        |
| `matchPairs`       | `pairs: { left, right }[]` (2–8)                                                           |
| `articlePick`      | `nouns: { noun, article, en? }[]`                                                          |

### Answer checking

`src/lib/check-answer.ts`, covered by `check-answer.test.ts`:

- ae, oe, ue and ss count as ä, ö, ü and ß.
- Whitespace is trimmed and collapsed. Punctuation at the edges of words is ignored.
- Case matters, because German capitalizes nouns. The first letter of a sentence is the exception: the answer is accepted with a note. For a blank in the middle of a sentence, the first letter is strict too.
- When case is the only problem, the feedback names the words: "Capitalize nouns: Hund." Formal Sie/Ihnen gets its own message.
- Otherwise the answer is aligned word by word with the closest accepted answer, and the wrong, missing or extra words are marked.
- Reorder exercises ignore case (the learner can't change a tile's case). Conjugation tables ignore case too.

## User data: storage, backup and restore

### Where it lives

Everything the learner creates is in IndexedDB, through Dexie (`src/lib/db.ts`), in a database called `deutsch-bridge`:

| Table      | Key                           | Contents                                           |
| ---------- | ----------------------------- | -------------------------------------------------- |
| `progress` | `"core:<id>"` / `"user:<id>"` | Status, solved exercise ids, timestamps            |
| `attempts` | auto                          | Every answer check, with its skill, for weak areas |
| `vocab`    | normalised `"article word"`   | Review cards with SM-2 state                       |
| `lessons`  | lesson id                     | User lessons (Concept + `createdAt`, `updatedAt`)  |
| `settings` | key                           | Speech rate, review options, last backup time      |

Data stays in that browser on that device. Clearing site data, private browsing or switching browsers means starting empty. The Settings page explains this to learners and shows what is stored. On first visit the app calls `navigator.storage.persist()` so the browser doesn't evict the data under storage pressure; Settings shows the result and can ask again.

### Changing the database schema

`src/lib/db-migrations.ts` holds the version history. Never edit a version that has shipped. Add a new one:

```ts
export const DB_VERSIONS: DbVersion[] = [
  { version: 1, stores: V1_STORES },
  {
    version: 2,
    stores: { ...V1_STORES, vocab: "id, due, conceptKey, addedAt, tag" },
    upgrade: (tx) =>
      tx
        .table("vocab")
        .toCollection()
        .modify((card) => {
          card.tag ??= "lesson";
        }),
  },
];
```

Dexie runs `upgrade` once for browsers on an older version and keeps all existing rows. `db-migrations.test.ts` shows the pattern with a simulated upgrade.

### Backups

Settings → "Export all my data" downloads one JSON file:

```json
{
  "app": "deutsch-bridge",
  "kind": "backup",
  "formatVersion": 1,
  "dbVersion": 1,
  "exportedAt": "2026-10-22T10:00:00.000Z",
  "data": { "progress": [], "attempts": [], "vocab": [], "lessons": [], "settings": [] }
}
```

"Import backup" validates every row with Zod, shows what's inside, and offers two modes:

- **Merge** keeps this browser's data and adds the backup. When both have the same lesson, progress row or card, the newer one wins. Attempts are added if not already there.
- **Replace** deletes this browser's data first, then restores the backup exactly.

Damaged rows are skipped and counted. Nothing is written until you confirm. "Delete all my data" downloads a backup before it clears anything.

### Lesson files

My Lessons can export one lesson or all of them:

```json
{
  "app": "deutsch-bridge",
  "kind": "lessons",
  "formatVersion": 1,
  "exportedAt": "...",
  "lessons": [/* Concept */]
}
```

Import also accepts a backup file (its lessons), a single lesson object or an array of lessons. Each lesson is validated separately, so one broken lesson doesn't block the rest. Before anything is saved you see a preview with the errors for invalid lessons. If a lesson has the same id as one you already have, you choose per lesson (or for all): skip, replace, or keep both (the copy gets a new id and a "(copy)" title).

Files from a newer format version are refused with a clear message. Older versions go through the steps in `FILE_MIGRATIONS` in `src/lib/import-export.ts`.

## Technical notes

**Static export.** No Server Actions, route handlers, middleware or request-time features. `cacheComponents` (on by default in new Next.js 16 apps) is turned off because it targets server rendering and adds nothing to a static site. `/learn/[slug]` uses `generateStaticParams` with `dynamicParams = false`. User lessons can't be known at build time, so they use query params (`/my-lessons/view/?id=...`) and render on the client, inside a `Suspense` boundary as `useSearchParams` requires.

**MDX.** Long-form core prose uses `@next/mdx`. It compiles MDX to React components at build time, so the output is plain static HTML with no MDX runtime and no extra setup for `output: "export"`. The MDX map (`src/content/prose.ts`) is only imported by the server-rendered lesson page, so MDX never reaches client bundles. User lessons never use MDX. Compiling MDX from an imported file would mean running code from a stranger's file, so their text fields use the small safe format described above.

**One renderer.** `ConceptView` uses no hooks of its own. It renders core lessons as server components (static HTML with client islands for exercises and audio) and user lessons inside client pages. The editor preview uses the same component.

**Search.** `scripts/build-search-index.ts` writes `public/search-index.json` from the core content and the dictionary at build time. The search dialog (Ctrl+K or `/`) loads Fuse.js, that index, the user's lessons and the review deck only when it's opened. Search ignores umlauts: "moechte" and "mochte" both find "möchte".

**Audio.** Browser SpeechSynthesis with a de-DE voice if there is one, otherwise any German voice. Without one, the app explains how to install a German voice on Windows, macOS and Android.

**shadcn/ui.** `components.json` is set up for the shadcn CLI (radix-nova style). The components in `src/components/ui` were added by hand because the build environment couldn't reach the shadcn registry; `pnpm dlx shadcn@latest add <component>` works normally elsewhere.

## Testing

- `pnpm test`: the answer checker, SM-2, the review queue, progress and weak areas, import/export and backups (with fake-indexeddb), the editor's draft conversion (every core lesson must survive draft → concept unchanged), search, content integrity, verb conjugation, noun declension, dictionary search and the sentence helper.
- `pnpm test:e2e`: Playwright against the static build at 375px. It answers exercises, checks the progress, review and search flow, searches the dictionary and runs the sentence helper, creates, exports, re-imports and deletes a user lesson, exports and merges a backup, and checks that no page scrolls sideways.
- `pnpm german`: a human review of every German sentence. Run it after any content change.

## Status

The four lessons used to set the quality bar are complete: Verb in position 2, Modal verbs, Perfekt (haben or sein) and nicht vs kein. The other 38 concepts have full outlines, at least three examples and three exercises each, and are marked draft. They should be reviewed by a teacher or native speaker and expanded before being marked complete.

Known gaps:

- The editor edits generic tables only. Conjugation and article tables and word-order diagrams in imported lessons are kept unchanged but can't be edited in the form.
- Article colours appear in tables, vocab lists and article exercises, but not inside example sentences.
