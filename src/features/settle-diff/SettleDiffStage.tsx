import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";
import { projectLinks, settleDiff } from "@/content/portfolioContent";
import { VaultTransitionOverlay } from "@/features/vault-steward/VaultTransitionOverlay";
import { EvidenceReconstruction } from "./EvidenceReconstruction";
import { IndependentProof } from "./IndependentProof";
import styles from "./SettleDiff.module.css";
import type { SettleDiffState } from "./settleDiffTypes";
import { TransactionArtifact } from "./TransactionArtifact";

export function SettleDiffStage({ state }: { state?: SettleDiffState }) {
  return <div className={styles.stage} data-animatable data-layout="desktop" data-state={state} data-stage>
    <div className={styles.sceneSurface} data-animatable data-scene-surface />
    <header className={styles.stageHeader} data-stage-header data-animatable><div className={styles.titleRow}><h2 className={styles.stageTitle}>{settleDiff.title}</h2><ProjectSourceLink href={projectLinks.settleDiff} project={settleDiff.title} /></div><p>{settleDiff.descriptor}</p></header>
    <TransactionArtifact layout="desktop" />
    <p className={styles.uncertainty} data-animatable data-uncertainty>{settleDiff.uncertainty}</p>
    <EvidenceReconstruction layout="desktop" /><IndependentProof layout="desktop" />
    <VaultTransitionOverlay className={styles.transition} layout="desktop" />
  </div>;
}
