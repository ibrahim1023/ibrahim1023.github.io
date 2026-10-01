import { profiles } from "@/features/portfolio/ProfileFooter";
import { externalLinks } from "@/content/portfolioContent";
import { withBasePath } from "@/lib/deployment/basePath";
import styles from "./PortfolioOverview.module.css";
function Flow({ steps }: { steps: string[] }) { return <ol className={styles.flow}>{steps.map(step => <li key={step}>{step}</li>)}</ol>; }

const github = "https://github.com/ibrahim1023";
const contact = "mailto:ibrahim_arshad@outlook.com";
const projects = [
  { id: "settlediff", title: "SettleDiff", status: "Bounded live evidence validated", problem: "Did the agent’s payment actually reach the intended recipient?", capability: "Compares authorized terms with provider evidence and, when available, an independent settlement observation.", repo: "SettleDiff", discipline: "Payment verification" },
  { id: "casezero", title: "CaseZero", status: "Experimental · evaluation pending", problem: "Can an AI investigation reason without access to the official finding?", capability: "Source-linked evidence extraction, access boundaries, and immutable assessment locking.", repo: "CaseZero", discipline: "Evidence & evaluation infrastructure" },
  { id: "vault-steward", title: "Vault Steward", status: "macOS desktop validated", problem: "How do you repair a growing knowledge base without silently changing someone’s notes?", capability: "Finds integrity issues, previews exact repairs, and requires approval before edits.", repo: "vault-steward", discipline: "Controlled agent actions" },
] as const;

