# Phase 1 Portfolio Completion Design

**Status:** owner decisions approved; written design awaiting owner review  
**Date:** 2026-08-25  
**Scope:** production-quality Intro → SettleDiff → Vault Steward arrival  
**Audience:** Ibrahim and Codex implementation/review agents

## Purpose

Complete Phase 1 as an Apple-like, scroll-controlled technical narrative. The
existing prototype proves static export, core components, basic scroll control,
and reduced-motion structure. The completion work must make the story factual,
responsive, visually continuous, measurable, and release-ready without adding
generic portfolio scope.

## Research basis

This design reconciles:

- the local historical `product-spec.md`;
- the current portfolio implementation at baseline commit `0569cd3`;
- [SettleDiff](https://github.com/ibrahim1023/SettleDiff) at
  `380c30cc759a7eab0a27c7f8587c93ac3c42f8ce`;
- the [SettleDiff live-run report](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/live-run-report-2026-08-21.md);
- the sanitized [`failed-broadcast` fixture](https://github.com/ibrahim1023/SettleDiff/tree/main/fixtures/failed-broadcast);
- [Vault Steward](https://github.com/ibrahim1023/vault-steward) at
  `21655f0bfc1972601570ff9cf38efd663cfdfac3`;
- Vault Steward's [walkthrough](https://github.com/ibrahim1023/vault-steward/blob/main/docs/screenshots.md)
  and [architecture](https://github.com/ibrahim1023/vault-steward/blob/main/docs/architecture.md);
- owner decisions recorded in `docs/DECISIONS.md`.

## Problem statement

The prototype is structurally healthy but not yet the intended experience:

1. historical and implemented content contains evidence-semantic drift;
2. the desktop runway is too short for inspectable Apple-like pacing;
3. mobile reuses a desktop-oriented stage instead of a purpose-built branch;
4. SettleDiff fades into Vault Steward instead of visibly transforming;
5. timeline state, CSS state, and documentation can drift independently;
6. automated tests prove only coarse scroll behavior;
7. performance, browser, device, and deployment acceptance evidence is absent.

## Chosen approach

Retain the current lightweight Next.js/GSAP architecture, then strengthen its
boundaries instead of introducing another framework. Build one media-aware
narrative lifecycle with separate desktop and mobile compositions, a static
reduced-motion branch, one shared semantic state contract, and persistent
evidence objects that cross-transform into Vault Steward roles.

This approach preserves the working static-export and accessibility baseline,
keeps the bundle small, and directs implementation effort toward choreography
and evidence rather than infrastructure churn.

### Alternatives rejected

**Keep one responsive stage.** Less code, but the current evidence map cannot
remain legible across desktop and mobile without compromising geometry and
pacing.

**Use separate unrelated project sections.** Easier composition, but violates
the central requirement that one visual world transforms into the next.

**Add Three.js or video.** Could create spectacle, but weakens semantic text,
bundle size, accessibility, reverse-scroll behavior, and source-backed object
continuity without solving a requirement DOM/SVG cannot handle.

## Narrative design

### Intro

The intro establishes Ibrahim's approved positioning with restrained motion.
Its selected-work rule becomes the SettleDiff transaction path, so the first
project emerges from an existing object rather than from a blank cut.

### SettleDiff

The story reconstructs a real paid-test incident through sanitized evidence:

```text
REQUEST SENT
→ HTTP 402 / ACTIVITY RECORDED
→ EVIDENCE EXPANDS
→ DIFF / FAIL / UNKNOWN SEPARATE
→ SETTLEMENT PROOF ABSENT
→ UNVERIFIABLE
→ CLAIM / EVIDENCE / FINDING / VERDICT
```

The dominant contradiction is `base ≠ tempo`, but the decisive uncertainty is
the lack of confirmed charge and transaction hash. The design never equates an
attempt record with settlement and never treats `UNKNOWN` as `DIFF`.

### Project transformation

The six SettleDiff evidence objects persist as visible wrappers. During the
final segment, position, connection, accent, and labels evolve into:

```text
NOTE
PROPOSED CHANGE
EVIDENCE SOURCE
POLICY
CURRENT / AFTER
AUDIT / RECHECK
```

The reasoning rail contracts into `FIND → PREVIEW → APPROVE → VERIFY`.
Supporting crossfades are allowed for text overlap, but the user's spatial
tracking must carry the transition.

### Vault Steward arrival

The arrival abstracts the real approval-preview workflow rather than
reproducing an Obsidian screenshot. It becomes stable in normal flow after the
pin releases and contains only the title/source link, approved copy, compact
Current/After preview, four-step rail, and continuation cue.

## Component design

### Shared content and state

`portfolioContent.ts` owns all source-backed copy and object mappings. One
state-range module owns semantic ranges and exports values consumed by timeline
builders and tests. Do not duplicate progress constants in CSS or documentation
without an explicit assertion tying them together.

### Desktop composition

Keep a wide evidence-map scene and full aligned comparison. Use a `650–800vh`
runway with deliberate reading holds. Critical content must fit short landscape
viewports.

### Mobile composition

Create a vertical evidence lineage and compact comparison, not a scaled desktop
map. Use a `400–550vh` runway and selective pinning only where the dynamic
viewport can safely contain it.

### Animation lifecycle

`PortfolioExperience` remains the single client lifecycle owner. A scoped
`gsap.matchMedia()` context constructs one desktop or mobile timeline. Reduced
motion constructs neither. Cleanup reverses all contexts and owned resources.
Orientation or breakpoint changes rebuild correct geometry once.

### Failure behavior

Animated content starts readable. Only successful setup applies animation-ready
styles. If imports, media matching, DOM queries, geometry reads, or
ScrollTrigger setup fail, the complete narrative remains visible and the page
does not strand zero-opacity or off-screen elements.

## Documentation design

- `AGENT_GUIDE.md` is the entry point and authority map.
- `REQUIREMENTS.md` is the reconciled target contract.
- `DECISIONS.md` records owner-approved factual and creative choices.
- `STORYBOARD.md` defines states, ranges, and visual continuity.
- `BUILD_SPEC.md` defines current and target architecture.
- `IMPLEMENTATION_STATUS.md` prevents agents from redoing completed work and
  prioritizes evidence-backed gaps.
- `ACCEPTANCE_RUNBOOK.md` is the release evidence ledger.
- This design explains why the pieces fit together.
- The implementation plan will prescribe exact TDD tasks after owner approval.

## Verification design

### Automated

Extend unit/component coverage for factual content, shared ranges, timeline
segments, media branches, cleanup, and production diagnostics. Extend E2E
coverage to every state, reverse/fast scroll, mobile, orientation change,
mid-page refresh, navigation restore, reduced motion, and animation failure.

### Visual and interaction

Review every required viewport for state legibility, causal emphasis, object
continuity, pin release, and overflow. Record captures or dated reviewer notes.

### Accessibility

Keep Axe coverage and add manual keyboard, focus, heading, reading-order,
VoiceOver, 200% zoom, and iPhone touch-scroll review.

### Performance

Add repeatable production Lighthouse and gzip bundle gates. Record slow/fast
scroll traces and owner-iPhone behavior. Any budget exception requires owner
approval and measured evidence.

### Browser/device scope

Validate Safari, Chrome, Firefox, and Edge on the owner's Mac and iOS Safari on
the owner's iPhone. Android Chrome remains an explicit gap until a borrowed
device or approved remote-device service is available; emulation is not
physical-device evidence.

## Work decomposition

The implementation plan will use independently reviewable units:

1. source-backed content and shared state contract;
2. static desktop/mobile/transformation compositions;
3. media-aware animation lifecycle;
4. desktop choreography and holds;
5. mobile choreography and orientation handling;
6. persistent Vault Steward transformation and stable release;
7. failure enhancement and production diagnostics;
8. complete automated acceptance coverage;
9. performance, bundle, browser, device, and deployment evidence;
10. final acceptance audit and documentation closure.

Each unit begins with a failing focused test where behavior is automatable,
implements the smallest coherent change, runs focused and relevant regression
checks, and ends at a reviewer checkpoint.

## Out of scope

No complete Vault Steward narrative, other projects, About, Contact, footer,
navigation, résumé, blog, CMS, forms, analytics, theme switching, additional
routes, server features, component library, state library, second animation
framework, Three.js, copied Apple treatment, or unsupported project claim.

## Success criteria

This design succeeds when the deployed page communicates the factual story at
any supported motion preference, feels like one reversible scroll-controlled
world, visibly turns SettleDiff evidence into Vault Steward trust boundaries,
passes all available automated and manual gates, and discloses the unavailable
Android device check rather than claiming it.
