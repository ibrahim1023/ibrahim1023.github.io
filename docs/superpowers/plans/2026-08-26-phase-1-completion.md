# Phase 1 Portfolio Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the Phase 1 portfolio as a source-backed, Apple-like, reversible scroll narrative that transforms SettleDiff evidence into a stable Vault Steward approval-preview arrival on desktop, mobile, and reduced motion.

**Architecture:** Retain the Next.js/React/GSAP static-export baseline. One `PortfolioExperience` lifecycle uses media-scoped desktop or mobile timelines, while reduced motion remains normal-flow HTML; a shared semantic state/content contract drives both layouts, and persistent evidence wrappers cross-transform into Vault Steward roles before the pin releases.

**Tech Stack:** Next.js 16.3.2 App Router, React 19.2.8, TypeScript 5.9.3, GSAP 3.15.0 + ScrollTrigger, CSS Modules, Vitest 4.1.11, Testing Library, Playwright 1.62.1, Axe, GitHub Pages static export.

**Spec:** `docs/superpowers/specs/2026-08-25-phase-1-completion-design.md`

## Global Constraints

- Scope is exactly Intro → SettleDiff incident → continuous transformation → stable Vault Steward arrival; do not add conventional portfolio sections.
- Keep `Ibrahim Arshad`, `AI Systems Engineer`, and `I build and evaluate reliable agentic systems.`
- Use only the approved `0.01 USDC` quote, `0.02 USDC` maximum, `ACTIVITY RECORDED`, `broadcast_failed`, HTTP 402, `base → tempo`, absent confirmed charge/hash, and `UNVERIFIABLE` facts.
- Never use `$0.04`, `PAID`, or language claiming that the failed attempt settled.
- Treat chain drift as `DIFF`, HTTP 402 as `FAIL`, and missing settlement evidence as `UNKNOWN`; chain drift alone is not the verdict cause.
- Vault Steward uses `FIND → PREVIEW → APPROVE → VERIFY` and the mapping in `docs/REQUIREMENTS.md`.
- Match Apple's controlled pacing, pinning, reversibility, hierarchy, and object continuity; do not copy Apple assets, layouts, typography, wording, or product-page compositions.
- Use separate desktop, mobile, and reduced-motion branches; mobile is not a scaled desktop stage.
- Keep essential labels as semantic real text and meet WCAG 2.2 AA.
- Do not add Three.js, another animation framework, a component library, state management, CMS, server feature, analytics, runtime font request, or external visual asset.
- Node is exactly `24.1.0`; pnpm is exactly `11.22.0`.
- The production target remains `https://ibrahim1023.github.io/portfolio/` with `NEXT_PUBLIC_BASE_PATH=/portfolio`.
- Route-specific page JavaScript plus animation dependencies must remain below `180 KB` gzip unless Ibrahim approves a measured exception.
- The supported Phase 1 physical-device scope is the owner's Mac and iPhone. Android is out of scope and must not become a release blocker or an inferred compatibility claim.
- Read `docs/AGENT_GUIDE.md`, `docs/REQUIREMENTS.md`, `docs/DECISIONS.md`, `docs/STORYBOARD.md`, and `docs/IMPLEMENTATION_STATUS.md` before starting Task 1.

---

## Target File Map

### Existing files to modify

- `src/content/portfolioContent.ts` — sole factual copy, classifications, project URLs, and SettleDiff→Vault mapping.
- `src/features/settle-diff/settleDiffTypes.ts` — semantic state and evidence classification types.
- `src/features/settle-diff/settleDiffState.ts` — one normalized timing contract.
- `src/features/settle-diff/SettleDiffSection.tsx` — mutually exclusive desktop/mobile/reduced branches.
- `src/features/settle-diff/SettleDiffStage.tsx` — desktop stage composition and shared transformation hooks.
- `src/features/settle-diff/EvidenceMap.tsx` — desktop evidence/comparison plus persistent dual-role wrappers.
- `src/features/settle-diff/TransactionPath.tsx` — request, budget boundary, and HTTP 402 return.
- `src/features/settle-diff/ReducedMotionNarrative.tsx` — complete static factual story and mapping.
- `src/features/settle-diff/SettleDiff.module.css` — desktop state composition and transformation geometry.
- `src/features/portfolio/PortfolioExperience.tsx` — only animation lifecycle owner.
- `src/features/portfolio/PortfolioExperience.module.css` — pinned narrative and stable normal-flow release.
- `src/features/vault-steward/VaultStewardArrival.tsx` — stable source-linked approval-preview arrival.
- `src/features/vault-steward/VaultStewardArrival.module.css` — stable arrival and restrained green system.
- `src/lib/animation/timeline.ts` — typed queries and desktop/mobile named timeline segments.
- `src/styles/tokens.css` — semantic PASS/DIFF/FAIL/UNKNOWN and Vault accent tokens.
- `src/app/layout.tsx` — canonical and social metadata.
- `package.json`, `.github/workflows/deploy-pages.yml` — bundle/Lighthouse release gates.
- Existing unit/component/E2E tests — replace coarse assertions with target contracts.
- `docs/IMPLEMENTATION_STATUS.md`, `docs/ACCEPTANCE_RUNBOOK.md` — close evidence as work lands.

### New files to create

- `src/components/projects/ProjectSourceLink.tsx` — shared accessible external source-link treatment for exactly two projects.
- `src/components/projects/ProjectSourceLink.module.css` — understated link styling.
- `src/features/settle-diff/MobileSettleDiffStage.tsx` — purpose-built mobile scene.
- `src/features/settle-diff/MobileEvidenceRail.tsx` — vertical mobile evidence/comparison/mapping structure.
- `src/features/settle-diff/MobileSettleDiff.module.css` — mobile geometry and dynamic-viewport safety.
- `src/features/vault-steward/VaultTransitionOverlay.tsx` — in-pin title/rail shown after persistent object relabeling.
- `src/features/vault-steward/VaultTransitionOverlay.test.tsx` — transition semantic contract.
- `src/lib/animation/media.ts` — media queries, layouts, runway constants, and pixel sizing.
- `src/lib/animation/media.test.ts` — exact media/runway tests.
- `src/lib/animation/runtime.ts` — fail-safe GSAP/ScrollTrigger setup and production-safe instrumentation.
- `src/lib/animation/runtime.test.ts` — setup, failure, cleanup, and debug-gating tests.
- `tests/e2e/helpers/narrative.ts` — normalized scroll and visual-state helpers.
- `tests/e2e/mobile.spec.ts` — mobile layout/orientation/overflow contract.
- `tests/e2e/lifecycle.spec.ts` — refresh/navigation/fast-scroll/failure contract.
- `scripts/check-bundle-budget.mjs` — gzip page-chunk budget gate.
- `scripts/check-bundle-budget.test.mjs` — deterministic manifest/budget tests.
- `lighthouserc.mjs` — repeatable production Lighthouse assertions.

---

### Task 1: Lock Source-Backed Content and the Shared State Contract

**Files:**
- Modify: `src/content/portfolioContent.ts`
- Modify: `src/features/settle-diff/settleDiffTypes.ts`
- Modify: `src/features/settle-diff/settleDiffState.ts`
- Modify: `src/features/settle-diff/settleDiffState.test.ts`
- Create: `src/content/portfolioContent.test.ts`
- Modify: `src/features/vault-steward/VaultStewardArrival.tsx`
- Modify: `src/features/vault-steward/VaultStewardArrival.test.tsx`
- Modify: `src/features/portfolio/PortfolioExperience.test.tsx`

**Interfaces:**
- Consumes: factual requirements from `docs/REQUIREMENTS.md` and timing from `docs/STORYBOARD.md`.
- Produces: `EvidenceClassification`, `EvidenceObjectId`, `STATE_RANGES`, `ORDERED_STATES`, `projectLinks`, `evidenceObjects`, `comparisonRows`, `reasoningChain`, and `vaultSteward` for every later task.

- [ ] **Step 1: Write failing factual-contract tests**

Create `src/content/portfolioContent.test.ts` with exact assertions:

