# Phase 1 Implementation Status

**Evidence date:** 2026-09-01

**Implementation branch:** `codex/phase-1-implementation`

**Reviewed implementation commit:** `4fadac81d5ce3fdf1b572be054e0039ae4b2863f`

**Legend:** complete, evidence pending

This matrix compares the repository with `docs/REQUIREMENTS.md`. “Complete”
means the implementation and local automated evidence exist. It does not imply
that Phase 1 has passed owner device acceptance or deployment sign-off.

## Summary

| Area | Status | Remaining evidence |
|---|---|---|
| Scope and factual content | complete | final owner factual scan |
| Static deployment baseline | complete | deployed workflow run and URL |
| Intro and SettleDiff narrative | complete | cross-browser Mac visual pass |
| Desktop choreography | complete | Safari/Firefox/Edge manual pass |
| Mobile choreography | complete | physical iPhone Safari/VoiceOver pass |
| Vault Steward transition | complete | physical-device touch review |
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
| Persistent six-object SettleDiff → Vault transformation | dual labels, transition overlay, timeline ownership tests |
| Clean foreground-frame handoffs | commit `5b179d9`; overlap regression in `scroll-states.spec.ts` |
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

Safari `26.6.2` and Chrome `152.0.7977.65` passed reverse-scroll,
refresh/navigation, keyboard-order, focus, and 200% zoom checks on 2026-09-01.
The owner recording subsequently exposed a blocking shared transition defect:
the animated Vault frame remains visible as the stable Vault arrival enters.
Safari failed final visual acceptance and Chrome must be retested after the
shared fix. Firefox and Edge are not installed; their checks and the physical
Safari reduced-motion confirmation remain pending.

### A2 — Physical iPhone acceptance

Record iPhone model, iOS/Safari version, portrait/landscape behavior, dynamic
browser chrome, native touch scrolling, iOS reduced motion, VoiceOver order,
source links, and the complete mobile transformation.

Owner testing on 2026-09-01 reports that the intended animations are absent.
The received still image confirms the production page loads, but an iPhone
screen recording plus the device/iOS and Reduce Motion settings are still
needed to distinguish runtime failure from the current understated, unpinned
mobile choreography.

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

- Frozen-lockfile install: pass.
- Lint and strict types: pass.
- Unit/component tests: 16 files, 74 tests passed.
- Browser suite: 28 tests passed, including the 8 required viewport checks.
- Root and `/portfolio` production exports: pass.
- Page JavaScript: 180,798 bytes gzip; limit 184,320.
- Lighthouse, three desktop runs: Performance 99, Accessibility 100, Best
  Practices 96, SEO 100, LCP 936–945 ms, CLS 0.

Phase 1 remains **evidence pending** until the owner Mac/iPhone matrix,
interaction traces, deployment agreement, and final owner sign-off are
recorded. Android remains outside the supported Phase 1 scope.
