import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";
import { caseZero, projectLinks } from "@/content/portfolioContent";
import { BlindBoundary } from "./BlindBoundary";
import { CaseFile } from "./CaseFile";
import { LockRecord } from "./LockRecord";
import { VaultTransitionOverlay } from "@/features/vault-steward/VaultTransitionOverlay";
import styles from "./CaseZero.module.css";
import mobileStyles from "./MobileCaseZero.module.css";

export function MobileCaseZeroStage() {
  return (
    <div className={`${styles.stage} ${mobileStyles.stage}`} data-animatable data-casezero-stage data-layout="mobile">
      <div className={styles.surface} data-animatable data-casezero-surface />
      <header className={`${styles.header} ${mobileStyles.header}`} data-animatable data-casezero-header>
        <div className={styles.titleRow}><h2>{caseZero.title}</h2><ProjectSourceLink href={projectLinks.caseZero} project={caseZero.title} /></div>
        <p>{caseZero.descriptor}</p>
        <small>{caseZero.qualifier}</small>
      </header>
      <p className={`${styles.question} ${mobileStyles.question}`} data-animatable data-casezero-question data-scene-primary>{caseZero.openingQuestion}</p>
      <CaseFile layout="mobile" />
      <BlindBoundary layout="mobile" />
      <LockRecord layout="mobile" />
      <VaultTransitionOverlay className={styles.vaultTransition} layout="mobile" />
    </div>
  );
}
