# SettleDiff Story Redesign Implementation Plan

**Goal:** Replace the incident-only SettleDiff sequence with an Apple-like,
reversible evolution story that moves from ambiguity to independently verified
settlement and hands one evidence packet cleanly into Vault Steward.

**Architecture:** Keep the existing Next.js, React, GSAP, ScrollTrigger, CSS
Modules, static-export, and progressive-enhancement architecture. Replace the
six-card cinematic model with one persistent transaction artifact plus focused
scene components. Desktop and mobile keep separate compositions; both consume
the same factual content and semantic state contract.

**Tech stack:** Next.js 16, React 19, strict TypeScript, GSAP 3, ScrollTrigger,
CSS Modules, Vitest, Testing Library, Playwright, axe, static export.

**Spec:** `docs/specs/2026-09-02-settlediff-story-redesign.md`

**Implementation method:** Follow this plan inline with ordinary repository
tools. Do not use Superpowers for implementation. Commit after each accepted,
independently testable task.

## Global constraints

- Supported physical devices are the owner's Mac and iPhone only.
- Keep native scrolling, reversibility, and one owner per animated property.
- Keep factual copy in `src/content/portfolioContent.ts`.
- Keep technical labels secondary to plain-language foreground copy.
- Preserve a readable no-JavaScript and GSAP-failure fallback.
- Reduced motion uses normal flow and no long pinned timeline.
- Do not add a component library, state library, second animation framework,
  Three.js, remote font, CMS, server feature, or external visual asset.
- Do not deploy or push without Ibrahim's explicit approval.
- Maintain the existing bundle, Lighthouse, WCAG, static-export, and base-path
  gates.

## File map

- `src/content/portfolioContent.ts` — sole factual copy and source-backed live
  cycle values.
- `src/features/settle-diff/settleDiffTypes.ts` — semantic state and content
  type names.
- `src/features/settle-diff/settleDiffState.ts` — normalized state boundaries.
- `src/features/settle-diff/TransactionArtifact.tsx` — persistent purchase and
  verification object shared by animated layouts.
- `src/features/settle-diff/EvidenceReconstruction.tsx` — Promised, Executed,
  and Recorded layers plus the historical incident state.
- `src/features/settle-diff/IndependentProof.tsx` — provider receipt,
  independent record, and compact deterministic-check rail.
- `src/features/settle-diff/SettleDiffStage.tsx` — desktop composition only.
- `src/features/settle-diff/MobileSettleDiffStage.tsx` — iPhone composition only.
- `src/features/settle-diff/ReducedMotionNarrative.tsx` — complete normal-flow
  equivalent.
- `src/features/settle-diff/SettleDiff.module.css` — desktop geometry and
  charcoal-to-paper visual progression.
- `src/features/settle-diff/MobileSettleDiff.module.css` — mobile geometry and
  dynamic-viewport containment.
- `src/features/settle-diff/ReducedMotionNarrative.module.css` — static visual
  hierarchy.
- `src/features/vault-steward/VaultTransitionOverlay.tsx` — evidence-packet
  boundary and Vault rail only.
- `src/lib/animation/timeline.ts` — named segments and property ownership.
- `src/lib/animation/runtime.ts` — media-scoped lifecycle and cleanup.
- `tests/e2e/scroll-states.spec.ts` — named state behavior and overlap rules.
- `tests/e2e/mobile.spec.ts` — iPhone choreography and usable-viewport checks.
- `tests/e2e/reduced-motion.spec.ts` and `tests/e2e/no-javascript.spec.ts` —
  complete fallback narrative.
- Canonical documents — reconcile the old incident-only requirements with the
  approved redesign after the implementation stabilizes.

---

### Task 1: Replace the factual and semantic story contract

**Files:**

- Modify: `src/content/portfolioContent.ts`
- Modify: `src/content/portfolioContent.test.ts`
- Modify: `src/features/settle-diff/settleDiffTypes.ts`
- Modify: `src/features/settle-diff/settleDiffState.ts`
- Modify: `src/features/settle-diff/settleDiffState.test.ts`

**Produces:**

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

Content exports must include `originIncident`, `verificationSystem`,
`publicVerification`, `verificationChecks`, and `closingThesis`.

- [ ] Write content tests asserting the public cycle is `0.001 USDC`, HTTP 200,
  `12/12`, `VERIFIED`, and explicitly labeled Base Sepolia/testnet.
- [ ] Assert the provider receipt and independent transfer are distinct content
  records.
- [ ] Assert the origin incident retains HTTP 402, `broadcast_failed`,
  `base → tempo`, absent transaction hash, and `UNVERIFIABLE`.
