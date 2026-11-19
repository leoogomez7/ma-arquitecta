import { createFileRoute } from '@tanstack/react-router';
import { ProjectsPage } from '@/components/architecture';
import { pageMeta } from '@/lib/portfolio';
export const Route = createFileRoute('/proyectos/')({head:()=>pageMeta('Proyectos','Ideas que se convierten en espacios. Viviendas, anteproyectos y propuestas arquitectónicas en desarrollo de MA Arquitecta.'),component:ProjectsPage});