# CaseZero Portfolio Chapter Implementation Plan

> **For agentic workers:** Owner override — do not use Superpowers for implementation. Execute this plan task-by-task with a fresh review after each commit. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Insert a compact, visually engaging CaseZero chapter between SettleDiff and Vault Steward, with accurate Context.dev attribution and no increase to the existing narrative-length or JavaScript budgets.

**Architecture:** Keep one page-level GSAP lifecycle but give SettleDiff and CaseZero independent semantic stages, timelines, runways, and ScrollTriggers. SettleDiff ends in an abstract verified-evidence seam; CaseZero owns the later Vault Steward seam. Desktop and mobile use separate geometry, while one portfolio-level reduced-motion narrative preserves the complete reading order.

**Tech Stack:** Next.js App Router static export, React 19, strict TypeScript, GSAP/ScrollTrigger, CSS Modules, Vitest/Testing Library, Playwright/Axe.

**Spec:** `docs/superpowers/specs/2026-09-03-casezero-portfolio-chapter-design.md`

## Global Constraints

- Project order is exactly Intro → SettleDiff → CaseZero → Vault Steward.
- Show only CaseZero capabilities implemented at source commit `73755b19cb0fcf7cc58a43b7d4707c3ea19f4732`.
- SettleDiff Context.dev copy is exactly `Context.dev · conditional public status-page evidence`.
- CaseZero Context.dev copy is exactly `Context.dev · schema-constrained docket discovery`.
- Never use `powered by Context.dev`; never imply Context.dev affects SettleDiff's deterministic financial verdict or enters CaseZero's blind runtime.
- Keep `Independent experimental project · not affiliated with the NTSB` persistently available.
- Do not use accident imagery, NTSB branding, government-report imitation, or unsupported cause/fault claims.
- SettleDiff and CaseZero animated runways combined must be at most `1040vh` desktop and `860vh` mobile.
- No unchanged scene may occupy more than `0.12` normalized chapter progress.
- Every named hold has one dominant sentence, one focal object, and a distinct visual or conceptual payoff.
- No named hold may expose more than three meaningful foreground objects.
- Body copy is at least `16px`; interactive targets are at least `44×44px` on iPhone.
- Preserve the `180 KiB` gzip page-JavaScript limit and existing Lighthouse thresholds.
- Supported physical devices remain the owner's Mac and iPhone only.
- Do not add packages, routes, server features, external runtime assets, or deploy/push without explicit owner approval.

---

## File Structure

### Create

- `src/features/case-zero/caseZeroTypes.ts` — semantic state union and ordered state list.
- `src/features/case-zero/caseZeroState.ts` — authoritative normalized state ranges and mapper.
- `src/features/case-zero/caseZeroState.test.ts` — boundary and clamping tests.
- `src/features/case-zero/CaseFile.tsx` — public docket, source/locator/evidence layers, and attribution.
- `src/features/case-zero/BlindBoundary.tsx` — separated official-finding object and blindness climax.
- `src/features/case-zero/LockRecord.tsx` — implemented lock-infrastructure representation.
- `src/features/case-zero/SettleToCaseZeroTransition.tsx` — abstract verified-evidence seam.
- `src/features/case-zero/CaseZeroStage.tsx` — desktop semantic composition.
- `src/features/case-zero/MobileCaseZeroStage.tsx` — mobile semantic composition.
- `src/features/case-zero/CaseZeroSection.tsx` — desktop/mobile branch owner.
- `src/features/case-zero/CaseZero.module.css` — shared and desktop visual system.
- `src/features/case-zero/MobileCaseZero.module.css` — purpose-built iPhone geometry.
- `src/features/case-zero/CaseZeroStage.test.tsx` — copy, semantics, and target contract.
- `src/features/portfolio/ReducedMotionNarrative.tsx` — complete three-project static story.
- `src/features/portfolio/ReducedMotionNarrative.module.css` — normal-flow reduced/no-JS presentation.
- `src/features/portfolio/ReducedMotionNarrative.test.tsx` — complete order and factual-boundary tests.

### Modify