- [ ] Assert the closing thesis is exactly `Don’t trust the receipt. Verify the settlement.`
- [ ] Replace the state tuple and ranges with the ten states and boundaries from
  the approved spec.
- [ ] Run `pnpm vitest run src/content/portfolioContent.test.ts src/features/settle-diff/settleDiffState.test.ts` and verify the new assertions pass.
- [ ] Run `pnpm typecheck` to catch old state names still referenced by the UI;
  record those references as the expected work for Task 2 rather than weakening
  the new contract.
- [ ] Commit with `refactor: update SettleDiff story contract` once the contract
  tests pass and all deliberate compilation breakages are resolved in the same
  task or temporarily isolated behind compatible exports.

### Task 2: Build the new semantic scene structure

**Files:**

- Create: `src/features/settle-diff/TransactionArtifact.tsx`
- Create: `src/features/settle-diff/TransactionArtifact.test.tsx`
- Create: `src/features/settle-diff/EvidenceReconstruction.tsx`
- Create: `src/features/settle-diff/EvidenceReconstruction.test.tsx`
- Create: `src/features/settle-diff/IndependentProof.tsx`
- Create: `src/features/settle-diff/IndependentProof.test.tsx`
- Modify: `src/features/settle-diff/SettleDiffStage.tsx`
- Modify: `src/features/settle-diff/SettleDiffStage.test.tsx`
- Remove after references are gone: `src/features/settle-diff/EvidenceMap.tsx`
- Remove after references are gone: `src/features/settle-diff/ReasoningRail.tsx`
- Remove after references are gone: `src/features/settle-diff/TransactionPath.tsx`

**Interfaces:**

```ts
interface TransactionArtifactProps {
  layout: "desktop" | "mobile";
}

interface EvidenceReconstructionProps {
  layout: "desktop" | "mobile";
}

interface IndependentProofProps {
  layout: "desktop" | "mobile";
}
```

Every animated target receives `data-animatable`. Required timeline hooks are:
`data-artifact`, `data-provider-record`, `data-independent-record`,
`data-reconstruction`, `data-reconstruction-layer`, `data-origin-incident`,
`data-system-boundary`, `data-rail-label`, `data-checks`, `data-check`,
`data-verified`, and `data-closing-thesis`.

- [ ] Write component tests requiring one persistent artifact and exactly three
  reconstruction layers named Promised, Executed, and Recorded.
- [ ] Require separate provider and independent records and a compact list of
  twelve labeled checks; do not render twelve large cards.
- [ ] Require the origin incident to be subordinate to the public verification
  climax in heading order.
- [ ] Recompose `SettleDiffStage` from the three new components and the existing
  source-linked project header.
- [ ] Remove the old comparison table, six-card map, reasoning rail, and large
  `UNVERIFIABLE` climax from the animated desktop DOM.
- [ ] Verify every essential sentence remains real text and the DOM reading
  order follows the causal story.
- [ ] Run `pnpm vitest run src/features/settle-diff/TransactionArtifact.test.tsx src/features/settle-diff/EvidenceReconstruction.test.tsx src/features/settle-diff/IndependentProof.test.tsx src/features/settle-diff/SettleDiffStage.test.tsx`.
- [ ] Run `pnpm typecheck` and `pnpm lint`.
- [ ] Commit with `feat: rebuild SettleDiff scene structure`.

### Task 3: Rebuild mobile and reduced-motion narratives

**Files:**

- Modify: `src/features/settle-diff/MobileSettleDiffStage.tsx`
- Modify: `src/features/settle-diff/MobileSettleDiffStage.test.tsx`
- Modify: `src/features/settle-diff/ReducedMotionNarrative.tsx`
- Modify: `src/features/settle-diff/ReducedMotionNarrative.test.tsx`
- Remove after references are gone: `src/features/settle-diff/MobileEvidenceRail.tsx`

**Consumes:** the three scene components and factual contract from Tasks 1–2.

- [ ] Update the mobile test to require vertical ordering: artifact, receipt,
  unresolved record, three reconstruction layers, historical incident,
  verification boundary, provider record, independent record, checks, verified
  thesis, Vault handoff.
- [ ] Assert mobile does not contain the desktop two-column proof layout class or
  any six-card map hook.
- [ ] Update reduced-motion tests to require all ten semantic states in normal
  flow and no `data-animatable` hooks inside the reduced branch.
- [ ] Recompose `MobileSettleDiffStage` with the shared components using
  `layout="mobile"` and mobile-specific wrapper geometry.
