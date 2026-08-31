# Ibrahim Arshad — Portfolio

Phase 1 prototype: an Apple-like, scroll-directed narrative that follows one
source-backed SettleDiff incident from request to `UNVERIFIABLE` verdict and
transforms continuously into a minimal Vault Steward approval-preview arrival.

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
pnpm build:pages    # GitHub project Pages build (NEXT_PUBLIC_BASE_PATH=/portfolio)
pnpm build:pages:e2e # instrumented Pages build used only by lifecycle tests
pnpm serve:export   # serve out/ at http://127.0.0.1:4173/portfolio/
```

All build commands emit a static `out/` directory. The production commands differ by the
`NEXT_PUBLIC_BASE_PATH` environment setting, which is applied to Next.js
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
   `https://ibrahim1023.github.io/portfolio/`.

For a root (`username.github.io`) or custom-domain deployment, set
`NEXT_PUBLIC_BASE_PATH=""` (the default) and adjust the workflow accordingly.

## Phase 1 scope

Only the Intro, the SettleDiff cinematic sequence, and the SettleDiff →
Vault Steward transition with a minimal arrival frame exist in this phase.
Factual copy comes from the `failed-broadcast` regression fixture and the
public project repositories. The story uses a sanitized fixture identity and
never claims that the failed attempt settled.

## Documentation

Codex agents should start with [`docs/AGENT_GUIDE.md`](docs/AGENT_GUIDE.md).

- [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) — authoritative Phase 1 target
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — approved factual and creative decisions
- [`docs/STORYBOARD.md`](docs/STORYBOARD.md) — scroll states and choreography
- [`docs/BUILD_SPEC.md`](docs/BUILD_SPEC.md) — current and target architecture
- [`docs/IMPLEMENTATION_STATUS.md`](docs/IMPLEMENTATION_STATUS.md) — completed and missing work
- [`docs/ACCEPTANCE_RUNBOOK.md`](docs/ACCEPTANCE_RUNBOOK.md) — release evidence ledger