export function PortfolioOverview({ project }: { project?: "settlediff" | "casezero" | "vault-steward" }) {
  const selected = projects.find(item => item.id === project);
  return (
    <div className={styles.page}>
      <header className={styles.navigation}>
        <a href={withBasePath("/")} className={styles.wordmark}>← Ibrahim Arshad</a>
        <nav aria-label="Main navigation"><a href={withBasePath("/#work")}>All projects</a><a href="#contact">Contact</a></nav>
      </header>
      <main id="main" className={styles.main}>
        <section className={styles.intro} aria-labelledby="intro-title">
          <p className={styles.eyebrow}>AI Systems Engineer</p>
          <h1 id="intro-title">{selected?.title ?? "Ibrahim Arshad"}</h1>
          <p className={styles.lead}>{selected?.capability ?? "I build systems that check AI outputs against evidence and keep consequential actions under explicit control."}</p>
          <p>Solo project · Design & implementation by Ibrahim Arshad</p>
          <div className={styles.actions}>{selected && <a className={styles.primary} href={`${github}/${selected.repo}`}>View on GitHub ↗</a>}</div>
        </section>

        {!project && <section id="work" className={styles.work} aria-labelledby="work-title">
          <div className={styles.sectionHeading}><h2 id="work-title">Selected work</h2><span>Three solo projects</span></div>
          <div className={styles.projects}>
            {projects.map(project => <article key={project.id} className={styles.project}>
              <p className={styles.status}>{project.status}</p><h3>{project.title}</h3>
              <p className={styles.problem}>{project.problem}</p><p>{project.capability}</p>
              <p className={styles.discipline}>{project.discipline}</p>
              <div className={styles.projectLinks}><a href={`#${project.id}`} aria-label={`Read ${project.title} case study`}>Read case study ↓</a><a href={`${github}/${project.repo}`} aria-label={`View ${project.title} source`}>View source ↗</a></div>
            </article>)}
          </div>
        </section>}

        {(!project || project === "settlediff") && <section id="settlediff" className={styles.caseStudy} aria-labelledby="settlediff-title">
          <header><p className={styles.eyebrow}>01 / Payment verification</p><h2 id="settlediff-title">{project ? "How verification works" : "SettleDiff"}</h2><p>Check the transfer. Don’t just trust the receipt.</p></header>
          <Flow steps={["Authorize exact terms", "Capture provider evidence", "Check independent settlement when available", "Report evidence-backed verdict"]} />
          <div className={styles.caseGrid}>
            <div><h3>Problem</h3><p>Builders of paid agents need to distinguish a submitted request from money actually settling—and from the purchased service succeeding.</p><h3>My implementation</h3><p>A Python verifier compares payment terms, execution, settlement, and service outcome in one evidence model. Perflo and x402 adapters supply evidence; deterministic checks assign the verdict. An investigation agent can explain findings, not overrule them.</p></div>
            <div><h3>Historical context</h3><p>The original Base→Tempo, HTTP-402, <code>broadcast_failed</code> run remained <strong>UNVERIFIABLE</strong>. On September 8, Perflo’s contract, execution, and Activity agreed and historical report schema 2 returned <strong>VERIFIED_WITH_WARNINGS</strong>. That provider-only result is historical context, not independent proof of the customer debit.</p><h3>Current Perflo v8 result</h3><p>Contract, execution, charge, Activity, and provider settlement aligned, but the customer debit remained provider-ledger evidence. A successful Base receipt described a Perflo-operated vendor-side transfer—not the customer debit—so SettleDiff returned <strong>UNVERIFIABLE</strong>.</p><h3>Independent x402 result</h3><p>A separately authorized <strong>0.001 test-USDC</strong> purchase on Base Sepolia matched the observed payer, recipient, token, amount, and network. All 13 checks passed on September 28 and the result was <strong>VERIFIED</strong>.</p><h3>Confirmed paid-delivery failure</h3><p>Another separately authorized request independently confirmed the same amount, then returned HTTP 200 <code>text/plain</code> after advertising <code>application/json</code>. SettleDiff returned <strong>PAID_FAILURE</strong> and <strong>DO_NOT_RETRY</strong>. The earlier HTTP-500 request lacked settlement proof, remains <strong>UNVERIFIABLE</strong>, and was not retried.</p><h3>Status & limits</h3><p>These bounded live cycles validate specific provider-correlation, independent-observation, delivery, bundle, and recovery paths—not universal compatibility or production reliability.</p></div>
          </div>
          <p className={styles.technology}>Python · PydanticAI · FastAPI · SQLite · x402<br />Context.dev retrieves conditional supporting status-page evidence; it cannot change financial findings.</p>
          <div className={styles.sourceLinks}><a href={`${github}/SettleDiff`}>View SettleDiff source ↗</a><a href={externalLinks.settleDiffCurrentValidation}>September 28 validation ↗</a><a href={externalLinks.settleDiffLiveReport}>Historical validation context ↗</a><a href={externalLinks.settleDiffAssuranceReport}>Delivery, bundle & recovery assurance ↗</a></div>
        </section>}

        {(!project || project === "casezero") && <section id="casezero" className={styles.caseStudy} aria-labelledby="casezero-title">
          <header><p className={styles.eyebrow}>02 / Evidence & evaluation infrastructure</p><h2 id="casezero-title">{project ? "How evidence stays separate" : "CaseZero"}</h2><p>Separate the evidence from the answer you’re testing against.</p></header>
          <Flow steps={["Acquire permitted sources", "Extract source-linked evidence", "Restrict official findings", "Lock assessment snapshot"]} />
          <div className={styles.caseGrid}>
            <div><h3>Problem</h3><p>An investigation benchmark is misleading if the system can read the official conclusion before forming its assessment.</p><h3>My implementation</h3><p>Typed evidence retains source locators. Access rules separate investigation evidence from official analysis and findings. The locking service records assessment and evidence hashes with model and prompt versions before reveal.</p></div>
            <div><h3>Evidence</h3><p>The September 1 extraction report for CEN22FA375 records three processed sources, with all 951 evidence locators resolving back to source content. A no-change rerun created no duplicate active state and made no model call.</p><h3>Status & limits</h3><p>I’ve implemented extraction and assessment locking; the generated-finding evaluation is still pending. Extraction volume is not investigation quality. Input separation also cannot rule out a model’s prior knowledge; expert semantic review remains incomplete.</p></div>
          </div>
          <p className={styles.technology}>Python · FastAPI · Pydantic · Postgres / Supabase · Docling<br />Context.dev supports docket discovery; the measured extraction run used a curated manifest, not live Context.dev validation.</p>
          <p className={styles.disclosure}>Independent experimental project. Not affiliated with or endorsed by the NTSB. Experimental outputs are not official findings.</p>
          <div className={styles.sourceLinks}><a href={`${github}/CaseZero`}>View CaseZero source ↗</a><a href={`${github}/CaseZero/blob/main/docs/development/phase-1-validation.md`}>Read extraction validation ↗</a><a href={`${github}/CaseZero/blob/main/apps/api/src/casezero_api/lock.py`}>Inspect assessment locking ↗</a></div>
        </section>}

        {(!project || project === "vault-steward") && <section id="vault-steward" className={styles.caseStudy} aria-labelledby="vault-title">
          <header><p className={styles.eyebrow}>03 / Controlled agent actions</p><h2 id="vault-title">{project ? "How a repair stays under your control" : "Vault Steward"}</h2><p>Repair the link without handing over control of the note.</p></header>
          <Flow steps={["Find an integrity issue", "Preview the exact diff", "Approve selected changes", "Check revision & re-scan"]} />
          <div className={styles.caseGrid}>
            <div><h3>Problem</h3><p>An Obsidian vault is a local collection of linked Markdown notes. Broken references make the knowledge base harder to navigate; automatic edits risk changing material the owner intended to keep.</p><h3>My implementation</h3><p>The plugin detects reference, schema, and policy issues and prepares exact repair previews. Models can review bounded evidence, but cannot approve or write notes. A revision check rejects stale proposals if the note has changed.</p></div>
            <div><h3>Illustrative repair</h3><div className={styles.repair}><p><span>Broken reference</span><s>[[Guides/Partner Onboard Checklist]]</s></p><p><span>Proposed target</span><strong>[[Guides/Partner Onboarding Checklist]]</strong></p></div><p>The issue is a link to a missing target, not a wording preference. If the intended target exists, an approved repair restores navigation; a subsequent vault check verifies the remaining issues. This example is illustrative, not a measured run.</p><h3>Status & limits</h3><p>macOS desktop is the validated platform. Repair families are deliberately narrow; the tool cannot establish external facts or guarantee model accuracy.</p></div>
          </div>
          <p className={styles.technology}>TypeScript · Obsidian · Preact · SQLite / sql.js · local-first model providers</p>
          <div className={styles.sourceLinks}><a href={`${github}/vault-steward`}>View Vault Steward source ↗</a><a href={`${github}/vault-steward/blob/main/docs/screenshots.md`}>See the approval walkthrough ↗</a><a href={`${github}/vault-steward/blob/main/docs/known-limitations.md`}>Read limitations ↗</a></div>
        </section>}

        <section id="focus" className={styles.focus} aria-labelledby="focus-title"><h2 id="focus-title">Engineering tradeoff</h2><p>{project === "casezero" ? "I separate access to official findings from evidence extraction, but access controls cannot erase a model’s prior knowledge. That is why extraction checks and generated-finding evaluation are separate milestones." : project === "vault-steward" ? "I keep repairs narrow and require explicit approval rather than maximizing autonomous edits. Rechecking the note revision adds a safety boundary: a stale proposal must not overwrite newer work." : "I keep the verdict deterministic and let the model explain the evidence. That limits what an investigation agent can decide, but prevents a convincing explanation from overriding missing settlement proof."}</p><a href={withBasePath("/")}>Back to selected work ↗</a></section>
        <section id="contact" className={styles.contact} aria-labelledby="contact-title"><p className={styles.eyebrow}>Get in touch</p><h2 id="contact-title">Let’s talk about reliable AI systems.</h2><p>Interested in reliable AI systems, agent payments, or evidence-driven tools? I’d be glad to talk.</p><a className={styles.primary} href={contact}>ibrahim_arshad@outlook.com ↗</a></section>
      </main>
      <footer className={styles.footer}><span>Ibrahim Arshad</span><nav aria-label="Social profiles">{profiles.map(({label, href}) => <a key={label} href={href}>{label} ↗</a>)}</nav></footer>
    </div>
  );
}
