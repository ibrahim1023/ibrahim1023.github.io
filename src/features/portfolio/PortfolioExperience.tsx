"use client";

import { identity, settleDiff, vaultSteward } from "@/content/portfolioContent";

import styles from "./PortfolioExperience.module.css";

export function PortfolioExperience() {
  return (
    <div className={styles.root}>
      <section className={styles.section} aria-label="Intro">
        <p className={styles.role}>{identity.role}</p>
        <h1 className={styles.title}>{identity.name}</h1>
        <p className={styles.framing}>{identity.framing}</p>
        <p className={styles.cue}>{identity.selectedWorkCue}</p>
      </section>
      <section className={styles.section} aria-label={settleDiff.title}>
        <h2 className={styles.title}>{settleDiff.title}</h2>
        <p className={styles.framing}>{settleDiff.descriptor}</p>
      </section>
      <section className={styles.section} aria-label={vaultSteward.title}>
        <h2 className={styles.title}>{vaultSteward.title}</h2>
        <p className={styles.framing}>{vaultSteward.descriptor}</p>
      </section>
    </div>
  );
}