- `src/content/portfolioContent.ts` and `.test.ts` — CaseZero content, Context.dev copy, dated metrics, and claim guards.
- `src/features/portfolio/PortfolioExperience.tsx`, `.module.css`, and `.test.tsx` — two narrative chapter containers plus one fallback branch.
- `src/features/settle-diff/SettleDiffSection.tsx` — animated SettleDiff branches only.
- `src/features/settle-diff/SettleDiffStage.tsx` and `MobileSettleDiffStage.tsx` — replace direct Vault overlay with the CaseZero seam and add SettleDiff Context.dev attribution.
- `src/features/settle-diff/SettleDiff.module.css` and `MobileSettleDiff.module.css` — shorter runway pacing and seam styling.
- `src/features/vault-steward/VaultTransitionOverlay.tsx`, `.test.tsx`, and relevant styles — consume the CaseZero lock packet instead of the SettleDiff packet.
- `src/lib/animation/media.ts` and `.test.ts` — chapter-specific runway contract.
- `src/lib/animation/timeline.ts` and `.test.ts` — separate SettleDiff and CaseZero timeline builders.
- `src/lib/animation/runtime.ts` and `.test.ts` — two chapter triggers under one lifecycle.
- `tests/e2e/helpers/narrative.ts` — chapter-aware scroll helper.
- All files in `tests/e2e/` — three-project order, geometry, fallback, lifecycle, accessibility, and viewport assertions.
- `docs/REQUIREMENTS.md`, `docs/STORYBOARD.md`, `docs/BUILD_SPEC.md`, `docs/IMPLEMENTATION_STATUS.md`, and `docs/ACCEPTANCE_RUNBOOK.md` — canonical implementation and evidence status.

### Delete after replacement is tested

- `src/features/settle-diff/ReducedMotionNarrative.tsx`
- `src/features/settle-diff/ReducedMotionNarrative.module.css`
- `src/features/settle-diff/ReducedMotionNarrative.test.tsx`

---

### Task 1: Lock the CaseZero Content and State Contracts

**Files:**
- Create: `src/features/case-zero/caseZeroTypes.ts`
- Create: `src/features/case-zero/caseZeroState.ts`
- Create: `src/features/case-zero/caseZeroState.test.ts`
- Modify: `src/content/portfolioContent.ts`
- Modify: `src/content/portfolioContent.test.ts`

**Interfaces:**
- Produces: `CaseZeroState`, `CASE_ZERO_STATES`, `CASE_ZERO_STATE_RANGES`, `progressToCaseZeroState(progress)`.
- Produces: `projectLinks.caseZero`, `externalLinks.contextDev`, `caseZero`, `caseZeroMetrics`, and `contextDevUsage`.
- Consumes: no new runtime interfaces.

- [ ] **Step 1: Write failing content-contract tests**

Add assertions that require the source link, qualifier, exact Context.dev labels,
dated reference metrics, and the absence of future-state claims:

```ts
expect(projectLinks.caseZero).toBe("https://github.com/ibrahim1023/CaseZero");
expect(externalLinks.contextDev).toBe("https://context.dev/");
expect(caseZero.qualifier).toBe(
  "Independent experimental project · not affiliated with the NTSB",
);
expect(contextDevUsage.settleDiff).toBe(
  "Context.dev · conditional public status-page evidence",
);
expect(contextDevUsage.caseZero).toBe(
  "Context.dev · schema-constrained docket discovery",
);
expect(caseZeroMetrics).toMatchObject({
  caseId: "CEN22FA375",
  measuredOn: "2026-09-01",
  evidenceItems: 951,
  pdfLocated: 200,
  tableLocated: 751,
  provisionalCandidates: 171,
});
expect(JSON.stringify(caseZero)).not.toMatch(
  /completed autonomous investigation|official cause|NTSB-approved|powered by Context\.dev/i,
);
```

- [ ] **Step 2: Write failing state-boundary tests**

```ts
expect(CASE_ZERO_STATES).toEqual([
  "casezero-established",
  "public-docket",
  "evidence-typed",
  "finding-sealed",
  "blind-by-construction",
  "lock-ready",
  "vault-handoff",
]);
expect(progressToCaseZeroState(0.13)).toBe("public-docket");
expect(progressToCaseZeroState(0.72)).toBe("blind-by-construction");
expect(progressToCaseZeroState(Number.NaN)).toBe("casezero-established");
expect(progressToCaseZeroState(2)).toBe("vault-handoff");
```

- [ ] **Step 3: Run the focused tests and confirm the contract is missing**

Run:

```bash
pnpm exec vitest run src/content/portfolioContent.test.ts src/features/case-zero/caseZeroState.test.ts
```

Expected: FAIL because the new exports and files do not exist.

- [ ] **Step 4: Add the minimal content contract**

Implement these stable shapes in `portfolioContent.ts`:

```ts
export const externalLinks = { contextDev: "https://context.dev/" } as const;

export const caseZero = {
  title: "CaseZero",
  descriptor: "Evidence-first AI investigations, blind to the official answer.",
  qualifier: "Independent experimental project · not affiliated with the NTSB",
  openingQuestion: "Can an investigation reason without seeing the answer?",
  acquisition: "Public evidence in. Official finding held back.",
  evidence: "Every claim stays attached to its source.",
  blindness: "The answer is outside the room.",
  climax: "BLIND BY CONSTRUCTION",
  lock: "Lock the assessment before reveal.",
  transition:
    "Trustworthy conclusions resist hindsight. Trustworthy changes wait for approval.",
} as const;

export const caseZeroMetrics = {
  caseId: "CEN22FA375",
  measuredOn: "2026-09-01",
  reviewedDocketItems: 15,
  processedSources: 3,
  evidenceItems: 951,
  pdfLocated: 200,
  tableLocated: 751,
  provisionalCandidates: 171,
  finalRunFailures: 0,
} as const;

export const contextDevUsage = {
  settleDiff: "Context.dev · conditional public status-page evidence",
  caseZero: "Context.dev · schema-constrained docket discovery",
} as const;
```

- [ ] **Step 5: Add the authoritative state map**

```ts
export const CASE_ZERO_STATES = [
  "casezero-established", "public-docket", "evidence-typed",
  "finding-sealed", "blind-by-construction", "lock-ready", "vault-handoff",
] as const;
export type CaseZeroState = (typeof CASE_ZERO_STATES)[number];

export const CASE_ZERO_STATE_RANGES: Record<CaseZeroState, readonly [number, number]> = {
  "casezero-established": [0, 0.12],
  "public-docket": [0.12, 0.29],
  "evidence-typed": [0.29, 0.50],
  "finding-sealed": [0.50, 0.68],
  "blind-by-construction": [0.68, 0.84],
  "lock-ready": [0.84, 0.96],
  "vault-handoff": [0.96, 1],
};
```

Implement `progressToCaseZeroState` with finite-number handling and clamping,
following `progressToSettleDiffState`.

- [ ] **Step 6: Run focused tests**

Run the Step 3 command. Expected: PASS.

- [ ] **Step 7: Commit the contract**

```bash
git add src/content src/features/case-zero
git commit -m "feat: define CaseZero narrative contract"
```

---

### Task 2: Build the Semantic CaseZero Stages

**Files:**
- Create: `src/features/case-zero/CaseFile.tsx`
- Create: `src/features/case-zero/BlindBoundary.tsx`
- Create: `src/features/case-zero/LockRecord.tsx`
- Create: `src/features/case-zero/CaseZeroStage.tsx`
- Create: `src/features/case-zero/MobileCaseZeroStage.tsx`
- Create: `src/features/case-zero/CaseZeroSection.tsx`
- Create: `src/features/case-zero/CaseZero.module.css`
- Create: `src/features/case-zero/MobileCaseZero.module.css`
- Create: `src/features/case-zero/CaseZeroStage.test.tsx`

**Interfaces:**
- Consumes: Task 1 content and `CaseZeroState`.
- Produces: `CaseZeroSection`, desktop/mobile stage roots, and stable `data-*`
  animation targets consumed by Task 5.

- [ ] **Step 1: Write the failing semantic-stage test**

Render `CaseZeroStage` and require these targets and labels:

```ts
expect(screen.getByRole("heading", { name: "CaseZero" })).toBeVisible();
expect(screen.getByRole("link", { name: /view CaseZero source/i })).toHaveAttribute(
  "href", "https://github.com/ibrahim1023/CaseZero",
);
expect(container.querySelector("[data-case-file]")).toBeInTheDocument();
expect(container.querySelectorAll("[data-evidence-layer]")).toHaveLength(3);
expect(container.querySelector("[data-official-finding]")).toHaveTextContent(
  "OFFICIAL NTSB FINDING · SEALED UNTIL LOCK",
);
expect(container.querySelector("[data-blind-boundary]")).toBeInTheDocument();
expect(container.querySelector("[data-lock-record]")).toHaveTextContent(
  "implemented lock infrastructure",
);
expect(container).toHaveTextContent("not affiliated with the NTSB");
```

Add a second test that renders `MobileCaseZeroStage` and requires every major
target to carry `data-layout="mobile"` or live under the mobile stage root.

- [ ] **Step 2: Run the test and verify it fails**

```bash
pnpm exec vitest run src/features/case-zero/CaseZeroStage.test.tsx
```

Expected: FAIL because the components are absent.

- [ ] **Step 3: Implement focused semantic objects**

Use real elements and real text. `CaseFile` must expose three ordered layers:

```tsx
<article data-animatable data-case-file data-layout={layout}>
  <header>
    <span>PUBLIC NTSB DOCKET</span>
    <strong>{caseZero.acquisition}</strong>
    <a href={externalLinks.contextDev}>{contextDevUsage.caseZero}</a>
  </header>
  <ol aria-label="Evidence lineage">
    <li data-animatable data-evidence-layer>SOURCE</li>
    <li data-animatable data-evidence-layer>LOCATOR</li>
    <li data-animatable data-evidence-layer>EVIDENCE</li>
  </ol>
</article>
```