```ts
import { describe, expect, test } from "vitest";

import {
  comparisonRows,
  evidenceObjects,
  projectLinks,
  settleDiff,
  vaultSteward,
} from "./portfolioContent";

describe("portfolio factual contract", () => {
  test("uses only the approved failed-broadcast evidence", () => {
    const serialized = JSON.stringify({ settleDiff, evidenceObjects, comparisonRows });

    expect(settleDiff.requestAmount).toBe("0.01 USDC");
    expect(settleDiff.maxBudget).toBe("0.02 USDC");
    expect(settleDiff.returnLabel).toBe("HTTP 402");
    expect(settleDiff.activityStatus).toBe("broadcast_failed");
    expect(serialized).not.toContain("$0.04");
    expect(serialized).not.toContain('"PAID"');
    expect(serialized).not.toContain("acknowledged");
  });

  test("separates DIFF, FAIL, PASS, and UNKNOWN", () => {
    expect(Object.fromEntries(comparisonRows.map((row) => [row.id, row.classification])))
      .toEqual({
        chain: "DIFF",
        charge: "UNKNOWN",
        protocol: "PASS",
        vendor: "PASS",
        service: "FAIL",
        transactionHash: "UNKNOWN",
      });
  });

  test("pins project sources and the Vault mapping", () => {
    expect(projectLinks.settleDiff).toBe("https://github.com/ibrahim1023/SettleDiff");
    expect(projectLinks.vaultSteward).toBe("https://github.com/ibrahim1023/vault-steward");
    expect(vaultSteward.rail).toEqual(["FIND", "PREVIEW", "APPROVE", "VERIFY"]);
    expect(evidenceObjects.map(({ id, vaultRole }) => [id, vaultRole])).toEqual([
      ["request", "NOTE"],
      ["payment", "PROPOSED CHANGE"],
      ["vendor", "EVIDENCE SOURCE"],
      ["chain", "POLICY"],
      ["response", "CURRENT / AFTER"],
      ["activity", "AUDIT / RECHECK"],
    ]);
  });
});
```

- [ ] **Step 2: Run the factual tests and verify the expected failure**

Run:

```bash
pnpm vitest run src/content/portfolioContent.test.ts
```

Expected: FAIL because `returnLabel`, `activityStatus`, classifications, project links, `activity`, `vaultRole`, and the approved Vault rail do not exist yet.

- [ ] **Step 3: Define exact content/type contracts**

Add these types to `settleDiffTypes.ts`:

```ts
export const EVIDENCE_CLASSIFICATIONS = ["PASS", "DIFF", "FAIL", "UNKNOWN"] as const;
export type EvidenceClassification = (typeof EVIDENCE_CLASSIFICATIONS)[number];

export const EVIDENCE_OBJECT_IDS = [
  "request",
  "payment",
  "vendor",
  "chain",
  "response",
  "activity",
] as const;
export type EvidenceObjectId = (typeof EVIDENCE_OBJECT_IDS)[number];
```

Implement the content shape in `portfolioContent.ts` using explicit fields:

```ts
export const projectLinks = {
  settleDiff: "https://github.com/ibrahim1023/SettleDiff",
  vaultSteward: "https://github.com/ibrahim1023/vault-steward",
} as const;

export const settleDiff = {
  title: "SettleDiff",
  descriptor: "Transaction forensics for agent purchases.",
  agentLabel: "AGENT",
  serviceLabel: "SERVICE",
  requestAmount: "0.01 USDC",
  maxBudget: "0.02 USDC",
  returnLabel: "HTTP 402",
  returnDetail: "Payment Required",
  attemptLabel: "ACTIVITY RECORDED",
  activityStatus: "broadcast_failed",
  attemptQualifier: "attempt found — settlement not established",
  verdict: "UNVERIFIABLE",
  verdictReason:
    "Settlement could not be established: no confirmed charge, no transaction hash.",
} as const;
```

Use six `evidenceObjects` with `id`, `label`, `primary`, `detail`, and `vaultRole`; use the values from the test. Use six `comparisonRows` with `classification: EvidenceClassification` and the exact rows from `docs/STORYBOARD.md`. Keep the reasoning finding as `Chain drifted base → tempo; vendor returned HTTP 402; settlement proof is absent.` Set Vault copy to:

```ts
export const vaultSteward = {
  title: "Vault Steward",
  headline: "Keep your vault trustworthy",
  descriptor:
    "Local-first, evidence-backed vault maintenance with explicit approval before every edit.",
  rail: ["FIND", "PREVIEW", "APPROVE", "VERIFY"],
  continuationCue: "Case study continues",
  preview: {
    current: "[[Guides/Partner Onboard Checklist]]",
    after: "[[Guides/Partner Onboarding Checklist]]",
    expectedResult: "1 issue resolved · 1 note edited · vault checked again",
  },
  objectMapping: evidenceObjects.map(({ label, vaultRole }) => ({
    from: label,
    to: vaultRole,
  })),
} as const;
```

Update the existing `VaultStewardArrival` immediately to render both
`vaultSteward.headline` and `vaultSteward.descriptor`, so the intermediate
commit stays truthful and compile-safe. Update its component test to require
the new rail and both copy lines. Update `PortfolioExperience.test.tsx` to
assert both `Keep your vault trustworthy` and the local-first descriptor.

- [ ] **Step 4: Write the target timing assertions**

Update `settleDiffState.test.ts` to assert this complete contract:

```ts
expect(STATE_RANGES).toEqual({
  "project-established": [0, 0.1],
  "request-in-flight": [0.1, 0.24],
  "attempt-recorded": [0.24, 0.36],
  "evidence-expanded": [0.36, 0.52],
  "comparison-visible": [0.52, 0.68],
  "mismatch-isolated": [0.68, 0.8],
  unverifiable: [0.8, 0.9],
  "reasoning-chain": [0.9, 0.96],
  "vault-steward-arrival": [0.96, 1],
});

expect(ORDERED_STATES).toEqual(SETTLE_DIFF_STATES);
expect(progressToSettleDiffState(0.24)).toBe("attempt-recorded");
expect(progressToSettleDiffState(0.96)).toBe("vault-steward-arrival");
```

Export `ORDERED_STATES` and implement `STATE_RANGES` in the order declared by `SETTLE_DIFF_STATES`; retain the existing boundary clamping behavior.

- [ ] **Step 5: Run focused and regression tests**

Run:

```bash
pnpm vitest run src/content/portfolioContent.test.ts src/features/settle-diff/settleDiffState.test.ts
pnpm test
```

Expected: all factual/state tests and the existing suite pass. The two updated
Vault/shell tests protect the truthful intermediate component until Task 7 adds
the complete approval preview.

- [ ] **Step 6: Commit Task 1**

```bash
git add src/content/portfolioContent.ts src/content/portfolioContent.test.ts src/features/settle-diff/settleDiffTypes.ts src/features/settle-diff/settleDiffState.ts src/features/settle-diff/settleDiffState.test.ts src/features/vault-steward/VaultStewardArrival.tsx src/features/vault-steward/VaultStewardArrival.test.tsx src/features/portfolio/PortfolioExperience.test.tsx
git commit -m "fix: align portfolio narrative with source evidence"
```

---

### Task 2: Build the Source-Linked Desktop Still and Reduced-Motion Story

**Files:**
- Create: `src/components/projects/ProjectSourceLink.tsx`
- Create: `src/components/projects/ProjectSourceLink.module.css`
- Create: `src/components/projects/ProjectSourceLink.test.tsx`
- Modify: `src/features/settle-diff/TransactionPath.tsx`
- Modify: `src/features/settle-diff/EvidenceMap.tsx`
- Modify: `src/features/settle-diff/SettleDiffStage.tsx`
- Modify: `src/features/settle-diff/ReducedMotionNarrative.tsx`
- Modify: `src/features/settle-diff/SettleDiffStage.test.tsx`
- Modify: `src/features/settle-diff/ReducedMotionNarrative.test.tsx`
- Modify: `src/features/settle-diff/SettleDiff.module.css`
- Modify: `src/features/settle-diff/ReducedMotionNarrative.module.css`
- Modify: `src/styles/tokens.css`

**Interfaces:**
- Consumes: Task 1 `projectLinks`, classifications, evidence objects, and Vault mapping.
- Produces: `ProjectSourceLink`, desktop data hooks, semantic classification labels, and a complete static reduced-motion story used by later animation and E2E tasks.

- [ ] **Step 1: Write failing source-link and semantic-evidence tests**

Create `ProjectSourceLink.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { ProjectSourceLink } from "./ProjectSourceLink";

test("opens project source safely with an explicit accessible name", () => {
  render(<ProjectSourceLink href="https://example.com/repo" project="Example" />);
  const link = screen.getByRole("link", { name: "View Example source on GitHub" });
  expect(link).toHaveAttribute("href", "https://example.com/repo");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
});
```

