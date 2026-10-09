# Editorial Portfolio Redesign Implementation Plan

> **Execution:** The primary Codex agent implements this plan natively in the current checkout. Ibrahim previously requested no Superpowers implementation workflow; do not dispatch subagents. Review each task before moving to the next. Do not push or deploy until local Safari review is approved.

**Goal:** Replace the long mixed-theme scroll narrative with one coherent, system-themed portfolio featuring two compact, distinct in-place project demonstrations and a static stack.

**Architecture:** Keep Next.js App Router static export and separate server-rendered content from small client-side animation islands. CSS custom properties select light/dark mode at the root. Homepage sections use natural document flow; SettleDiff and Vault Steward own their own one-shot animation state, while detailed case-study routes retain the evidence and limitations.

**Tech Stack:** Next.js 16.3.2, React 19.2.8, TypeScript 5.9.3, CSS Modules, Vitest, Playwright, GitHub Pages static export.

**Spec:** `docs/superpowers/specs/2026-10-09-portfolio-editorial-redesign-design.md`

## Global constraints

- Preserve existing uncommitted SettleDiff preview and test work by inspecting each overlapping diff before editing; do not reset or discard unrelated changes.
- Header navigation is **Résumé ↗** only, linked to `/ibrahim-arshad-resume.pdf`; the identity wordmark may link home.
- No CaseZero homepage chapter or `/projects/casezero/` route; no voice-and-vision claims yet.
- SettleDiff x402 VERIFIED is limited to the separately authorized 0.001 test-USDC Base Sepolia purchase; Perflo v8 remains UNVERIFIABLE; the separate confirmed-delivery failure is PAID_FAILURE / DO_NOT_RETRY.
- Vault Steward animation stops at a preview awaiting approval; illustrative content never implies autonomous edits.
- All important content is readable with reduced motion, failed animation, and no JavaScript.
- No scroll pin, touch-scroll interception, endless animation, full-dataset browser fetch, or new production dependency.
- Show updates in Safari, not the Codex/ChatGPT in-app browser. Do not publish until Ibrahim approves the local result.

## Review focus

1. **Theme change while page is open:** CSS `prefers-color-scheme` changes all homepage and case-study surfaces together, without a white/black seam. Cover in Task 7 browser test.
2. **Animation APIs unavailable or disabled:** final evidence/approval state remains readable. Cover in Tasks 3 and 4 component tests.
3. **Narrow iPhone and short landscape viewport:** no horizontal overflow or unreachable controls. Cover in Task 7 browser tests.
4. **Upstream stats unavailable or malformed:** keep last known count/date; never show `undefined` or crash the build. Cover in Task 5 script tests.
5. **Removed CaseZero deep link/internal navigation:** route is absent from the export and no live internal link points there. Cover in Task 6 export test.

## File map

- `src/styles/tokens.css`, `src/app/globals.css`: shared theme variables and base behavior.
- `src/features/portfolio/SiteHeader.tsx` and `.module.css`: one consistent name/Résumé header for homepage and case studies.
- `src/features/portfolio/PortfolioExperience.tsx` and `.module.css`: natural-flow homepage composition; no global animation controller.
- `src/features/settle-diff/SettleDiffPreview.tsx` and `.module.css`: concise receipt/transfer demo and three factual outcome controls; reuse and reshape existing uncommitted work.
- `src/features/vault-steward/VaultStewardPreview.tsx` and `.module.css`: single note-editor demo with explicit approval boundary.
- `src/features/portfolio/ProfileFooter.tsx` and `.module.css`: static stack, contact, and social links.
- `src/features/overview/SettleDiffCaseStudy.tsx`, `VaultStewardCaseStudy.tsx`, `PortfolioOverview.tsx`, `.module.css`: project-specific details in one visual system.
- `scripts/refresh-vault-downloads.mjs`, `src/content/vaultStewardDownloads.json`, `.github/workflows/deploy-pages.yml`: build-time count with fallback and eventual daily refresh.
- Tests adjacent to components, `tests/e2e/`, `README.md`, and portfolio docs: update contracts to the new experience.

---

### Task 1: Shared theme, header, and intro

**Files:** Modify `src/styles/tokens.css`, `src/app/globals.css`, `src/features/intro/IntroSection.tsx` and `.module.css`; create `src/features/portfolio/SiteHeader.tsx` and `.module.css`; test `src/features/portfolio/SiteHeader.test.tsx`, `tests/e2e/theme.spec.ts`.

