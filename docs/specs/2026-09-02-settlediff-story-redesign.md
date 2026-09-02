# SettleDiff Story Redesign

**Status:** owner-approved design

**Date:** 2026-09-02

**Source review:** SettleDiff `main` at `9372c8a06e77d75a6ab0482adf5479964ad2913b`

**Scope:** SettleDiff narrative and its handoff into the existing Vault Steward arrival

This specification supersedes the SettleDiff factual, storyboard, visual-system,
and transition sections of `docs/REQUIREMENTS.md`, `docs/STORYBOARD.md`, and
`docs/BUILD_SPEC.md`. Those documents remain useful records of the implemented
baseline and must be reconciled during the redesign. Unrelated Phase 1
constraints remain in force.

## Product truth

SettleDiff reconstructs an agent purchase across:

```text
intent → advertised contract → execution → settlement → service result → activity record
```

An LLM may gather and explain evidence, but deterministic checks decide the
financial verdict. Missing evidence remains unknown. A provider response is a
claim, not independent proof that money moved.

The original failed Perflo incident remains factual and important:

- the advertised chain was Base;
- execution evidence named Tempo;
- the service returned HTTP 402 after credentials were submitted;
- Activity recorded `broadcast_failed`;
- no confirmed charge or transaction hash was available;
- the safe verdict was `UNVERIFIABLE`.

It is now the origin story and regression example, not the entire product
story. SettleDiff has since added a rail-neutral payment adapter boundary and a
second implemented rail, x402 v2. Two successful live x402 cycles reached
`VERIFIED`; the public cycle independently confirmed the exact settlement with
a matching token-transfer event and passed all 12 deterministic checks.

### Claim limits

- Say `rail-neutral`, not `supports every payment rail`.
- Name only the implemented Perflo and x402 adapters.
- Bound x402 claims to version 2, `exact`, Base Sepolia, canonical test USDC,
  and EIP-3009.
- Do not imply mainnet validation.
- Do not present the provider's `PAYMENT-RESPONSE` as independent settlement
  proof.
- Do not imply that an RPC receipt alone is sufficient. The matching transfer
  must agree on network, token, payer, recipient, and amount.
- Do not imply that an LLM chooses `VERIFIED`, `UNVERIFIABLE`, `REFUSED`, or
  `FAILED`.
- Do not imply that evidence recovery performs another paid request. Recovery
  is read-only.

## Narrative thesis

The story is an evolution from ambiguity to independently verified truth:

> A provider says the payment succeeded. SettleDiff independently proves what
> actually moved.

The closing line is:

> Don’t trust the receipt. Verify the settlement.

The visitor should understand the foreground story without knowing payment
protocols, networks, or signing schemes. Precise technical facts remain
available as secondary evidence labels.

## Audience layers

### Foreground language

Use plain terms:

- Purchase
- Promised
- Executed
- Recorded
- Provider receipt
- Independent record
- Deterministic checks
- Verified

### Secondary evidence language

Use restrained monospaced labels for:

- Perflo incident · sanitized regression fixture
- `base → tempo`
- `HTTP 402`
- `broadcast_failed`
- x402 v2 · exact
- Base Sepolia · `eip155:84532`
- EIP-3009
- `0.001 USDC`
- provider `PAYMENT-RESPONSE`
- independent USDC `Transfer`
- 12/12 checks
- zero model requests for the deterministic explanation fallback

The technical layer must never compete with the main sentence or verdict.

## Approved scroll story

The animation follows one persistent transaction artifact. It changes form,
but it is never replaced by a disconnected dashboard or a table laid over the
scene.

| State | Range | Foreground event | Supporting evidence |
|---|---:|---|---|
| `project-established` | `0.00–0.08` | SettleDiff and its purpose enter. | Source link and descriptor. |
| `purchase-in-flight` | `0.08–0.18` | One purchase travels from agent to service. | Exact price appears on the artifact. |
| `outcome-uncertain` | `0.18–0.29` | A response exists, but financial truth is unresolved. | Receipt above; empty independent record below. |
| `evidence-reconstructed` | `0.29–0.42` | The artifact opens into Promised, Executed, and Recorded layers. | Evidence provenance remains attached. |
| `origin-incident` | `0.42–0.54` | The original failure isolates two facts: different execution path and no confirmed settlement. | `base → tempo`, HTTP 402, failed broadcast, absent hash. |
| `system-evolved` | `0.54–0.65` | The three layers contract into one rail-neutral verification system. | Perflo and x402 enter the same adapter boundary. |
| `independent-proof` | `0.65–0.77` | Provider receipt and independent settlement record separate cleanly. | Public x402 response and exact matching transfer. |
| `checks-complete` | `0.77–0.88` | Twelve deterministic checks complete around the transaction. | 12/12; service HTTP 200; exact amount. |
| `verified` | `0.88–0.96` | The transaction resolves to `VERIFIED`. | Closing thesis enters on an otherwise clear canvas. |
| `vault-handoff` | `0.96–1.00` | The verified artifact folds into a compact evidence packet. | Vault Steward begins only after SettleDiff clears. |

Boundaries may move by `±0.02` during physical-device tuning, but state order,
meaning, deliberate holds, and object continuity are fixed.

## Scene composition

### Opening and purchase

The existing dark homepage remains. SettleDiff begins on charcoal with an
Agent anchor, a Service anchor, and one transaction artifact. The artifact is
the only moving subject. The title, anchors, and source link form the supporting
frame.

### Uncertainty

The artifact stops between two records. The provider receipt is present; the
independent record is visibly unresolved. Do not introduce a verdict yet.

### Reconstruction

The artifact unfolds into three horizontal layers on desktop:

```text
PROMISED
EXECUTED
RECORDED
```