Replace old `SettleDiffStage.test.tsx` expectations with assertions for:

```tsx
expect(screen.getByRole("link", { name: "View SettleDiff source on GitHub" }))
  .toHaveAttribute("href", projectLinks.settleDiff);
expect(screen.getByText("HTTP 402")).toBeInTheDocument();
expect(screen.getByText("broadcast_failed")).toBeInTheDocument();
expect(screen.queryByText("acknowledged")).not.toBeInTheDocument();
expect(container.querySelector('[data-evidence-item="activity"]')).not.toBeNull();
expect(container.querySelector('[data-evidence-item="receipt"]')).toBeNull();
expect(container.querySelector('[data-classification="UNKNOWN"]')).not.toBeNull();
```

Update `ReducedMotionNarrative.test.tsx` to require headings `Request`, `Activity recorded`, `Evidence`, `Expected vs observed`, `Chain conflict`, `UNVERIFIABLE`, `Reasoning`, `Vault Steward transformation`, plus all four classification words and all six Vault roles.

- [ ] **Step 2: Run the tests and verify old markup fails**

```bash
pnpm vitest run src/components/projects/ProjectSourceLink.test.tsx src/features/settle-diff/SettleDiffStage.test.tsx src/features/settle-diff/ReducedMotionNarrative.test.tsx
```

Expected: FAIL on the missing link component, old acknowledgement, receipt ID, classification labels, and old Vault mapping.

- [ ] **Step 3: Implement the shared project source link**

Create:

```tsx
import styles from "./ProjectSourceLink.module.css";

export function ProjectSourceLink({ href, project }: { href: string; project: string }) {
  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${project} source on GitHub`}
    >
      <span aria-hidden="true">↗</span>
    </a>
  );
}
```

Style it as an inline 44×44px focusable target with muted default color, primary text on hover/focus, no pill/card background, and the global focus outline preserved.

- [ ] **Step 4: Implement truthful request and evidence markup**

In `TransactionPath.tsx`, render the budget and return explicitly:

```tsx
<span className={styles.budget} data-budget>{settleDiff.maxBudget} MAX</span>
<span className={styles.return} data-return>
  <strong>{settleDiff.returnLabel}</strong>
  <span>{settleDiff.returnDetail}</span>
</span>
```

Remove `data-ack` and the word `acknowledged`.

Mark every GSAP-owned wrapper with `data-animatable`; Task 4's fail-safe cleanup
uses this explicit set and must never clear unrelated page styles.

In `EvidenceMap.tsx`:

- keep six persistent `<li data-evidence-item>` wrappers;
- add `data-object-label="settle"` around the current evidence label;
- reserve `data-object-label="vault"` for Task 7, initially absent;
- render `row.classification` in its own `<span data-classification={row.classification}>`;
- apply a class selected by `row.classification.toLowerCase()` rather than a boolean `matches` field;
- rename the mismatch heading/copy to a conflict that explicitly keeps missing settlement proof visible.

- [ ] **Step 5: Add semantic color tokens without color-only meaning**

Add to `tokens.css`:

```css
--color-pass: #7aa88b;
--color-diff: #c9a25a;
--color-fail: #c96a5a;
--color-unknown: #9b968c;
--color-vault: #6fa889;
```

In `SettleDiff.module.css`, classification styles may set border/text accents, but the visible `PASS`, `DIFF`, `FAIL`, and `UNKNOWN` labels must remain in the DOM. Keep every initial state readable before `[data-animated="ready"]` exists.

- [ ] **Step 6: Rebuild the reduced-motion story from the same content**

Render all comparison classifications and the Task 1 mapping. The Activity
panel must include the exact visible text `ACTIVITY RECORDED` and
`broadcast_failed`. Add a final Vault arrival panel containing headline,
descriptor, Current/After text, expected result, rail joined as
`FIND → PREVIEW → APPROVE → VERIFY`, and source link. Keep normal document flow
and do not add animation hooks.

- [ ] **Step 7: Run focused tests, Axe component assumptions, and full unit suite**

```bash
pnpm vitest run src/components/projects/ProjectSourceLink.test.tsx src/features/settle-diff/SettleDiffStage.test.tsx src/features/settle-diff/ReducedMotionNarrative.test.tsx
pnpm test
pnpm typecheck
```

Expected: all pass with no unsupported copy.

- [ ] **Step 8: Commit Task 2**

```bash
git add src/components/projects src/features/settle-diff src/styles/tokens.css
git commit -m "feat: build source-backed SettleDiff stills"
```

---

### Task 3: Add the Purpose-Built Mobile Static Composition

**Files:**
- Create: `src/features/settle-diff/MobileSettleDiffStage.tsx`
- Create: `src/features/settle-diff/MobileEvidenceRail.tsx`
- Create: `src/features/settle-diff/MobileSettleDiff.module.css`
- Create: `src/features/settle-diff/MobileSettleDiffStage.test.tsx`
- Modify: `src/features/settle-diff/SettleDiffSection.tsx`
- Modify: `src/features/settle-diff/SettleDiff.module.css`
- Modify: `src/features/portfolio/PortfolioExperience.test.tsx`

**Interfaces:**
- Consumes: Task 1 content/types and Task 2 source link/classification markup.
- Produces: `[data-layout="desktop"]`, `[data-layout="mobile"]`, and a mobile stage with the same named animation hooks required by Task 4.

- [ ] **Step 1: Write the failing mobile composition test**

Create `MobileSettleDiffStage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { evidenceObjects } from "@/content/portfolioContent";
import { MobileSettleDiffStage } from "./MobileSettleDiffStage";

describe("MobileSettleDiffStage", () => {
  test("renders a vertical evidence lineage with every causal state", () => {
    const { container } = render(<MobileSettleDiffStage />);
    expect(container.firstElementChild).toHaveAttribute("data-layout", "mobile");
    expect(container.querySelectorAll("[data-mobile-evidence-item]")).toHaveLength(6);
    expect(container.querySelector("[data-mobile-comparison]")).not.toBeNull();
    expect(container.querySelector("[data-mobile-verdict]")).toHaveTextContent(
      "UNVERIFIABLE",
    );
    for (const object of evidenceObjects) {
      expect(screen.getByText(object.label)).toBeInTheDocument();
    }
  });
});
```

Update `PortfolioExperience.test.tsx` to assert one desktop stage, one mobile stage, one reduced branch, and exactly one semantic Intro/SettleDiff/Vault region; hidden duplicate layouts must be `aria-hidden` according to CSS/media state rather than creating duplicate named regions.

- [ ] **Step 2: Run the test and verify the component is missing**

```bash
pnpm vitest run src/features/settle-diff/MobileSettleDiffStage.test.tsx src/features/portfolio/PortfolioExperience.test.tsx
```

Expected: FAIL because the mobile stage and layout hooks do not exist.

- [ ] **Step 3: Implement the vertical mobile evidence rail**

Create `MobileEvidenceRail.tsx` that renders:

```tsx
<ol className={styles.evidenceRail} data-mobile-evidence>
  {evidenceObjects.map((object) => (
    <li key={object.id} data-mobile-evidence-item={object.id}>
      <span>{object.label}</span>
      <strong>{object.primary}</strong>
      <small>{object.detail}</small>
    </li>
  ))}
</ol>
```

Add `data-animatable` to mobile elements owned by GSAP so runtime failure can
clear only narrative animation properties.

Below it render a compact semantic comparison with `data-mobile-comparison`, visible classification text, then mobile conflict, verdict, reasoning, and reserved transformation regions. Do not import or wrap `EvidenceMap`; mobile owns different geometry.

- [ ] **Step 4: Implement `MobileSettleDiffStage`**

Use a `<div data-stage data-layout="mobile">` containing source-linked header, vertical request path, activity status, `MobileEvidenceRail`, `data-mobile-verdict`, and the same reasoning labels. Keep one H2 for SettleDiff inside the mobile branch and mark the inactive animated branch hidden via CSS `display: none` at the relevant media query.

- [ ] **Step 5: Render mutually exclusive desktop/mobile branches**

In `SettleDiffSection.tsx`, use:

```tsx
<div className={styles.desktopBranch} data-animated-layout="desktop">
  <SettleDiffStage />
</div>
<div className={styles.mobileBranch} data-animated-layout="mobile">
  <MobileSettleDiffStage />
