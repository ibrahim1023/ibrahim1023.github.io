# Phase 1 Acceptance Runbook

This is the evidence ledger for declaring Phase 1 complete. Do not check an item
from memory or intention. Record the date, commit, environment, command or
procedure, and result.

## Release identity

| Field | Required evidence | Result |
|---|---|---|
| Reviewed implementation commit | full Git commit SHA | pending final redesign commit |
| Deployed commit | full Git commit SHA | pending |
| Production URL | `https://ibrahim1023.github.io/portfolio/` | pending |
| Review date | ISO date | `2026-09-02` redesign review in progress; final review pending |
| Reviewer | name/agent plus owner sign-off | Codex automated review; Ibrahim approved the local transition preview; final sign-off pending |

The reviewed and deployed commits must match.

## Automated gate

Run from a clean dependency installation using Node `24.1.0` and pnpm
`11.22.0`.

```bash
pnpm install --frozen-lockfile
E2E_PORT=4327 LHCI_PORT=4328 pnpm validate
```

Local environment: Node `24.1.0`, pnpm `11.22.0`, macOS, Chromium supplied by
Playwright `1.62.1`. Lighthouse reports are written to `.lighthouseci/` and are
intentionally ignored by Git.

| Gate | Required result | Evidence |
|---|---|---|
| Frozen lockfile install | exit 0 | PASS — `pnpm install --frozen-lockfile`, 2026-09-01 |
| Lint | exit 0 | PASS — `pnpm validate`, 2026-09-01 |
| Strict types | exit 0 | PASS — `pnpm validate`, 2026-09-01 |
| Unit/component tests | all pass | PASS — 16 files, 64 tests, 2026-09-02 redesign |
| Root export | `out/` produced | PASS — `pnpm build` |
| `/portfolio` export | `out/` produced | PASS — clean production rebuild after E2E |
| Chromium E2E | all pass | PASS — 29 tests, including the 8-viewport matrix, 2026-09-02 redesign |
| Production console | no errors or hydration warnings | PASS — diagnostics assertions across E2E matrix |

## Narrative acceptance

Record a screen capture or timestamped reviewer notes for desktop and mobile.

- [ ] The project-establishment hold and persistent transaction artifact are readable.
- [ ] `0.01 USDC`, `0.02 USDC max`, HTTP 402, and `broadcast_failed` describe
      the historical attempt without implying settlement.
- [ ] Reconstructed evidence layers remain spatially related and do not overlap
      the foreground conclusion.
- [ ] Historical `UNVERIFIABLE` cites absent confirmed charge and transaction hash.
- [ ] The visual workspace progresses from dark incident to bright verification.
- [ ] Current `0.001 USDC` and HTTP 200 evidence is legible.
- [ ] Provider `PAYMENT-RESPONSE` and independent Base Sepolia transfer proof
      are simultaneously visible, distinct, and non-overlapping.
- [ ] `12 / 12`, `0 model requests`, and `VERIFIED` receive deliberate holds.
- [ ] Reverse scrolling reconstructs every preceding state.
- [ ] Fast forward/reverse scrolling leaves no orphaned or stale scene.
- [ ] One evidence packet crosses an explicit Vault Steward boundary.
- [ ] The Vault rail reads `FIND → PREVIEW → APPROVE → VERIFY`.
- [ ] The pinned stage releases without a jump.
- [ ] The stable Vault arrival remains legible in normal flow.
- [ ] No out-of-scope portfolio section appears.

Evidence: `tests/e2e/scroll-states.spec.ts`, `tests/e2e/lifecycle.spec.ts`, and
automated redesign review on 2026-09-02. All visual items remain unchecked
until the owner repeats the Mac and iPhone pass against the redesigned story.

## Required viewport matrix

| Viewport | Composition | Result |
|---|---|---|
| `360×800` | mobile | PASS — Chromium emulation, 2026-09-01 |
| `390×844` | mobile/iPhone | PASS — Chromium emulation, 2026-09-01 |
| `768×1024` | tablet portrait | PASS — Chromium emulation, 2026-09-01 |
| `1024×768` | tablet landscape/short desktop | PASS — Chromium emulation, 2026-09-01 |
| `1280×720` | short desktop | PASS — Chromium emulation, 2026-09-01 |
| `1440×900` | desktop | PASS — Chromium emulation, 2026-09-01 |
| `1920×1080` | large desktop | PASS — Chromium emulation, 2026-09-01 |
| `320px` width | overflow safety | PASS — Chromium emulation, 2026-09-01 |

For every row confirm no clipping, horizontal scrolling, unreadable text,
overlapping evidence, or stale geometry.

Evidence: `tests/e2e/viewport-matrix.spec.ts` — 8/8 passed. Emulation is not a
substitute for the physical iPhone checks below.

## Responsive lifecycle

- [x] Crossing the desktop/mobile breakpoint destroys the old branch and builds
      the new one once.
