import styles from "./ProfileFooter.module.css";

export const profiles = [
  { label: "GitHub", href: "https://github.com/ibrahim1023" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ibrahim-arshad-23355a166/" },
  { label: "Medium", href: "https://medium.com/@ibrahim.a.motiwala" },
  { label: "X", href: "https://x.com/Ibrahim__Arshad" },
] as const;

export function ProfileFooter() {
  return (
    <footer className={styles.footer} id="contact">
      <section className={styles.stack} aria-labelledby="stack-title">
        <h2 id="stack-title">Stack & tools</h2>
        <dl className={styles.skills}>{stack.map(([label, items]) => <div key={label} data-secondary={label === "AI-assisted development" || undefined}><dt>{label}</dt><dd>{items}</dd></div>)}</dl>
      </section>
      <div className={styles.contact}><p>Interested in reliable AI systems, agent payments, or evidence-driven tools? I’d be glad to talk.</p><a className={styles.email} href="mailto:ibrahim_arshad@outlook.com">ibrahim_arshad@outlook.com ↗</a></div>
      <div className={styles.inner}>
        <h2>Find me elsewhere</h2>
        <nav aria-label="Social profiles">
          {profiles.map(({ label, href }) => <a key={label} href={href} aria-label={`${label} (opens in a new tab)`} target="_blank" rel="noopener noreferrer">{label}<span aria-hidden="true"> ↗</span></a>)}
        </nav>
      </div>
    </footer>
  );
}

export const stack = [
  ["Core engineering", "Python · TypeScript · React · Next.js · FastAPI"],
  ["Data", "PostgreSQL · SQLite · Supabase"],
  ["Agent systems & verification", "Pydantic · PydanticAI · evidence tracing · x402"],
  ["Infrastructure", "Docker · AWS · Vercel · GitHub Actions"],
  ["Context & observability", "Context.dev · LangSmith"],
  ["AI-assisted development", "Claude Code · Codex · Devin"],
] as const;