`BlindBoundary` must render official and generated content as separate sibling
regions with explicit text labels. `LockRecord` must list `assessment hash`,
`evidence-set hash`, `model versions`, and `prompt versions`, plus the visible
qualifier `implemented lock infrastructure`.

- [ ] **Step 4: Compose desktop and mobile stages**

Each stage must contain:

```tsx
<div data-animatable data-casezero-stage data-layout={layout} data-state={state}>
  <div data-animatable data-casezero-surface />
  <header data-animatable data-casezero-header>...</header>
  <p data-animatable data-casezero-question>{caseZero.openingQuestion}</p>
  <CaseFile layout={layout} />
  <BlindBoundary layout={layout} />
  <LockRecord layout={layout} />
</div>
```

`CaseZeroSection` renders exactly one desktop and one mobile branch. It does not
own reduced-motion or `<noscript>` output. Task 4 adds the Vault overlay only
after its ownership has been removed from SettleDiff.

- [ ] **Step 5: Add still-frame CSS before animation CSS**

Style every scene as a readable still with:

- neutral paper background;
- graphite text and restrained evidence blue;
- one optical-center focal object;
- official finding and generated evidence separated by structure and labels;
- no more than three foreground objects;
- mobile vertical ordering without transforms required for readability.

Active GSAP branches may later hide scenes with inline styles. Without inline
styles, all semantic content must remain readable in normal source order.

- [ ] **Step 6: Run component, lint, and type tests**

```bash
pnpm exec vitest run src/features/case-zero/CaseZeroStage.test.tsx
pnpm lint
pnpm typecheck
```

Expected: all PASS.

- [ ] **Step 7: Commit the static chapter**

```bash
git add src/features/case-zero
git commit -m "feat: add semantic CaseZero stages"
```

---

### Task 3: Install the Three-Project Page and Static Fallback

**Files:**
- Create: `src/features/portfolio/ReducedMotionNarrative.tsx`
- Create: `src/features/portfolio/ReducedMotionNarrative.module.css`
- Create: `src/features/portfolio/ReducedMotionNarrative.test.tsx`
- Modify: `src/features/portfolio/PortfolioExperience.tsx`
- Modify: `src/features/portfolio/PortfolioExperience.module.css`
- Modify: `src/features/portfolio/PortfolioExperience.test.tsx`
- Modify: `src/features/settle-diff/SettleDiffSection.tsx`
- Delete: `src/features/settle-diff/ReducedMotionNarrative.tsx`
- Delete: `src/features/settle-diff/ReducedMotionNarrative.module.css`
- Delete: `src/features/settle-diff/ReducedMotionNarrative.test.tsx`

**Interfaces:**
- Consumes: `SettleDiffSection`, `CaseZeroSection`, `VaultStewardArrival`.
- Produces: `[data-narrative="settlediff"]`, `[data-narrative="casezero"]`,
  and one `[data-branch="reduced"]` portfolio fallback.

- [ ] **Step 1: Write failing order and fallback tests**

```ts
const projects = Array.from(container.querySelectorAll("[data-project-root]"));
expect(projects.map((project) => project.getAttribute("data-project-root"))).toEqual([
  "settlediff", "casezero", "vault-steward",
]);
expect(container.querySelectorAll('[data-narrative="settlediff"]')).toHaveLength(1);
expect(container.querySelectorAll('[data-narrative="casezero"]')).toHaveLength(1);
expect(container.querySelectorAll('[data-branch="reduced"]')).toHaveLength(1);
```

In the reduced narrative test, assert that `VERIFIED` precedes `CaseZero`,
`BLIND BY CONSTRUCTION` precedes `Vault Steward`, and both exact Context.dev
labels are present.

- [ ] **Step 2: Run focused tests and verify failure**

```bash
pnpm exec vitest run src/features/portfolio/PortfolioExperience.test.tsx src/features/portfolio/ReducedMotionNarrative.test.tsx
```

Expected: FAIL because CaseZero and the portfolio-level fallback are absent.

- [ ] **Step 3: Recompose the page**

Use this exact structural ownership:

```tsx
<div data-portfolio-experience>
  <PortfolioAnimationController />
  <IntroSection />
  <div data-project-root="settlediff" data-narrative="settlediff"><SettleDiffSection /></div>
  <div data-project-root="casezero" data-narrative="casezero"><CaseZeroSection /></div>
  <div data-branch="reduced" data-no-js-narrative>
    <ReducedMotionNarrative />
  </div>
  <div data-project-root="vault-steward"><VaultStewardArrival /></div>
  <noscript>{/* hide animated layouts; show reduced branch */}</noscript>
</div>
```

