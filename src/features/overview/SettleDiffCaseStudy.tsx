import { externalLinks, projectLinks, publicVerification } from "@/content/portfolioContent";

import styles from "./PortfolioOverview.module.css";

export function SettleDiffCaseStudy() {
  return <>
    <section className={styles.hero} aria-labelledby="case-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>01 / PAYMENT VERIFICATION</p>
        <h1 id="case-title">SettleDiff</h1>
        <p className={styles.lead}>A payment receipt is a claim. SettleDiff checks what was authorized, what the provider reported, and—when available—what an independent observer can verify.</p>
        <div className={styles.links}><a href={projectLinks.settleDiff}>GitHub ↗</a><a href={externalLinks.settleDiffCurrentValidation}>Current validation ↗</a></div>
      </div>
      <div className={styles.artifact} aria-label="x402 verification example">
        <p className={styles.artifactLabel}>X402 / BASE SEPOLIA TESTNET</p>
        <div className={styles.artifactPair}>
          <div><span>PROVIDER RECORD</span><strong>Payment receipt</strong><p>0.001 test USDC</p></div>
          <div><span>INDEPENDENT OBSERVATION</span><strong>Transfer confirmed</strong><p>Payer, recipient, token, amount, and network match.</p></div>
        </div>
        <p className={styles.artifactVerdict}>VERIFIED <span>13 / 13 checks · September 28, 2026</span></p>
      </div>
    </section>

    <div className={styles.content}>
      <section className={styles.storyRow}><h2>The problem</h2><p>Paid agents need to distinguish a submitted request from a settled payment—and a settled payment from a successful service response. Provider consistency alone cannot prove a customer debit.</p></section>
      <section className={styles.storyRow}><h2>What I built</h2><div><p>A Python verifier binds each rail’s available terms before execution, separates provider evidence from independent observations, and assigns deterministic verdicts. One-use authorization prevents term drift; ambiguous failures are not retried blindly. An investigation agent may explain findings, but cannot overrule them.</p><p className={styles.small}>Python · PydanticAI · FastAPI · SQLite · x402 · Context.dev for conditional supporting status-page evidence</p></div></section>
      <section className={styles.storyRow}><h2>What the evidence shows</h2><div className={styles.results}>
        <article><span>01 / PERFLO V8</span><h3>Provider records aligned</h3><p>Contract, execution, charge, Activity, and provider settlement agreed. The customer debit remained provider-ledger evidence; a vendor-side Base receipt did not prove it.</p><strong>UNVERIFIABLE</strong></article>
        <article><span>02 / X402 TESTNET</span><h3>Exact transfer independently confirmed</h3><p>{publicVerification.independent.detail}. This was a separately authorized 0.001 test-USDC purchase on Base Sepolia.</p><strong>VERIFIED</strong></article>
        <article><span>03 / SEPARATE X402 REQUEST</span><h3>Payment confirmed, delivery failed</h3><p>The transfer settled, but the service returned HTTP 200 text/plain after advertising application/json. The earlier HTTP-500 request lacked settlement proof and is not this result.</p><strong>PAID_FAILURE · DO_NOT_RETRY</strong></article>
      </div></section>
      <section className={styles.storyRow}><h2>Limits &amp; historical context</h2><div><p>These are bounded live validations, not a claim of universal compatibility or production reliability. The original Base→Tempo, HTTP-402, broadcast_failed run was UNVERIFIABLE. A September 8 Perflo report returned VERIFIED_WITH_WARNINGS under historical schema-2 rules, when provider Activity filled the settlement role; that result is not independent customer-settlement proof.</p><div className={styles.links}><a href={externalLinks.settleDiffCurrentValidation}>September 28 validation ↗</a><a href={externalLinks.settleDiffLiveReport}>Historical validation report ↗</a><a href={externalLinks.settleDiffAssuranceReport}>Delivery and recovery assurance ↗</a></div></div></section>
    </div>
  </>;
}
