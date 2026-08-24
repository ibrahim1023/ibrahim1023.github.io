# Build Spec — Phase 1 (tracked decisions)

The authoritative product spec is `product-spec.md`, kept local-only and never
committed. This document records the implementation decisions derived from it.

## Objective

One continuous, scroll-directed narrative: Intro → SettleDiff incident →
continuous transformation into a minimal Vault Steward arrival. Nothing else.
No project grids, nav, footer, About, Contact, blog, CMS, analytics, forms,
theme switching, Three.js, or additional routes.

## Factual content (source-backed only)

SettleDiff story is driven by the public `failed-broadcast` regression fixture
(`ibrahim1023/settlediff`):

- Vendor: `synthetic-search`
- Quoted price: `0.01 USDC` (max budget `0.02 USDC`)
- Protocol: `mpp`
- Advertised chain: `base`; executed/activity chain: `tempo`
- Response: HTTP `402 Payment Required`
- Activity status: `broadcast_failed`
- Charge: unconfirmed/unknown; transaction hash: absent
- Verdict: `UNVERIFIABLE`

The original spec's `$0.04 / PAID` beat was not supported by any single real
fixture and was replaced (with Ibrahim's approval) by an "activity recorded,
settlement not established" beat. `PAID` and `$0.04` must not appear in
production content.

Approved copy:

- Identity: Ibrahim Arshad — AI Systems Engineer
- Framing: "I build and evaluate reliable agentic systems."
- SettleDiff descriptor: "Transaction forensics for agent purchases."
- Vault Steward descriptor: "Keep your vault trustworthy"

Vault Steward (`ibrahim1023/vault-steward`, an Obsidian vault-integrity plugin)
keeps the approved conceptual rail `PROPOSE → SIMULATE → CHECK → APPROVE`, with
supporting objects mapped to the real workflow: NOTE, PROPOSED CHANGE,
CHECK SOURCE, POLICY, CURRENT/AFTER PREVIEW, AUDIT RECORD.

## Architecture

- Next.js App Router, `output: "export"`, strict TypeScript, React 19.
- `page.tsx` is a server component rendering exactly one client boundary:
  `PortfolioExperience`, which spans the three semantic sections
  (`IntroSection`, `SettleDiffSection`, `VaultStewardArrival`).
- One GSAP context rooted at `PortfolioExperience` owns the Intro handoff, the
  SettleDiff master timeline, and the Vault Steward transition. No timeline
  targets elements outside this root; presentational components never read
  global scroll position.
- One labelled master timeline built from named segment builders; labels match
  the semantic state contract. No React state updates per scroll frame.
- `prefers-reduced-motion: reduce`: CSS selects a complete static stacked
  narrative; the animated branch is `display: none` and no pin/timeline
  initializes. The animated branch starts readable and only gets
  animation-preparation classes after GSAP setup succeeds, so a GSAP failure
  cannot strand hidden content. Exactly one branch participates in layout and
  the accessibility tree at any time.

## State contract

```ts
type SettleDiffState =
  | "project-established"
  | "request-in-flight"
  | "attempt-recorded"
  | "evidence-expanded"
  | "comparison-visible"
  | "mismatch-isolated"
  | "unverifiable"
  | "reasoning-chain"
  | "vault-steward-arrival";
```

Progress is normalized 0–1; segment ranges (±0.02 tunable):

- 0.00–0.10 project-established
- 0.10–0.24 request-in-flight
- 0.24–0.34 attempt-recorded
- 0.34–0.52 evidence-expanded
- 0.52–0.68 comparison-visible
- 0.68–0.80 mismatch-isolated
- 0.80–0.90 unverifiable
- 0.90–1.00 reasoning-chain, then release into vault-steward-arrival

## Deployment

- `NEXT_PUBLIC_BASE_PATH` is the single deployment setting (`""` root/custom
  domain, `/portfolio` for project Pages). Applied to `basePath` in
  `next.config.ts`; `assetPrefix` is not set by default. Raw `public/` assets
  use `withBasePath()`.
- GitHub Actions workflow `deploy-pages.yml`: install with
  `pnpm install --frozen-lockfile` → lint → typecheck → unit/component tests →
  root export → `/portfolio` export → Playwright e2e against `out/` →
  `configure-pages` → `upload-pages-artifact` → `deploy-pages`
  (needs: validate-build; permissions: contents read, pages write, id-token
  write).
- Version pins: Node 24.1.0 (`.nvmrc`), pnpm 11.22.0 (`packageManager`),
  Next.js 16.3.2, React 19.2.8, GSAP 3.15.0; committed `pnpm-lock.yaml`.

## Performance and quality gates

- Lighthouse: Performance ≥ 90; Accessibility/Best Practices/SEO ≥ 95.
- LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms.
- Route JS + animation deps target < 180 KB gzip; exceptions need measured
  bundle evidence (`pnpm analyze`).
- WCAG 2.2 AA: landmarks, heading order, skip link, focus visibility, no
  color-only information, meaningful SVG labels, complete reduced-motion story.