- [x] Portrait ↔ landscape orientation preserves coherent narrative progress.
- [ ] Dynamic mobile browser chrome does not crop critical content.
- [x] Refreshing at the middle and end of the page produces a coherent state.
- [x] Back/forward navigation does not duplicate triggers or break scroll state.
- [x] Unmount/remount leaves no duplicate timeline, trigger, observer, or
      listener.

## Reduced motion and failure enhancement

With operating-system reduced motion enabled:

- [x] Only the static branch participates in layout and the accessibility tree.
- [x] No long pin, path travel, parallax, scale sweep, or object reorganization
      initializes.
- [x] The historical incident, current independent proof, verification result,
      evidence-packet handoff, and Vault arrival are in normal reading order.

With GSAP/ScrollTrigger initialization deliberately blocked:

- [x] Essential animated-branch content remains readable.
- [x] No content is left at zero opacity or an off-screen transform.
- [x] No uncaught page or console error appears.

## Accessibility

### Automated

- [x] Axe has no serious or critical WCAG 2.2 A/AA findings in desktop motion.
- [x] Axe has no serious or critical findings in mobile motion.
- [x] Axe has no serious or critical findings in reduced motion.

### Manual on Mac and iPhone

- [x] Keyboard-only navigation reaches skip and project links in logical order.
- [x] Focus remains visible and is never hidden by pinned content.
- [x] Heading and landmark order is logical.
- [ ] VoiceOver reads the complete causal story in a meaningful order.
- [x] Meaningful SVG has an accessible name; decorative SVG is hidden.
- [x] Evidence meaning does not depend on color.
- [x] Content remains usable at 200% browser zoom.
- [ ] Touch scrolling remains native on iPhone.

Mac evidence: physical MacBook Pro (`Mac16,8`, Apple M4 Pro, macOS `26.6.2`),
2026-09-01. Safari requires Option-Tab when its default “Tab highlights each
item” preference is disabled; the observed order was skip link, SettleDiff
source, then Vault Steward source. Safari and Chrome both retained usable,
unclipped content at 200% zoom.

## Browser and device matrix

| Environment | Availability | Result |
|---|---|---|
| Safari `26.6.2` on owner Mac | available | RETEST REQUIRED — new verification story and handoff |
| Chrome `152.0.7977.65` on owner Mac | available | RETEST REQUIRED — new verification story and handoff |
| Firefox on owner Mac | not installed | pending — installation/owner review required |
| Edge on owner Mac | not installed | pending — installation/owner review required |
| iOS Safari on owner iPhone | available | RETEST REQUIRED — new vertical proof stack and handoff; automated 320–390px checks cover geometry only |

Android is outside the supported Phase 1 device scope. Do not infer or report
Android compatibility from responsive desktop emulation.

## Performance and bundle evidence

Run against a production build, preferably the deployed URL. Record the tool
version, commit, URL, viewport, device/browser, date, and raw report path.

| Metric | Target | Result |
|---|---:|---|
| Lighthouse Performance | ≥ 90 | PASS — 99 in all 3 runs |
| Lighthouse Accessibility | ≥ 95 | PASS — 100 in all 3 runs |
| Lighthouse Best Practices | ≥ 95 | PASS — 96 in all 3 runs |
| Lighthouse SEO | ≥ 95 | PASS — 100 in all 3 runs |
| LCP | ≤ 2.5 s | PASS — 896–901 ms |
| CLS | ≤ 0.1 | PASS — 0 in all 3 runs |
| INP | ≤ 200 ms | pending |
| Route JS + animation dependencies | ≤ 180 KiB gzip | PASS — 180,599 bytes / 184,320-byte limit |

Also record:

- [ ] slow-scroll performance trace;
- [ ] fast-scroll performance trace;
- [ ] absence of persistent scroll-linked long tasks;
- [x] no obvious desktop frame drops — Safari and Chrome manual pass;
- [ ] acceptable owner-iPhone scrolling;
- [ ] bundle analyzer review showing no Three.js, duplicate animation library,
      component framework, or accidental large dependency.

Any budget exception requires a dated owner decision with measured evidence.

## Deployment

- [ ] GitHub Actions validation job passes from a clean runner.
- [ ] Deployment uses the official Pages actions and least privileges.
- [ ] `/portfolio/` loads from the production URL.
- [ ] Every JS, CSS, image, icon, and metadata asset resolves under the subpath.
- [ ] Direct refresh and browser navigation work.
- [x] Root/custom-domain configuration still builds with an empty base path.
- [x] Production contains no development state overlay or diagnostics.

## Final sign-off

Phase 1 result: `PENDING`

Known supported-scope limitations: final automated redesign gates, physical Mac
browser/iPhone acceptance, INP/scroll traces, deployed-commit agreement, and
owner final sign-off remain pending.

Do not change the result to `PASS` while a blocking implementation item or
required Mac/iPhone check remains incomplete. Record any discovered limitation
inside the supported scope and obtain Ibrahim's approval before sign-off.
