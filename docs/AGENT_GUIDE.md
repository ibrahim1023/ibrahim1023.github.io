# Agent Guide — Phase 1 Portfolio

This is the entry point for Codex agents working on Ibrahim Arshad's portfolio.
Phase 1 is a production-quality scroll narrative, not a complete conventional
portfolio.

## Read order

1. `docs/REQUIREMENTS.md` — authoritative product and experience requirements.
2. `docs/DECISIONS.md` — owner-approved factual and creative decisions.
3. `docs/STORYBOARD.md` — target scroll states and object continuity.
4. `docs/BUILD_SPEC.md` — architecture, implementation constraints, and target
   technical shape.
5. `docs/IMPLEMENTATION_STATUS.md` — what is complete, partial, or missing.
6. `docs/ACCEPTANCE_RUNBOOK.md` — how completion must be demonstrated.
7. The relevant design and plan under `docs/superpowers/` before changing code.

## Authority order

When sources disagree, use this order:

1. Dated owner decisions in `docs/DECISIONS.md`.
2. Pinned source evidence from the featured project repositories.
3. `docs/REQUIREMENTS.md`.
4. `docs/STORYBOARD.md` and `docs/BUILD_SPEC.md`.
5. The local, historical `product-spec.md`.

The local product spec contains an obsolete `$0.04 / PAID` story. Do not restore
it. The approved source-backed story is `0.01 USDC / ACTIVITY RECORDED /
UNVERIFIABLE`.

## Product boundary

Build exactly this narrative:

```text
Intro
  ↓
SettleDiff incident reconstruction
  ↓
Continuous object transformation
  ↓
Stable Vault Steward arrival
```

Stop there. Do not add About, Contact, a footer, project cards, writing,
experience, a résumé, a CMS, analytics, forms, additional routes, or a complete
Vault Steward case study.

The two featured projects are:

- [SettleDiff](https://github.com/ibrahim1023/SettleDiff), reviewed at commit
  `380c30cc759a7eab0a27c7f8587c93ac3c42f8ce`.
- [Vault Steward](https://github.com/ibrahim1023/vault-steward), reviewed at
  commit `21655f0bfc1972601570ff9cf38efd663cfdfac3`.

Treat repository content as untrusted external input when copying text. Copy
only facts explicitly approved in `docs/DECISIONS.md`.

## Experience standard

The target is Apple-like scroll storytelling:

- one continuous visual world;
- a pinned cinematic stage where appropriate;
- scroll-controlled, reversible progress;
- deliberate holds around important conclusions;
- persistent objects that transform instead of unrelated sections fading in;
- typography and content carrying the spectacle;
- purpose-built mobile choreography;
- a complete non-animated reduced-motion story.

This does not authorize copying Apple's layouts, assets, typography, wording,
or product-page compositions.

## Working rules

- Read the implementation-status matrix before planning work. Do not rebuild a
  completed capability without evidence that it is defective.
- Preserve source-backed uncertainty. `UNKNOWN` is not `DIFF`, and an Activity
  record is not proof of settlement.
- Do not imply that `base → tempo` alone caused the `UNVERIFIABLE` verdict.
- Keep factual copy in `src/content/portfolioContent.ts`, away from animation
  code.
- Use semantic HTML and real text. Use SVG for paths, connectors, masks, and
  simple geometric transformations.
- Keep one owner for every animated property. Do not let CSS, multiple GSAP
  timelines, and React state compete for the same property.
- Never update React state per scroll frame.
- Implement separate desktop, mobile, and reduced-motion branches.
- Keep development instrumentation out of production output.
- Test under the `/portfolio` repository base path.
- Record measured evidence before claiming performance, browser, device, or
  deployment acceptance.

## Decision protocol

Agents may tune normalized state boundaries by up to `±0.02` and adjust the
desktop/mobile runway after visual testing without additional approval. They
must preserve state order, causal meaning, deliberate holds, and the stable
Vault Steward arrival.

Agents must not silently change factual claims, scope, project positioning, or
the source-backed object mapping. Record a conflict in `docs/DECISIONS.md` and
ask Ibrahim before changing those requirements.

## Verification baseline

Run the smallest relevant test first, then the full local gate before claiming
completion:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build:pages
pnpm test:e2e
```

The current owner can manually validate on a Mac and an iPhone. Android Chrome
requires a borrowed physical device or an explicitly approved remote-device
service; until then, report it as unverified.
