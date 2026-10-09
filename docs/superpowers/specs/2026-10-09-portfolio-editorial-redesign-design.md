# Editorial portfolio redesign

Date: 2026-10-09
Status: Proposed for owner review; do not implement or deploy until approved.

## Intent and boundaries

Ibrahim's portfolio should be a concise, elegant introduction to his work in reliable AI systems. Visitors should understand the point of each project from a short, distinctive animation on the same page, then choose whether to read its detailed case study. The site must feel like one coherent portfolio, not separate dark and light websites or a long scroll-controlled presentation.

This redesign covers the homepage, the SettleDiff and Vault Steward case studies, shared styling, motion, accessibility, and the Vault Steward download count. It removes CaseZero from the homepage **and removes `/projects/casezero/`**; the in-progress voice-and-vision project is not represented until its facts and design are ready. No code is published as part of this design phase.

## Direction and alternatives

1. **Selected: editorial split sections with small in-place demonstrations.** Project name and short explanation sit on the left; a different project-specific visual sits on the right. One visual language and one system-selected color scheme hold the site together. This keeps motion meaningful without increasing scroll length.
2. Rejected: long pinned scroll chapters. They previously created excess scrolling, resistance, transition seams, and hard-to-read overlaps on iPhone.
3. Rejected: static project cards or a generic animated line. They make the work faster to skim but do not explain its engineering distinction.

## Site structure

The homepage flows naturally: compact identity/introduction → SettleDiff → Vault Steward → tools/stack → contact/social links. No pinned chapters, artificial spacer runways, or full-page black/white handoff panels. A header shows Ibrahim Arshad at left and **Résumé ↗** as its only navigation action at right, linking to the existing locally hosted PDF. Project sections each include their own case-study and source/plugin links. The footer retains a single visible email link and the established GitHub, LinkedIn, Medium, and X links, in that order.

The detailed SettleDiff and Vault Steward pages remain, share the homepage typography and theme, and retain evidence, limitations, and source links. Repeated project names and generic engineering-focus filler should not return. Direct navigation to the removed CaseZero URL is intentionally unsupported after this redesign; remove any internal links, sitemap entries, or project-navigation references to it.

## Visual system and theme

Use restrained sans-serif typography, generous but not oversized space, hairline rules, and one blue accent. Light mode is near-white with dark ink; dark mode is charcoal with pale ink. Avoid the old off-white/green palette, heavy gradients, serif display type, neon, and large bordered dashboards. The visitor's `prefers-color-scheme` setting selects the theme automatically; no manual toggle is required. All sections and case studies use the same theme at the same time, including during navigation and reload. Contrast and focus indicators must remain legible in both modes.

Desktop project sections are two-column, with the explanation and links on the left and a compact demo on the right. On narrow iPhone widths, they become one column with the demo directly below its explanation. The artwork must fit without horizontal overflow or tiny text. Sections should be content-sized rather than full-screen scenes; overall page length should be dramatically shorter than the current pinned narrative.

## SettleDiff section

The left column uses the approved short identity: **SettleDiff — Verification for agent payments.** A brief sentence explains the difference between a provider's payment claim and independent settlement proof. The right column is a receipt-versus-observed-transfer composition, not a dashboard or generic line. A one-shot, in-place sequence begins when visible:

1. A provider receipt reports payment for an **0.001 test-USDC purchase on Base Sepolia testnet**.
2. A visibly separate read-only transfer observation appears; payer, recipient, token, amount, and network match the authorized terms.
3. The deterministic outcome resolves to **VERIFIED** for that specific x402 purchase. A replay control is available; the final state remains visible rather than cycling forever.

Concise secondary controls expose the two other current outcomes without extending the page: **Perflo v8 — UNVERIFIABLE** because provider records align but independent customer debit proof is absent; and a **separate authorized x402 request — PAID_FAILURE / DO_NOT_RETRY** because payment was confirmed but delivery broke the advertised content type. The historic September 8 Perflo schema-2 result belongs only in the case study as dated historical context and must not be shown as independent proof. The unresolved HTTP-500 request must never be conflated with the confirmed paid failure. Keep the September 28 validation as the primary evidence link, with the historical and assurance reports near the case-study claims they support.

Reduced motion and no JavaScript show the same final facts, source distinctions, and accessible controls or plainly readable alternatives; motion is never required to discover the verdict.

## Vault Steward section

The left column uses **Vault Steward — A safer way to care for your Obsidian vault.** It briefly says: find broken references, preview exact repairs, approve every change. Link the case study and the Obsidian plugin listing. A small linked download proof point appears beneath the description; it is not a large animated ticker.

The right visual is deliberately different from SettleDiff: **one Obsidian-like note workspace**, not two floating receipt cards. A broken internal link is highlighted in place, an inline Current → After replacement preview appears beneath the affected line, and the animation stops at **Preview only · awaiting approval**. The portfolio must not imply Vault Steward autonomously edits notes or that a portfolio animation actually applies a change. A replay control may restart the short demonstration. The detailed page explains selection, explicit Apply fixes, revision re-check, and post-apply verification. The homepage example is labeled illustrative.

Reduced motion and no JavaScript show a complete, readable preview with the approval boundary already visible.

## Download count

Obsidian's official community plugin stats contain the `vault-steward.downloads` value (365 on 2026-10-09). After publication is approved, the existing GitHub Pages build workflow may refresh this value on a daily schedule, extracting only that entry into the built site. The visible label includes an `updated` date, links to the plugin listing, and falls back to the last known count if the upstream source fails. Do not fetch the full community-plugin-stats dataset in each visitor's browser, animate the digits, or describe the value as instantaneous/live. Scheduled deployments are not enabled until the owner authorizes publication of the redesign.

## Tools section

Use a compact static grid matching the approved light/dark mockup, not a moving reel. Main columns:

- **Core engineering:** Python, TypeScript, React, Next.js, FastAPI, Pydantic.
- **Agents & verification:** PydanticAI, LangGraph, Context.dev, MCP, x402, LangSmith.
- **Data & delivery:** PostgreSQL, SQLite, Supabase, Convex, Docker, AWS, Vercel.

Below the grid, quieter rows carry **Other platforms:** Clerk, GitHub Actions; **Model & voice:** OpenAI, Ollama, Cerebras, ElevenLabs; and **AI-assisted development:** Claude Code, Codex, Devin. This is a selective experience inventory, not an assertion that every tool is used by every featured project. Project-specific stack claims stay tied to the relevant case study.

## Motion and interaction rules

Project demonstrations are short, one-shot, and triggered once as they enter view. They do not pin the viewport, hijack touch scrolling, autoplay an endless carousel, or hide important information while waiting. Manual replay and outcome controls are keyboard operable, have visible focus, and announce state semantically. A visitor can scroll past instantly. Animation failure leaves a fully readable static state. No interaction changes project evidence or fetches user data.

## Implementation boundaries and verification

The current working tree contains an uncommitted SettleDiff preview and related test updates from earlier design exploration. Preserve and inspect those changes; adapt or replace them deliberately, without discarding unrelated work. Remove obsolete CaseZero animation/runtime dependencies only after the new homepage no longer relies on them. Keep the existing static export and résumé asset.

Verification must cover light and dark themes, desktop and iPhone-sized layouts, reduced motion, no JavaScript, keyboard access, project/source links, count fallback and date, factual verdict distinctions, and a continuous natural scroll without resistance or blank gaps. Run unit/component, type, lint, export, and browser tests before owner review. Show local visual updates in **Safari**, not the Codex/ChatGPT in-app browser. Do not push or deploy until Ibrahim approves the local result.
