# Phase 1 Decision Log

This file records owner-approved decisions that affect factual claims, scope,
choreography, or acceptance. New entries are appended; historical decisions
are not silently rewritten.

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

The owner has a Mac and an iPhone for physical testing. Android validation is
an explicit evidence gap until another device or an approved remote-device
service becomes available.

## 2026-08-25 — Assets

**Decision:** Use system typography and repository-owned DOM, CSS, and SVG.
There are no supplied licensed fonts, logos, portraits, or other visual assets
for Phase 1.