- [ ] Rewrite the reduced-motion narrative as semantic sections and lists; keep
  the technical evidence secondary but present.
- [ ] Remove `MobileEvidenceRail` when no source or test imports it.
- [ ] Run `pnpm vitest run src/features/settle-diff/MobileSettleDiffStage.test.tsx src/features/settle-diff/ReducedMotionNarrative.test.tsx src/features/portfolio/PortfolioExperience.test.tsx`.
- [ ] Run `pnpm typecheck` and `pnpm lint`.
- [ ] Commit with `feat: align mobile and reduced SettleDiff stories`.

### Task 4: Introduce the charcoal-to-paper visual system

**Files:**

- Modify: `src/app/globals.css`
- Modify: `src/features/portfolio/PortfolioExperience.module.css`
- Modify: `src/features/settle-diff/SettleDiff.module.css`
- Modify: `src/features/settle-diff/MobileSettleDiff.module.css`
- Modify: `src/features/settle-diff/ReducedMotionNarrative.module.css`
- Modify: component tests from Tasks 2–3 when class contracts change.

**Produces:** semantic custom properties:

```css
--scene-bg-dark
--scene-bg-evidence
--scene-bg-paper
--scene-ink-on-dark
--scene-ink-on-paper
--scene-accent-uncertain
--scene-accent-verified
--scene-bg-vault
```

- [ ] Add a component contract asserting the SettleDiff stage exposes one
  timeline-controlled scene-surface element.
- [ ] Define light and dark text tokens without changing global homepage
  identity styling.
- [ ] Style the artifact as the dominant object and keep all evidence surfaces
  opaque enough that underlying content cannot show through.
- [ ] Give outgoing scenes hidden-state `visibility`/`pointer-events` behavior
  coordinated with timeline ownership; CSS must not animate GSAP-owned opacity
  or transform properties.
- [ ] Implement desktop proof columns and mobile vertical proof flow.
- [ ] Verify `1024×768`, `1280×720`, `390×844`, and `320×800` compositions with
  browser screenshots before tuning decorative details.
- [ ] Run the relevant component suite plus `pnpm build`.
- [ ] Commit with `feat: add SettleDiff clarity visual arc`.

### Task 5: Replace the master SettleDiff choreography

**Files:**

- Modify: `src/lib/animation/timeline.ts`
- Modify: `src/lib/animation/timeline.test.ts`
- Modify: `src/lib/animation/runtime.ts`
- Modify: `src/lib/animation/runtime.test.ts`
- Modify: `src/lib/animation/media.ts`
- Modify: `src/lib/animation/media.test.ts`
- Modify: `tests/e2e/helpers/narrative.ts`

**Produces:** `SettleDiffTimelineElements` fields matching the hooks from Task 2
and named segment appenders for every approved state.

- [ ] Replace old timeline query tests with exact scoped queries for the new
  artifact, records, layers, system boundary, checks, verified result, thesis,
  and evidence packet.
- [ ] Test that every state name is added once and in approved order.
- [ ] Test exit ownership: each segment clears its prior foreground targets
  before the next segment reaches readable opacity.
- [ ] Test reversible surface color/ink transitions from charcoal through
  evidence-neutral to paper.
- [ ] Test setup-failure cleanup includes every new animatable target and clears
  inline styles without hiding fallback content.
- [ ] Implement one segment function per state and remove the old attempt,
  comparison, conflict, verdict, and reasoning segment functions.
- [ ] Keep one persistent artifact throughout; change its geometry and labels
  without replacing it with a second hero object.
- [ ] Set runway targets to desktop `760vh` and mobile `580vh` initially; tune
  only within the spec ranges using physical-device evidence.
- [ ] Run `pnpm vitest run src/lib/animation/timeline.test.ts src/lib/animation/runtime.test.ts src/lib/animation/media.test.ts`.
- [ ] Run `pnpm typecheck`, `pnpm lint`, and `pnpm build:pages`.
- [ ] Commit with `feat: choreograph independent settlement proof`.

### Task 6: Simplify the Vault Steward handoff

**Files:**

- Modify: `src/features/vault-steward/VaultTransitionOverlay.tsx`
- Modify: `src/features/vault-steward/VaultTransitionOverlay.test.tsx`
- Modify: `src/features/vault-steward/VaultStewardArrival.tsx`
- Modify: `src/features/vault-steward/VaultStewardArrival.test.tsx`
- Modify: `src/features/vault-steward/VaultStewardArrival.module.css`
- Modify: `src/lib/animation/timeline.ts`
- Modify: `src/lib/animation/timeline.test.ts`

