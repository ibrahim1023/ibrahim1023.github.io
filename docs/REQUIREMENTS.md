# Phase 1 Requirements

**Status:** approved target  
**Audience:** Codex implementation and review agents  
**Deployment:** GitHub Pages at `https://ibrahim1023.github.io/portfolio/`  
**Scope:** Intro → SettleDiff → Vault Steward arrival

## Objective

Create a production-quality, Apple-like scroll narrative that demonstrates
Ibrahim's ability to build reliable agentic systems. The page must use one real
SettleDiff failure as the origin, show the product's evolution, demonstrate a
current independently verified purchase, then pass one evidence packet into
the trust model of Vault Steward.

The prototype validates:

1. the portfolio's editorial and cinematic visual language;
2. a reversible scroll-animation architecture;
3. source-backed technical storytelling;
4. continuous transformation between two projects;
5. desktop, mobile, reduced-motion, accessibility, and static-deployment
   quality.

## Approved identity

- Name: `Ibrahim Arshad`
- Role: `AI Systems Engineer`
- Framing: `I build and evaluate reliable agentic systems.`
- Intro cue: `Selected work`

## Strict scope

Include only:

1. Intro.
2. Complete SettleDiff origin-to-verification sequence.
3. Continuous evidence-packet handoff from SettleDiff to Vault Steward.
4. Minimal stable Vault Steward arrival.
5. Understated accessible links from the two project titles to their source
   repositories.

Do not add generic portfolio sections, navigation, a footer, About, Contact,
Experience, Writing, other projects, testimonials, a résumé, CMS, forms,
analytics, theme switching, server features, or additional routes.

## Experience principles

### Apple-like scroll storytelling

Scrolling controls the explanation. Users can pause, reverse, and inspect every
state. Use controlled pacing, pinned scenes where appropriate, strong visual
hierarchy, and meaningful object continuity. Do not use autoplay, scroll
hijacking, or a sequence of unrelated crossfades.

The work should feel editorial, precise, cinematic, restrained, technically
credible, and intentional. Do not copy Apple's assets, layouts, typography,
copy, or signature product-page compositions.

### Content is the spectacle

The request, evidence, uncertainty, verdict, preview, approval boundary, and
audit result are the visual material. Exclude decorative particles, generic AI
imagery, fake terminals, persistent glow, large decorative gradients, generic
glass cards, and ornamental 3D scenes.

### Progressive enhancement

Essential content must be real text in semantic reading order. The experience
must remain complete when animation initialization fails or reduced motion is
enabled.

## SettleDiff factual contract

The narrative combines a historical paid-test incident from a sanitized
regression fixture with a current public x402 verification cycle. It must not
present sanitized names as live-party names or combine provider-reported and
independently observed proof.

| Evidence | Approved value | Meaning |
|---|---|---|
| Request | `0.01 USDC` | quoted price |
| Maximum budget | `0.02 USDC` | user-authorized ceiling |
| Sanitized vendor | `synthetic-search` | fixture identity, not the live vendor |
| Protocol | `mpp` | matched across available evidence |
| Advertised chain | `base` | contract evidence |
| Executed/activity chain | `tempo` | execution evidence; a `DIFF` |
| Vendor result | `HTTP 402 Payment Required` | service failure |
| Activity status | `broadcast_failed` | an attempt was recorded |
| Charge | `unknown` | no confirmed charge evidence |
| Transaction hash | absent | no settlement proof |
| Verdict | `UNVERIFIABLE` | settlement could not be established safely |

The current verification cycle uses these approved values:

| Evidence | Approved value | Meaning |
|---|---|---|
| Request | `0.001 USDC` | public x402 purchase amount |
| Service result | `HTTP 200` | the request completed |
| Provider evidence | `PAYMENT-RESPONSE` | provider-reported payment record |
| Independent evidence | Base Sepolia USDC `Transfer` | separately observed transfer proof |
| Checks | `12 / 12` | deterministic verification checks completed |
| Model requests | `0` | verification did not require model judgment |
| Verdict | `VERIFIED` | the current evidence satisfied the public checks |

Required interpretation:

- An Activity record proves that an attempt was recorded, not that money
  settled.
- `base → tempo` is a contract/execution difference. It is not sufficient on
  its own to make a run unverifiable.
- `charge unknown` is unresolved evidence, not a proven amount mismatch.
- The decisive uncertainty is the absence of confirmed settlement evidence.
- Never use `$0.04`, `PAID`, or language that claims a successful charge.
- Never use the historical failure as the current product conclusion.
- Never merge `PAYMENT-RESPONSE` and the Base Sepolia transfer into one source.
- Do not expose implementation/provider names in the cinematic copy.

Approved SettleDiff descriptor:

> Transaction forensics for agent purchases.

## Vault Steward factual contract

Vault Steward is a local-first Obsidian plugin that finds integrity problems,
presents cited findings and exact safe repair previews, and never edits a note
without explicit user approval.

