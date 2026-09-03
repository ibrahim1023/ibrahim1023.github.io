import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";
import { caseZero, projectLinks } from "@/content/portfolioContent";
import { BlindBoundary } from "./BlindBoundary";
import { CaseFile } from "./CaseFile";
import { LockRecord } from "./LockRecord";
import styles from "./CaseZero.module.css";
import type { CaseZeroState } from "./caseZeroTypes";

export function CaseZeroStage({ state }: { state?: CaseZeroState }) {
  return (
    <div className={styles.stage} data-animatable data-casezero-stage data-layout="desktop" data-state={state}>
      <div className={styles.surface} data-animatable data-casezero-surface />
      <header className={styles.header} data-animatable data-casezero-header>
        <div className={styles.titleRow}><h2>{caseZero.title}</h2><ProjectSourceLink href={projectLinks.caseZero} project={caseZero.title} /></div>
        <p>{caseZero.descriptor}</p>
        <small>{caseZero.qualifier}</small>
      </header>
      <p className={styles.question} data-animatable data-casezero-question data-scene-primary>{caseZero.openingQuestion}</p>
      <CaseFile layout="desktop" />
      <BlindBoundary layout="desktop" />
      <LockRecord layout="desktop" />
    </div>
  );
}
