# Ibrahim Arshad — Portfolio

A concise portfolio for reliable AI systems. SettleDiff and Vault Steward each have a short, in-place explanation on the homepage, with a separate evidence-led case study. The site follows the visitor's light/dark setting and has no pinned scroll chapters. CaseZero has been removed; the future voice-and-vision project is not represented yet.

Built with Next.js App Router, TypeScript, CSS Modules, Vitest, and Playwright. The résumé is served from `public/ibrahim-arshad-resume.pdf`.

## Local setup

Requires Node 24.1.0 and pnpm 11.22.0 (see `.nvmrc` and `package.json`).

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

For the exact static output used on GitHub Pages:

```bash
pnpm build:pages
pnpm serve:export
```

`out/` contains the export. The user-site deployment has an empty `NEXT_PUBLIC_BASE_PATH`; raw public-file links use `withBasePath()`.

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm test
node --test scripts/refresh-vault-downloads.test.mjs
pnpm build:pages:e2e
pnpm test:e2e
pnpm build:pages
pnpm bundle:check
```

The browser suite covers two natural-flow projects, outcome controls, 320/390px mobile widths, automatic color scheme, reduced motion, no JavaScript, direct-entry case studies, and removal of the CaseZero route. Owner review in Mac Safari and on an iPhone remains a separate release check.

## Vault Steward download count

The homepage imports the small checked-in `src/content/vaultStewardDownloads.json`. `scripts/refresh-vault-downloads.mjs` fetches official Obsidian community-plugin statistics during deployment and writes a new dated count only when the value is valid; otherwise it retains the checked-in fallback. A daily GitHub Actions run refreshes and publishes the count. For a local refresh, run `node scripts/refresh-vault-downloads.mjs` before rebuilding. It is not a live browser ticker.

## Deployment

Pushing to `main` starts the GitHub Pages validation and deployment workflow for `https://ibrahim1023.github.io/`. Publication of this redesign was approved on October 10, 2026. The workflow must pass before GitHub Pages serves the new version.

## Documentation for Codex agents

Start with [`docs/superpowers/specs/2026-10-09-portfolio-editorial-redesign-design.md`](docs/superpowers/specs/2026-10-09-portfolio-editorial-redesign-design.md) and [`docs/superpowers/plans/2026-10-09-portfolio-editorial-redesign.md`](docs/superpowers/plans/2026-10-09-portfolio-editorial-redesign.md). Earlier Phase 1 storyboard/build documents describe the historical three-project scroll version; they are retained for context, not the current route contract.

SettleDiff copy must preserve the distinction between a provider receipt, independent settlement, and paid delivery failure. The [September 28 validation](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/pr2-live-validation-2026-09-28.md) is the primary current evidence; the [older live report](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/live-run-report-2026-08-21.md) is historical context. Vault Steward's repair preview is illustrative and stops before owner approval.
