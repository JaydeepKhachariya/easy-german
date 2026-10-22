# Deutsch Bridge

German A1 lessons that start from English. Local-first: no backend, no login. All user data lives in the browser (IndexedDB).

Full README arrives in the final phase.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static export to out/
pnpm start        # serve out/ on http://localhost:3000
pnpm check        # lint, typecheck, format check, unit tests, build
pnpm test:e2e     # Playwright smoke test against out/ (run pnpm build first)
```
