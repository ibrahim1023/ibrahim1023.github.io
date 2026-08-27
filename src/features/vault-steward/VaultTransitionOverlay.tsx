import { vaultSteward } from "@/content/portfolioContent";

export function VaultTransitionOverlay({ className }: { className?: string }) {
  return (
    <section
      aria-hidden="true"
      className={className}
      data-animatable
      data-vault-transition
    >
      <h3 data-vault-transition-title>{vaultSteward.title}</h3>
      <p data-vault-transition-headline>{vaultSteward.headline}</p>
      <ol data-vault-transition-rail>
        {vaultSteward.rail.map((step) => (
          <li key={step} data-vault-transition-step>
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