**Interfaces:** `SiteHeader()` renders a home-linked wordmark and exactly one `Résumé ↗` action using `withBasePath`. Shared CSS variables `--page-bg`, `--page-ink`, `--page-muted`, `--page-line`, `--page-accent`, `--panel-bg` are the only new color contract for later tasks.

- [ ] Write component test: header has one résumé link to `/ibrahim-arshad-resume.pdf`, no Work/About/Contact links.
- [ ] Run `pnpm test src/features/portfolio/SiteHeader.test.tsx` and confirm red.
- [ ] Implement header and token/media-query system; set `color-scheme`, visible focus, and compact intro without a scroll timeline.
- [ ] Run the component test and verify the intro/header computed colors in both schemes; leave whole-route theme coverage to Task 7 after case-study styles are updated.
- [ ] Commit only this task's files.

### Task 2: Natural-flow homepage and CaseZero removal

**Files:** Modify `src/features/portfolio/PortfolioExperience.tsx` and `.module.css`, `src/features/portfolio/PortfolioExperience.test.tsx`, `src/content/portfolioContent.ts`; remove homepage dependency on `PortfolioAnimationController`, `ReducedMotionNarrative`, and `CaseZeroSection` (retain old files until tests no longer import them).

**Interfaces:** `PortfolioExperience()` renders `SiteHeader`, `IntroSection`, `SettleDiffPreview`, the existing readable `VaultStewardArrival` until Task 4 replaces it, and `ProfileFooter` in this order. It does not register `ScrollTrigger` or create pin geometry.

- [ ] Change shell test to require only SettleDiff and Vault Steward, natural DOM order, no `data-narrative="casezero"`, and no global animation controller.
- [ ] Run `pnpm test src/features/portfolio/PortfolioExperience.test.tsx` and confirm red.
- [ ] Implement the natural-flow shell without deleting the pre-existing SettleDiff preview; remove obsolete CSS branch switching and visible CaseZero links.
- [ ] Run the shell test and a production export; confirm homepage source contains no CaseZero chapter or ScrollTrigger initialization.
- [ ] Commit only this task's files.

### Task 3: SettleDiff editorial demonstration

**Files:** Modify `src/features/settle-diff/SettleDiffPreview.tsx`, `.module.css`, `.test.tsx`; update `src/content/portfolioContent.ts` only for short copy grounded in existing evidence.

**Interfaces:** `SettleDiffPreview()` owns `Outcome = "verified" | "provider" | "delivery"`, `phase = 0 | 1 | 2 | 3`, a one-shot viewport start, and a `Replay` button. The SSR/no-JS markup exposes the final verified facts; animation only enhances their appearance. Outcome buttons use `aria-pressed`.

- [ ] Write a failing test for the x402 provider/independent split, exact matched fields, final VERIFIED state, Perflo v8 UNVERIFIABLE, separate PAID_FAILURE, and the September 28 report link.
- [ ] Run `pnpm test src/features/settle-diff/SettleDiffPreview.test.tsx` and confirm red.
- [ ] Reshape the current dense preview into the approved left-copy/right-two-record layout. Keep accessible controls compact; a one-shot sequence ends on the final state and clears timers on unmount.
- [ ] Add a test for absent `IntersectionObserver` and reduced motion: final evidence remains readable, with no hidden verdict. Run the component tests to green.
- [ ] Commit only SettleDiff files and relevant content/test changes.

### Task 4: Vault Steward note-workspace demonstration

**Files:** Create `src/features/vault-steward/VaultStewardPreview.tsx`, `.module.css`, `.test.tsx`, and fallback `src/content/vaultStewardDownloads.json`; modify `src/content/portfolioContent.ts` and `PortfolioExperience.tsx`; retire `VaultStewardArrival` only after replacement tests pass.

**Interfaces:** `VaultStewardPreview({ downloads }: { downloads: { count: number; updated: string } })` renders one note editor, a highlighted broken link, an inline exact replacement preview, `Preview only · awaiting approval`, project links, and a small linked count. Its one-shot local phase ends at approval pending; replay is optional but keyboard operable if present.

