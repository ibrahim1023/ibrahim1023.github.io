import styles from "./ProfileFooter.module.css";

export const profiles = [
  { label: "GitHub", href: "https://github.com/ibrahim1023" },
  { label: "X", href: "https://x.com/Ibrahim__Arshad" },
  { label: "Medium", href: "https://medium.com/@ibrahim.a.motiwala" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ibrahim-arshad-23355a166/" },
] as const;

export function ProfileFooter() {
  return (
    <footer className={styles.footer} id="contact">
      <section className={styles.stack} aria-labelledby="stack-title">
        <h2 id="stack-title">Stack & tools</h2>
        <dl className={styles.skills}>{stack.map(([label, items]) => <div key={label} data-secondary={label === "AI-assisted development" || undefined}><dt>{label}</dt><dd>{items}</dd></div>)}</dl>
      </section>
      <div className={styles.contact}><p>For relevant roles, collaboration, or project questions, get in touch.</p><a className={styles.email} href="mailto:ibrahim_arshad@outlook.com">ibrahim_arshad@outlook.com ↗</a></div>
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
  ["Languages", "Python · TypeScript"],
  ["Applications", "React · Next.js · FastAPI"],
  ["Data & authentication", "PostgreSQL · Supabase · Convex · SQLite · Clerk"],
  ["Infrastructure", "Docker · AWS · Vercel · GitHub Actions"],
  ["AI systems", "LangChain · LangGraph · Pydantic · MCP"],
  ["Models & inference", "OpenAI · Ollama · ElevenLabs · Hyperfusion"],
  ["Context & observability", "Context.dev · LangSmith"],
  ["AI-assisted development", "Claude Code · Codex · Devin"],
] as const;