Move fallback ownership out of `SettleDiffSection`. Do not duplicate CaseZero
or Vault content across multiple visible reduced branches.

- [ ] **Step 4: Implement complete reduced/no-JS reading order**

Use semantic sections and headings. Include the SettleDiff receipt/proof
distinction, CaseZero public docket/evidence/blind/lock sequence, NTSB
qualifier, both Context.dev roles, and the Vault approval rail. Dated metrics
must include `CEN22FA375 · measured 2026-09-01` in the same panel.

- [ ] **Step 5: Run focused tests**

Run the Step 2 command. Expected: PASS.

- [ ] **Step 6: Verify no-JavaScript export semantics**

```bash
pnpm build:pages
pnpm exec playwright test tests/e2e/no-javascript.spec.ts --reporter=line
```

Expected: the three project headings and complete trust progression are
visible in source order with no failed asset request.

- [ ] **Step 7: Commit the page composition**

```bash
git add src/features/portfolio src/features/settle-diff src/features/case-zero
git commit -m "feat: compose three-project portfolio story"
```

---

### Task 4: Replace the SettleDiff-to-Vault Ending with the CaseZero Seam

**Files:**
- Create: `src/features/case-zero/SettleToCaseZeroTransition.tsx`
- Create: `src/features/case-zero/SettleToCaseZeroTransition.test.tsx`
- Modify: `src/features/settle-diff/SettleDiffStage.tsx`
- Modify: `src/features/settle-diff/MobileSettleDiffStage.tsx`
- Modify: `src/features/settle-diff/SettleDiff.module.css`
- Modify: `src/features/settle-diff/MobileSettleDiff.module.css`
- Modify: `src/features/vault-steward/VaultTransitionOverlay.tsx`
- Modify: `src/features/vault-steward/VaultTransitionOverlay.test.tsx`

**Interfaces:**
- Produces: `[data-settle-case-transition]`, `[data-verified-evidence-token]`,
  `[data-casezero-bridge-copy]`.
- Changes: `VaultTransitionOverlay` is rendered only by CaseZero stages and its
  packet becomes `[data-lock-packet]`.

- [ ] **Step 1: Write failing seam-ownership tests**

```ts
expect(settleContainer.querySelector("[data-vault-transition]")).toBeNull();
expect(settleContainer.querySelector("[data-settle-case-transition]")).toBeInTheDocument();
expect(settleContainer).toHaveTextContent("Evidence can be verified.");
expect(settleContainer).toHaveTextContent(
  "Can an investigation stay blind to the answer?",
);
expect(caseZeroContainer.querySelector("[data-vault-transition]")).toBeInTheDocument();
expect(caseZeroContainer.querySelector("[data-lock-packet]")).toBeInTheDocument();
expect(settleContainer.querySelector("[data-contextdev-attribution]")).toHaveTextContent(
  "Context.dev · conditional public status-page evidence",
);
```

- [ ] **Step 2: Run component tests and verify failure**

```bash
pnpm exec vitest run src/features/case-zero/SettleToCaseZeroTransition.test.tsx src/features/settle-diff/SettleDiffStage.test.tsx src/features/vault-steward/VaultTransitionOverlay.test.tsx
```

Expected: FAIL on the old direct Vault ownership.

- [ ] **Step 3: Implement the abstract seam**

Render only:

```tsx
<section data-animatable data-settle-case-transition>
  <div data-animatable data-verified-evidence-token>VERIFIED EVIDENCE</div>
  <p data-animatable data-casezero-bridge-copy>
    Evidence can be verified.<br />
    Can an investigation stay blind to the answer?
  </p>
</section>
```

Do not put CaseZero's case file inside SettleDiff. The token exits before the
new project header settles.

Add the SettleDiff Context.dev link as a subordinate technical annotation in
the reconstruction/system-boundary layer. Give it
`data-contextdev-attribution`, link to `https://context.dev/`, and keep it out
of the proof record and verdict so it cannot be read as verdict input.

- [ ] **Step 4: Reassign the Vault overlay**

Render `VaultTransitionOverlay` only in `CaseZeroStage` and
`MobileCaseZeroStage`. Rename its evidence token hook to `data-lock-packet` and
replace SettleDiff-specific copy with the approved transition thesis. Preserve
the existing boundary, title, headline, and four-step Vault rail hooks.

- [ ] **Step 5: Add distinct seam styles**

SettleDiff's seam uses a small cool verified token and matched-scale exit.
CaseZero's later seam uses a vertical visibility wall that warms into the Vault
boundary. The two seams must not share the same entrance transform or duration.

- [ ] **Step 6: Run focused tests**

Run the Step 2 command. Expected: PASS.

- [ ] **Step 7: Commit seam ownership**