</div>
<div className={styles.reducedBranch} data-branch="reduced">
  <ReducedMotionNarrative />
</div>
```

CSS contract:

```css
.desktopBranch { display: block; }
.mobileBranch,
.reducedBranch { display: none; }

@media (max-width: 767px), (orientation: portrait) and (max-width: 1024px) {
  .desktopBranch { display: none; }
  .mobileBranch { display: block; }
}

@media (prefers-reduced-motion: reduce) {
  .desktopBranch,
  .mobileBranch { display: none; }
  .reducedBranch { display: block; }
}
```

- [ ] **Step 6: Implement mobile geometry**

In `MobileSettleDiff.module.css`, use `min-height: 100dvh`, `padding-inline: var(--gutter)`, a one-column evidence rail, `min-width: 0` for every grid/flex child, `overflow-wrap: anywhere` for technical strings, at least `1rem` body text, and no fixed width wider than `100%`. Keep Current/After and Expected/Observed in two columns only at widths where each column remains at least `8.5rem`; otherwise stack them.

- [ ] **Step 7: Run focused tests and responsive static checks**

```bash
pnpm vitest run src/features/settle-diff/MobileSettleDiffStage.test.tsx src/features/portfolio/PortfolioExperience.test.tsx
pnpm test
pnpm typecheck
```

Expected: all pass; no test queries an inactive layout as the only source of required content.

- [ ] **Step 8: Commit Task 3**

```bash
git add src/features/settle-diff src/features/portfolio/PortfolioExperience.test.tsx
git commit -m "feat: add mobile SettleDiff composition"
```

---

### Task 4: Introduce the Media-Aware Animation Runtime

**Files:**
- Create: `src/lib/animation/media.ts`
- Create: `src/lib/animation/media.test.ts`
- Create: `src/lib/animation/runtime.ts`
- Create: `src/lib/animation/runtime.test.ts`
- Modify: `src/lib/animation/timeline.ts`
- Modify: `src/lib/animation/timeline.test.ts`
- Modify: `src/features/portfolio/PortfolioExperience.tsx`
- Modify: `src/features/portfolio/PortfolioExperience.test.tsx`

**Interfaces:**
- Consumes: Task 3 layout hooks and Task 1 state mapper.
- Produces: `NarrativeLayout`, `NARRATIVE_MEDIA`, `RUNWAY_VH`, `runwayPixels()`, `queryTimelineElements(root, layout)`, `buildNarrativeTimeline(elements, layout)`, and `initializePortfolioAnimations(options): () => void`.

- [ ] **Step 1: Write failing media/runway tests**

Create `media.test.ts`:

```ts
import { describe, expect, test } from "vitest";
import { NARRATIVE_MEDIA, RUNWAY_VH, runwayPixels } from "./media";

describe("narrative media contract", () => {
  test("uses explicit mutually exclusive desktop and mobile queries", () => {
    expect(NARRATIVE_MEDIA.desktop).toContain("min-width: 768px");
    expect(NARRATIVE_MEDIA.mobile).toContain("max-width: 767px");
    expect(NARRATIVE_MEDIA.reduce).toBe("(prefers-reduced-motion: reduce)");
  });

  test("converts approved viewport runways to pixels", () => {
    expect(RUNWAY_VH).toEqual({ desktop: 700, mobile: 475 });
    expect(runwayPixels("desktop", 720)).toBe(5040);
    expect(runwayPixels("mobile", 800)).toBe(3800);
  });
});
```

- [ ] **Step 2: Write failing runtime setup/cleanup tests**

Create `runtime.test.ts` using a root fixture containing Intro, desktop/mobile stages, and narrative. Inject stubs rather than mutating global GSAP:

```ts
const cleanup = initializePortfolioAnimations({
  root,
  gsapApi,
  scrollTriggerApi,
  viewportHeight: () => 800,
  exposeState: false,
});

expect(gsapApi.matchMedia).toHaveBeenCalledOnce();
expect(mediaContext.add).toHaveBeenCalledWith(NARRATIVE_MEDIA.desktop, expect.any(Function));
expect(mediaContext.add).toHaveBeenCalledWith(NARRATIVE_MEDIA.mobile, expect.any(Function));
expect(root).toHaveAttribute("data-animated", "ready");

cleanup();
expect(mediaContext.revert).toHaveBeenCalledOnce();
expect(root).not.toHaveAttribute("data-animated");
```

Add a failure case where `buildNarrative` throws; assert `initializePortfolioAnimations` returns a cleanup function, removes `data-animated`, and calls `gsapApi.set(root.querySelectorAll("[data-animatable]"), { clearProps: "all" })`.

- [ ] **Step 3: Run the focused tests and verify missing modules fail**

```bash
pnpm vitest run src/lib/animation/media.test.ts src/lib/animation/runtime.test.ts
```

Expected: FAIL because neither module exists.

- [ ] **Step 4: Implement media and runway helpers**

Create `media.ts`:

```ts
export type NarrativeLayout = "desktop" | "mobile";

