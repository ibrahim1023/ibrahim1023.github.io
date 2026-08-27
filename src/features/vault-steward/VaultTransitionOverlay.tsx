import { vaultSteward } from "@/content/portfolioContent";

export function VaultTransitionOverlay({ className }: { className?: string }) {
  return (
    <section
      aria-hidden="true"
      className={className}
      data-animatable
      data-vault-transition
    >
      <svg
        aria-hidden="true"
        data-animatable
        data-vault-transition-connectors
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 10 38 H 90 V 72 H 10 Z"
          data-animatable
          data-vault-transition-connector="boundary"
        />
        <path
          d="M 50 72 V 88"
          data-animatable
          data-vault-transition-connector="recheck"
        />
      </svg>
      <h3 data-animatable data-vault-transition-title>{vaultSteward.title}</h3>
      <p data-animatable data-vault-transition-headline>{vaultSteward.headline}</p>
      <ol data-animatable data-vault-transition-rail>
        {vaultSteward.rail.map((step) => (
          <li key={step} data-animatable data-vault-transition-step>
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