```bash
git add src/features/case-zero src/features/settle-diff src/features/vault-steward
git commit -m "feat: relay verified evidence into CaseZero"
```

---

### Task 5: Build Separate Chapter Timelines and Enforce Pacing

**Files:**
- Modify: `src/lib/animation/media.ts`
- Modify: `src/lib/animation/media.test.ts`
- Modify: `src/lib/animation/timeline.ts`
- Modify: `src/lib/animation/timeline.test.ts`
- Modify: `src/features/portfolio/PortfolioExperience.module.css`

**Interfaces:**
- Produces: `NarrativeChapter = "settlediff" | "casezero"`.
- Produces: `RUNWAY_VH[chapter][layout]` and
  `runwayPixels(chapter, layout, viewportHeight)`.
- Produces: `queryPortfolioTimelineElements(root, layout)`,
  `buildSettleDiffNarrativeTimeline(elements, layout)`, and
  `buildCaseZeroNarrativeTimeline(elements, layout)`.

- [ ] **Step 1: Write failing runway-budget tests**

```ts
expect(RUNWAY_VH).toEqual({
  settlediff: { desktop: 680, mobile: 520 },
  casezero: { desktop: 360, mobile: 340 },
});
expect(RUNWAY_VH.settlediff.desktop + RUNWAY_VH.casezero.desktop).toBeLessThanOrEqual(1040);
expect(RUNWAY_VH.settlediff.mobile + RUNWAY_VH.casezero.mobile).toBeLessThanOrEqual(860);
expect(runwayPixels("casezero", "mobile", 844)).toBeCloseTo(2869.6);
```

- [ ] **Step 2: Write failing timeline-label and ownership tests**

Require all CaseZero labels in order and exact target ownership:

```ts
expect(caseTimeline.labels["casezero-established"]).toBe(0);
expect(caseTimeline.labels["public-docket"]).toBeLessThan(
  caseTimeline.labels["evidence-typed"],
);
expect(caseTimeline.labels["blind-by-construction"]).toBeLessThan(
  caseTimeline.labels["lock-ready"],
);
expect(caseTimeline.labels["vault-handoff"]).toBeLessThanOrEqual(
  caseTimeline.duration(),
);
expect(settleTimeline.getById("vault-transition")).toBeNull();
expect(caseTimeline.getById("vault-transition")).toBeTruthy();
```

Also assert that every outgoing CaseZero scene reaches `visibility: "hidden"`
before the following scene reaches its settled opacity.

- [ ] **Step 3: Run focused tests and verify failure**

```bash
pnpm exec vitest run src/lib/animation/media.test.ts src/lib/animation/timeline.test.ts
```

Expected: FAIL because the runtime still has one chapter/runway/timeline.

- [ ] **Step 4: Implement chapter-specific runways**

```ts
export type NarrativeChapter = "settlediff" | "casezero";
export const RUNWAY_VH = {
  settlediff: { desktop: 680, mobile: 520 },
  casezero: { desktop: 360, mobile: 340 },
} as const;

export function runwayPixels(
  chapter: NarrativeChapter,
  layout: NarrativeLayout,
  viewportHeight: number,
): number {
  return (RUNWAY_VH[chapter][layout] / 100) * viewportHeight;
}
```

Give the mobile chapter containers `620dvh` and `440dvh` minimum heights so
each sticky stage has one release viewport without adding dead space.

- [ ] **Step 5: Split query scopes and timelines**

Scope every query through both chapter and layout:

```ts
const scope = `[data-narrative="${chapter}"] [data-animated-layout="${layout}"]`;
```

The SettleDiff timeline ends with the verified-evidence seam. The CaseZero
timeline owns its header, case file, evidence layers, official finding,
visibility wall, blind climax, lock record, and Vault overlay.

- [ ] **Step 6: Implement CaseZero motion with one payoff per state**

- `public-docket`: case-file cover opens; Context.dev label appears after the
  public-source line.
- `evidence-typed`: `SOURCE → LOCATOR → EVIDENCE` resolves sequentially.
- `finding-sealed`: the separate official object crosses behind the wall while
  evidence remains stationary.
- `blind-by-construction`: prior copy clears; the wall and climax occupy an
  otherwise quiet canvas.
- `lock-ready`: climax clears; hashes settle into one compact record.
- `vault-handoff`: CaseZero labels clear; wall warms; lock packet and Vault
  workflow enter.

Use horizontal offsets for desktop and vertical offsets for mobile. Do not
animate text while the containing object is moving.

- [ ] **Step 7: Run focused tests**

Run the Step 3 command. Expected: PASS.

- [ ] **Step 8: Commit timeline separation**

```bash
git add src/lib/animation src/features/portfolio/PortfolioExperience.module.css
git commit -m "feat: animate compact CaseZero chapter"
```