export const NARRATIVE_MEDIA = {
  desktop:
    "(min-width: 768px) and (orientation: landscape) and (prefers-reduced-motion: no-preference)",
  mobile:
    "(max-width: 767px) and (prefers-reduced-motion: no-preference), (orientation: portrait) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

export const RUNWAY_VH: Record<NarrativeLayout, number> = {
  desktop: 700,
  mobile: 475,
};

export function runwayPixels(layout: NarrativeLayout, viewportHeight: number): number {
  return (RUNWAY_VH[layout] / 100) * viewportHeight;
}
```

Keep the media-query boundary identical to Task 3 CSS. The `768×1024`
portrait viewport selects mobile; `1024×768` landscape selects desktop.

- [ ] **Step 5: Make timeline queries layout-scoped**

Change signatures in `timeline.ts`:

```ts
export function queryTimelineElements(
  root: HTMLElement,
  layout: NarrativeLayout,
): PortfolioTimelineElements;

export function buildNarrativeTimeline(
  elements: PortfolioTimelineElements,
  layout: NarrativeLayout,
): gsap.core.Timeline;
```

Scope stage selectors under `[data-animated-layout="${layout}"]`; never use an unscoped `[data-stage]`. Update `timeline.test.ts` to build both layout fixtures and prove desktop queries never return mobile elements and vice versa.

- [ ] **Step 6: Implement fail-safe runtime initialization**

Define injectable interfaces in `runtime.ts`:

```ts
export interface PortfolioAnimationOptions {
  root: HTMLElement;
  gsapApi: typeof gsap;
  scrollTriggerApi: typeof ScrollTrigger;
  viewportHeight: () => number;
  exposeState: boolean;
}

export function initializePortfolioAnimations(
  options: PortfolioAnimationOptions,
): () => void;
```

Implementation requirements:

1. call `gsapApi.registerPlugin(scrollTriggerApi)` once per initialization;
2. create `const media = gsapApi.matchMedia()`;
3. add desktop and mobile callbacks using the exact queries;
4. each callback queries its layout, builds narrative/intro timelines, creates owned ScrollTriggers, and returns a cleanup that kills those triggers/timelines;
5. use `end: () => '+=' + runwayPixels(layout, viewportHeight())`;
6. set `data-animated="ready"` only after the active callback succeeds;
7. update `data-state` only when `exposeState` is true;
8. catch setup errors, clear all GSAP properties from `[data-animatable]`, remove readiness/state attributes, and leave readable content;
9. returned cleanup reverts media and removes runtime attributes.

- [ ] **Step 7: Reduce `PortfolioExperience` to lifecycle wiring**

Keep only the ref/effect and production-safe flag:

```tsx
useLayoutEffect(() => {
  const root = rootRef.current;
  if (!root || typeof window === "undefined") return;

  return initializePortfolioAnimations({
    root,
    gsapApi: gsap,
    scrollTriggerApi: ScrollTrigger,
    viewportHeight: () => window.innerHeight,
    exposeState:
      process.env.NODE_ENV !== "production" &&
      process.env.NEXT_PUBLIC_TIMELINE_DEBUG === "true",
  });
}, []);
```

Do not keep ScrollTrigger construction in the component.

- [ ] **Step 8: Run focused tests and regressions**

```bash
pnpm vitest run src/lib/animation/media.test.ts src/lib/animation/runtime.test.ts src/lib/animation/timeline.test.ts src/features/portfolio/PortfolioExperience.test.tsx
pnpm test
pnpm typecheck
```

Expected: both media branches are scoped, cleanup is idempotent, and failure leaves no ready/state attribute.

- [ ] **Step 9: Commit Task 4**

```bash
git add src/lib/animation src/features/portfolio/PortfolioExperience.tsx src/features/portfolio/PortfolioExperience.test.tsx
git commit -m "refactor: add media-scoped narrative runtime"
```

---

### Task 5: Implement Desktop Apple-Like Choreography and Intro Handoff

**Files:**
- Modify: `src/lib/animation/timeline.ts`
- Modify: `src/lib/animation/timeline.test.ts`
- Modify: `src/features/intro/IntroSection.tsx`
- Modify: `src/features/intro/IntroSection.module.css`
- Modify: `src/features/settle-diff/SettleDiff.module.css`
- Modify: `src/features/portfolio/PortfolioExperience.module.css`

**Interfaces:**
- Consumes: Task 4 layout-scoped elements/runtime and Task 1 `STATE_RANGES`.
- Produces: named segment functions `appendRequestSegment`, `appendAttemptSegment`, `appendEvidenceSegment`, `appendComparisonSegment`, `appendConflictSegment`, `appendVerdictSegment`, and `appendReasoningSegment` used by both layout builders where geometry permits.

- [ ] **Step 1: Write failing named-segment and hold tests**

In `timeline.test.ts`, assert labels exactly equal `SETTLE_DIFF_STATES`, each label time equals `seconds(STATE_RANGES[state][0])`, and desktop targets receive non-zero tweens. Inspect children by label ranges:

```ts
const desktop = buildNarrativeTimeline(elements, "desktop");
expect(desktop.labels["request-in-flight"]).toBe(seconds(0.1));
expect(desktop.labels["attempt-recorded"]).toBe(seconds(0.24));
expect(desktop.labels["unverifiable"]).toBe(seconds(0.8));
expect(desktop.labels["vault-steward-arrival"]).toBe(seconds(0.96));
expect(desktop.duration()).toBe(seconds(1));
```

Extend `PortfolioTimelineElements.intro` with
`pathOrigin: HTMLElement | null`, queried from the active layout's
`[data-path-origin]`. Add a test that `buildIntroTimeline()` animates both
`[data-intro-cue-line]` and `[data-path-origin]`, proving the handoff shares a
visual axis rather than shrinking the cue line to nothing.

- [ ] **Step 2: Run the timeline test and verify old timing/handoff fail**

```bash
pnpm vitest run src/lib/animation/timeline.test.ts
```

Expected: FAIL because current labels use old ranges and the intro path origin does not exist.

- [ ] **Step 3: Add the shared path-origin hook**

In `IntroSection.tsx`, wrap the cue line in a full-width handoff track:

```tsx
<span className={styles.handoffTrack} aria-hidden="true" data-handoff-track>
  <span className={styles.cueLine} data-intro-cue-line />
</span>
```

Add a visually matching `data-path-origin` element at the leading edge of the desktop transaction path. Align both to the same gutter/content coordinate with CSS custom properties rather than reading pixels on every scroll frame.

- [ ] **Step 4: Refactor the desktop timeline into named segments**

Keep `RUNWAY_SECONDS = 12`. Every segment function accepts the timeline and typed element group and returns `void`. Use only transforms, opacity, SVG stroke, and CSS variables. Required behavior:

- request: path draws and token travels from 8% to 86%; HTTP 402 returns on the lower path near the segment end;
- attempt: token recedes, Activity badge and `broadcast_failed` settle early, then hold;
- evidence: six items emerge from the transaction origin with lineage connectors;
- comparison: evidence wrappers translate/reorder while aligned table becomes dominant;
- conflict: chain pair dominates while HTTP 402, failed broadcast, unknown charge, and absent hash remain visible;
- verdict: surrounding evidence recedes but is not destroyed; verdict scales only from `0.92` to `1` and holds;
- reasoning: evidence wrappers move into rail alignment without being set to `display: none` or removed.

Use a `power1.out` ease only inside reveal/reposition moments; the ScrollTrigger scrub remains linear.

- [ ] **Step 5: Make still states readable and animation preparation explicit**

In CSS, default markup is readable. Only selectors under `[data-animated="ready"]` establish overlapping absolute layers and initial hidden states. Do not use production `data-state` to control visibility. The GSAP timeline owns active opacity/transforms.

Set `.narrative` to `min-height: 100dvh`; ScrollTrigger provides the runway through its pixel end. Keep `overflow: clip` on the stage only if `320px` and focus-outline tests prove no essential content is clipped.

- [ ] **Step 6: Run focused tests and desktop E2E smoke**

```bash
pnpm vitest run src/lib/animation/timeline.test.ts src/features/intro/IntroSection.test.tsx
pnpm test
pnpm build:pages
pnpm test:e2e --grep "exported site|scroll drives"
```

Expected: labels match the approved timing, handoff hooks exist, export succeeds, and desktop can scroll forward/back without console errors.

- [ ] **Step 7: Commit Task 5**

```bash
git add src/lib/animation/timeline.ts src/lib/animation/timeline.test.ts src/features/intro src/features/settle-diff/SettleDiff.module.css src/features/portfolio/PortfolioExperience.module.css
git commit -m "feat: choreograph desktop SettleDiff narrative"
```

---

### Task 6: Implement Mobile Choreography and Orientation-Safe Rebuilds

**Files:**
- Modify: `src/lib/animation/timeline.ts`
- Modify: `src/lib/animation/timeline.test.ts`
- Modify: `src/lib/animation/runtime.ts`
- Modify: `src/lib/animation/runtime.test.ts`
- Modify: `src/features/settle-diff/MobileSettleDiff.module.css`
- Create: `tests/e2e/mobile.spec.ts`

**Interfaces:**
- Consumes: Task 3 mobile hooks and Task 4 runtime.
- Produces: mobile-specific segment geometry and controlled `ScrollTrigger.refresh()` after orientation/layout changes.

- [ ] **Step 1: Write failing mobile timeline tests**

Extend `timeline.test.ts`:

```ts
const mobile = buildNarrativeTimeline(elements, "mobile");
expect(Object.keys(mobile.labels)).toEqual(SETTLE_DIFF_STATES);
expect(mobile.getById("mobile-request")).toBeTruthy();
expect(mobile.getById("mobile-evidence")).toBeTruthy();
expect(mobile.getById("mobile-comparison")).toBeTruthy();
expect(mobile.getById("mobile-verdict")).toBeTruthy();
```

Use GSAP tween IDs in the mobile builder. Add runtime assertions that a media callback returns cleanup and a rebuild calls refresh exactly once after the new branch creates its geometry.

- [ ] **Step 2: Write failing mobile E2E contracts**

Create `mobile.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("mobile uses the vertical narrative without horizontal overflow", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");
  await expect(page.locator('[data-animated-layout="mobile"]')).toBeVisible();
  await expect(page.locator('[data-animated-layout="desktop"]')).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(page.locator("[data-mobile-evidence]")).toBeVisible();
});
```

Add a `360×800` case, then resize `390×844 → 844×390 → 390×844`; assert exactly one visible stage after each change and no console/page error.

- [ ] **Step 3: Run tests and verify the generic timeline fails**

```bash
pnpm vitest run src/lib/animation/timeline.test.ts src/lib/animation/runtime.test.ts
pnpm build:pages
pnpm test:e2e tests/e2e/mobile.spec.ts
```

Expected: unit tests fail for missing mobile tween IDs; E2E fails before the mobile runtime/geometry is complete.

- [ ] **Step 4: Build mobile-specific segments**

Use the shared semantic times but different transforms:

- request travels vertically using `yPercent`, never absolute `left`;
- Activity status settles below the request path;
- six evidence items reveal top-to-bottom with short stagger and remain in DOM order;
- comparison scrolls into a compact table/stack without moving text outside the viewport;
- conflict and verdict use opacity/translateY only—no large scale sweep;
- reasoning rows relabel in place before Task 7's Vault roles appear.

Assign the exact GSAP IDs from Step 1.

- [ ] **Step 5: Implement controlled refresh behavior**

Inside each media callback, schedule one `requestAnimationFrame` after timeline/trigger construction and call `scrollTriggerApi.refresh()`. Cancel that frame in branch cleanup. Do not add a global resize listener; `gsap.matchMedia()` owns breakpoint changes and ScrollTrigger owns ordinary resize handling.

- [ ] **Step 6: Run mobile tests and full regressions**

```bash
pnpm vitest run src/lib/animation/timeline.test.ts src/lib/animation/runtime.test.ts
pnpm test
pnpm typecheck
pnpm build:pages
pnpm test:e2e tests/e2e/mobile.spec.ts tests/e2e/export-smoke.spec.ts
```

Expected: mobile branch is exclusive, reversible, overflow-free at tested widths, and orientation changes leave one trigger/stage.

- [ ] **Step 7: Commit Task 6**

```bash
git add src/lib/animation src/features/settle-diff/MobileSettleDiff.module.css tests/e2e/mobile.spec.ts
git commit -m "feat: choreograph mobile narrative"
```

---

### Task 7: Transform Persistent Evidence into Vault Steward and Release the Pin

**Files:**
- Create: `src/features/vault-steward/VaultTransitionOverlay.tsx`
- Create: `src/features/vault-steward/VaultTransitionOverlay.test.tsx`
- Modify: `src/features/settle-diff/EvidenceMap.tsx`
- Modify: `src/features/settle-diff/MobileEvidenceRail.tsx`
- Modify: `src/features/settle-diff/SettleDiffStage.tsx`
- Modify: `src/features/settle-diff/MobileSettleDiffStage.tsx`
- Modify: `src/features/settle-diff/SettleDiff.module.css`
- Modify: `src/features/settle-diff/MobileSettleDiff.module.css`
- Modify: `src/features/vault-steward/VaultStewardArrival.tsx`
- Modify: `src/features/vault-steward/VaultStewardArrival.module.css`
- Modify: `src/features/vault-steward/VaultStewardArrival.test.tsx`
- Modify: `src/features/portfolio/PortfolioExperience.tsx`
- Modify: `src/features/portfolio/PortfolioExperience.module.css`
- Modify: `src/lib/animation/timeline.ts`
- Modify: `src/lib/animation/timeline.test.ts`

**Interfaces:**
- Consumes: Task 1 `vaultRole` mapping, Task 5/6 reasoning endpoints, and Task 4 typed timeline queries.
- Produces: `VaultTransitionOverlay`, dual-label persistent objects, transition targets, and a separate stable normal-flow `VaultStewardArrival`.

- [ ] **Step 1: Write failing transition semantic tests**

Create `VaultTransitionOverlay.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { vaultSteward } from "@/content/portfolioContent";
import { VaultTransitionOverlay } from "./VaultTransitionOverlay";

