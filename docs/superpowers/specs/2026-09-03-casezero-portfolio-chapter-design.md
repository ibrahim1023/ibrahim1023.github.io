# CaseZero Portfolio Chapter Design

**Date:** 2026-09-03  
**Status:** Owner-approved direction; written-spec review pending  
**Portfolio scope:** SettleDiff → CaseZero → Vault Steward  
**CaseZero source:** `main` at `73755b19cb0fcf7cc58a43b7d4707c3ea19f4732`  
**SettleDiff source:** `main` at `03d0bf4f5a652f33e90186e7fe2eaed819c3002e`

This specification adds a compact, complete CaseZero chapter between the
implemented SettleDiff story and the existing Vault Steward arrival. It changes
both project handoffs but does not redesign the homepage or expand Vault
Steward beyond its existing arrival frame.

## 1. Narrative architecture

The three projects form one trust progression:

```text
SettleDiff verifies what happened
→ CaseZero protects how evidence is interpreted
→ Vault Steward protects what may be changed
```

Each project keeps its own subject and product identity. Continuity comes from
a shared visual grammar—evidence, boundaries, verification, and controlled
authority—not from pretending a payment record becomes aviation evidence or a
case file becomes an Obsidian note.

The selected approach is a **trust relay**:

1. SettleDiff finishes its current independently verified purchase.
2. Its artifact compresses into the abstract idea `VERIFIED EVIDENCE` and exits.
3. A new CaseZero case file forms from an officially public docket.
4. CaseZero turns sources into traceable evidence, separates the official
   answer, enforces temporal blindness, and presents its implemented lock
   boundary.
5. The lock boundary becomes the visual grammar for Vault Steward's approval
   boundary.

This avoids two rejected approaches:

- a Context.dev-centered story, which would overstate an external service and
  obscure Ibrahim's systems work; and
- hard project cuts, which would lose the reversible Apple-like continuity.

## 2. CaseZero product truth

CaseZero is an independent experimental system for evidence-first AI
investigations of publicly available NTSB aviation-accident material. Its
architectural goal is to reconstruct an investigation while blind to the
official probable-cause finding, lock its assessment, and only then compare it
with the official finding.

### Implemented and safe to show

The current repository supports these portfolio claims:

- deterministic NTSB case acquisition and docket-manifest validation;
- source URL validation, downloads of approved originals, immutable storage,
  SHA-256 checksums, provenance, rights dispositions, and visibility labels;
- PDF and table processing into typed, source-located evidence;
- persisted semantic extraction and provisional claim/entity/timeline
  candidates;
- a database-enforced temporal-blindness boundary with dedicated runtime
  roles, row-level security, evidence cutoffs, absent forbidden capabilities,
  and append-only access auditing;
- an investigation-lock service and database boundary that records an
  assessment snapshot, assessment hash, evidence-set hash, model versions,
  prompt versions, system version, and lock time;
- deterministic leakage auditing and offline attacks covering forbidden blind
  capabilities.

The validated CEN22FA375 Phase 1 run may appear only as dated secondary
evidence:

- 15 reviewed docket items;
- 3 `AI_ALLOWED` sources processed;
- 951 active, locator-resolved EvidenceItems;
- 200 PDF-located and 751 table-located items;
- 171 provisional candidates;
- 0 final-run failures;
- a no-change run that made 0 model calls and created no duplicate active state.

These figures describe the 2026-09-01 reference run, not a permanent product
total or a claim of expert-validated semantic correctness.

### Not implemented and prohibited from the chapter

Do not imply that CaseZero currently provides:

- a completed autonomous investigation;
- competing-hypothesis generation, falsification, causal-graph construction,
  or a final aviation assessment in production;
- a completed blind comparison against an official NTSB finding;
- a polished investigation UI;
- expert aviation validation of all extracted evidence or candidates;
- an official finding, legal conclusion, or determination of cause, fault,
  negligence, or liability.

The existing lock infrastructure may be demonstrated as a system capability.
Do not fabricate a real locked assessment result.

The CaseZero README still labels the repository as Phase 0, while its current
code and dated Phase 1 validation contain later work. Treat the README status
line as stale. No Phase 2 exit-validation record was found, so describe the
blindness and lock work as implemented infrastructure—not as a completed Phase
2 release.

## 3. Context.dev attribution contract

Context.dev is a supporting evidence-acquisition capability in both projects,
but the uses are materially different and must remain separate.

### SettleDiff

Approved secondary label:

```text
Context.dev · conditional public status-page evidence
```