On iPhone they form a centered vertical stack. At most one layer is emphasized
at a time. The old six-card evidence map and expected-versus-observed table are
removed from the cinematic path.

### Origin incident

The layers temporarily display the sanitized incident. The first isolated
sentence is `Different execution path.` The second and decisive sentence is
`No confirmed settlement.` `UNVERIFIABLE` may appear as a small historical
result label, not as the new story's visual climax.

### Evolution

The layers close into a verification boundary. Small `Perflo` and `x402`
labels approach through the same adapter slot. The animation communicates one
canonical evidence model; it does not animate protocol internals.

### Independent proof

The public x402 purchase becomes the current artifact. A provider receipt sits
to one side and an independent settlement record sits opposite it. A single
check path connects them. They never overlap.

### Resolution

Twelve small check marks resolve in a restrained perimeter or rail around the
artifact. Do not render twelve large cards. The final bright scene contains
only the verified artifact, `VERIFIED`, and the closing line.

## Visual arc

The website should not remain uniformly dark.

1. The homepage and SettleDiff opening use the existing charcoal world.
2. Reconstruction introduces cool neutral surfaces around evidence.
3. Independent proof moves into a bright paper-like workspace.
4. `VERIFIED` uses restrained blue-green confirmation, never neon green.
5. The Vault Steward handoff moves from cool paper to a warmer neutral with its
   restrained green accent.

Brightness represents increasing clarity, not payment success by itself.
Amber and controlled red remain reserved for discrepancies and unresolved
evidence. Meaning must remain available through labels and structure.

## Motion rules

- Native scrolling controls progress; no autoplay or scroll hijacking.
- One pinned canvas carries the SettleDiff story.
- One message is dominant at a time.
- Outgoing content clears before incoming content becomes readable.
- Never show a table over a diagram.
- Never show the headline, evidence stack, verdict, and project transition at
  the same time.
- Show no more than three meaningful objects simultaneously.
- Change text between object movements, not during them.
- Give large verdict typography an otherwise empty canvas.
- Every state must reconstruct correctly while reverse scrolling.
- Each animated property has one owner.
- The stage background transition is part of the master timeline and must not
  be driven by a competing CSS animation.

## Desktop composition

- Use one pinned viewport with a target runway of `700–820vh`.
- Keep the title in the upper-left supporting frame until the verified scene.
- Place the transaction artifact near the optical center, not the exact center
  when the title is present.
- Reconstruction may use three horizontal layers only while all copy remains
  legible at `1024×768` and `1280×720`.
- Provider and independent records use a balanced two-column composition.
- The final thesis occupies its own hold before the Vault handoff.

## iPhone composition

- Use a purpose-built vertical composition, not scaled desktop geometry.
- Target a `520–650vh` runway, tuned on the owner's iPhone Safari.
- Keep the persistent artifact within the usable dynamic viewport above the
  browser toolbar.
- Stack Promised, Executed, and Recorded sequentially.
- Show provider receipt, then independent record, then the connecting check.
- Keep foreground body text at least `16px` and touch targets at least
  `44×44px`.
- No horizontal scrolling and no clipped focus indicators at `320px`.
- Orientation changes rebuild the correct geometry without retaining inline
  transforms from the previous layout.

## Reduced motion and failure fallback

Reduced motion uses normal-flow semantic sections:

```text
Purchase
→ Outcome uncertain
→ Promised / Executed / Recorded
→ Original incident: UNVERIFIABLE
→ Rail-neutral evolution
→ Provider receipt / Independent record
→ 12 deterministic checks
→ VERIFIED
→ Don’t trust the receipt. Verify the settlement.
→ Vault Steward arrival
```

No pinning, path travel, parallax, scale sweep, or spatial reorganization is
allowed. The same complete story must remain readable when JavaScript or GSAP
initialization fails.

## Vault Steward handoff

The final SettleDiff artifact becomes an evidence packet. It contracts only
after the closing statement has completed its hold. SettleDiff's title and
verification UI exit fully. The canvas warms, then the Vault Steward boundary
forms around the packet. Only after the boundary is understandable may the
Vault Steward title and `FIND → PREVIEW → APPROVE → VERIFY` rail enter.

The old six-object SettleDiff-to-Vault relabel mapping is retired. It was tied
to the former incident-only evidence map and created unnecessary simultaneous
content. Object continuity is now carried by the single evidence packet.

## Acceptance criteria

- A non-technical visitor can explain the difference between a receipt and
  independent settlement proof after one viewing.
- The old incident is clearly an origin example, not the product's current
  limit.
- The public x402 validation is presented as testnet evidence, not mainnet.
- The provider and independent records never overlap at named state holds.
- No named state shows more than three meaningful objects.
- The transition to the bright workspace is gradual and reversible.
- Desktop and iPhone use different geometry but identical causal meaning.
- Reduced motion and no-JavaScript output contain the complete narrative.
- Vault Steward begins only after SettleDiff content has cleared.
- Existing WCAG, bundle, static-export, Lighthouse, Mac, and iPhone gates
  continue to pass.

## Sources

- [SettleDiff README](https://github.com/ibrahim1023/SettleDiff/blob/main/README.md)
- [Architecture overview](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/architecture/overview.md)
- [Rail-neutral canonical payment evidence ADR](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/decisions/0007-rail-neutral-canonical-payment-evidence.md)
- [Original live incident](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/live-run-report-2026-08-21.md)
- [Controlled x402 live cycle](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/x402-live-cycle.md)
- [Public x402 endpoint validation](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/testing/x402-public-endpoint-validation.md)
- [x402 v2 mapping](https://github.com/ibrahim1023/SettleDiff/blob/main/docs/research/x402-v2-mapping.md)