test("renders the approved in-pin decision rail", () => {
  const { container } = render(<VaultTransitionOverlay />);
  const rail = Array.from(container.querySelectorAll("[data-vault-transition-step]"))
    .map((node) => node.textContent);
  expect(rail).toEqual(vaultSteward.rail);
  expect(container.querySelector("[data-vault-transition-title]")).toHaveTextContent(
    "Vault Steward",
  );
});
```

Update `SettleDiffStage.test.tsx` and `MobileSettleDiffStage.test.tsx` to require each persistent evidence wrapper to contain both:

```tsx
expect(item.querySelector('[data-object-label="settle"]')).toHaveTextContent(object.label);
expect(item.querySelector('[data-object-label="vault"]')).toHaveTextContent(object.vaultRole);
```

Update `VaultStewardArrival.test.tsx` to require source link, headline, descriptor, Current/After, expected result, rail, and continuation cue.

- [ ] **Step 2: Run tests and verify the transition markup is absent**

```bash
pnpm vitest run src/features/vault-steward/VaultTransitionOverlay.test.tsx src/features/vault-steward/VaultStewardArrival.test.tsx src/features/settle-diff/SettleDiffStage.test.tsx src/features/settle-diff/MobileSettleDiffStage.test.tsx
```

Expected: FAIL for missing overlay, dual labels, approval preview, and source link.

- [ ] **Step 3: Add dual-role labels to persistent objects**

In both desktop and mobile evidence renderers, keep the same `<li>` wrapper through all states:

```tsx
<span data-object-label="settle">{object.label}</span>
<span data-object-label="vault" aria-hidden="true">{object.vaultRole}</span>
```

Do not render a second set of six transformation objects. The Vault label begins visually hidden and `aria-hidden`; the stable arrival provides accessible Vault content outside the scrubbed overlap.

- [ ] **Step 4: Implement `VaultTransitionOverlay` and stable arrival**

The in-pin overlay contains only title, headline, and four-step rail with data hooks. The stable arrival renders after the narrative container in `PortfolioExperience`:

```tsx
<div className={styles.narrative} data-narrative>
  <SettleDiffSection />
</div>
<VaultStewardArrival />
```

The stable arrival includes an abstract Current/After preview using Task 1 copy and a `ProjectSourceLink`. It is normal-flow content with `min-height: 120dvh`; it is not an absolutely positioned scene layer.

- [ ] **Step 5: Query exact transition targets**

Extend `SettleDiffTimelineElements` with:

```ts
settleLabels: Element[];
vaultLabels: Element[];
```

Extend `VaultTimelineElements` with:

```ts
transition: HTMLElement | null;
title: HTMLElement | null;
rail: HTMLElement | null;
railItems: Element[];
```

All queries remain scoped to the active layout.

- [ ] **Step 6: Animate tracked role transformation**

At `vault-steward-arrival` (`0.96–1.00`):

1. move the six existing wrappers into a policy/review rail geometry;
2. fade Settle labels from 1→0 while Vault labels move from `y: 8, opacity: 0` to `y: 0, opacity: 1` with a short overlap;
3. change connector/accent CSS variables from SettleDiff accent to `--color-vault`;
4. transform reasoning items into the four-step Vault rail;
5. reveal the overlay title only after relabeling is readable;
6. end with all transition elements visually stable before ScrollTrigger releases.

Desktop may use x/y transforms; mobile keeps DOM order and uses y/opacity. Never set the evidence wrappers to `display: none` during the timeline.

- [ ] **Step 7: Test timeline target ownership and stable release**

Add unit assertions that every `vaultLabel` is targeted once, every `settleLabel` is targeted once, and stable arrival DOM is not returned by `queryTimelineElements()` (it must not be controlled by the scrub timeline).

Run:

```bash
pnpm vitest run src/features/vault-steward src/features/settle-diff/SettleDiffStage.test.tsx src/features/settle-diff/MobileSettleDiffStage.test.tsx src/lib/animation/timeline.test.ts
pnpm test
pnpm typecheck
pnpm build:pages
pnpm test:e2e --grep "Vault Steward arrival"
```

Expected: transition objects are unique/persistent and the stable arrival enters the viewport after the pin.

- [ ] **Step 8: Commit Task 7**

```bash
git add src/features/vault-steward src/features/settle-diff src/features/portfolio src/lib/animation
git commit -m "feat: transform evidence into Vault Steward"
```

---

### Task 8: Guarantee Progressive Enhancement and Remove Production Debug State

**Files:**
- Modify: `src/lib/animation/runtime.ts`
- Modify: `src/lib/animation/runtime.test.ts`
- Modify: `src/features/settle-diff/SettleDiffSection.tsx`
- Modify: `src/features/settle-diff/SettleDiff.module.css`
- Modify: `src/features/settle-diff/ReducedMotionNarrative.tsx`
- Modify: `src/features/portfolio/PortfolioExperience.tsx`
- Create: `tests/e2e/no-javascript.spec.ts`
- Modify: `tests/e2e/reduced-motion.spec.ts`
- Modify: `tests/e2e/export-smoke.spec.ts`

**Interfaces:**
- Consumes: Task 4 runtime, Task 2 reduced-motion story, and Task 7 stable arrival.
- Produces: `shouldExposeTimelineState(env): boolean`, no-JavaScript narrative fallback, and verified production output without `data-state` instrumentation.

- [ ] **Step 1: Write failing debug-gating unit tests**

Add to `runtime.test.ts`:

```ts
expect(shouldExposeTimelineState({
  nodeEnv: "production",
  timelineDebug: "true",
})).toBe(false);

expect(shouldExposeTimelineState({
  nodeEnv: "development",
  timelineDebug: "true",
})).toBe(true);