SettleDiff calls Context.dev only when a failed service response exposes an
eligible public HTTPS status URL. It asks whether the exact HTTP-status claim
is present, stores a bounded redacted evidence artifact, and keeps that result
outside the deterministic financial verdict. Successful services or
ineligible/missing status URLs do not trigger the call. The adapter has a
one-call investigation budget and explicit absent/error states.

The committed 2026-09-02 compatibility record proves the documented Markdown
scrape response worked for one owner-approved public IANA page and exact claim.
It does not prove permanent provider availability or make Context.dev an
independent settlement source.

### CaseZero

Approved secondary label:

```text
Context.dev · schema-constrained docket discovery
```

CaseZero's Context.dev client submits a public NTSB docket URL, the strict
`DocketManifest` JSON schema, instructions not to infer missing documents or
URLs, fact checking enabled, and bounded page/depth limits. Context.dev output
is discovery data only. CaseZero still validates direct public artifact URLs,
downloads approved originals itself, hashes them, preserves provenance,
classifies visibility deterministically, and applies rights decisions.

The CaseZero client and payload contract are implemented and tested. The live
comparison against a curated docket reference remains pending, so do not say
that Context.dev has already discovered or validated the reference case.
Context.dev is deliberately absent from blind investigation capabilities.

### Presentation

- Show Context.dev once in each relevant technical layer, not in a project
  headline or final verdict.
- Link the first visible `Context.dev` mention to `https://context.dev/`.
- Do not use Context.dev logos or brand assets unless separately supplied and
  licensed.
- Never merge the two roles into a generic `powered by Context.dev` claim.

## 4. Approved foreground copy

### Project identity

- Title: `CaseZero`
- Descriptor: `Evidence-first AI investigations, blind to the official answer.`
- Source link: `https://github.com/ibrahim1023/CaseZero`
- Persistent qualifier: `Independent experimental project · not affiliated with the NTSB`

### Narrative lines

- Opening question: `Can an investigation reason without seeing the answer?`
- Acquisition: `Public evidence in. Official finding held back.`
- Evidence: `Every claim stays attached to its source.`
- Blindness: `The answer is outside the room.`
- Climax: `BLIND BY CONSTRUCTION`
- Lock: `Lock the assessment before reveal.`
- Transition thesis: `Trustworthy conclusions resist hindsight. Trustworthy changes wait for approval.`

Secondary copy must distinguish:

- `Source: National Transportation Safety Board`;
- `CASEZERO EVIDENCE` or `AI-GENERATED — NOT AN OFFICIAL FINDING`;
- `OFFICIAL NTSB FINDING · SEALED UNTIL LOCK`.

## 5. Scroll storyboard

CaseZero uses its own normalized `0–1` timeline and a separate pinned/sticky
runway. Boundaries may move by `±0.02` after physical-device review, but order,
meaning, and deliberate holds are fixed.

| State | Range | Foreground event | Secondary evidence |
|---|---:|---|---|
| `casezero-established` | `0.00–0.12` | Title, descriptor, qualifier, and opening question enter. | Source link. |
| `public-docket` | `0.12–0.29` | A compact public case file opens. The official finding is visibly separate from investigation evidence. | NTSB attribution; Context.dev discovery label. |
| `evidence-typed` | `0.29–0.50` | Source pages resolve into a few typed, provenance-linked evidence records. | PDF/table locators, checksum/provenance; dated reference-run metrics. |
| `finding-sealed` | `0.50–0.68` | The official finding crosses behind a clear visibility boundary. | `INVESTIGATION_EVIDENCE` visible; `FINAL_FINDING` blocked. |
| `blind-by-construction` | `0.68–0.84` | The boundary becomes the visual peak: `BLIND BY CONSTRUCTION`. | No web, Context.dev, NTSB-acquisition, or raw-storage capability in the blind runtime. |
| `lock-ready` | `0.84–0.96` | Evidence and assessment hashes settle into an immutable lock record. | Label as implemented lock infrastructure; do not invent a real assessment. |
| `vault-handoff` | `0.96–1.00` | The lock boundary clears, warms, and becomes an approval boundary. | Transition thesis, then Vault workflow. |

Recommended runway targets:

- desktop/tablet landscape: `460vh`;
- iPhone/tablet portrait: `420vh` within a dynamic-viewport-safe sticky
  composition;
- reduced motion: normal-flow semantic panels, no long runway.

## 6. Scene and visual design

CaseZero occupies a neutral evidence-paper world between SettleDiff's cool
verification surface and Vault Steward's warm approval surface.

- Use abstract case-file, source-ledger, locator, boundary, and lock geometry.
- Keep the page visually brighter than the homepage; do not return to an
  all-black chapter.