---

### Task 6: Extend the Runtime to Two Reversible Chapters

**Files:**
- Modify: `src/lib/animation/runtime.ts`
- Modify: `src/lib/animation/runtime.test.ts`
- Modify: `src/features/portfolio/PortfolioAnimationController.tsx`

**Interfaces:**
- Consumes: chapter query results, timelines, and runways from Task 5.
- Produces: three active trigger roles—`intro`, `settlediff`, `casezero`—inside
  one media branch and one cleanup lifecycle.

- [ ] **Step 1: Write failing runtime tests**

Require three triggers, separate chapter ends, state instrumentation, one
refresh, and full cleanup:

```ts
expect(create).toHaveBeenCalledTimes(3);
const configs = create.mock.calls.map(([config]) => config as {
  id: string;
  end?: () => string;
});
expect(configs.find(({ id }) => id === "settlediff")?.end?.()).toBe("+=5440");
expect(configs.find(({ id }) => id === "casezero")?.end?.()).toBe("+=2880");
expect(configs.map(({ id }) => id).sort()).toEqual([
  "casezero", "intro", "settlediff",
]);
expect(scrollTriggerApi.refresh).toHaveBeenCalledTimes(1);
cleanup();
expect(triggerKills.every((kill) => kill.mock.calls.length === 1)).toBe(true);
expect(root).not.toHaveAttribute("data-animated");
```

Add setup-failure coverage where CaseZero is missing: neither chapter may be
left at zero opacity or transformed off-screen after cleanup.

- [ ] **Step 2: Run runtime tests and verify failure**

```bash
pnpm exec vitest run src/lib/animation/runtime.test.ts
```

Expected: FAIL because only one narrative trigger exists.

- [ ] **Step 3: Create one trigger per chapter**

Inside each active media branch:

```ts
const chapterAnimations = {
  settlediff: buildSettleDiffNarrativeTimeline(elements.settlediff, layout),
  casezero: buildCaseZeroNarrativeTimeline(elements.casezero, layout),
};

for (const chapter of ["settlediff", "casezero"] as const) {
  const chapterElements = elements[chapter];
  triggers.push(scrollTriggerApi.create({
    id: chapter,
    trigger: chapterElements.narrative,
    start: "top top",
    end: () => `+=${runwayPixels(chapter, layout, viewportHeight())}`,
    pin: layout === "desktop",
    pinSpacing: layout === "desktop",
    scrub: layout === "mobile" ? true : 0.5,
    animation: chapterAnimations[chapter],
  }));
}
```

Use distinct `onUpdate` callbacks for SettleDiff and CaseZero development-only
`data-state` hooks. Production exports must contain neither value.

- [ ] **Step 4: Preserve coordinated readiness and cleanup**

Build both timelines before setting `data-animated="ready"`. Keep the existing
two-animation-frame refresh, then expose readiness only after refresh reconciles
both pin spacers and any restored scroll position. A failure in either chapter
must kill every created trigger/timeline and clear all `[data-animatable]`
properties.

- [ ] **Step 5: Run runtime tests**

Run the Step 2 command. Expected: PASS.

- [ ] **Step 6: Run type, unit, and production export tests**

```bash
pnpm typecheck
pnpm test
pnpm build:pages
```

Expected: all PASS.

- [ ] **Step 7: Commit runtime ownership**

```bash
git add src/lib/animation src/features/portfolio/PortfolioAnimationController.tsx
git commit -m "feat: coordinate two narrative chapters"
```

---

### Task 7: Prove Appeal, Pacing, Accessibility, and Release Quality

**Files:**
- Modify: `tests/e2e/helpers/narrative.ts`
- Modify: `tests/e2e/scroll-states.spec.ts`
- Modify: `tests/e2e/lifecycle.spec.ts`
- Modify: `tests/e2e/mobile.spec.ts`
- Modify: `tests/e2e/reduced-motion.spec.ts`
- Modify: `tests/e2e/no-javascript.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/viewport-matrix.spec.ts`
- Modify: `tests/e2e/export-smoke.spec.ts`
- Modify: canonical documentation listed in File Structure.

**Interfaces:**
- Produces: `scrollNarrativeTo(page, chapter, layout, progress)`.
- Verifies: three-project order, distinct state payoffs, scene exclusivity,
  transitions, lifecycle, accessibility, responsive geometry, performance,
  and content accuracy.

- [ ] **Step 1: Make the E2E helper chapter-aware**

```ts
export async function scrollNarrativeTo(
  page: Page,
  chapter: "settlediff" | "casezero",
  layout: NarrativeLayout,
  progress: number,
) {
  const anchor = page.locator(`[data-narrative="${chapter}"]`);
  const multiplier = RUNWAY_MULTIPLIER[chapter][layout];
  // Resolve pin-spacer top, scroll to top + viewportHeight × multiplier × progress,
  // then wait for two animation frames.
}
```