**Produces:** one `data-evidence-packet` target that becomes the seed for the
Vault boundary; no dual SettleDiff/Vault labels on six persistent cards.

- [ ] Write tests that reject the retired `REQUEST → NOTE` six-object mapping in
  the transition overlay.
- [ ] Require exactly one evidence packet, one Vault boundary, one Vault title,
  and one four-step rail.
- [ ] Add timeline assertions proving the thesis exits before the evidence
  packet contracts and the Vault title enters only after SettleDiff targets are
  hidden.
- [ ] Remove obsolete transition connector geometry and dual-label styles.
- [ ] Animate the scene surface from cool paper to warm Vault neutral while the
  packet remains visible.
- [ ] Preserve the stable normal-flow Vault arrival and pin release without a
  layout jump.
- [ ] Run `pnpm vitest run src/features/vault-steward src/lib/animation/timeline.test.ts`.
- [ ] Run the focused Vault E2E assertion from `tests/e2e/scroll-states.spec.ts`.
- [ ] Commit with `feat: hand verified evidence to Vault Steward`.

### Task 7: Add overlap, device, accessibility, and fallback acceptance tests

**Files:**

- Modify: `tests/e2e/scroll-states.spec.ts`
- Modify: `tests/e2e/mobile.spec.ts`
- Modify: `tests/e2e/lifecycle.spec.ts`
- Modify: `tests/e2e/reduced-motion.spec.ts`
- Modify: `tests/e2e/no-javascript.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/viewport-matrix.spec.ts`

- [ ] For each named state hold, assert the intended primary object is visible
  and every outgoing primary object has opacity below `0.05` or is hidden.
- [ ] Assert no state has more than three visible elements marked
  `data-meaningful-object`.
- [ ] Assert provider and independent records have non-intersecting bounding
  boxes on desktop and appear sequentially on mobile.
- [ ] Assert the bright workspace has compliant foreground contrast and the
  scene background changes reversibly during backward scroll.
- [ ] Test fast scroll, reverse scroll, mid-scene refresh, browser history, and
  orientation rebuild without stale transforms.
- [ ] Assert the iPhone composition fits within the usable dynamic viewport and
  has no horizontal overflow at `390×844` and `320×800`.
- [ ] Assert reduced motion and no-JavaScript output include the complete causal
  story and do not create a long pin.
- [ ] Run axe at desktop, mobile, and reduced-motion states with no serious or
  critical violations.
- [ ] Run `pnpm test:e2e:pages` and retain failure screenshots/traces only when
  they identify a real defect.
- [ ] Commit with `test: cover redesigned SettleDiff narrative`.

### Task 8: Reconcile canonical documentation and validate the release candidate

**Files:**

- Modify: `README.md`
- Modify: `docs/REQUIREMENTS.md`
- Modify: `docs/STORYBOARD.md`
- Modify: `docs/BUILD_SPEC.md`
- Modify: `docs/AGENT_GUIDE.md`
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_RUNBOOK.md`
- Modify: `docs/DECISIONS.md`

- [ ] Replace incident-only language with the approved evolution story while
  preserving the original incident as a historical example.
- [ ] Record SettleDiff source commit
  `9372c8a06e77d75a6ab0482adf5479964ad2913b` and all supporting source links.
- [ ] Replace the retired six-object Vault mapping with the evidence-packet
  handoff.
- [ ] Update named states, desktop/mobile runway ranges, visual tokens, and
  fallback sequence everywhere.
- [ ] Update implementation status with exact test counts and commit only after
  the final validation run.
- [ ] Run `git diff --check`.
- [ ] Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`,
  `pnpm build:pages`, `pnpm bundle:check`, and `pnpm test:e2e:pages`.
- [ ] Run Lighthouse against the production export and require Performance at
  least 90 and Accessibility, Best Practices, and SEO at least 95.
- [ ] Perform physical-device review on the owner's current Mac Safari and
  iPhone Safari, including forward, reverse, fast scroll, refresh, orientation,
  reduced motion, and the SettleDiff-to-Vault handoff.
- [ ] Do not call the redesign complete until Ibrahim approves the visual
  evidence.
- [ ] Commit with `docs: align portfolio with SettleDiff evolution`.

## Completion evidence

The implementation handoff must report:

- reviewed portfolio commit;
- reviewed SettleDiff source commit;
- unit/component and Playwright counts;
- root and `/portfolio` export results;
- bundle size and Lighthouse results;
- Mac Safari and iPhone Safari observations;
- screenshots of the origin incident, independent-proof, verified, and Vault
  handoff holds;
- any remaining limitations without presenting Android as a supported target.