- Use graphite and cool neutral text, restrained blue for accessible evidence,
  muted amber for unknown or withheld material, and a quiet seal color for the
  blindness boundary.
- Do not use aircraft-crash imagery, photographs, maps, NTSB seals/logos,
  government-report imitation, sensational redaction effects, or fake terminal
  output.
- No more than three meaningful foreground objects may be legible at one state
  hold.
- The official-finding surface and CaseZero-generated surface must remain
  structurally distinct; color alone is insufficient.

The chapter's main visual object is a compact case file with three layers:

```text
SOURCE → LOCATOR → EVIDENCE
```

The official finding is a separate sealed object. It never enters the evidence
file before the lock state.

## 7. Project handoffs

### SettleDiff → CaseZero

SettleDiff's verified transaction completes its current hold. Its evidence
packet contracts to a small abstract token labeled `VERIFIED EVIDENCE`, then
exits the SettleDiff composition. The CaseZero case file enters as a new object
using matched scale, alignment, and motion—not as the same underlying record.

Bridge copy:

```text
Evidence can be verified.
Can an investigation stay blind to the answer?
```

SettleDiff content must clear before CaseZero body copy becomes readable. No
frame may show both full project interfaces.

### CaseZero → Vault Steward

The CaseZero lock record finishes its hold and contracts. The visibility wall
remains as abstract boundary geometry while its meaning changes only after the
CaseZero labels exit. The palette warms; a new Vault Steward evidence packet
enters the boundary; then `FIND → PREVIEW → APPROVE → VERIFY` appears.

Bridge copy:

```text
Trustworthy conclusions resist hindsight.
Trustworthy changes wait for approval.
```

CaseZero's case data does not become Vault Steward note data. Continuity is the
boundary and governance principle, not literal data transformation.

## 8. Component and animation architecture

Keep one page-level animation lifecycle and give each project a separately
testable timeline and stage:

```text
PortfolioExperience
├─ IntroSection
├─ SettleDiffNarrative
│  ├─ desktop stage
│  ├─ mobile stage
│  └─ SettleDiff → CaseZero seam
├─ CaseZeroNarrative
│  ├─ desktop stage
│  ├─ mobile stage
│  └─ CaseZero → Vault seam
├─ ReducedMotionNarrative
└─ VaultStewardArrival
```

Implementation boundaries:

- centralize all CaseZero copy, metrics, source links, attribution, and claim
  guards in `src/content/portfolioContent.ts`;
- add a CaseZero semantic state type and one authoritative range map;
- create focused CaseZero components for the case file, evidence lineage,
  visibility boundary, and lock record;
- split timeline construction by chapter while retaining one
  `gsap.matchMedia()` lifecycle and scoped cleanup owner;
- use separate desktop and mobile geometry;
- preserve one owner for each animated property;
- do not drive scroll animation through React render-state updates;
- delay animated-ready exposure until both chapter geometries have refreshed;
- retain complete readable fallback content if either chapter fails to
  initialize.

The architecture must allow later CaseZero states—hypotheses, falsification,
causal graph, locked assessment, and official reveal—to be inserted between
`evidence-typed` and `lock-ready` without rewriting either project seam.

## 9. Reduced motion, no JavaScript, and accessibility

Reduced motion and no-JavaScript output must read in this order:

```text
SettleDiff purchase → provider receipt → independent settlement proof → VERIFIED
→ CaseZero public docket → typed evidence → official finding held back
→ BLIND BY CONSTRUCTION → lock infrastructure
→ Vault Steward preview → approval → verify
```

Requirements:

- normal document flow with no pinning, path travel, parallax, scale sweep, or
  spatial reorganization;
- headings remain Intro → SettleDiff → CaseZero → Vault Steward;
- source links and the Context.dev link are keyboard reachable with visible
  focus;
- body copy remains at least `16px` and touch targets at least `44×44px` on
  iPhone;
- the experimental/non-affiliation qualifier is available to assistive
  technology and not hidden in transient motion;
- official and generated content use explicit text labels;
- no horizontal overflow or clipped focus at `320px`.

## 10. Performance and responsive constraints

The existing production page is close to its `180 KiB` gzip JavaScript budget.
Adding CaseZero does not authorize a budget increase. Reuse GSAP, shared
primitives, and existing runtime code; prefer semantic markup and CSS over new
client dependencies. If the page exceeds the limit, reduce or refactor shipped
code before requesting any exception.

Physical-device acceptance remains limited to the owner's Mac and iPhone.
CaseZero must be tested in portrait and landscape with dynamic Safari chrome,
native touch scrolling, reverse scrolling, 200% Mac zoom, reduced motion, and
VoiceOver reading order.