expect(shouldExposeTimelineState({
  nodeEnv: "development",
  timelineDebug: undefined,
})).toBe(false);
```

Add a setup-failure assertion that all `[data-animatable]` elements have GSAP inline transform/opacity properties cleared and remain present in document order.

- [ ] **Step 2: Write the no-JavaScript E2E test**

Create `no-javascript.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("the complete story remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/portfolio/");

  const fallback = page.locator("[data-no-js-narrative]");
  await expect(fallback).toBeVisible();
  await expect(fallback.getByText("ACTIVITY RECORDED")).toBeVisible();
  await expect(fallback.getByText("UNVERIFIABLE")).toBeVisible();
  await expect(fallback.getByText("CURRENT / AFTER")).toBeVisible();
  await expect(fallback.getByText("FIND → PREVIEW → APPROVE → VERIFY")).toBeVisible();

  await context.close();
});
```

In `export-smoke.spec.ts`, assert `page.locator("[data-state]")` has count 0 in the production export.

- [ ] **Step 3: Run tests and verify missing fallback/debug policy fails**

```bash
pnpm vitest run src/lib/animation/runtime.test.ts
pnpm build:pages
pnpm test:e2e tests/e2e/no-javascript.spec.ts tests/e2e/export-smoke.spec.ts
```

Expected: FAIL because the no-JS narrative and strict production debug policy are absent.

- [ ] **Step 4: Implement strict debug gating**

Add:

```ts
export interface TimelineDebugEnvironment {
  nodeEnv: string | undefined;
  timelineDebug: string | undefined;
}

export function shouldExposeTimelineState(env: TimelineDebugEnvironment): boolean {
  return env.nodeEnv === "development" && env.timelineDebug === "true";
}
```

Only set/remove `stage.dataset.state` when this returns true. Production behavior must be entirely GSAP-driven and must not require the attribute for CSS visibility.

- [ ] **Step 5: Add a semantic no-JavaScript fallback**

Render a `<noscript>` copy of `ReducedMotionNarrative`:

```tsx
<noscript>
  <div data-no-js-narrative>
    <ReducedMotionNarrative />
  </div>
</noscript>
```

With JavaScript enabled, the browser ignores `<noscript>`. With JavaScript disabled, CSS hides desktop/mobile animated branches and displays the no-JS narrative in normal flow. Do not use client-side detection to reveal it.

Place a `<style>` inside `<noscript>` that applies
`[data-animated-layout] { display: none !important; }` and
`[data-branch="reduced"] { display: none !important; }`. This prevents duplicate
animated/reduced content only when scripting is disabled; do not add a runtime
`js` class or a flash-prone client check.

- [ ] **Step 6: Harden runtime failure cleanup**

In the setup `catch`, call `gsapApi.set(animatableTargets, { clearProps: "all" })`, remove readiness/state attributes, kill any trigger/timeline already created, and return a no-op cleanup. Do not throw from the effect. Emit no production console error; in development use one `console.warn("Portfolio animation disabled; using readable fallback.")` without error payload or DOM content.

- [ ] **Step 7: Run focused and full validation**

```bash
pnpm vitest run src/lib/animation/runtime.test.ts src/features/settle-diff/ReducedMotionNarrative.test.tsx
pnpm test
pnpm typecheck
pnpm build:pages
pnpm test:e2e tests/e2e/no-javascript.spec.ts tests/e2e/reduced-motion.spec.ts tests/e2e/export-smoke.spec.ts
```

Expected: production has no `data-state`, no-JS and reduced-motion stories are complete, and runtime failure is contained.

- [ ] **Step 8: Commit Task 8**

```bash
git add src/lib/animation/runtime.ts src/lib/animation/runtime.test.ts src/features/settle-diff src/features/portfolio/PortfolioExperience.tsx tests/e2e/no-javascript.spec.ts tests/e2e/reduced-motion.spec.ts tests/e2e/export-smoke.spec.ts
git commit -m "fix: preserve narrative without animation"
```

---

### Task 9: Expand E2E Coverage to Every Visual State and Lifecycle Edge

**Files:**
- Create: `tests/e2e/helpers/narrative.ts`
- Modify: `tests/e2e/scroll-states.spec.ts`
- Create: `tests/e2e/lifecycle.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/reduced-motion.spec.ts`
- Modify: `playwright.config.ts`

**Interfaces:**
- Consumes: Tasks 5–8 production visual hooks and `RUNWAY_VH` values.
- Produces: `scrollNarrativeTo(page, layout, progress)`, `expectMostlyVisible(locator)`, exact state traversal, lifecycle regression coverage, and desktop/mobile/reduced Axe coverage.

- [ ] **Step 1: Implement the test helper with its own focused contract**

Create `tests/e2e/helpers/narrative.ts`:

```ts
import { expect, type Locator, type Page } from "@playwright/test";

const RUNWAY_MULTIPLIER = { desktop: 7, mobile: 4.75 } as const;

export async function scrollNarrativeTo(
  page: Page,
  layout: keyof typeof RUNWAY_MULTIPLIER,
  progress: number,
) {
  const top = await page.locator("[data-narrative]").evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return rect.top + window.scrollY;
  });
  const viewport = page.viewportSize();
  if (!viewport) throw new Error("Viewport is required for narrative tests");
  const y = top + viewport.height * RUNWAY_MULTIPLIER[layout] * progress;
  await page.evaluate((target) => window.scrollTo(0, target), y);
  await page.evaluate(() => new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  ));
}

export async function expectMostlyVisible(locator: Locator) {
  await expect.poll(async () => locator.evaluate((node) => {
    const style = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    return Number(style.opacity) >= 0.75 && rect.width > 0 && rect.height > 0;
  })).toBe(true);
}
```

- [ ] **Step 2: Replace coarse state tests with exact visual assertions**

In `scroll-states.spec.ts`, define:

```ts
const DESKTOP_STATES = [
  [0.05, "[data-stage-header]"],
  [0.17, "[data-token]"],
  [0.28, "[data-attempt]"],
  [0.43, "[data-evidence]"],
  [0.60, "[data-comparison]"],
  [0.74, "[data-mismatch]"],
  [0.85, "[data-verdict]"],
  [0.93, "[data-chain]"],
  [0.985, "[data-vault-transition]"],
] as const;
```

Loop forward with `scrollNarrativeTo` and `expectMostlyVisible`, then loop in reverse. Assert the stable `[data-vault-arrival]` is outside the pinned scene and enters the viewport only after progress 1 plus normal document scrolling.

- [ ] **Step 3: Add fast-scroll, refresh, and browser-history tests**

Create `lifecycle.spec.ts` with three tests:

1. jump start→end→start and assert no `[data-orphaned="true"]`, no duplicate visible stage, and correct start/end visuals;
2. scroll to `0.60`, reload, wait for readiness, and assert comparison remains coherent without console errors;
3. navigate to `about:blank`, go back, and assert one ready root and one active visible stage.

Capture page errors, console errors, and failed responses with the same arrays used by `export-smoke.spec.ts`; each must remain empty.

- [ ] **Step 4: Expand accessibility modes**

Run Axe at `1440×900`, `390×844`, and reduced motion. For each result, filter serious/critical violations. Also assert project links have 44×44px minimum bounding boxes and logical order: skip link → SettleDiff source → Vault Steward source.

- [ ] **Step 5: Run the E2E files and fix only evidenced failures**

```bash
pnpm build:pages
pnpm test:e2e tests/e2e/scroll-states.spec.ts tests/e2e/lifecycle.spec.ts tests/e2e/mobile.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/reduced-motion.spec.ts
```

Expected: every named visual state passes forward and reverse; no fixed `waitForTimeout()` remains in narrative tests.

- [ ] **Step 6: Run full local validation**

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build:pages
pnpm test:e2e
```

Expected: all commands exit 0.

- [ ] **Step 7: Commit Task 9**

```bash
git add tests/e2e playwright.config.ts
git commit -m "test: cover narrative states and lifecycle"
```

---

### Task 10: Enforce Metadata, Bundle, and Lighthouse Gates

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `scripts/check-bundle-budget.mjs`
- Create: `scripts/check-bundle-budget.test.mjs`
- Create: `lighthouserc.mjs`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `.gitignore`
- Modify: `.github/workflows/deploy-pages.yml`
- Modify: `README.md`

**Interfaces:**
- Consumes: production `/portfolio` export and the `180 KB` gzip budget.
- Produces: `collectPageChunks(manifest)`, `measureGzipBytes(files, root)`, `pnpm bundle:check`, `pnpm lighthouse`, and CI release gates.

- [ ] **Step 1: Write failing bundle-budget tests**

