"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ProjectDetailsLink } from "@/components/projects/ProjectDetailsLink";
import { currentPerfloValidation, externalLinks, paidDeliveryFailure, projectLinks } from "@/content/portfolioContent";

import styles from "./SettleDiffPreview.module.css";

type Outcome = "verified" | "provider" | "delivery";

const outcomes: { id: Outcome; label: string; verdict: string }[] = [
  { id: "verified", label: "Independent transfer", verdict: "VERIFIED" },
  { id: "provider", label: "Provider records", verdict: "UNVERIFIABLE" },
  { id: "delivery", label: "Paid delivery", verdict: "PAID_FAILURE" },
];

const transferFields = [
  { label: "Payer", requested: "Authorized", observed: "Matched" },
  { label: "Recipient", requested: "Authorized", observed: "Matched" },
  { label: "Token", requested: "test USDC", observed: "test USDC" },
  { label: "Amount", requested: "0.001", observed: "0.001" },
  { label: "Network", requested: "Base Sepolia", observed: "Base Sepolia" },
] as const;

const records = {
  verified: {
    top: "X402 · BASE SEPOLIA TESTNET",
    firstLabel: "PROVIDER RECEIPT",
    firstTitle: "0.001 test USDC",
    firstDetail: "Transaction reference returned",
    firstSource: "x402 facilitator response",
    secondLabel: "TRANSFER OBSERVED",
    secondTitle: "Exact transfer confirmed",
    secondDetail: "Authorized payer, recipient, token, 0.001 test USDC, and Base Sepolia network matched",
    secondSource: "Read-only RPC observation · separate from the provider receipt",
    note: "13 / 13 checks passed · Sep 28, 2026",
  },
  provider: {
    top: currentPerfloValidation.eyebrow,
    firstLabel: "PROVIDER RECORDS",
    firstTitle: "Records aligned",
    firstDetail: currentPerfloValidation.evidence,
    firstSource: "Perflo contract · execution · Activity",
    secondLabel: "INDEPENDENT CUSTOMER DEBIT",
    secondTitle: "Not established",
    secondDetail: "The customer debit remained provider-ledger evidence.",
    secondSource: "Vendor-side transfer ≠ customer debit",
    note: "Provider agreement is not independent settlement proof",
  },
  delivery: {
    top: paidDeliveryFailure.eyebrow,
    firstLabel: "PAYMENT OBSERVED",
    firstTitle: "Transfer confirmed",
    firstDetail: paidDeliveryFailure.settlement,
    firstSource: "Separate authorized x402 request",
    secondLabel: "DELIVERY CONTRACT",
    secondTitle: "Response mismatch",
    secondDetail: paidDeliveryFailure.delivery,
    secondSource: "HTTP 200 did not satisfy the advertised response",
    note: "DO_NOT_RETRY · Earlier HTTP-500 attempt remains UNVERIFIABLE",
  },
} as const;

