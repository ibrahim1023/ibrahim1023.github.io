# Phase 1 Acceptance Runbook

This is the evidence ledger for declaring Phase 1 complete. Do not check an item
from memory or intention. Record the date, commit, environment, command or
procedure, and result.

## Release identity

| Field | Required evidence | Result |
|---|---|---|
| Reviewed commit | full Git commit SHA | pending |
| Deployed commit | full Git commit SHA | pending |
| Production URL | `https://ibrahim1023.github.io/portfolio/` | pending |
| Review date | ISO date | pending |
| Reviewer | name/agent plus owner sign-off | pending |

The reviewed and deployed commits must match.

## Automated gate

Run from a clean dependency installation using Node `24.1.0` and pnpm
`11.22.0`.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build:pages
pnpm test:e2e
```

| Gate | Required result | Evidence |
|---|---|---|
| Lint | exit 0 | pending |
| Strict types | exit 0 | pending |
| Unit/component tests | all pass | pending |
| Root export | `out/` produced | pending |
| `/portfolio` export | `out/` produced | pending |
| Chromium E2E | all pass | pending |
| Production console | no errors or hydration warnings | pending |

## Narrative acceptance

Record a screen capture or timestamped reviewer notes for desktop and mobile.

- [ ] Intro cue line visibly becomes the SettleDiff transaction path.
- [ ] Project-establishment hold is readable.
- [ ] `0.01 USDC` request and `0.02 USDC MAX` are legible during travel.
- [ ] HTTP 402 is shown without implying acknowledgement or payment success.
- [ ] `ACTIVITY RECORDED` and `broadcast_failed` receive a deliberate hold.
- [ ] All six evidence objects retain visible lineage to the request.
- [ ] `DIFF`, `FAIL`, and `UNKNOWN` are semantically distinct.
- [ ] `base ≠ tempo` is prominent without being presented as the sole verdict
      cause.
- [ ] `UNVERIFIABLE` is the visual peak and cites absent settlement proof.
- [ ] Reverse scrolling reconstructs every preceding state.
- [ ] Fast forward/reverse scrolling leaves no orphaned or stale object.
- [ ] Six SettleDiff objects visibly transform into their Vault Steward roles.
- [ ] The Vault rail reads `FIND → PREVIEW → APPROVE → VERIFY`.
- [ ] The pinned stage releases without a jump.
- [ ] The stable Vault arrival remains legible in normal flow.
- [ ] No out-of-scope portfolio section appears.

## Required viewport matrix

| Viewport | Composition | Result |
|---|---|---|
| `360×800` | mobile | pending |
| `390×844` | mobile/iPhone | pending |
| `768×1024` | tablet portrait | pending |
| `1024×768` | tablet landscape/short desktop | pending |
| `1280×720` | short desktop | pending |
| `1440×900` | desktop | pending |
| `1920×1080` | large desktop | pending |
| `320px` width | overflow safety | pending |

For every row confirm no clipping, horizontal scrolling, unreadable text,
overlapping evidence, or stale geometry.

## Responsive lifecycle

- [ ] Crossing the desktop/mobile breakpoint destroys the old branch and builds
      the new one once.
- [ ] Portrait ↔ landscape orientation preserves coherent narrative progress.
- [ ] Dynamic mobile browser chrome does not crop critical content.
- [ ] Refreshing at the middle and end of the page produces a coherent state.
- [ ] Back/forward navigation does not duplicate triggers or break scroll state.
- [ ] Unmount/remount leaves no duplicate timeline, trigger, observer, or
      listener.

## Reduced motion and failure enhancement

With operating-system reduced motion enabled:

- [ ] Only the static branch participates in layout and the accessibility tree.
- [ ] No long pin, path travel, parallax, scale sweep, or object reorganization
      initializes.
- [ ] All evidence, classifications, reasoning, mapping, and Vault arrival are
      present in normal reading order.

With GSAP/ScrollTrigger initialization deliberately blocked:

- [ ] Essential animated-branch content remains readable.
- [ ] No content is left at zero opacity or an off-screen transform.
- [ ] No uncaught page or console error appears.

## Accessibility

### Automated

- [ ] Axe has no serious or critical WCAG 2.2 A/AA findings in desktop motion.
- [ ] Axe has no serious or critical findings in mobile motion.
- [ ] Axe has no serious or critical findings in reduced motion.

### Manual on Mac and iPhone

- [ ] Keyboard-only navigation reaches skip and project links in logical order.
- [ ] Focus remains visible and is never hidden by pinned content.
- [ ] Heading and landmark order is logical.
- [ ] VoiceOver reads the complete causal story in a meaningful order.
- [ ] Meaningful SVG has an accessible name; decorative SVG is hidden.
- [ ] Evidence meaning does not depend on color.
- [ ] Content remains usable at 200% browser zoom.
- [ ] Touch scrolling remains native on iPhone.

## Browser and device matrix

| Environment | Availability | Result |
|---|---|---|
| Safari on owner Mac | available | pending |
| Chrome on owner Mac | available/installable | pending |
| Firefox on owner Mac | available/installable | pending |
| Edge on owner Mac | available/installable | pending |
| iOS Safari on owner iPhone | available | pending |
| Android Chrome on physical mid-range phone | unavailable | unverified |

Android Chrome cannot be marked passing from responsive desktop emulation. Use
a borrowed device or obtain owner approval for a remote-device service. Until
then, disclose it as an acceptance limitation.

## Performance and bundle evidence

Run against a production build, preferably the deployed URL. Record the tool
version, commit, URL, viewport, device/browser, date, and raw report path.

| Metric | Target | Result |
|---|---:|---|
| Lighthouse Performance | ≥ 90 | pending |
| Lighthouse Accessibility | ≥ 95 | pending |
| Lighthouse Best Practices | ≥ 95 | pending |
| Lighthouse SEO | ≥ 95 | pending |
| LCP | ≤ 2.5 s | pending |
| CLS | ≤ 0.1 | pending |
| INP | ≤ 200 ms | pending |
| Route JS + animation dependencies | < 180 KB gzip | pending |

Also record:

- [ ] slow-scroll performance trace;
- [ ] fast-scroll performance trace;
- [ ] absence of persistent scroll-linked long tasks;
- [ ] no obvious desktop frame drops;
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
- [ ] Root/custom-domain configuration still builds with an empty base path.
- [ ] Production contains no development state overlay or diagnostics.

## Final sign-off

Phase 1 result: `PENDING`

Known limitation:

- Android Chrome physical-device validation is unavailable with the owner's
  current Mac/iPhone device set.

Do not change the result to `PASS` while a blocking implementation item or
required available-environment check remains incomplete. If Android remains
unavailable, use `PASS WITH DISCLOSED DEVICE LIMITATION` only after Ibrahim
explicitly accepts that limitation at final review.
