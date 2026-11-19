import { createFileRoute } from '@tanstack/react-router';
import { SiteShell, HomesSection, ContactSection } from '@/components/architecture';
import { pageMeta } from '@/lib/portfolio';
export const Route = createFileRoute('/viviendas')({head:()=>pageMeta('Viviendas construidas','Arquitectura para habitar. Explorá el espacio dedicado a las viviendas de MA Arquitecta.'),component:HomesPage});
function HomesPage(){return <SiteShell><div className="inner-page page-width"><div className="eyebrow">MA ARQUITECTA / PORTFOLIO</div><h1 className="page-title">Viviendas construidas.</h1></div><HomesSection full/><ContactSection/></SiteShell>;}