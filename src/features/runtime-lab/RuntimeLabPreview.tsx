"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectDetailsLink } from "@/components/projects/ProjectDetailsLink";
import shared from "@/features/settle-diff/SettleDiffPreview.module.css";
import styles from "./RuntimeLabPreview.module.css";

export const labRepository = "https://github.com/ibrahim1023/agent-runtime-reliability-lab";
const examples = [
  { label: "Unprotected recovery", outcome: "DUPLICATE DETECTED", effects: "2", receipt: "New receipt · second effect", caption: "Two attempts. Two committed effects.", detail: "The pending tool replays. Without receiver protection, the same operation commits again." },
  { label: "Protected recovery", outcome: "ONE EFFECT", effects: "1", receipt: "Original receipt returned", caption: "Two attempts. One protected effect.", detail: "The same operation ID reaches the receiver again. An atomic check returns the original receipt." },
  { label: "Unavailable evidence", outcome: "OUTCOME UNKNOWN", effects: "?", receipt: "Earlier receipt exists", caption: "A receipt alone cannot establish the count.", detail: "Separate reporting experiment: the application cannot verify the receiver’s current records. The effect count stays unknown." },
] as const;

export function RuntimeLabPreview() {
  const [selected, setSelected] = useState(1);
  const [phase, setPhase] = useState(4);
  const stage = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);
  const play = useCallback((index: number) => {
    started.current = true;
    clear();
    setSelected(index);
    if (typeof window.matchMedia !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPhase(4); return; }
    setPhase(0);
    timers.current = [700, 1500, 2400, 3300].map((delay, step) => setTimeout(() => setPhase(step + 1), delay));
  }, [clear]);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (preference.matches) { clear(); setPhase(4); } };
    preference.addEventListener("change", finish);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !started.current) { play(1); observer?.disconnect(); }
    }, { threshold: .35 });
    if (stage.current) observer?.observe(stage.current);
    return () => { clear(); observer?.disconnect(); preference.removeEventListener("change", finish); };
  }, [clear, play]);
  const example = examples[selected] ?? examples[1];
  const unknown = selected === 2;
  const steps = unknown ? ["Earlier receipt", "Receiver unavailable", "Count cannot be verified"] : ["Action commits", "Process crashes", "Pending tool replays", selected === 1 ? "Original receipt returned" : "Second effect commits"];

  return <section className={shared.section} aria-labelledby="runtime-title" data-runtime-preview>
    <div className={shared.inner}>
      <div className={shared.copy}>
        <p className={shared.kicker}>01 / AGENT RELIABILITY</p>
        <h2 id="runtime-title">Agent Runtime Lab</h2>
        <p className={shared.descriptor}>Recovery without repeating the action.</p>
        <p className={shared.summary}>An action can finish before an agent saves its result. I tested what happens after a crash—and how to prevent recovery from creating a duplicate.</p>
        <div className={shared.links}><ProjectDetailsLink slug="agent-runtime-lab" inline /><a href={labRepository} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
        <div className={shared.controls} aria-label="Recorded experiment illustrations">{examples.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} onClick={() => play(index)}><span>{item.label}</span><strong>{item.outcome}</strong></button>)}</div>
        <button type="button" className={shared.replay} onClick={() => play(selected)} aria-label="Replay Agent Runtime Lab illustration">↺ Replay</button>
        <p className={styles.scope}>Independent experiment lab · Scripted runtime executions · Local SQLite receiver</p>
      </div>
      <div className={styles.stage} ref={stage} data-phase={phase} data-example={selected}>
        <p className={styles.label}>Illustration of recorded experiments</p>
        <div className={styles.execution}>
          <div className={styles.heading}><span>{unknown ? "APPLICATION REPORTING" : "CRASH → RECOVERY"}</span><span>{unknown ? "Separate experiment" : "Same operation ID"}</span></div>
          <ol className={styles.timeline}>{steps.map((step, index) => <li key={step} data-reached={phase >= index}><span aria-hidden="true">{index === 1 ? "×" : index + 1}</span>{step}</li>)}</ol>
          <div className={styles.ledger}>
            <div className={styles.ledgerTitle}><span>RECEIVER RECORDS</span><span>Local SQLite</span></div>
            <div className={styles.record} data-reached={phase >= 1}><span aria-hidden="true">▤</span><div><strong>{unknown ? "Earlier receipt" : "Effect 01 committed"}</strong><small>operation ID: op-01</small></div><span>{unknown ? "saved" : "receipt 01"}</span></div>
            <div className={styles.record} data-reached={phase >= 3} data-second-record>{unknown ? <><span aria-hidden="true">?</span><div><strong>Current records unavailable</strong><small>No verified effect count</small></div></> : <><span aria-hidden="true">{selected === 1 ? "↩" : "+"}</span><div><strong>{example.receipt}</strong><small>{selected === 1 ? "op-01 already recorded · no new row" : "op-01 repeated · receipt 02"}</small></div></>}</div>
          </div>
          <div className={styles.counts}><div><strong>{unknown ? "—" : phase >= 3 ? "2" : "1"}</strong><span>Tool attempts{unknown ? " · not recounted" : ""}</span></div><div><strong>{unknown ? "?" : phase >= 3 ? example.effects : "1"}</strong><span>Committed effects{unknown ? " · unknown" : ""}</span></div></div>
        </div>
        <div className={styles.result} data-reached={phase === 4} aria-live="polite" aria-atomic="true"><strong>{example.outcome}</strong><p>{example.caption}</p></div>
        <p className={styles.explanation}>{example.detail}</p>
        <a className={styles.evidence} href={`${labRepository}/blob/main/${unknown ? "docs/final-response-integration.md" : "docs/crash-resume-evidence.md"}`} target="_blank" rel="noopener noreferrer">Read the recorded evidence ↗</a>
      </div>
    </div>
  </section>;
}