The arrival represents the product's approval-preview moment. Its concise rail
is:

```text
FIND → PREVIEW → APPROVE → VERIFY
```

Approved title and copy:

- Title: `Vault Steward`
- Headline: `Keep your vault trustworthy`
- Descriptor: `Local-first, evidence-backed vault maintenance with explicit approval before every edit.`
- Continuation cue: `Case study continues`

The transition carries one compact verified evidence packet across an explicit
boundary. Represent the real workflow abstractly in the portfolio's visual
language; do not morph the full SettleDiff interface into Vault Steward and do
not reproduce an Obsidian screenshot as the transition scene.

## Scroll architecture

Use normalized progress from `0` to `1` and one master narrative timeline built
from named segments.

- Intro runway: approximately `100–140vh`.
- Desktop SettleDiff runway: `760vh`.
- Mobile SettleDiff runway: `580vh`.
- Stable Vault Steward arrival: approximately `100–140vh` after the pinned
  transformation releases.

Agents may tune state boundaries by `±0.02` after visual testing. Order,
meaning, holds, reversibility, and object continuity are fixed.

Desktop and mobile require separate GSAP/media branches. Mobile must use a
purpose-built vertical or compact composition, not a scaled-down desktop stage.
Reduced motion uses normal-flow static panels and initializes no long pinned
timeline.

## Visual system

- Dark introduction and origin incident, progressively brighter evidence
  workspace, paper-light verification scene, and warm Vault Steward arrival.
- Muted neutral secondary text.
- Restrained SettleDiff accent.
- Warm amber for differences and controlled red for `UNVERIFIABLE`.
- Cool verification blue and restrained green for `VERIFIED`, followed by a
  gradual transition toward Vault Steward's warmer green.
- Never communicate meaning by color alone.
- System-first sans-serif and restrained monospaced technical labels.
- No runtime font downloads unless Ibrahim later supplies licensed local files.
- `clamp()` display text, at least `16px` body copy, tabular numeric evidence,
  and approximately 60–70 character prose measure.
- Fluid gutters: `20px` mobile, `32px` tablet, `48px` desktop.

## Technical constraints

- Next.js App Router, React, strict TypeScript, GSAP, ScrollTrigger, CSS
  Modules, semantic HTML, inline SVG, and static export.
- No API routes, middleware, server actions, authentication, runtime image
  optimization, CMS, component library, state-management library, second
  animation framework, or Three.js.
- `NEXT_PUBLIC_BASE_PATH` is the single repository-path setting.
- One owner per animated property; no competing timelines.
- No frame-by-frame React state updates.
- Scoped cleanup must remove timelines, triggers, media contexts, observers,
  and listeners on unmount.
- Orientation and breakpoint changes rebuild the correct animation branch
  without stale geometry.
- Development state instrumentation must not appear in production output.

## Accessibility requirements

Meet WCAG 2.2 AA. Preserve landmarks, heading order, skip link, keyboard access,
focus visibility, contrast, meaningful reading order, accessible SVG labels,
and native scrolling. No essential fact may exist only in a brief animated
frame.

Reduced motion must include the full causal story through the Vault Steward
transformation, with no path travel, parallax, scale sweep, or spatial
reorganization.

## Performance requirements

- Lighthouse Performance ≥ 90.
- Lighthouse Accessibility, Best Practices, and SEO ≥ 95.
- LCP ≤ 2.5 seconds.
- CLS ≤ 0.1.
- INP ≤ 200 ms.
- Route-specific first-party JavaScript plus animation dependencies below
  `180 KB` gzip unless a measured exception is approved.
- No persistent scroll-linked long task or obvious frame drops.
- Production measurements only; evidence must identify build, URL, viewport,
  device/browser, date, and commit.

## Deployment requirements

The site exports to `out/` and deploys through GitHub Actions to
`https://ibrahim1023.github.io/portfolio/`. It must also remain configurable for
a root or future custom-domain deployment without component changes.

Deployment cannot proceed after validation failure. Workflow permissions must
remain least-privilege.

## Definition of done

Phase 1 is complete only when:

1. every storyboard state exists, is reversible, and matches the factual
   contract;
2. SettleDiff objects visibly transform into Vault Steward roles;
3. desktop, mobile, reduced-motion, accessibility, and failure-enhancement
   behavior pass;
4. static root and `/portfolio` exports pass;
5. automated, manual, performance, bundle, browser, device, and deployed-build
   evidence is recorded in `docs/ACCEPTANCE_RUNBOOK.md`;
6. the reviewed commit and deployed commit agree;
7. no out-of-scope section or unsupported claim was introduced.

The supported Phase 1 physical-device validation scope is the owner's Mac and
iPhone. Android is outside this phase: it is not a release requirement, and no
Android compatibility claim may be made from desktop emulation.
