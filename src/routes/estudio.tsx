import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, StudioSection, MethodSection, ContactSection } from "@/components/architecture";
import { pageMeta } from "@/lib/portfolio";
export const Route = createFileRoute("/estudio")({
  head: () =>
    pageMeta(
      "El estudio",
      "La mirada de MA Arquitecta: arquitectura, interiorismo y una forma sensible de pensar los espacios.",
    ),
  component: StudioPage,
});
function StudioPage() {
  return (
    <SiteShell>
      <div className="inner-page">
        <StudioSection full />
      </div>
      <MethodSection />
      <ContactSection />
    </SiteShell>
  );
}
