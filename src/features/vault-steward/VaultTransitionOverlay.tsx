import { vaultSteward } from "@/content/portfolioContent";

export function VaultTransitionOverlay({ className, layout = "desktop" }: { className?: string; connectorClassName?: string; connectorPathClassName?: string; layout?: "desktop" | "mobile" }) {
  return <section aria-hidden="true" className={className} data-animatable data-vault-transition data-layout={layout}>
    <div data-animatable data-evidence-packet><span>EVIDENCE PACKET</span><strong>Verified purchase</strong></div>
    <div data-animatable data-vault-boundary />
    <h3 data-animatable data-vault-transition-title>{vaultSteward.title}</h3>
    <p data-animatable data-vault-transition-headline>{vaultSteward.headline}</p>
    <ol data-animatable data-vault-transition-rail>{vaultSteward.rail.map((step) => <li key={step} data-animatable data-vault-transition-step>{step}</li>)}</ol>
  </section>;
}
