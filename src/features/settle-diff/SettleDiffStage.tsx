import { projectLinks, settleDiff } from "@/content/portfolioContent";
import { ProjectSourceLink } from "@/components/projects/ProjectSourceLink";

import { EvidenceMap } from "./EvidenceMap";
import { ReasoningRail } from "./ReasoningRail";
import styles from "./SettleDiff.module.css";
import type { SettleDiffState } from "./settleDiffTypes";
import { TransactionPath } from "./TransactionPath";

export function SettleDiffStage({
  state = "project-established",
}: {
  state?: SettleDiffState;
}) {
  return (
    <div className={styles.stage} data-state={state} data-stage>
      <header className={styles.stageHeader} data-stage-header>
        <div className={styles.titleRow}>
          <h2 className={styles.stageTitle}>{settleDiff.title}</h2>
          <ProjectSourceLink href={projectLinks.settleDiff} project={settleDiff.title} />
        </div>
        <p className={styles.stageDescriptor}>{settleDiff.descriptor}</p>
      </header>
      <p className={styles.attemptBadge} data-attempt data-animatable>
        <strong>{settleDiff.attemptLabel}</strong>
        <span>{settleDiff.attemptQualifier}</span>
      </p>
      <TransactionPath />
      <EvidenceMap />
      <div className={styles.verdict} data-verdict data-animatable>
        <p className={styles.verdictLabel}>{settleDiff.verdict}</p>
        <p className={styles.verdictReason}>{settleDiff.verdictReason}</p>
      </div>
      <ReasoningRail />
    </div>
  );
}