Use exact multipliers matching Task 5: SettleDiff `6.8/5.2`, CaseZero
`3.6/3.4` for desktop/mobile.

- [ ] **Step 2: Add three-project forward/reverse and exclusivity tests**

For both layouts, visit every settled CaseZero state at progress
`.05, .20, .40, .59, .75, .90, .99`, then reverse the same list. At each hold:

- current target opacity is at least `.75`;
- previous target opacity is at most `.25` or hidden;
- there is exactly one dominant `[data-scene-primary]` target;
- no more than three `[data-foreground-object]` targets are visible;
- stage background and text meet the expected light/dark visual mode.

- [ ] **Step 3: Add transition non-overlap tests**

At the SettleDiff seam, assert the SettleDiff project UI is hidden before the
CaseZero header reaches settled opacity. At the CaseZero seam, assert CaseZero
header, case file, official finding, climax, and lock copy are hidden before
the Vault title settles. Use bounding boxes to prove the verified token and
incoming case file do not intersect at their holds.

- [ ] **Step 4: Add pacing-budget assertions**

Read computed pin-spacer heights and assert:

```ts
expect(settleRunwayVh + caseRunwayVh).toBeLessThanOrEqual(
  layout === "desktop" ? 1040 : 860,
);
```

For each adjacent state pair, assert the primary target changes. Fail with the
state names if two consecutive holds expose the same focal target. This is the
automated guard against visually dead intervals.

- [ ] **Step 5: Extend lifecycle and iPhone tests**

Cover refresh inside each chapter, fast scroll to Vault, full reverse to the
SettleDiff opening, back/forward navigation, portrait↔landscape rebuilding,
dynamic-height viewport changes, native scrolling, and one active pin/sticky
stage at a time. At `320px`, assert no horizontal overflow and unclipped focus
rings on SettleDiff, CaseZero, Context.dev, and Vault source links.

- [ ] **Step 6: Extend reduced-motion, no-JS, and Axe checks**

Require the complete semantic order and exact qualification language. Run Axe
against SettleDiff proof, CaseZero blind boundary, and Vault arrival in desktop,
mobile, and reduced-motion modes. Failure output must identify the blocking
node and rule.

- [ ] **Step 7: Extend export and external-link assertions**

Require exact GitHub links for all three projects and
`https://context.dev/`. Confirm no component hard-codes `/portfolio`, all
internal static assets resolve under the base path, external links remain
absolute, and production output contains no debug
`data-state` value.

- [ ] **Step 8: Run the focused browser suite**

```bash
pnpm build:pages
pnpm exec playwright test tests/e2e/scroll-states.spec.ts tests/e2e/mobile.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/lifecycle.spec.ts --reporter=line
```

Expected: all PASS with no page, console, hydration, or failed-response errors.

- [ ] **Step 9: Perform visual pacing review on local Mac preview**

Start one local preview and inspect ordinary-speed forward and reverse scrolling
at `1440×900`, `1280×720`, `390×844`, and `320×800`. Record PASS only when:

- every state introduces a visible payoff;
- no blank or unchanged viewport appears;
- technical labels remain secondary;
- both project seams are clean;
- neither device journey feels padded despite adding CaseZero; each chapter
  earns its allocated runway and transitions promptly into the next project.

Do not open or control Safari/Chrome unless the owner explicitly asks for
browser testing in that turn. Stop every local server after review.

- [ ] **Step 10: Run the full automated release gate**

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build:pages
pnpm bundle:check
pnpm test:e2e
pnpm lighthouse
git diff --check
```

Expected: zero failures, page JavaScript at or below `184320` gzip bytes,
Lighthouse Performance at least 90, and Accessibility/Best Practices/SEO at
least 95.

- [ ] **Step 11: Reconcile canonical docs with measured evidence**

Update requirements, storyboard, build spec, implementation status, and
acceptance runbook with the final state names, actual runway values, test
counts, bundle bytes, Lighthouse results, and remaining physical Mac/iPhone
checks. Do not mark deployment or owner-device acceptance complete.

- [ ] **Step 12: Commit tests and documentation**

```bash
git add tests docs README.md
git commit -m "test: validate three-project portfolio story"
```

---

## Final Owner Acceptance

After automated validation, the owner reviews the complete experience on the
physical Mac and iPhone. Record browser/device versions, portrait/landscape,
dynamic browser chrome, native touch scroll, reduced motion, VoiceOver order,
ordinary-speed pacing, and both transition seams. Do not push or deploy until
the owner explicitly approves the reviewed commit.
