import { caseZero } from "@/content/portfolioContent";

export function VaultTransitionOverlay({ className, layout = "desktop" }: { className?: string; connectorClassName?: string; connectorPathClassName?: string; layout?: "desktop" | "mobile" }) {
  return <section aria-hidden="true" className={className} data-animatable data-vault-transition data-layout={layout}>
    <div data-animatable data-evidence-packet data-lock-packet><span>LOCKED ASSESSMENT</span><strong>Evidence and versions recorded</strong></div>
    <div data-animatable data-vault-boundary />
    <p data-animatable data-vault-transition-headline>{caseZero.transition}</p>
  </section>;
}
