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

Current gate counts and acceptance evidence live in
`docs/IMPLEMENTATION_STATUS.md`; do not copy them into architecture docs.

## Target composition

```text
src/app/page.tsx                         semantic page shell only
  └─ PortfolioExperience                client lifecycle owner
      ├─ IntroSection                   intro composition
      └─ NarrativeStage                 media-aware scroll owner
          ├─ SettleDiff desktop stage   persistent artifact + proof workspace
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
  | "purchase-in-flight"
  | "outcome-uncertain"
  | "evidence-reconstructed"
  | "origin-incident"
  | "system-evolved"
  | "independent-proof"
  | "checks-complete"
  | "verified"
  | "vault-handoff";
```

The state names are semantic test/debug labels. Production must not expose a
continuous debug overlay. A `data-state` hook may exist only when gated by a
development/test flag and omitted from the production build.

Target ranges are defined in `docs/STORYBOARD.md`. Agents may tune a boundary
by `±0.02` with visual evidence. Keep a single normalized source of truth so
CSS, state mapping, tests, and GSAP labels cannot drift.

## Object continuity

One transaction artifact persists from the origin request through the verified
result. Evidence scenes are mutually exclusive foreground frames; a prior frame
must exit before the next settles. At the end, the verified evidence compresses
into one packet that crosses an explicit boundary into Vault Steward. The full
SettleDiff interface does not relabel into the next product.

## Responsive composition

### Desktop and tablet landscape

- Pinned full-viewport stage.
- `760vh` SettleDiff runway.
- Persistent artifact, reconstructed evidence layers, separated provider and
  independent proof records, compact checks, and evidence-packet handoff.
- Critical text fits `1024×768` and `1280×720` without clipping.

### Tablet portrait and mobile

- Separate composition and timeline branch.
- `580vh` SettleDiff runway inside a `680dvh` narrative container.
- Vertical artifact travel, reconstruction layers, separated proof records,
  compact checks, and evidence-packet handoff.
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
