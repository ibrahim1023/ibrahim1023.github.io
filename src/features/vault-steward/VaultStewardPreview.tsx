"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ProjectDetailsLink } from "@/components/projects/ProjectDetailsLink";
import downloads from "@/content/vaultStewardDownloads.json";
import { projectLinks } from "@/content/portfolioContent";

import styles from "./VaultStewardPreview.module.css";

const statusMessages = [
  "Checking the note’s references…",
  "Looking for a missing target…",
  "Broken link found · the target does not exist.",
  "Repair preview ready · the suggested target exists.",
  "Preview only · awaiting approval. No note has been changed.",
] as const;

export function VaultStewardPreview() {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [phase, setPhase] = useState(4);
  const clearTimers = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);
  const play = useCallback(() => {
    clearTimers();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPhase(4); return; }
    setPhase(0);
    timers.current = [
      setTimeout(() => setPhase(1), 250),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => setPhase(4), 4100),
    ];
  }, [clearTimers]);
  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { play(); observer.disconnect(); } }, { threshold: .3 });
    observer.observe(workspace);
    return () => { observer.disconnect(); clearTimers(); };
  }, [clearTimers, play]);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (preference.matches) { clearTimers(); setPhase(4); } };
    preference.addEventListener("change", finish);
    return () => preference.removeEventListener("change", finish);
  }, [clearTimers]);

  return <section className={styles.section} aria-labelledby="vault-title" data-vault-preview>
    <div className={styles.inner}>
      <div className={styles.copy}>
        <p className={styles.kicker}>02 / CONTROLLED REPAIRS</p>
        <h2 id="vault-title">Vault Steward</h2>
        <p className={styles.descriptor}>A safer way to care for your Obsidian vault.</p>
        <p className={styles.summary}>Find broken references. Preview exact repairs. Approve every change.</p>
        <a className={styles.downloads} href="https://community.obsidian.md/plugins/vault-steward" target="_blank" rel="noopener noreferrer">{downloads.count.toLocaleString()} downloads on Obsidian <span aria-hidden="true">↗</span></a>
        <div className={styles.links}><ProjectDetailsLink slug="vault-steward" inline /><a href="https://community.obsidian.md/plugins/vault-steward" target="_blank" rel="noopener noreferrer">Obsidian plugin ↗</a><a href={projectLinks.vaultSteward} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
        <button className={styles.replay} type="button" onClick={play} aria-label="Replay Vault Steward preview animation">↺ Replay</button>
      </div>

      <div ref={workspaceRef} className={styles.workspace} data-phase={phase}>
        <div className={styles.chrome}><span className={styles.dots} aria-hidden="true"><i /><i /><i /></span><span>Vault Steward</span><span className={styles.chromeClose} aria-hidden="true">× &nbsp; +</span></div>
        <div className={styles.workspaceBody}>
          <aside className={styles.sidebar} aria-hidden="true"><p>⌕ &nbsp; ▣</p><ul><li><i>▤</i><span>Notes</span></li><li><i>☷</i><span>Daily</span></li><li><i>☷</i><span>Ideas</span></li><li><i>▤</i><span>Projects</span></li><li className={styles.selected}><i>◈</i><span>Project plan</span></li><li><i>▤</i><span>Plugin</span></li><li><i>▤</i><span>Roadmap</span></li></ul></aside>
          <div className={styles.editor}>
            <div className={styles.scanner} aria-hidden="true" data-vault-scan />
            <p className={styles.file}># Project plan</p>
            <p>This plugin helps keep my vault healthy by finding broken references and suggesting safe fixes.</p>
            <p>I’m writing about <span className={styles.broken} data-vault-broken>[[missing-target]]</span> and how it connects to my workflow.</p>
            <div className={styles.preview} data-vault-repair>
              <div className={styles.previewHeading}><span className={styles.tool} aria-hidden="true">⌁</span><span>Suggested repair</span><span className={styles.targetFound}>Target exists</span></div>
              <p>Replace with <strong>[[existing-target]]</strong></p>
              <div className={styles.approval} data-vault-approval><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 7V5a4 4 0 0 1 8 0v2M3 7h10v7H3zM8 10v2" /></svg><small>Preview only · awaiting approval</small></div>
            </div>
            <p>Next, I’ll outline the evaluation criteria and document the results.</p>
          </div>
        </div>
        <div className={styles.status}>
          <ol className={styles.steps} aria-label="Repair workflow"><li data-active={phase <= 2} data-complete={phase >= 3}><span>1</span>Find</li><li data-active={phase === 3} data-complete={phase === 4}><span>2</span>Preview</li><li data-active={phase === 4}><span>3</span>Your approval</li></ol>
          <p data-vault-status>{statusMessages[phase]}</p>
        </div>
      </div>
    </div>
  </section>;
}
