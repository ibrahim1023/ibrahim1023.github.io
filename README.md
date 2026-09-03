# Ibrahim Arshad — Portfolio

A scroll-directed portfolio: SettleDiff verifies payment evidence, CaseZero
protects investigations from hindsight, and Vault Steward previews a note
correction through explicit approval and verification. Project stories share
a continuous light workspace after SettleDiff's verified result.

Built with Next.js (App Router, static export), TypeScript, and GSAP
ScrollTrigger. No server features, no CMS, no external assets at runtime.

## Requirements

- Node.js `24.1.0` (see `.nvmrc`)
- pnpm `11.22.0` (declared in `packageManager`; enable via `corepack enable`)

## Install

```bash
corepack enable
pnpm install --frozen-lockfile
```

## Run locally

```bash
pnpm dev
```

## Validate

```bash
pnpm lint          # ESLint
pnpm typecheck     # strict TypeScript
pnpm test          # Vitest unit + component tests
pnpm test:e2e      # Playwright against an existing out/ export
pnpm bundle:check  # enforce the 180 KiB gzip page-JavaScript budget
pnpm lighthouse    # run repeatable Lighthouse CI against out/
pnpm validate      # all automated release gates, ending on a production export
```

## Static export

```bash
pnpm build          # root / custom-domain build (NEXT_PUBLIC_BASE_PATH="")
pnpm build:pages    # GitHub user Pages build (NEXT_PUBLIC_BASE_PATH="")
pnpm build:pages:e2e # instrumented Pages build used only by lifecycle tests
pnpm serve:export   # serve out/ at http://127.0.0.1:4173/
```

All build commands emit a static `out/` directory. The user-site deployment has
an empty `NEXT_PUBLIC_BASE_PATH` environment setting, which is applied to Next.js
`basePath` in `next.config.ts`. Raw files from `public/` go through
`withBasePath()` in `src/lib/deployment/basePath.ts`; components never
hard-code the repository name. The E2E build additionally enables lifecycle
probes and is always replaced by a clean production build before validation
artifacts are published.

`pnpm lighthouse` starts and stops the local export server itself and writes
reports to `.lighthouseci/`. Install Chromium with
`pnpm exec playwright install chromium` first. Interaction-to-next-paint and
physical-device touch-scroll traces remain part of manual Mac/iPhone acceptance.
If port `4173` is occupied, choose another with `LHCI_PORT=4174 pnpm lighthouse`.

## Deploy to GitHub Pages

1. Push to `main`. The `Deploy to GitHub Pages` workflow runs lint, typecheck,
   unit/component tests, browser tests, a 180 KiB gzip bundle check, and
   Lighthouse performance/accessibility/best-practice/SEO gates. It rebuilds
   the clean production export before measuring and uploading it.
2. In the repository: **Settings → Pages → Build and deployment → Source →
   GitHub Actions** (one-time setup).
3. The deploy job publishes the validated `out/` artifact to
   `https://ibrahim1023.github.io/` from repository `ibrahim1023.github.io`.

For a root (`username.github.io`) or custom-domain deployment, set
`NEXT_PUBLIC_BASE_PATH=""` (the default) and adjust the workflow accordingly.

## Current scope

The implemented page contains Intro → SettleDiff → CaseZero → Vault Steward,
with independent cinematic chapters and a stable Vault Steward arrival.
Vault's compact correction workbench stays briefly in view for 320px of scroll
using CSS sticky positioning, without another ScrollTrigger pin. Short landscape
viewports use normal flow. The approval example is illustrative, not a live file
edit. A compact footer links to GitHub, X, Medium, and LinkedIn.

“Phase 1” in historical planning documents names the original delivery
milestone, not a product version. Portfolio Phases 2 and 3 have not been
defined. Remaining work is tracked as concrete items: owner Mac/iPhone visual
acceptance, updated project evidence as the repositories evolve, and any
future portfolio sections only after their scope is agreed.
Factual copy combines the historical `failed-broadcast` regression fixture
with the current public x402 verification evidence. The story uses a sanitized
fixture identity, never claims that the failed attempt settled, and keeps the
provider receipt distinct from the independent Base Sepolia transfer proof.

## Documentation

Codex agents should start with [`docs/AGENT_GUIDE.md`](docs/AGENT_GUIDE.md).

- [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) — authoritative Phase 1 target
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — approved factual and creative decisions
- [`CaseZero chapter design`](docs/superpowers/specs/2026-09-03-casezero-portfolio-chapter-design.md) — approved three-project expansion
- [`docs/STORYBOARD.md`](docs/STORYBOARD.md) — scroll states and choreography
- [`docs/BUILD_SPEC.md`](docs/BUILD_SPEC.md) — current and target architecture
- [`docs/IMPLEMENTATION_STATUS.md`](docs/IMPLEMENTATION_STATUS.md) — completed and missing work
- [`docs/ACCEPTANCE_RUNBOOK.md`](docs/ACCEPTANCE_RUNBOOK.md) — release evidence ledger
