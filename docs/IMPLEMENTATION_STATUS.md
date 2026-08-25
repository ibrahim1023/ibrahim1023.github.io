# Phase 1 Implementation Status

**Audit date:** 2026-08-25  
**Audited branch:** `main`  
**Baseline commit:** `0569cd3`  
**Legend:** complete, partial, missing, evidence pending

This matrix compares the repository with `docs/REQUIREMENTS.md`. “Complete”
means the code exists and local evidence passed; it does not imply the whole
phase is accepted.

## Summary

| Area | Status | Highest-priority gap |
|---|---|---|
| Scope and factual content | partial | source-backed copy and mappings are not yet implemented |
| Static deployment baseline | complete | deployed commit/URL evidence still pending |
| Intro | partial | path must visibly continue into SettleDiff |
| SettleDiff static states | partial | evidence semantics and state timing need correction |
| Desktop scroll narrative | partial | runway, holds, and object continuity are below target |
| Mobile narrative | missing | no purpose-built mobile composition or timeline branch |
| Vault Steward transition | partial | current implementation is primarily a layer fade |
| Reduced motion | partial | complete baseline exists; new factual mapping must be added |
| Accessibility | partial | Axe passes; manual AT/zoom/focus review is missing |
| Automated testing | partial | exact state, lifecycle, mobile, failure, and navigation cases missing |
| Performance | missing | no Lighthouse, Web Vitals, trace, or bundle-budget evidence |
| Browser/device acceptance | missing | Mac/iPhone review not recorded; Android unavailable |

## Completed baseline

| Requirement | Evidence |
|---|---|
| Next.js App Router and static export | `next.config.ts`, `src/app/` |
| Strict TypeScript | `tsconfig.json`; `pnpm typecheck` passed 2026-08-25 |
| Root and `/portfolio` exports | `pnpm build` and `pnpm build:pages` passed 2026-08-25 |
| GitHub Pages workflow | `.github/workflows/deploy-pages.yml` |
| Centralized factual content | `src/content/portfolioContent.ts` |
| Intro, SettleDiff, Vault arrival components | `src/features/` |
| One scoped GSAP client owner | `src/features/portfolio/PortfolioExperience.tsx` |
| Named semantic state mapping | `src/features/settle-diff/settleDiffState.ts` |
| Reduced-motion static branch | `ReducedMotionNarrative.tsx` and CSS media contract |
| Skip link and semantic landmarks | `src/components/a11y/SkipLink.tsx`, `src/app/page.tsx` |
| Automated Axe scan | `tests/e2e/accessibility.spec.ts`; passed in both motion modes |
| Unit/component baseline | 31 tests passed on 2026-08-25 |
| Chromium E2E baseline | 7 tests passed on 2026-08-25 |

## Blocking gaps

### B1 — Factual content does not match approved source semantics

Current content still uses `RECEIPT`, treats `0.01 USDC` versus `charge unknown`
as a mismatching amount row, uses `acknowledged`, and retains the older Vault
Steward rail and mapping.

**Required:** implement `docs/REQUIREMENTS.md` and add tests that reject `$0.04`,
`PAID`, unsupported settlement claims, and unlabelled sanitized vendor copy.

### B2 — Vault Steward transformation lacks persistent object continuity

`appendVaultRevealTweens()` fades the Vault layer in and the SettleDiff reasoning
items out. The six evidence objects do not visibly transform into Vault Steward
roles.

**Required:** shared objects or tracked wrapper geometry, label overlap, connector
transformation, approval-gate meaning, and a stable normal-flow arrival after
pin release.

### B3 — No purpose-built mobile branch

One ScrollTrigger and one desktop-oriented stage serve all viewport sizes. The
current fixed `240vh` runway and absolute evidence layout do not satisfy the
mobile storyboard.

**Required:** media-aware lifecycle, vertical/compact composition, mobile
timeline, dynamic viewport handling, orientation rebuild, and mobile E2E cases.

### B4 — Acceptance evidence is incomplete

No Lighthouse, Web Vitals, bundle, performance-trace, Mac browser, iPhone,
Android, or deployed-commit evidence is recorded.

**Required:** complete `docs/ACCEPTANCE_RUNBOOK.md`; keep Android explicitly
unverified until suitable access exists.

## Important gaps

### I1 — State timing contract drift

The implementation ranges differ materially from the historical storyboard,
especially after `comparison-visible`. CSS, state mapping, tests, and timeline
labels can drift because no generated/shared contract enforces all consumers.

### I2 — Intro handoff is not proven as one continuous object

The intro cue line and transaction path animate separately. Existing tests do
not establish a visible continuous handoff or absence of a blank frame.

### I3 — Production debug contract

`data-state` is always written during scrolling. The requirement calls for
development/test instrumentation that is absent from production output.

### I4 — E2E state coverage is too coarse

The current scroll test checks only initial and late states. It does not visit
every named state, assert exact ordering, or verify fast reverse scrolling,
mid-page refresh, browser navigation, and orphan-free reconstruction.

### I5 — Failure enhancement is not exercised

The readable pre-animation fallback is architecturally intended but no E2E test
forces GSAP/ScrollTrigger initialization failure and checks the complete story.

### I6 — Metadata and SEO proof are thin

The layout includes a title and description but no canonical URL, social
metadata, or Lighthouse SEO evidence. Add only the metadata required to meet
the approved release gates; do not expand page scope.

### I7 — Performance gates are prose only

`pnpm analyze` exists, but no automated gzip budget or stored analyzer evidence
is present. Lighthouse thresholds and scroll performance are not enforced.

## Polish gaps

- Validate exact typography and evidence density at every required viewport.
- Tune holds only after state correctness and object continuity exist.
- Verify the Vault green transition remains restrained and accessible.
- Confirm source links are discoverable without becoming CTA clutter.
- Review prose line length and short-height layout at `1280×720`.

## Recommended execution order

1. Source-backed content and shared state contract.
2. Static desktop/mobile/Vault transformation compositions.
3. Media-aware lifecycle and mobile branch.
4. Persistent SettleDiff → Vault transformation.
5. Exact E2E, lifecycle, failure, and accessibility coverage.
6. Performance, bundle, browser, device, and deployment evidence.
7. Final acceptance audit with no scope expansion.
