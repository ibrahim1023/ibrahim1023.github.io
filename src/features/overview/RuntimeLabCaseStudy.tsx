import styles from "./PortfolioOverview.module.css";

const repo = "https://github.com/ibrahim1023/agent-runtime-reliability-lab";
const doc = (path: string) => `${repo}/blob/main/${path}`;

export function RuntimeLabCaseStudy() {
  return <>
    <section className={styles.hero} aria-labelledby="case-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>01 / AGENT RELIABILITY</p>
        <h1 id="case-title">Agent Runtime Lab</h1>
        <p className={styles.lead}>Recovery without repeating the action. An independent, AI-assisted experiment lab that counts tool attempts and committed effects separately.</p>
        <div className={styles.links}><a href={repo}>GitHub ↗</a><a href={doc("REPORT.md")}>Full report ↗</a><a href={doc("docs/demo.md")}>Five-minute demo ↗</a></div>
      </div>
      <div className={styles.artifact} aria-label="Summary of recorded crash and recovery experiments">
        <p className={styles.artifactLabel}>RECORDED EXPERIMENTS / LOCAL SQLITE</p>
        <div className={styles.artifactPair}><div><span>UNPROTECTED</span><strong>2 attempts / 2 effects</strong><p>The same operation commits twice. The record-once task failed.</p></div><div><span>PROTECTED</span><strong>2 attempts / 1 effect</strong><p>The receiver reuses the exact original receipt.</p></div></div>
        <p className={styles.artifactVerdict}>COUNT EFFECTS <span>Graph completion alone is not task success</span></p>
      </div>
    </section>
    <div className={styles.content}>
      <section className={styles.storyRow}><h2>The failure boundary</h2><div><p>The receiver commits and returns a receipt to the tool. The process then exits before the tool returns and graph completion is saved. Receiver storage and the graph checkpoint are separate transactions: the external action has happened, while the runtime still has pending work.</p><div className={styles.links}><a href={doc("docs/crash-resume-evidence.md")}>Crash/replay walkthrough ↗</a></div></div></section>
      <section className={styles.storyRow}><h2>Recovery &amp; safeguard</h2><div><p>A fresh process restores the checkpoint and enters the pending tool again. The application persists a stable operation ID before starting workers. The protected receiver atomically checks and records that ID in SQLite; replay returns the first receipt instead of creating another effect. A new ID would describe a new action and defeat this safeguard.</p><div className={styles.links}><a href={doc("reliability_lab/receiver.py")}>Receiver implementation ↗</a><a href={doc("results/fresh/crash-resume-v1/execution.json")}>Saved execution ↗</a></div></div></section>
      <section className={styles.storyRow}><h2>What the records show</h2><div><p>Both protected approval cases recorded two tool entries and one effect; the unprotected control recorded two entries and two effects. Edited approval retained the approved replacement, and rejection produced no write. All five graphs finished, including the duplicate control. The original assessment failed on an edited-message parsing assumption; a separate corrected assessment checked the saved observations without rerunning workers.</p><div className={styles.links}><a href={doc("results/fresh/crash-resume-v1/reassessment-a1.json")}>Corrected assessment ↗</a><a href={doc("docs/clean-install-reproduction.md")}>Same-host package reproduction ↗</a></div></div></section>
      <section className={styles.storyRow}><h2>Report what is known</h2><div><p>A valid receipt proves an observed commit, not the absence of another commit. A deterministic application reporter reconciles receiver rows, discloses duplicates, and preserves the graph answer separately. When current receiver records are unavailable, it reports an unknown outcome. That unavailable-evidence response is a separate reporting observation reusing a completed result, not another independent crash/recovery case.</p><div className={styles.links}><a href={doc("docs/final-response-integration.md")}>Reporting experiment ↗</a><a href={doc("results/fresh/final-response-v1/execution.json")}>Integrated response evidence ↗</a></div></div></section>
      <section className={styles.storyRow}><h2>My contribution</h2><div><p>I built the experiment harness, receiver safeguards, reporting, evaluators, and reproducible evidence with AI assistance. Deep Agents, LangChain, and LangGraph supply the runtime, agent construction, execution, and checkpoints. This is an independent lab, not an upstream SDK contribution.</p><p className={styles.small}>Python · SQLite · Deep Agents · LangChain · LangGraph</p></div></section>
      <section className={styles.storyRow}><h2>Limits &amp; further evidence</h2><div><p>These are bounded local SQLite experiments with scripted model proposals, simulated reviewer decisions, and deliberate process exits. They do not establish general exactly-once delivery, production readiness, authenticated approval, power-loss safety, or general model reliability. Fresh package reproduction used the same host; it does not establish cross-platform behavior.</p><p>Retry, timeout, and request-budget experiments examine related boundaries. Offline verification checks saved evidence and runs fresh receiver contracts; it does not rerun historical agents or graph crashes.</p><div className={styles.links}><a href={doc("docs/claim-evidence.md")}>Claims &amp; evidence ↗</a><a href={doc("docs/reproduction.md")}>Reproduce &amp; verify ↗</a><a href={doc("docs/retry-timeout-evidence.md")}>Retries &amp; timeouts ↗</a><a href={doc("docs/budget-recovery-evidence.md")}>Request budgets ↗</a></div></div></section>
    </div>
  </>;
}
