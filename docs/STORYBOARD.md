# Storyboard — Phase 1 Target

The narrative is one reversible, Apple-like scroll-controlled composition. Each
state must work as a still before animation is added. State boundaries may be
tuned by `±0.02`; order, causal meaning, deliberate holds, and object continuity
are fixed.

## Frame 0 — Intro (`100–140vh`)

- `Ibrahim Arshad`
- `AI Systems Engineer`
- `I build and evaluate reliable agentic systems.`
- `Selected work`

Motion is limited to opacity, slight vertical translation, restrained line
reveal, and subtle letter-spacing changes. As the intro recedes, its cue line
extends into the SettleDiff transaction path. There is no blank cut.

## Frame 1 — Project established (`0.00–0.10`)

- SettleDiff title and source link become dominant.
- Descriptor: `Transaction forensics for agent purchases.`
- `AGENT` and `SERVICE` anchor opposite ends of one transaction path.
- Diagnostics remain absent or extremely faint.
- Hold before movement begins.

## Frame 2 — Request in flight (`0.10–0.24`)

- `0.01 USDC` travels from agent to service.
- `0.02 USDC MAX` remains visible as the authorization boundary.
- The path draws in the direction of travel.
- The service returns `HTTP 402`, with less visual weight than the request.
- Do not say the service acknowledged or accepted payment.

## Frame 3 — Attempt recorded (`0.24–0.36`)

- Crisp state change to `ACTIVITY RECORDED`.
- Supporting status: `broadcast_failed`.
- Qualifier: `attempt found — settlement not established`.
- Hold long enough to register.
- No success green and no claim that payment resolved.

## Frame 4 — Evidence expanded (`0.36–0.52`)

The transaction physically expands into six lineage-connected objects:

| Object | Primary datum | Supporting datum |
|---|---|---|
| `REQUEST` | `0.01 USDC` | `0.02 USDC max` |
| `PAYMENT` | `charge unknown` | `settlement not established` |
| `VENDOR` | `synthetic-search` | `sanitized fixture identity` |
| `CHAIN` | `base → tempo` | `advertised vs executed` |
| `RESPONSE` | `HTTP 402` | `Payment Required` |
| `ACTIVITY` | `broadcast_failed` | `no transaction hash` |

These are evidence objects, not unrelated cards. Connectors preserve their
origin in the request.

## Frame 5 — Comparison visible (`0.52–0.68`)

The same objects align around `EXPECTED` and `OBSERVED`:

| Aspect | Expected | Observed | Classification |
|---|---|---|---|
| Chain | `base` | `tempo` | `DIFF` |
| Charge | confirmed evidence | `unknown` | `UNKNOWN` |
| Protocol | `mpp` | `mpp` | `PASS` |
| Vendor | `synthetic-search` | `synthetic-search` | `PASS` |
| Service | successful response | `HTTP 402` | `FAIL` |
| Transaction hash | present | absent | `UNKNOWN` |

Alignment and text labels carry meaning; color only reinforces it.

## Frame 6 — Conflict isolated (`0.68–0.80`)

- `base ≠ tempo` becomes the strongest contradiction.
- `HTTP 402`, `broadcast_failed`, `charge unknown`, and `hash absent` remain
  visible at lower contrast.
- Copy must not imply that chain drift alone determines the final verdict.
- Hold after the conflict becomes legible.

## Frame 7 — Unverifiable (`0.80–0.90`)

- `UNVERIFIABLE` is the visual peak.
- Reason: `Settlement could not be established: no confirmed charge, no transaction hash.`
- The surrounding evidence recedes but remains spatially intact.
- Use controlled scale, contrast, mask, and isolation—no shake, strobe, glitch,
  or alarm motion.

Reverse scrolling reconstructs the conflict and evidence without orphaned
objects.

## Frame 8 — Reasoning chain (`0.90–0.96`)

Existing evidence reorganizes into:

```text
CLAIM → EVIDENCE → FINDING → VERDICT
```

- Claim: a paid request was attempted and recorded.
- Evidence: contract, execution, Activity, and service artifacts.
- Finding: chain drift, HTTP 402, failed broadcast, and missing settlement
  proof.
- Verdict: `UNVERIFIABLE`.

SettleDiff loses title dominance while the visual objects remain available for
the project transition.

## Frame 9 — Vault transformation (`0.96–1.00`)

The reasoning chain compresses and straightens into:

```text
FIND → PREVIEW → APPROVE → VERIFY
```

Visible roles cross-transform:

```text
REQUEST   → NOTE
PAYMENT   → PROPOSED CHANGE
VENDOR    → EVIDENCE SOURCE
CHAIN     → POLICY
RESPONSE  → CURRENT / AFTER
ACTIVITY  → AUDIT / RECHECK
```

Connectors become evidence boundaries, approval gates, and recheck lineage.
The accent shifts gradually toward restrained Vault Steward green. The Vault
Steward title appears only after the new workflow is understandable.

## Frame 10 — Stable Vault Steward arrival (`100–140vh`, normal flow)

- Vault Steward title and source link.
- `Keep your vault trustworthy`.
- `Local-first, evidence-backed vault maintenance with explicit approval before every edit.`
- A compact abstract Current/After preview.
- `FIND → PREVIEW → APPROVE → VERIFY`.
- `Case study continues`.

The pinned stage releases without a jump. The frame is stable, legible, and
clearly incomplete by design; do not build the full case study.

## Mobile storyboard

Use the same causal order in a purpose-built `400–550vh` composition:

1. transaction anchors stack vertically;
2. evidence expands into a vertical lineage rail;
3. expected/observed values use a compact two-column layout;
4. `DIFF`, `FAIL`, and `UNKNOWN` retain text labels;
5. the verdict occupies a stable usable viewport;
6. evidence rows relabel in place into Vault Steward roles;
7. the stable arrival returns to normal flow.

Selective pinning is allowed only when the usable dynamic viewport contains the
scene. Do not scale the desktop evidence map down until it becomes unreadable.

## Reduced-motion storyboard

Render normal-flow panels with no long pin or spatial animation:

```text
Request
→ HTTP 402 / Activity recorded
→ Six evidence objects
→ Expected vs observed
→ DIFF / FAIL / UNKNOWN distinctions
→ UNVERIFIABLE
→ Claim / Evidence / Finding / Verdict
→ Source-backed object mapping
→ Vault Steward approval preview and arrival
```

The story must remain complete without JavaScript.
