import { createFileRoute } from '@tanstack/react-router';
import { SiteShell, Hero, StudioSection, HomesSection, RenovationSection, MethodSection, ContactSection } from '@/components/architecture';
import { pageMeta } from '@/lib/portfolio';

export const Route = createFileRoute('/')({
  head: () => pageMeta('Arquitectura e interiorismo', 'MA Arquitecta. Espacios que inspiran. Arquitectura que trasciende. Viviendas, refacciones e interiorismo con identidad.'),
  component: Index,
});
function Index() {
  return <SiteShell><Hero/><StudioSection/><HomesSection/><RenovationSection/><MethodSection/><ContactSection/></SiteShell>;
}
