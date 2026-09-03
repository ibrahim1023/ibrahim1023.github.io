import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";
import { projectLinks, settleDiff } from "@/content/portfolioContent";
import { SettleToCaseZeroTransition } from "@/features/case-zero/SettleToCaseZeroTransition";
import { EvidenceReconstruction } from "./EvidenceReconstruction";
import { IndependentProof } from "./IndependentProof";
import styles from "./SettleDiff.module.css";
import mobileStyles from "./MobileSettleDiff.module.css";
import { TransactionArtifact } from "./TransactionArtifact";

export function MobileSettleDiffStage() {
  return <div className={`${styles.stage} ${mobileStyles.stage}`} data-animatable data-stage data-layout="mobile">
    <div className={styles.sceneSurface} data-animatable data-scene-surface />
    <header className={`${styles.stageHeader} ${mobileStyles.header}`} data-stage-header data-animatable><div className={styles.titleRow}><h2 className={styles.stageTitle}>{settleDiff.title}</h2><ProjectSourceLink href={projectLinks.settleDiff} project={settleDiff.title} /></div><p>{settleDiff.descriptor}</p></header>
    <TransactionArtifact layout="mobile" /><p className={styles.uncertainty} data-animatable data-uncertainty>{settleDiff.uncertainty}</p>
    <EvidenceReconstruction layout="mobile" /><IndependentProof layout="mobile" />
    <SettleToCaseZeroTransition layout="mobile" />
  </div>;
}