- [ ] Write failing tests for one note workspace, current/after links, pending approval, illustrative label, plugin listing link, count/date, and no “applied” claim.
- [ ] Run `pnpm test src/features/vault-steward/VaultStewardPreview.test.tsx` and confirm red.
- [ ] Implement the distinct editor visual and viewport-triggered one-shot motion; reduced motion and missing observer immediately expose the complete preview.
- [ ] Run component tests to green; check no duplicate Vault heading or output overlap at desktop/mobile widths.
- [ ] Commit only Vault preview/content/shell files.

### Task 5: Build-time Obsidian download count

**Files:** Create `scripts/refresh-vault-downloads.mjs`, `scripts/refresh-vault-downloads.test.mjs`; modify fallback `src/content/vaultStewardDownloads.json` and `.github/workflows/deploy-pages.yml`.

**Interfaces:** `parseDownloads(stats: unknown): number` accepts official community-plugin-stats JSON and returns only `stats["vault-steward"].downloads` when it is a nonnegative integer. The refresh script writes `{ "count": number, "updated": "YYYY-MM-DD" }` only after a valid response; on network/shape failure it leaves the checked-in fallback untouched. The homepage imports the small JSON at build time.

- [ ] Write Node tests for valid 365, missing plugin, negative/fractional count, and fetch failure retaining fallback.
- [ ] Run `node --test scripts/refresh-vault-downloads.test.mjs` and confirm red.
- [ ] Implement parser/refresh script; integrate refresh before clean Pages build. Add a daily workflow trigger for eventual publication, but do not push or run deployment in this task.
- [ ] Run Node tests and `pnpm build:pages`; inspect exported label for count, date, and listing link.
- [ ] Commit only count/workflow files.

### Task 6: Static stack, case studies, and removed route

**Files:** Modify `src/features/portfolio/ProfileFooter.tsx`, `.module.css`, `.test.tsx`; split `src/features/overview/PortfolioOverview.tsx` into `SettleDiffCaseStudy.tsx` and `VaultStewardCaseStudy.tsx` with shared `PortfolioOverview.module.css`; modify project route pages; remove `src/app/projects/casezero/page.tsx`; update tests and README links.

**Interfaces:** `ProfileFooter()` renders exactly three main stack columns plus secondary rows with Convex and Cerebras placed as approved. `PortfolioOverview({ project }: { project: "settlediff" | "vault-steward" })` renders a themed detail page and one résumé header action.

- [ ] Write failing tests for exact stack grouping, Claude Code label, one email link, social order, two valid case studies, and absence of CaseZero links.
- [ ] Run targeted component tests and confirm red.
- [ ] Implement static grid and restyle case studies in shared theme; preserve all dated evidence/limitations and remove CaseZero route and content branches.
- [ ] Run targeted tests and `pnpm build:pages`; verify `out/projects/casezero/index.html` is absent and both retained routes export.
- [ ] Commit only footer/case-study/route files.

### Task 7: Interaction, mobile, and Safari acceptance

**Files:** Update `tests/e2e/compact.spec.ts`, `mobile.spec.ts`, `reduced-motion.spec.ts`, `no-javascript.spec.ts`, `vault-motion.spec.ts`, `export-smoke.spec.ts` or their current equivalents; update `README.md`, `docs/BUILD_SPEC.md`, `docs/IMPLEMENTATION_STATUS.md`, `docs/STORYBOARD.md`, and `docs/ACCEPTANCE_RUNBOOK.md` to describe the new design. Remove orphaned scroll animation files/tests only after no active imports remain.

**Interfaces:** The exported homepage has no pinning or blank transition section; outcome and replay controls are keyboard-accessible; mobile stays within viewport width; light/dark, reduced motion, no-JS, and count fallback behave as specified.

- [ ] Write browser assertions for two natural-flow projects, no horizontal overflow at 320/390px, short landscape, keyboard focus, reduced/no-JS facts, and theme change.
- [ ] Run the new browser subset against an instrumented export and confirm red against any remaining old behavior.
- [ ] Finish responsive/accessibility corrections; remove obsolete runtime and stale tests in scoped changes; update docs to stop calling the site a three-project pinned-scroll portfolio.
- [ ] Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, `node --test scripts/refresh-vault-downloads.test.mjs`, `pnpm build:pages:e2e`, `pnpm test:e2e`, `pnpm build:pages`, `pnpm bundle:check`, and `git diff --check`.
- [ ] Start one local preview and open it in **Safari** for owner review. Verify Mac Safari and an iPhone-sized Safari view; keep the server only while review is active. Do not push or deploy.
- [ ] Commit only validated implementation and documentation files; report any manual-device checks still needed.
