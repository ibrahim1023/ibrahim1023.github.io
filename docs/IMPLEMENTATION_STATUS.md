# Phase 1 Implementation Status

**Evidence date:** 2026-09-02

**Implementation branch:** `codex/phase-1-implementation`

**Reviewed implementation commit:** pending final redesign commit

**Legend:** complete, evidence pending

This matrix compares the repository with `docs/REQUIREMENTS.md`. “Complete”
means the implementation and local automated evidence exist. It does not imply
that Phase 1 has passed owner device acceptance or deployment sign-off.

## Summary

| Area | Status | Remaining evidence |
|---|---|---|
| Scope and factual content | complete | final owner factual scan of new public verification cycle |
| Static deployment baseline | complete | deployed workflow run and URL |
| Intro and SettleDiff narrative | complete | cross-browser Mac visual pass of redesigned story |
| Desktop choreography | complete | Safari/Firefox/Edge manual pass |
| Mobile choreography | complete | physical iPhone Safari/VoiceOver pass |
| Vault Steward transition | complete | physical-device evidence-packet handoff review |
| Reduced motion and no-JS | complete | physical Safari confirmation |
| Accessibility automation | complete | manual keyboard, zoom, and VoiceOver |
| Automated testing | complete | clean CI runner result |
| Metadata and SEO | complete | deployed URL verification |
| Bundle and Lighthouse gates | complete | deployed/CI report retention |
| Browser/device acceptance | evidence pending | owner Mac and iPhone matrix |

## Completed implementation

| Requirement | Evidence |
|---|---|
| Source-backed SettleDiff facts and prohibited-claim guards | `src/content/portfolioContent.ts`, content tests |
| Shared state timing and exact causal order | `settleDiffState.ts`, timeline/state tests |
| Separate desktop and mobile choreography | `SettleDiffStage.tsx`, `MobileSettleDiffStage.tsx`, media-aware runtime |
| Historical incident plus current public x402 verification cycle | centralized content contract and prohibited-claim tests |
| Persistent transaction artifact and mutually exclusive foreground scenes | `TransactionArtifact.tsx`, timeline ownership tests, overlap E2E |
| Separate provider and independent proof records | `IndependentProof.tsx`, geometry and copy assertions |
| Progressive dark → evidence → paper → warm visual system | shared tokens and desktop/mobile stage styles |
| Evidence-packet SettleDiff → Vault handoff | transition overlay, boundary geometry, timeline regressions |
| Stable normal-flow Vault arrival | `VaultStewardArrival.tsx`, release E2E |
| Reduced-motion, no-JavaScript, and setup-failure fallbacks | runtime tests and reduced/no-JS E2E |
| Production debug gating | no `data-state` in production export E2E |
| Exact state, reverse, fast-scroll, refresh, navigation, and orientation coverage | `tests/e2e/scroll-states.spec.ts`, `lifecycle.spec.ts`, `mobile.spec.ts` |
| Eight required viewport sizes | `tests/e2e/viewport-matrix.spec.ts`; 8/8 passed 2026-09-01 |
| Automated Axe coverage | desktop, mobile, and reduced-motion scans passed |
| Canonical/Open Graph/Twitter metadata | `src/app/layout.tsx`, export smoke assertions |
| Route JavaScript budget | `scripts/check-bundle-budget.mjs`; 180,798 / 184,320 bytes gzip |
| Lighthouse release thresholds | `lighthouserc.cjs`; 99/100/96/100, LCP 936–945 ms, CLS 0 |
| Clean production artifact after instrumented E2E | package scripts and Pages workflow rebuild before measurement/upload |

## Remaining acceptance work

### A1 — Owner Mac browser matrix

Record current Safari, Chrome, Firefox, and Edge versions and results for
keyboard order, focus visibility, 200% zoom, reduced motion, mid-story refresh,
back/forward navigation, and console cleanliness.

Earlier Safari and Chrome checks belong to the retired story. Repeat reverse
scroll, refresh/navigation, keyboard, 200% zoom, and visual review against the
redesigned verification workspace and evidence-packet handoff. Firefox and
Edge are not installed, and physical Safari reduced-motion confirmation
remains pending.

### A2 — Physical iPhone acceptance

Record iPhone model, iOS/Safari version, portrait/landscape behavior, dynamic
browser chrome, native touch scrolling, iOS reduced motion, VoiceOver order,
source links, and the complete mobile transformation.

The redesigned mobile branch uses a native sticky viewport, explicit scene
exits, a compact vertical proof stack, a `580vh` runway, and a single evidence
packet handoff. Automated 320–390px, orientation, reverse-scroll, and geometry
checks cover it; physical iPhone portrait/landscape, dynamic chrome, VoiceOver,
and touch-scroll confirmation must be repeated by the owner.

### A3 — Interaction performance traces

Capture slow-scroll and fast-scroll traces, confirm no persistent long tasks or
obvious frame drops, and record INP. The automated Lighthouse and bundle gates
already pass; these interaction checks remain intentionally manual.

### A4 — Deployment agreement

After Ibrahim explicitly authorizes the push, deploy through the existing
GitHub Pages workflow. Record the reviewed and deployed full SHAs, successful
workflow URL, production URL, direct refresh, and asset-subpath results. The
reviewed and deployed SHAs must match before final sign-off.

## Current gate results

- Lint and strict types: pass.
- Unit/component tests: 16 files, 64 tests passed.
- Browser suite: 29 tests passed, including the 8 required viewport checks.
- Root and `/portfolio` production exports: pass.
- Page JavaScript: 180,599 bytes gzip; limit 184,320.
- Lighthouse, three desktop runs: Performance 99, Accessibility 100, Best
  Practices 96, SEO 100, LCP 896–901 ms, CLS 0.

Phase 1 remains **evidence pending** until the owner Mac/iPhone matrix,
interaction traces, deployment agreement, and final owner sign-off are
recorded. Android remains outside the supported Phase 1 scope.
