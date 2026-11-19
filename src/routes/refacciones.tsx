import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, RenovationSection, ContactSection } from "@/components/architecture";
import { pageMeta } from "@/lib/portfolio";
export const Route = createFileRoute("/refacciones")({
  head: () =>
    pageMeta(
      "Refacciones y ampliaciones",
      "Transformamos espacios existentes en nuevas oportunidades para habitar. Refacciones e interiorismo de MA Arquitecta.",
    ),
  component: RenovationPage,
});
function RenovationPage() {
  return (
    <SiteShell>
      <div className="inner-page page-width">
        <div className="eyebrow">MA ARQUITECTA / TRANSFORMACIONES</div>
        <h1 className="page-title">Refacciones y ampliaciones.</h1>
      </div>
      <RenovationSection full />
      <ContactSection />
    </SiteShell>
  );
}
