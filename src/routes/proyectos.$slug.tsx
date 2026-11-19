import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectDetail } from "@/components/architecture";
import { projects, pageMeta } from "@/lib/portfolio";
export const Route = createFileRoute("/proyectos/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) =>
    pageMeta(
      loaderData?.name ?? "Proyecto no disponible",
      loaderData?.description ?? "El proyecto solicitado no está disponible.",
    ),
  component: Detail,
});
function Detail() {
  const project = Route.useLoaderData();
  return <ProjectDetail project={project} />;
}
