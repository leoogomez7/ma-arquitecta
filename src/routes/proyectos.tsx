import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/proyectos")({ component: ProjectLayout });
function ProjectLayout() {
  return <Outlet />;
}
