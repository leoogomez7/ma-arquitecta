import { createFileRoute } from '@tanstack/react-router';
import { SiteShell, ContactSection } from '@/components/architecture';
import { pageMeta } from '@/lib/portfolio';
export const Route = createFileRoute('/contacto')({head:()=>pageMeta('Contacto','Tu próximo proyecto comienza con una idea. Contanos qué estás imaginando a MA Arquitecta.'),component:ContactPage});
function ContactPage(){return <SiteShell><div className="inner-page"><ContactSection/></div></SiteShell>;}