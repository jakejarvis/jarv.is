import { createFileRoute } from "@tanstack/react-router";

import { PageTitle } from "@/components/layout/page-title";
import { createHead } from "@/lib/head";

export const Route = createFileRoute("/projects")({
  head: () =>
    createHead({
      title: "Projects",
      description: "Most-starred repositories on GitHub.",
      canonical: "/projects",
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <PageTitle canonical="/projects">Projects</PageTitle>
      <div className="bg-muted/40 flex justify-center rounded-lg px-6 py-12">
        <p className="text-muted-foreground text-center">
          Projects page coming soon — needs server function migration for GitHub API.
        </p>
      </div>
    </>
  );
}
