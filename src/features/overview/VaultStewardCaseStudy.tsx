import { projectLinks } from "@/content/portfolioContent";

import styles from "./PortfolioOverview.module.css";

const github = projectLinks.vaultSteward;

export function VaultStewardCaseStudy() {
  return <>
    <section className={styles.hero} aria-labelledby="case-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>02 / CONTROLLED REPAIRS</p>
        <h1 id="case-title">Vault Steward</h1>
        <p className={styles.lead}>Find broken references in an Obsidian vault, preview the exact repair, and keep every edit behind explicit approval.</p>
        <div className={styles.links}><a href={github}>GitHub ↗</a><a href="https://community.obsidian.md/plugins/vault-steward">Obsidian plugin ↗</a></div>
      </div>
      <div className={styles.artifact} aria-label="Illustrative note repair preview">
        <p className={styles.artifactLabel}>ILLUSTRATIVE NOTE / PREVIEW ONLY</p>
        <div className={styles.note}><span>Guides / Team handbook.md</span><p>Before you begin, read <del>[[Guides/Partner Onboard Checklist]]</del>.</p><p>Proposed target: <strong>[[Guides/Partner Onboarding Checklist]]</strong></p></div>
        <p className={styles.artifactVerdict}>AWAITING APPROVAL <span>No note changed</span></p>
      </div>
    </section>

    <div className={styles.content}>
      <section className={styles.storyRow}><h2>The problem</h2><p>Broken links make a knowledge base harder to navigate. Automatic cleanup can be worse if it silently changes material the owner meant to keep.</p></section>
      <section className={styles.storyRow}><h2>What I built</h2><div><p>A local-first Obsidian plugin detects reference, schema, and policy issues, then prepares an exact repair preview. Models can review bounded evidence, but cannot approve or write notes. The owner selects changes; a revision check rejects stale proposals before a write, and a follow-up check verifies the vault state.</p><p className={styles.small}>TypeScript · Obsidian · Preact · SQLite / sql.js · local-first model providers</p></div></section>
      <section className={styles.storyRow}><h2>The control boundary</h2><ol className={styles.steps}><li><strong>Find</strong><span>Locate a missing target.</span></li><li><strong>Preview</strong><span>Show the exact proposed change.</span></li><li><strong>Approve</strong><span>The owner authorizes selected edits.</span></li><li><strong>Verify</strong><span>Check the note revision and re-scan.</span></li></ol></section>
      <section className={styles.storyRow}><h2>Limits &amp; evidence</h2><div><p>macOS desktop is the validated platform. Repair families are intentionally narrow. The plugin cannot establish external facts or guarantee model accuracy; the note example above illustrates the approval flow, not a measured run.</p><div className={styles.links}><a href={`${github}/blob/main/docs/screenshots.md`}>Approval walkthrough ↗</a><a href={`${github}/blob/main/docs/known-limitations.md`}>Known limitations ↗</a></div></div></section>
    </div>
  </>;
}
