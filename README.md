# Ibrahim Arshad — Portfolio

Phase 1 prototype: a cinematic, scroll-directed narrative that follows one
SettleDiff incident from transaction to `UNVERIFIABLE` verdict and transforms
continuously into a minimal Vault Steward arrival frame.

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
pnpm validate      # lint + typecheck + test + both builds + e2e
```

## Static export

```bash
pnpm build          # root / custom-domain build (NEXT_PUBLIC_BASE_PATH="")
pnpm build:pages    # GitHub project Pages build (NEXT_PUBLIC_BASE_PATH=/portfolio)
pnpm serve:export   # serve out/ at http://127.0.0.1:4173/portfolio/
```

Both commands emit a static `out/` directory. The only difference is the
`NEXT_PUBLIC_BASE_PATH` environment setting, which is applied to Next.js
`basePath` in `next.config.ts`. Raw files from `public/` go through
`withBasePath()` in `src/lib/deployment/basePath.ts`; components never
hard-code the repository name.

## Deploy to GitHub Pages

1. Push to `main`. The `Deploy to GitHub Pages` workflow runs lint, typecheck,
   unit/component tests, both static exports, and Playwright e2e tests against
   the exported site before any deployment step runs.
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
public project READMEs; see `docs/BUILD_SPEC.md` and `docs/STORYBOARD.md`.
