import { settleDiff } from "@/content/portfolioContent";

import { ReducedMotionNarrative } from "./ReducedMotionNarrative";
import { MobileSettleDiffStage } from "./MobileSettleDiffStage";
import styles from "./SettleDiff.module.css";
import { SettleDiffStage } from "./SettleDiffStage";

export function SettleDiffSection() {
  return (
    <section className={styles.section} aria-label={settleDiff.title}>
      <div className={styles.desktopBranch} data-animated-layout="desktop">
        <SettleDiffStage />
      </div>
      <div className={styles.mobileBranch} data-animated-layout="mobile">
        <MobileSettleDiffStage />
      </div>
      <div
        className={styles.reducedBranch}
        data-branch="reduced"
        data-no-js-narrative
      >
        <ReducedMotionNarrative />
      </div>
      <noscript>
        <style>{`[data-animated-layout] { display: none !important; }
[data-branch="reduced"] { display: block !important; }`}</style>
      </noscript>
    </section>
  );
}
