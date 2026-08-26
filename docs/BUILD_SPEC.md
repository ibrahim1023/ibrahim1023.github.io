# Build Spec — Phase 1

This document describes the current implementation and the target architecture
required by `docs/REQUIREMENTS.md`. It does not override factual decisions in
`docs/DECISIONS.md`.

## Current baseline

The repository already provides:

- Next.js App Router with strict TypeScript and static export;
- React 19, GSAP, and ScrollTrigger;
- one page and one client boundary, `PortfolioExperience`;
- Intro, animated SettleDiff, reduced-motion SettleDiff, and minimal Vault
  Steward arrival components;
- centralized factual copy;
- CSS Modules and shared design tokens;
- root and `/portfolio` builds;
- GitHub Pages workflow;
- Vitest component/unit tests and Playwright E2E tests.

The current implementation passes lint, strict type checking, 31 unit/component
tests, both static exports, and 7 Chromium E2E tests as of 2026-08-25. This is a
healthy baseline, not Phase 1 acceptance: see `docs/IMPLEMENTATION_STATUS.md`.

## Target composition

```text
src/app/page.tsx                         semantic page shell only
  └─ PortfolioExperience                client lifecycle owner
      ├─ IntroSection                   intro composition
      └─ NarrativeStage                 media-aware scroll owner
          ├─ SettleDiff desktop stage   wide evidence map
          ├─ SettleDiff mobile stage    vertical/compact composition
          └─ Vault Steward arrival      stable normal-flow destination
```

`page.tsx` contains no animation logic. Presentational components do not read
global scroll position. Factual content remains in
`src/content/portfolioContent.ts`.

## Animation ownership

Use one `gsap.matchMedia()` context rooted at `PortfolioExperience`, with three
mutually exclusive branches:

1. desktop/tablet-landscape narrative;
2. tablet-portrait/mobile narrative;
3. reduced-motion static narrative.

Each animated property has one owner. Timeline construction uses named segment
functions matching storyboard states. CSS may provide readable initial/failure
styles but must not compete with GSAP for active transform or opacity values.

The lifecycle must:

- register ScrollTrigger once on the client;
- build only the active branch;
- remove timelines, triggers, media contexts, observers, and listeners on
  cleanup;
- rebuild correct geometry after a breakpoint or orientation change;
- refresh only at controlled initialization/layout moments;
- never update React state per animation frame;
- leave complete readable content if GSAP setup fails.

## State contract

```ts
type SettleDiffState =
  | "project-established"
  | "request-in-flight"
  | "attempt-recorded"
  | "evidence-expanded"
  | "comparison-visible"
  | "mismatch-isolated"
  | "unverifiable"
  | "reasoning-chain"
  | "vault-steward-arrival";
```

The state names are semantic test/debug labels. Production must not expose a
continuous debug overlay. A `data-state` hook may exist only when gated by a
development/test flag and omitted from the production build.

Target ranges are defined in `docs/STORYBOARD.md`. Agents may tune a boundary
by `±0.02` with visual evidence. Keep a single normalized source of truth so
CSS, state mapping, tests, and GSAP labels cannot drift.

## Object continuity

The current layer fade is insufficient. The target transition reuses visible
objects or shared wrapper geometry so the user can track each role change:

```text
REQUEST   → NOTE
PAYMENT   → PROPOSED CHANGE
VENDOR    → EVIDENCE SOURCE
CHAIN     → POLICY
RESPONSE  → CURRENT / AFTER
ACTIVITY  → AUDIT / RECHECK
```

The reasoning chain contracts into `FIND → PREVIEW → APPROVE → VERIFY` before
the Vault Steward title becomes dominant. Crossfades may support label changes,
but they cannot be the transition's entire visual logic.

## Responsive composition

### Desktop and tablet landscape

- Pinned full-viewport stage.
- Approximately `650–800vh` SettleDiff runway.
- Wide transaction path, evidence map, aligned comparison, and spatial object
  transformation.
- Critical text fits `1024×768` and `1280×720` without clipping.

### Tablet portrait and mobile

- Separate composition and timeline branch.
- Approximately `400–550vh` SettleDiff runway.
- Vertical evidence lineage and compact expected/observed alignment.
- Selective pinning only when the usable dynamic viewport can contain the
  stage.
- No horizontal overflow at `320px`; body text remains at least `16px`.

### Reduced motion

- Normal-flow static panels.
- No ScrollTrigger pin, path travel, parallax, scale sweep, or spatial
  reorganization.
- Full causal story and project transition remain present without JavaScript.
- Exactly one animated/reduced branch participates in layout and the
  accessibility tree.

## Styling and rendering

- Use CSS custom properties for design tokens and named semantic colors.
- Prefer transforms, opacity, SVG strokes, masks, and clip paths.
- Use `will-change` only around measured animation targets and remove it when
  unnecessary.
- Cache geometry at initialization; do not perform forced layout reads in
  scroll callbacks.
- Preserve real text, reading order, and semantic tables/lists where they
  communicate evidence.
- Add only repository-owned SVG/CSS assets in Phase 1.

## Deployment

`NEXT_PUBLIC_BASE_PATH` remains the single deployment setting:

- `""` for root/custom-domain export;
- `/portfolio` for GitHub project Pages.

No component may hard-code the repository path. Static assets use
`withBasePath()` when needed. The workflow must stop before deployment on any
failed lint, type, test, build, E2E, bundle, or configured performance gate.

## Test architecture

### Unit/component

- one authoritative state-range contract;
- timeline segment labels and ordering;
- desktop/mobile/reduced branch selection and cleanup;
- source-backed copy and reading order;
- production debugger exclusion;
- deployment base-path behavior.

### End to end

- exported `/portfolio` load with no failed assets or console errors;
- every named state reached forward and backward;
- fast scroll, reverse scroll, mid-page refresh, and navigation restore;
- desktop and mobile compositions at required viewports;
- orientation/breakpoint rebuild without stale geometry;
- complete reduced-motion story and no long pin;
- GSAP initialization failure leaves readable content;
- automated WCAG 2.2 AA scan.

### Release evidence

- Lighthouse and Web Vitals;
- bundle-size report;
- Mac browser matrix and iPhone Safari;
- deployed GitHub Pages URL and reviewed commit agreement.

Phase 1 physical-device acceptance is intentionally limited to the owner's Mac
and iPhone. Android is outside the supported Phase 1 device scope and does not
block release.

Exact procedures and evidence fields live in `docs/ACCEPTANCE_RUNBOOK.md`.