export function SettleDiffPreview() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [outcome, setOutcome] = useState<Outcome>("verified");
  const [phase, setPhase] = useState(0);
  const clearTimers = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);
  const play = useCallback(() => {
    clearTimers();
    hasStarted.current = true;
    setOutcome("verified");
    if (typeof window.matchMedia !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPhase(5); return; }
    setPhase(0);
    timers.current = [
      setTimeout(() => setPhase(1), 450),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2150),
      setTimeout(() => setPhase(4), 2900),
      setTimeout(() => setPhase(5), 5000),
    ];
  }, [clearTimers]);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!("IntersectionObserver" in window)) {
      const kickoff = setTimeout(() => { if (!hasStarted.current) play(); }, 0);
      return () => { clearTimeout(kickoff); clearTimers(); };
    }
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { if (!hasStarted.current) play(); observer.disconnect(); } }, { threshold: .3 });
    observer.observe(stage);
    return () => { observer.disconnect(); clearTimers(); };
  }, [play, clearTimers]);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (preference.matches) { clearTimers(); setPhase(5); } };
    preference.addEventListener("change", finish);
    return () => preference.removeEventListener("change", finish);
  }, [clearTimers]);
  function selectOutcome(next: Outcome) { clearTimers(); hasStarted.current = true; setOutcome(next); setPhase(5); }
  const record = records[outcome];

  return <section className={styles.section} aria-labelledby="settlediff-title" data-settlediff-preview>
    <noscript><style>{`
      [data-settlediff-preview] [data-preview-flow] { display: none; }
      [data-settlediff-preview] [data-preview-papers] { opacity: 1 !important; pointer-events: auto !important; }
      [data-settlediff-preview] [data-preview-claim], [data-settlediff-preview] [data-preview-observation] { transform: none !important; }
    `}</style></noscript>
    <div className={styles.inner}>
      <div className={styles.copy}>
        <p className={styles.kicker}>01 / PAYMENT VERIFICATION</p>
        <h2 id="settlediff-title">SettleDiff</h2>
        <p className={styles.descriptor}>Verification for agent payments.</p>
        <p className={styles.summary}>A provider can say “paid.” SettleDiff asks what the evidence can actually prove.</p>
        <div className={styles.links}><ProjectDetailsLink slug="settlediff" inline /><a href={projectLinks.settleDiff} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
        <div className={styles.controls} role="group" aria-label="SettleDiff outcomes">
          {outcomes.map(item => <button key={item.id} type="button" aria-pressed={outcome === item.id} onClick={() => selectOutcome(item.id)}><span>{item.label}</span><strong>{item.verdict}</strong></button>)}
        </div>
        <button className={styles.replay} type="button" onClick={play} aria-label="Replay SettleDiff verification animation">↺ Replay</button>
      </div>

      <div ref={stageRef} className={styles.stage} data-outcome={outcome} data-phase={phase}>
        <p className={styles.context}>{record.top}</p>
        <div className={styles.flow} data-preview-flow aria-hidden="true">
          <div className={styles.flowDiagram}>
            <div className={styles.flowLabel} data-flow-row="provider"><span>PROVIDER CLAIM</span><strong>0.001 test USDC</strong></div>
            <div className={styles.flowTrack} data-flow-row="provider"><span className={styles.flowOrigin}>▤</span><span className={styles.flowRail} data-flow-rail="provider"><i /></span></div>
            <div className={styles.flowLabel} data-flow-row="independent"><span>INDEPENDENT OBSERVATION</span><strong>0.001 test USDC</strong></div>
            <div className={styles.flowTrack} data-flow-row="independent"><span className={styles.flowOrigin}>◇</span><span className={styles.flowRail} data-flow-rail="independent"><i /></span></div>
            <div className={styles.flowJunction}><svg className={styles.flowJoin} viewBox="0 0 64 100" preserveAspectRatio="none"><path data-flow-connector="provider" d="M0 0 C34 0 30 50 64 50" /><path data-flow-connector="independent" d="M0 100 C34 100 30 50 64 50" /></svg></div>
            <div className={styles.flowResult}><span data-flow-node>✓</span><strong>VERIFIED</strong></div>
          </div>
          <p className={styles.flowCaption}>Two sources. One evidence-backed verdict.</p>
        </div>
        <div className={styles.papers} data-preview-papers>
          {outcome === "verified" && <p className={styles.comparisonHeading} data-preview-comparison><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 5h10m-3-3 3 3-3 3M13 11H3m3-3-3 3 3 3" /></svg>Compare evidence</p>}
          <div className={styles.paperFirst} data-preview-claim>
            <div className={styles.paperHeader}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h9l3 3v15H6zM14 3v5h4M9 12h6M9 16h6" /></svg><span>{record.firstLabel}</span><span className={styles.documentNumber}>01</span></div>
            <strong className={styles.paperTitle}>{record.firstTitle}</strong><p className={styles.paperNote}>{record.firstDetail}</p>
            {outcome === "verified" && <dl className={styles.paperFields} aria-label="Authorized terms associated with the provider receipt">{transferFields.map(field => <div key={field.label} data-match-row><dt>{field.label}</dt><dd>{field.requested}</dd></div>)}</dl>}
            <div className={styles.paperSource}><span aria-hidden="true" /><small>{record.firstSource}</small></div>
          </div>
          <div className={styles.paperSecond} data-preview-observation>
            <div className={styles.paperHeader}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 15l4-6M9 9l-2 3a4 4 0 0 0 6 5l2-3M15 15l2-3a4 4 0 0 0-6-5l-2 3" /></svg><span>{record.secondLabel}</span><span className={styles.documentNumber}>02</span></div>
            <strong className={styles.paperTitle}>{outcome === "verified" ? "0.001 test USDC" : record.secondTitle}</strong><p className={styles.paperNote}>{outcome === "verified" ? "Exact transfer confirmed" : record.secondDetail}</p>
            {outcome === "verified" && <><dl className={styles.paperFields} aria-label="Independent transfer matching the authorized terms">{transferFields.map(field => <div key={field.label} data-match-row><dt>{field.label}</dt><dd>{field.observed}<svg className={styles.rowCheck} viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg></dd></div>)}</dl><p className={styles.srOnly}>{record.secondDetail}</p></>}
            <div className={styles.paperSource}><span aria-hidden="true" /><small>{record.secondSource}</small></div>
          </div>
          <div className={styles.connection} aria-hidden="true"><i /></div>
          <div className={styles.verdict} data-preview-result><span className={styles.verdictBadge}>{outcome === "verified" && <svg className={styles.stamp} viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>}<strong>{outcomes.find(item => item.id === outcome)?.verdict}</strong></span><span className={styles.verdictNote}>{record.note}</span></div>
        </div>
        <a className={styles.report} href={externalLinks.settleDiffCurrentValidation}>Read September 28 validation ↗</a>
      </div>
    </div>
  </section>;
}