Create `scripts/check-bundle-budget.test.mjs`:

```ts
import { describe, expect, test } from "vitest";
import { collectPageChunks, assertWithinBudget } from "./check-bundle-budget.mjs";

describe("bundle budget", () => {
  test("reads only the app page chunk list", () => {
    expect(collectPageChunks({ pages: { "/page": ["static/chunks/a.js"] } }))
      .toEqual(["static/chunks/a.js"]);
  });

  test("fails above 180 KiB gzip", () => {
    expect(() => assertWithinBudget(180 * 1024 + 1, 180 * 1024))
      .toThrow("exceeds 180 KiB gzip");
  });
});
```

- [ ] **Step 2: Run the test and verify the checker is missing**

```bash
pnpm vitest run scripts/check-bundle-budget.test.mjs
```

Expected: FAIL because `check-bundle-budget.mjs` does not exist.

- [ ] **Step 3: Implement the deterministic page-chunk checker**

The script must:

1. read `.next/app-build-manifest.json`;
2. select `manifest.pages["/page"]` and fail if absent;
3. deduplicate chunk paths;
4. read each file relative to `.next/`;
5. sum `gzipSync(buffer).byteLength`;
6. print `Page JavaScript: <bytes> bytes gzip (limit 184320)`;
7. exit non-zero above `184320` bytes.

Export pure `collectPageChunks`, `measureGzipBytes`, and `assertWithinBudget` functions so the test does not invoke the CLI path.

- [ ] **Step 4: Add canonical/social metadata**

Update `layout.tsx`:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://ibrahim1023.github.io"),
  title: "Ibrahim Arshad — AI Systems Engineer",
  description: identity.framing,
  alternates: { canonical: "/portfolio/" },
  openGraph: {
    type: "website",
    url: "/portfolio/",
    title: "Ibrahim Arshad — AI Systems Engineer",
    description: identity.framing,
  },
  twitter: {
    card: "summary",
    title: "Ibrahim Arshad — AI Systems Engineer",
    description: identity.framing,
  },
};
```

Do not add a fabricated social image.

- [ ] **Step 5: Add Lighthouse CI as a pinned dev dependency**

Run:

```bash
pnpm add -D @lhci/cli
```

Commit the exact resolved version from `pnpm-lock.yaml`; do not use an unpinned runtime download in CI.

Create `lighthouserc.mjs`:

```js
export default {
  ci: {
    collect: {
      startServerCommand:
        "node scripts/serve-export.mjs --root out --base-path /portfolio --port 4173",
      startServerReadyPattern: "http://127.0.0.1:4173/portfolio/",
      url: ["http://127.0.0.1:4173/portfolio/"],
      numberOfRuns: 3,
      settings: { preset: "desktop", chromeFlags: "--headless --no-sandbox" },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
```

Add `.lighthouseci/` to `.gitignore`.

- [ ] **Step 6: Wire scripts and CI in the correct order**

Add scripts:

```json
"bundle:check": "node scripts/check-bundle-budget.mjs",
"lighthouse": "lhci autorun --config=lighthouserc.mjs",
"validate": "pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm build:pages && pnpm bundle:check && pnpm test:e2e && pnpm lighthouse"
```

In `deploy-pages.yml`, after `build:pages` and Chromium installation, run bundle check, E2E, then Lighthouse before artifact upload. Preserve least-privilege permissions and ensure the final `out/` is the production `/portfolio` build.

- [ ] **Step 7: Run quality gates and record measured output**

```bash
pnpm vitest run scripts/check-bundle-budget.test.mjs
pnpm build:pages
pnpm bundle:check
pnpm test:e2e
pnpm lighthouse
```

Expected: page gzip ≤ 184320 bytes and all Lighthouse category/LCP/CLS assertions pass. If a gate fails, optimize the measured cause; do not lower a threshold without a new dated owner decision.

- [ ] **Step 8: Update README quality commands**

Document `pnpm bundle:check`, `pnpm lighthouse`, the local-server requirement handled by LHCI, and that INP/mobile scroll traces remain manual acceptance evidence.

- [ ] **Step 9: Commit Task 10**

```bash
git add src/app/layout.tsx scripts/check-bundle-budget.mjs scripts/check-bundle-budget.test.mjs lighthouserc.mjs package.json pnpm-lock.yaml .gitignore .github/workflows/deploy-pages.yml README.md
git commit -m "ci: enforce portfolio quality budgets"
```

---

### Task 11: Complete Manual Acceptance, Deployment Evidence, and Final Audit

**Files:**
- Modify: `docs/IMPLEMENTATION_STATUS.md`
- Modify: `docs/ACCEPTANCE_RUNBOOK.md`
- Modify: `README.md` only if final commands or limitations changed

**Interfaces:**
- Consumes: Tasks 1–10, deployed GitHub Pages URL, owner Mac, and owner iPhone.
- Produces: a dated pass/fail record tied to one reviewed/deployed commit for the supported Mac/iPhone scope.

- [ ] **Step 1: Run the complete clean local gate**

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm validate
```

Record command date, exact commit, test counts, bundle bytes, and Lighthouse report directory in `docs/ACCEPTANCE_RUNBOOK.md`.

- [ ] **Step 2: Review every required viewport on the production export**

Use Playwright/browser responsive modes for `360×800`, `390×844`, `768×1024`, `1024×768`, `1280×720`, `1440×900`, `1920×1080`, and `320px` overflow safety. For each row in the runbook, record browser, date, result, and any evidence path. Verify all narrative bullets, forward/reverse/fast scroll, pin release, and stable arrival.

- [ ] **Step 3: Complete Mac browser checks**

On the owner Mac, test current Safari, Chrome, Firefox, and Edge. Record exact browser versions and results. Verify keyboard order, focus visibility, 200% zoom, reduced motion, page refresh mid-story, back/forward navigation, and no console errors.

- [ ] **Step 4: Complete iPhone acceptance**

On the owner iPhone, record model, iOS version, and Safari version. Test portrait and landscape, dynamic browser chrome, native touch scrolling, reduced motion through iOS settings, VoiceOver reading order, source-link targets, and the full mobile transformation.

- [ ] **Step 5: Deploy and prove commit agreement**

After Ibrahim explicitly authorizes the push, deploy the reviewed commit through the existing GitHub Pages workflow. Record:

- full reviewed commit SHA;
- full deployed commit SHA;
- successful workflow run URL;
- `https://ibrahim1023.github.io/portfolio/`;
- direct-refresh and asset-subpath results.

The two commit SHAs must match before sign-off.

- [ ] **Step 6: Update status documents from evidence**

Change only rows supported by recorded evidence. Move every completed blocker/important item in `IMPLEMENTATION_STATUS.md` to complete with file/test/report references. Keep any supported-scope device-specific findings visible.

- [ ] **Step 7: Perform final scope and factual scan**

Run:

```bash
rg -n '\$0\.04|\bPAID\b|acknowledged|PROPOSE → SIMULATE|RECEIPT' src --glob '!**/*.test.*'
rg -n 'About|Contact|Testimonials|Résumé|Blog' src/app src/features
git diff --check
git status --short
```

Expected: the first two searches return no production-scope violations, `git diff --check` is empty, and only the intended acceptance-document changes are present.

- [ ] **Step 8: Commit the evidence-backed acceptance record**

```bash
git add docs/IMPLEMENTATION_STATUS.md docs/ACCEPTANCE_RUNBOOK.md README.md
git commit -m "docs: record phase 1 acceptance evidence"
```

- [ ] **Step 9: Request final owner sign-off**

Present the deployed URL, reviewed/deployed SHA, automated results, Lighthouse/bundle metrics, Mac/iPhone results, and any supported-scope limitations. Do not label Phase 1 complete until Ibrahim approves the evidence.

---

## Plan Completion Checks

Before execution is considered finished:

- Every Task 1–11 commit exists or an equivalent reviewed commit groups only inseparable changes.
- `pnpm validate` passes from a frozen-lockfile install.
- The production export contains no unsupported payment claim or production `data-state` debugger.
- Desktop and mobile use separate choreography with the exact shared causal order.
- Six persistent evidence wrappers cross-transform into the approved Vault roles.
- Reduced motion and no-JavaScript output preserve the complete story.
- The bundle and Lighthouse gates pass without waived thresholds.
- The deployed and reviewed commits match.
- Mac and iPhone evidence is recorded.
- No Android compatibility claim is made in Phase 1.
