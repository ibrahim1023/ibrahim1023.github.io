# Storyboard — Phase 1

Progress ranges are normalized through the pinned SettleDiff master timeline
(±0.02 tunable; order and holds are fixed). All states must read as stills
before they are animated. Reverse scroll reconstructs every state.

## Frame 0 — Intro (~120vh)

- Ibrahim Arshad / AI Systems Engineer / "I build and evaluate reliable
  agentic systems." / "Selected work" cue.
- Motion: opacity, slight vertical translation, restrained line reveal only.
- Handoff: intro copy recedes while a single line grows from the same visual
  axis into the SettleDiff transaction path. No blank cut.

## Frame 1 — project-established (0.00–0.10)

- `SettleDiff` title + descriptor dominate; `AGENT` and `SERVICE` at opposite
  ends of the transaction path; diagnostics faint or absent; settled hold.

## Frame 2 — request-in-flight (0.10–0.24)

- `0.01 USDC` request token travels agent → service; path draws in the travel
  direction; lower-weight acknowledgement returns; amount stays readable.

## Frame 3 — attempt-recorded (0.24–0.34)

- Crisp state change to `ACTIVITY RECORDED` — a record exists, settlement is
  NOT claimed. Hold long enough to register. No success green.

## Frame 4 — evidence-expanded (0.34–0.52)

- The transaction expands into six lineage-connected objects, not cards:
  REQUEST (`0.02 USDC` max), PAYMENT (`0.01 USDC` quoted, settlement neutral),
  VENDOR (`synthetic-search`), CHAIN (staged), RESPONSE (`HTTP 402`),
  RECEIPT (no transaction hash / activity exists). Connectors preserve lineage.

## Frame 5 — comparison-visible (0.52–0.68)

- Same objects reorganize around aligned EXPECTED / OBSERVED anchors:
  chain `base` vs `tempo`; quoted `0.01 USDC` vs charge `unknown`;
  protocol `mpp` vs `mpp`; vendor matches; HTTP 402 + `broadcast_failed`;
  no transaction hash. Differences begin subtly; no error flash.

## Frame 6 — mismatch-isolated (0.68–0.80)

- `base` and `tempo` dominant via alignment + explicit not-equal connector
  (amber reinforces, never alone). 402 / broadcast_failed / unknown charge /
  absent hash stay visible at lower contrast. Hold after legible.

## Frame 7 — unverifiable (0.80–0.90)

- `UNVERIFIABLE` is the visual peak: settlement could not be established; no
  confirmed charge or transaction hash. Controlled scale/contrast/mask/
  isolation only — no shake, strobe, glitch, or alarm motion.

## Frame 8 — reasoning-chain (0.90–1.00)

- Existing evidence physically reorganizes into
  `CLAIM → EVIDENCE → FINDING → VERDICT`. SettleDiff title recedes; objects
  remain as the bridge.

## Frame 9 — Vault Steward transformation and arrival (~120vh after release)

- Chain straightens into `PROPOSE → SIMULATE → CHECK → APPROVE`.
- Object mapping: REQUEST → NOTE; PAYMENT → PROPOSED CHANGE; VENDOR → CHECK
  SOURCE; CHAIN → POLICY; RESPONSE → CURRENT/AFTER PREVIEW; RECEIPT → AUDIT
  RECORD. Connectors become policy boundaries and approval gates.
- Accent shifts without a palette reset; `Vault Steward` + "Keep your vault
  trustworthy" appear only after the transformation reads; subtle
  "Case study continues" cue; pin releases without a jump.

## Mobile

Purpose-built vertical evidence rail (~450–500vh SettleDiff runway), compact
aligned comparison, selective/no pinning, ≥16px body, no horizontal overflow
at 320px, safe-area aware of dynamic browser chrome. All nine states, same
causal order.

## Reduced motion

Normal-flow static panels (no pin, travel, parallax, scale, reorganization):
request → activity recorded → six evidence objects → expected vs observed →
base ≠ tempo → UNVERIFIABLE → CLAIM → EVIDENCE → FINDING → VERDICT → Vault
Steward transformation → arrival. Complete without JavaScript; animated branch
`display: none`.
