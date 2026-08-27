import { vaultSteward } from "@/content/portfolioContent";

export function VaultTransitionOverlay({
  className,
  connectorClassName,
  connectorPathClassName,
  layout = "desktop",
}: {
  className?: string;
  connectorClassName?: string;
  connectorPathClassName?: string;
  layout?: "desktop" | "mobile";
}) {
  const boundaryPath = layout === "mobile" ? "M 18 8 H 82 V 82 H 18 Z" : "M 10 38 H 90 V 72 H 10 Z";
  const recheckPath = layout === "mobile" ? "M 50 82 V 96" : "M 50 72 V 88";

  return (
    <section
      aria-hidden="true"
      className={className}
      data-animatable
      data-vault-transition
    >
      <svg
        aria-hidden="true"
        className={connectorClassName}
        data-animatable
        data-vault-transition-connectors
        data-vault-transition-layout={layout}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          className={connectorPathClassName}
          d={boundaryPath}
          data-animatable
          data-vault-transition-connector="boundary"
        />
        <path
          className={connectorPathClassName}
          d={recheckPath}
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