## 11. Testing contract

### Content and component tests

- exact CaseZero foreground copy, source link, qualifier, and Context.dev
  labels;
- dated metrics cannot be rendered without their date/reference-case context;
- prohibited future claims and NTSB-affiliation language remain absent;
- official NTSB and CaseZero-generated content are distinct semantic regions;
- one authoritative CaseZero state map and ordered timeline labels;
- desktop, mobile, reduced-motion, and initialization-failure branches contain
  the complete approved story.

### Browser tests

- all SettleDiff states still resolve forward and backward;
- SettleDiff fully clears before CaseZero foreground content settles;
- each CaseZero state resolves forward and backward;
- the case file, official-finding object, and visibility wall do not overlap at
  named holds;
- the blind climax has an otherwise clear foreground;
- CaseZero fully clears before Vault Steward foreground content settles;
- fast scroll, reverse scroll, refresh inside either chapter, back/forward
  navigation, and orientation changes leave one active lifecycle;
- all eight existing target viewports remain overflow-free;
- reduced motion, no JavaScript, keyboard focus, and Axe checks include the new
  chapter;
- production export resolves all source and Context.dev links under the
  `/portfolio` base path;
- bundle and Lighthouse gates remain unchanged.

## 12. Acceptance criteria

- A non-technical visitor can explain the three-project progression after one
  viewing.
- CaseZero is clearly a real, evolving implementation—not a completed aviation
  investigator.
- The official finding is visibly unavailable to the blind side of the system.
- No copy or visual implies NTSB affiliation, endorsement, or an official
  conclusion.
- Context.dev appears accurately as conditional status-page evidence in
  SettleDiff and schema-constrained docket discovery in CaseZero.
- The two Context.dev roles never merge into a `powered by` claim.
- No project transition relies on simultaneous overlapping interfaces.
- Desktop and iPhone preserve the same causal story with purpose-built
  geometry.
- Reduced motion and no JavaScript preserve the full three-project story.
- Existing accessibility, static export, bundle, Lighthouse, and supported
  physical-device requirements remain in force.

## 13. Sources

### CaseZero

- [Repository](https://github.com/ibrahim1023/CaseZero)
- [README and claim limits](https://github.com/ibrahim1023/CaseZero/blob/73755b19cb0fcf7cc58a43b7d4707c3ea19f4732/README.md)
- [Architecture](https://github.com/ibrahim1023/CaseZero/blob/73755b19cb0fcf7cc58a43b7d4707c3ea19f4732/docs/architecture.md)
- [Phase 0 validation](https://github.com/ibrahim1023/CaseZero/blob/73755b19cb0fcf7cc58a43b7d4707c3ea19f4732/docs/development/phase-0-validation.md)
- [Phase 1 evidence validation](https://github.com/ibrahim1023/CaseZero/blob/73755b19cb0fcf7cc58a43b7d4707c3ea19f4732/docs/development/phase-1-validation.md)
- [Context.dev decision](https://github.com/ibrahim1023/CaseZero/blob/73755b19cb0fcf7cc58a43b7d4707c3ea19f4732/docs/decision-log/0009-curated-manifests-before-contextdev.md)
- [Context.dev client](https://github.com/ibrahim1023/CaseZero/blob/73755b19cb0fcf7cc58a43b7d4707c3ea19f4732/packages/ntsb/src/casezero_ntsb/contextdev.py)
- [Blindness design](https://github.com/ibrahim1023/CaseZero/blob/73755b19cb0fcf7cc58a43b7d4707c3ea19f4732/docs/superpowers/specs/2026-09-01-phase2-blindness-infrastructure-design.md)

### SettleDiff

- [Repository](https://github.com/ibrahim1023/SettleDiff)
- [Architecture](https://github.com/ibrahim1023/SettleDiff/blob/03d0bf4f5a652f33e90186e7fe2eaed819c3002e/docs/architecture/overview.md)
- [Context.dev live compatibility](https://github.com/ibrahim1023/SettleDiff/blob/03d0bf4f5a652f33e90186e7fe2eaed819c3002e/docs/testing/contextdev-live-compatibility.md)
- [Context.dev adapter](https://github.com/ibrahim1023/SettleDiff/blob/03d0bf4f5a652f33e90186e7fe2eaed819c3002e/src/settlediff/contextdev/client.py)

### Vault Steward

- [Repository](https://github.com/ibrahim1023/vault-steward)
- [Architecture](https://github.com/ibrahim1023/vault-steward/blob/main/docs/architecture.md)
