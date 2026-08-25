import { settleDiff } from "@/content/portfolioContent";

import { ReducedMotionNarrative } from "./ReducedMotionNarrative";
import styles from "./SettleDiff.module.css";
import { SettleDiffStage } from "./SettleDiffStage";

export function SettleDiffSection() {
  return (
    <section className={styles.section} aria-label={settleDiff.title}>
      <div className={styles.animatedBranch} data-branch="animated">
        <SettleDiffStage />
      </div>
      <div className={styles.reducedBranch} data-branch="reduced">
        <ReducedMotionNarrative />
      </div>
    </section>
  );
}
