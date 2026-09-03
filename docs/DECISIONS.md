# Phase 1 Decision Log

This file records owner-approved decisions that affect factual claims, scope,
choreography, or acceptance. New entries are appended; historical decisions
are not silently rewritten.

## 2026-09-03 — Add CaseZero as a compact implemented-state chapter

**Decision:** The project order becomes SettleDiff → CaseZero → Vault Steward.
CaseZero receives a compact but complete chapter covering only its implemented
acquisition, typed evidence, temporal-blindness, auditing, and lock
infrastructure. The full planned investigation, official-finding comparison,
and polished UI remain out of scope until their repositories contain validated
implementation evidence.

The three-project thesis is: SettleDiff verifies what happened; CaseZero
protects how evidence is interpreted; Vault Steward protects what may be
changed. Project transitions share visual governance language without implying
that the underlying transaction, aviation, and vault data are the same.

Context.dev appears as supporting technical evidence in both applicable
chapters. SettleDiff uses it conditionally for eligible public status-page
evidence. CaseZero uses it for schema-constrained docket discovery only; the
live comparison against the curated CaseZero manifest is still pending.

**Design:**
`docs/superpowers/specs/2026-09-03-casezero-portfolio-chapter-design.md`

**Sources:** CaseZero `73755b19cb0fcf7cc58a43b7d4707c3ea19f4732` and
SettleDiff `03d0bf4f5a652f33e90186e7fe2eaed819c3002e`.

## 2026-09-02 — SettleDiff evolves from incident reconstruction to independent verification

**Decision:** Replace the incident-only cinematic story with the approved
evolution described in
`docs/specs/2026-09-02-settlediff-story-redesign.md`. Keep the 2026-08-21
failed Perflo incident as the product's origin and regression example, then
show the rail-neutral architecture and the successful public x402 testnet cycle
as the current product capability. The final visual climax is `VERIFIED`, with
the line `Don’t trust the receipt. Verify the settlement.`

Use plain-language foreground copy and place Perflo, x402, Base Sepolia,
EIP-3009, and protocol-specific facts in a secondary evidence layer. The
homepage remains dark; SettleDiff progresses from charcoal ambiguity to a
bright paper-like verification workspace. The final verified artifact becomes
one evidence packet for the Vault Steward handoff. Retire the old six-object
relabel transition.

**Reason:** SettleDiff now implements a rail-neutral adapter boundary and has
independently verified two successful x402 cycles. The older narrative remains
factual but no longer represents the product's scope or strongest engineering
result. A single persistent artifact and mutually exclusive scenes also address
the overlap failures observed in the earlier transition.

**Sources:**

- [SettleDiff repository](https://github.com/ibrahim1023/SettleDiff) at
  `9372c8a06e77d75a6ab0482adf5479964ad2913b`.
- [Rail-neutral canonical payment evidence ADR](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/decisions/0007-rail-neutral-canonical-payment-evidence.md).
- [Controlled x402 live cycle](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/x402-live-cycle.md).
- [Public x402 endpoint validation](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/x402-public-endpoint-validation.md).

This decision supersedes the SettleDiff narrative and six-object transition
decisions below where they conflict. Historical entries remain as records of
the previous approved baseline.

## 2026-08-25 — Source-backed project narrative

**Decision:** Replace the historical `$0.04 / PAID` story with the sanitized
`failed-broadcast` incident: `0.01 USDC` quoted price, `0.02 USDC` maximum
budget, `ACTIVITY RECORDED`, `base → tempo`, HTTP 402, no confirmed charge, no
transaction hash, and `UNVERIFIABLE`.

**Reason:** The SettleDiff live-run report and committed fixture support these
facts. No single source-backed incident supports `$0.04 / PAID`.

**Sources:**

- [SettleDiff repository](https://github.com/ibrahim1023/SettleDiff) at
  `380c30cc759a7eab0a27c7f8587c93ac3c42f8ce`.
- [Live Test Cycle Report — 2026-08-21](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/live-run-report-2026-08-21.md).
- [`failed-broadcast` fixture](https://github.com/ibrahim1023/SettleDiff/tree/main/fixtures/failed-broadcast).

## 2026-08-25 — Incident framing and causal emphasis

**Decision:** Describe the story as a real paid-test incident presented through
a sanitized deterministic regression fixture. Keep the live vendor anonymous
in the portfolio. Treat absent settlement proof as the decisive uncertainty;
show chain drift as supporting contradictory evidence.

**Reason:** The failed Activity record proves an attempt, not a charge. A chain
difference alone does not necessarily produce an unverifiable verdict.

## 2026-08-25 — Personal positioning

**Decision:** Keep:

- `Ibrahim Arshad`
- `AI Systems Engineer`
- `I build and evaluate reliable agentic systems.`

## 2026-08-25 — Phase 1 scope and source links

**Decision:** Phase 1 remains strict and ends at a stable Vault Steward arrival.
Add only understated, accessible source links from the SettleDiff and Vault
Steward titles. Do not add conventional portfolio sections.

## 2026-08-25 — Scroll direction

**Decision:** Apple-like scroll storytelling is the primary experience model:
controlled pacing, pinned scenes, reversible progress, deliberate holds, and
persistent object transformations. Do not copy Apple's visual assets or page
compositions.

Agents may tune normalized state boundaries by `±0.02` and viewport runway
lengths after testing without separate approval, provided narrative meaning and
order do not change.

## 2026-08-25 — Vault Steward arrival

**Decision:** Represent the real approval-preview workflow through an abstract,
portfolio-native composition. Use the rail `FIND → PREVIEW → APPROVE → VERIFY`,
the source-backed mapping in `docs/REQUIREMENTS.md`, and a gradual shift toward
Vault Steward's restrained green accent.

Do not reproduce an Obsidian screenshot in the cinematic scene. Do not include
version or marketplace-status claims in Phase 1.

**Sources:**

- [Vault Steward repository](https://github.com/ibrahim1023/vault-steward) at
  `21655f0bfc1972601570ff9cf38efd663cfdfac3`.
- [Scan-to-approval walkthrough](https://github.com/ibrahim1023/vault-steward/blob/main/docs/screenshots.md).
- [Architecture](https://github.com/ibrahim1023/vault-steward/blob/main/docs/architecture.md).

## 2026-08-25 — Agent documentation and model guidance

**Decision:** Committed agent-facing requirements supersede conflicting
historical local-spec language. Pin external project commits. Agents may not
change factual or narrative requirements without owner approval.

Replace the historical Devin/Kimi K3/GPT-5.6 switching mandate in active agent
guidance with capability-based planning, implementation, review, and
verification gates appropriate to the available Codex environment. Keep the
local product spec unchanged as historical input.

## 2026-08-25 — Deployment and validation resources

**Decision:** Continue targeting
`https://ibrahim1023.github.io/portfolio/`; no custom domain is required in
Phase 1. Automate bundle checks and repeatable Lighthouse validation where
practical.

The supported Phase 1 physical-device scope is the owner's Mac and iPhone.
Android is out of scope for this phase; do not present its absence as a release
gap or imply that Android compatibility has been verified.

## 2026-08-25 — Assets

**Decision:** Use system typography and repository-owned DOM, CSS, and SVG.
There are no supplied licensed fonts, logos, portraits, or other visual assets
for Phase 1.
